import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { publishQueryEvent } from "../kafka/publishQueryEvent.js";

export const queryRouter = Router();

queryRouter.post('/', async(req, res) => {
    const {query} = req.body;
    try{
        const currentQuery = await prisma.query.create({
            data : {
                query : query
            }
        });
        if(!query) throw new Error(`Error in db write for query - ${query}`);
        await publishQueryEvent(currentQuery);
        res.json({
            success : true,
            status : 'Queued',
            QueryId : currentQuery.id
        });
         
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            error : "internal Server Error"
        })
    }
});