import { prisma } from "../db/prisma.js";
import { publishRetrievedContext } from "../kafka/publishRetrievedContext.js";
import { embedder } from "../openai/embedding.js";

export const messageHandler = async (event : any) => {
    const query = event.query;
    const intent = event.intent;
    try{
        const queryEmbedding = await embedder(query as string);
        const queryVectorString = `[${queryEmbedding?.join(",")}]`;
        const TopChunks : any = await prisma.$queryRawUnsafe(`SELECT c.content from "Chunk" c
            JOIN "Document" d On d.id = c."documentId" 
            WHERE d.status = 'ACTIVE'
            ORDER BY c.embedding <=> '${queryVectorString}'::vector LIMIT 5;`);
        const context = TopChunks ? TopChunks.map((chunk : any, index : number) => (
            `context : ${index} - \n${chunk.content}`
        )).join("\n\n") : [];
        const finalContext = `Intent: ${intent} \nQuestion: ${query} \nContexts: \n${context}`;
        const data = {
            context : finalContext,
            queryId : event.queryId
        }
        await publishRetrievedContext(data);
    }
    catch(e){
        console.log(e);
        throw e;
    }
    
}