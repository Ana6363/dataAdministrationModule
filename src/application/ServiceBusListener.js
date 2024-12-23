const { ServiceBusClient } = require("@azure/service-bus");
const AllergyService = require('../../src/application/AllergyService');
require('dotenv').config();

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.QUEUE_NAME;
const feedbackQueueName = process.env.FEEDBACK_QUEUE_NAME;

const serviceBusClient = new ServiceBusClient(connectionString);
const receiver = serviceBusClient.createReceiver(queueName);
const feedbackSender = serviceBusClient.createSender(feedbackQueueName);

async function processMessages() {
    console.log("Listening for messages...");

    receiver.subscribe({
        processMessage: async (message) => {
            console.log("Received message:", message.body);

            const { type, data } = message.body;

            if (!type || !data) {
                console.error("Invalid message structure:", message.body);
                return;
            }

            try {
                switch (type) {
                    case "allergy":
                        await handleAllergyMessage(data);
                        break;
                    default:
                        console.warn(`Unknown message type: ${type}`);
                        break;
                }

                await receiver.completeMessage(message);
                console.log(`Message of type '${type}' processed successfully.`);
            } catch (error) {
                console.error(`Error processing message of type '${type}':`, error);
                await receiver.deadLetterMessage(message, {
                    reason: "ProcessingError",
                    errorDescription: error.message,
                });

                // Send failure feedback
                await sendFeedbackMessage({
                    statusCode: 400,
                    message: `Failed to process message of type '${type}': ${error.message}`,
                });
            }
        },
        processError: async (error) => {
            console.error("Error processing message:", error);
        }
    });

    // Prevent the process from exiting
    await new Promise((resolve) => setTimeout(resolve, 10000000));
}

async function handleAllergyMessage(data) {

    const name = data.Name || data.name;
    const description = data.Description || data.description;

    if (!name || !description) {
        throw new Error("Invalid allergy data");
    }

    try {
        // Delegate to AllergyService
        await AllergyService.createAllergy(name, description);
        console.log(`Allergy saved: Name=${name}, Description=${description}`);

        // Send success feedback
        await sendFeedbackMessage({
            statusCode: 200,
            message: `Allergy saved: Name=${name}, Description=${description}`
        });
    } catch (error) {
        console.error("Error saving allergy:", error);

        // Send failure feedback
        await sendFeedbackMessage({
            statusCode: 500,
            message: `Error saving allergy: ${error.message}`
        });

        throw error;
    }
}

async function sendFeedbackMessage(feedback) {
    try {
        const message = {
            body: feedback,
        };
        await feedbackSender.sendMessages(message);
        console.log("Feedback message sent:", feedback);
    } catch (error) {
        console.error("Error sending feedback message:", error);
    }
}

module.exports = { processMessages };
