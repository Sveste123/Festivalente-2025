import { Groq } from 'groq-sdk';
import systemContent from '/src/lib/systemContent.txt?raw';

const groq = new Groq({ apiKey: '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' });

export async function POST({ request }) {
  const { user_input } = await request.json();
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: user_input }
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.6,
      max_completion_tokens: 32768,
      top_p: 0.95,
      stream: false,
      stop: null
    });
    let response = chatCompletion.choices[0].message.content;
    response = response.replace(/<think>.*?<\/think>/gs, '').trim();
    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}