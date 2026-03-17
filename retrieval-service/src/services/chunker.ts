export const chunker = (content : string, chunkSize : number, overlap : number) => {
    const words = content.split(/\s+/);
    const chunks = [];
    for(let i = 0; i < words.length; i += chunkSize - overlap){
        const chunk = words.splice(i, i + chunkSize).join(" ");
        chunks.push(chunk);
    }
    return chunks;
}