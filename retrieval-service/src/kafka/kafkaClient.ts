import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: 'retrieval-service',
  brokers: ['localhost:9092'],
});