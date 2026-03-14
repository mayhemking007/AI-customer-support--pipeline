import { prisma } from "./prisma.js"

export const saveIntent = async (event : any, intent : any) => {
    try{
        const intentItem = await prisma.intent.create({
            data : {
                queryId : event.id,
                intent : intent
            }
        });
        return intentItem;
    }
    catch(e){
        console.log(e);
    }
    
}