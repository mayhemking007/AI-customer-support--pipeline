import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: 'intent-service',
  brokers: ['localhost:9092'],
});