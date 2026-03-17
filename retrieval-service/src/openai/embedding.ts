import { openai } from "./openai.js";

export const embedder = async (text : string) => {
    const embedding = await openai.embeddings.create({
        input : text,
        model : "text-embedding-3-small"
    });
    if(!embedding) throw new Error("Error in generating embedding");
    return embedding.data[0]?.embedding;
}