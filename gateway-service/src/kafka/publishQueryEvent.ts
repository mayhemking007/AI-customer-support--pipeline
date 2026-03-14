import { producer } from "./producer.js";
import {TOPICS} from "./topics.js"

export const publishQueryEvent = async(event : any) => {
    await producer.send({
        topic : TOPICS.USER_QUERIES,
        messages : [
            {
                key : event.id,
                value : JSON.stringify(event)
            }
        ]
    });
}