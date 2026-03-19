import { Router } from "express";
import { uplaod } from "../middleware/upload.js";
import { prisma } from "../db/prisma.js";
import path from "path";
import { readFile } from "fs/promises";
import { chunker } from "../services/chunker.js";
import { embedder } from "../openai/embedding.js";

export const documentRouter = Router();

documentRouter.use(uplaod.single('file'));

documentRouter.post('/',  async(req, res) => {
    const file = req.file;
    if(!file){
        res.status(403).json({
            success : false,
            error : "No file has been uploaded"
        });
        return;
    }
    const filepath = path.join(process.cwd() , 'uploads' , file.filename);
    try{
        const doc = await prisma.document.create({
            data : {
                filename : file.filename as string,
                path : filepath
            }
        });
        const content = await readFile(filepath, "utf-8");
        if(!content) throw new Error("Cannot parse the content");
        const chunks = chunker(content, 50, 10);
        console.log("Chunks length - " + chunks.length);
        await prisma.document.update({
            where : {id : doc.id},
            data : {totalChunks : {increment : chunks.length}}
        });
        for(let i = 0; i < chunks.length; i++){
            const embedding = await embedder(chunks[i] as string);
            const vectorString = `[${embedding?.join(',')}]`;
            await prisma.$transaction(async(tsx) => {
                const chunkEle = await tsx.chunk.create({
                    data : {
                        content : chunks[i] as string,
                        documentId : doc.id
                    }
                });
                await tsx.$executeRawUnsafe(`UPDATE "Chunk"
                    SET embedding = '${vectorString}'::vector 
                    WHERE id = '${chunkEle.id}'`);
                await tsx.document.update({
                    where : {id : doc.id},
                    data : {processedChunks : {increment : 1}}
                }) 
            });
        }
        await prisma.document.update({
            where : {id : doc.id},
            data : {status : "ACTIVE"}
        });
        const finalDoc = await prisma.document.findFirst({
            where : {id : doc.id}
        });
        console.log("Total chunks -" + finalDoc?.totalChunks + " and processed - " + finalDoc?.processedChunks)
        res.json({
            success : true,
            data : {
                docId : doc.id,
                message : "Chunks embedded successfully"
            }
        });

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            error : "Internal Server Error"
        })
    }
});