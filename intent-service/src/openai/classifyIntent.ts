import { openai } from "./openai.js"

export const classifyIntent = async (query : any) => {
    const prompt = `
        Classify the intent of this customer support message.

        Possible intents:
        - shipping_issue
        - refund_request
        - product_question
        - complaint

        Message: "${query}"

        Return only the intent.
    `;
    try{
        const response = await openai.chat.completions.create({
            model : "gpt-4o-mini",
            messages : [
                {
                    role : "user", 
                    content : prompt
                }
            ]
        });
        return response.choices[0]?.message.content;
    }
    catch(e){
        console.log(e);
    }
    
}