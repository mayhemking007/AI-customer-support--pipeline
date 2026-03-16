import { kafka } from "./kafkaClient.js";
import { TOPICS } from "./topics.js";

export const consumer = kafka.consumer({
    groupId : "retrieval-service-group"
});

export const startConsumer = async() => {
    await consumer.connect();
    await consumer.subscribe({
        topic : TOPICS.CLASSIFIED_QUERIES,
        fromBeginning: false
    });
    console.log("Retrieval Service consumer started - listening to classified queries");
    await consumer.run({
        eachMessage : async({message}) => {
            const value = message.value?.toString();
            if(!value) return;
            const event = JSON.parse(value);
            console.log(`Message received - ${event}`);
            
        }
    })
}