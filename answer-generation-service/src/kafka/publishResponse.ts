import { producer } from "./producer.js";
import { TOPICS } from "./topic.js";

export const publishResponse = async(event : any) => {
    const {queryId} = event;
    await producer.send({
        topic : TOPICS.GENERATED_RESPONSES,
        messages : [
            {
                key : queryId,
                value : JSON.stringify(event)
            }
        ]
    });
}