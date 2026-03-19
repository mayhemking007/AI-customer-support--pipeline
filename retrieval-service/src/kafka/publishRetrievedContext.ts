import { producer } from "./producer.js"
import { TOPICS } from "./topics.js"

export const publishRetrievedContext = async (event : any) => {
    await producer.send({
        topic : TOPICS.RETRIEVED_QUERIES,
        messages : [
            {
                key : event.queryId,
                value : JSON.stringify(event)
            }
        ]
    })
}