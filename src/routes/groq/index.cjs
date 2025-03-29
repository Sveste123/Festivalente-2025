const fs = require('fs');
const Groq = require('groq-sdk');

export let user_input;

const systemContent = fs.readFileSync('./systemContent.txt', 'utf-8');
const groq = new Groq({ apiKey: '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' });

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
        {
        "role": "system",
        "content": systemContent
        },
        {
        "role": "user",
        "content": user_input
        }
    ],
    "model": "deepseek-r1-distill-llama-70b", /* deepseek-r1-distill-llama-70b */
    "temperature": 0.6,
    "max_completion_tokens": 32768,
    "top_p": 0.95,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }

//   console.log(chatCompletion);
}

main();