import { Router } from "express";
import { uplaod } from "../middleware/upload.js";
import { prisma } from "../db/prisma.js";
import path from "node:path";
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
    const filepath = path.join(process.cwd() + 'upload' + file.filename);
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
        let chunksSave : any = [];
        for(let i = 0; i < chunks.length; i++){
            const embedding = await embedder(chunks[i] as string);
            const data = {
                content : chunks[i],
                embedding : embedding,
                documentId : doc.id
            }
            chunksSave.push(data);
        }
        const chunksDB = await prisma.chunk.createMany({
            data : chunksSave
        });

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