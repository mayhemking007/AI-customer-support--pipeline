import { kafka } from "./kafkaClient.js";

export const consumer = kafka.consumer({
    groupId : 'intent-service-group'
});

export const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic : "user_queries",
        fromBeginning: false
    });
}

console.log("Intent service is consumer started- listning to user_queries");

await consumer.run({
    eachMessage : async ({message}) => {
        const value = message.value?.toString();
        if(!value) return;

        const event = JSON.parse(value);
        console.log("Message Recieved:", event);
    }
})