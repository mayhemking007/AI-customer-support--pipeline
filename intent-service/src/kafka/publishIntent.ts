import { producer } from "./producer.js"
import { TOPICS } from "./topics.js";

export const publishIntent = async (event : any) => {
    try{
        await producer.send({
            topic : TOPICS.CLASSIFIED_QUERIES,
            messages : [
                {
                    key : event.queryId,
                    value : JSON.stringify(event)
                }
            ]
        });
    }
    catch(e){
        console.log(e);
    }
    
}