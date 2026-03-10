import { kafka } from "./kafkaClient.js";

export const producer = kafka.producer();

export const connectProducer = async () => {
    await producer.connect();
}