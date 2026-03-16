import express from "express";
import { startConsumer } from "./kafka/consumer.js";
import { startProducer } from "./kafka/producer.js";
const app = express();

const main = async() => {
    await startConsumer();
    await startProducer();

    app.listen(4000, () => console.log("Server is running on port 4000"));
}
main();
