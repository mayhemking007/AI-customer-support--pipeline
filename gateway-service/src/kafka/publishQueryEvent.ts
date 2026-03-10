import { producer } from "./producer.js";

export const publishQueryEvent = async(event : any) => {
    await producer.send({
        topic : 'user_queries',
        messages : [
            {
                key : event.requestId,
                value : JSON.stringify(event)
            }
        ]
    });
}