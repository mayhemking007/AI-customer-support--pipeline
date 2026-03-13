import { producer } from "./producer.js"

export const publishIntent = async (event : any) => {
    await producer.send({
        topic : 'classified_queries',
        messages : [
            {
                key : event.requestId,
                value : JSON.stringify(event)

            }
        ]
    })
}