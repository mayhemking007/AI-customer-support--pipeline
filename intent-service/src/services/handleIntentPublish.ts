import { saveIntent } from "../db/saveIntent.js";
import { publishIntent } from "../kafka/publishIntent.js";
import { classifyIntent } from "../openai/classifyIntent.js"

export const handleIntentPublish = async (event : any) => {
    const intent = await classifyIntent(event.query);
    console.log("Intent : " + intent)
    const intentItem = await saveIntent(event, intent);
    console.log(intentItem);
    await publishIntent(intentItem);
}