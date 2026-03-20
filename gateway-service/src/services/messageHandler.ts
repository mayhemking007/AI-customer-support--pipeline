import { prisma } from "../db/prisma.js";

export const messageHandler = async (event : any) => {
    const answer = event.response;
    const queryId = event.queryId;
    try{
        await prisma.response.create({
            data : {
                answer : answer,
                queryId : queryId
            }
        }); 
        console.log("Response Saved!");
    }
    catch(e){
        console.log(e);
        throw e;
    }
}