import { kafka } from "./kafkaClient.js";

export const producer = kafka.producer();

export const startProducer = async() => {
    await producer.connect();
}