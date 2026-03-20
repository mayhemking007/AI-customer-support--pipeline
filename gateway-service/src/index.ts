import express from "express";
import { queryRouter } from "./routes/query.js";
import { connectProducer } from "./kafka/producer.js";
import { startConsumer } from "./kafka/consumer.js";

const app = express();

app.use(express.json());

app.use('/query', queryRouter);

const main = async () => {
    await startConsumer();
    await connectProducer();
    console.log("kafka started");
    app.listen(3000, () => console.log("Server is listening on port 3000"));
}

main();
