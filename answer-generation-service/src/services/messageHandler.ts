import { publishResponse } from "../kafka/publishResponse.js";
import { generateResponse } from "../openai/generateResponse.js";

export const messageHandler = async(event : any) => {
    const context = event.context;
    const queryId = event.queryId;
    try{
        const response = await generateResponse(context);
        const event = {
            queryId : queryId,
            response : response
        }
        console.log(response);
        await publishResponse(event);
    }
    catch(e){
        console.log(e);
        throw e;
    }

}