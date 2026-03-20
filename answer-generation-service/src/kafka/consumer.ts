import { messageHandler } from "../services/messageHandler.js";
import { kafka } from "./kafkaClient.js";
import { TOPICS } from "./topic.js";

const consumer = kafka.consumer({
    groupId : "answer-generation-group"
});

export const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic : TOPICS.RETRIEVED_QUERIES,
        fromBeginning : false
    });
    consumer.run({
        eachMessage : async ({message}) => {
            const value = message.value?.toString();
            if(!value) return;
            console.log(value);
            const event = JSON.parse(value);
            console.log('Message is received');
            await messageHandler(event);
        }
    })
}