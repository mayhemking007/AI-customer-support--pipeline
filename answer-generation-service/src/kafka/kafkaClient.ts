import { Kafka} from "kafkajs";

export const kafka = new Kafka({
    clientId : "answer-generation-service",
    brokers : ["localhost:9092"]
});