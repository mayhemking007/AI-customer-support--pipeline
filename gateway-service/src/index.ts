import express from "express";
import { queryRouter } from "./routes/query.js";

const app = express();

app.use(express.json());

app.use('/query', queryRouter);


app.listen(3000, () => console.log("Server is listening on port 3000"));