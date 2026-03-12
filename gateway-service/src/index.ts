import express from "express";
import { queryRouter } from "./routes/query.js";
import { connectProducer } from "./kafka/producer.js";

const app = express();

app.use(express.json());

app.use('/query', queryRouter);

const main = async () => {
    await connectProducer();
    app.listen(3000, () => console.log("Server is listening on port 3000"));
}

main();
