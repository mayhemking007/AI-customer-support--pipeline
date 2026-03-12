import express from "express";

const app = express();


const main = async () => {
    app.listen(4000, () => console.log("Server has started on port 4000"))
}
main()
