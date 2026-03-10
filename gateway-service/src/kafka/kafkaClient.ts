const { Kafka } = require('kafkajs')

export const kafka = new Kafka({
  clientId: 'gateway-service',
  brokers: ['localhost:9092'],
})