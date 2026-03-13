import { startConsumer } from "./kafka/consumer.js";
import { startProducer } from "./kafka/producer.js";


const main = async () => {
    await startConsumer();
    await startProducer();

    console.log("Intent service started....");
}
main()
