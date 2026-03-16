import { prisma } from "./prisma.js"

export const saveIntent = async (event : any, intent : any) => {
    try{
        const intentItem = await prisma.intent.create({
            data : {
                queryId : event.id,
                intent : intent
            }
        });
        return {
            id : intentItem.id,
            queryId : intentItem.queryId,
            intent : intentItem.intent,
            createAt : intentItem.createdAt,
            query : event.query
        };
    }
    catch(e){
        console.log(e);
    }
    
}