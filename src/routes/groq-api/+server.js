import { Groq } from 'groq-sdk';
import systemContent from '/src/lib/systemContent.txt?raw';

function getFormattedDateTime() {
  const now = new Date();

  // Dager og måneder som tekst
  const måneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

  const dag = now.getDate();
  const måned = måneder[now.getMonth()];
  const år = now.getFullYear();
  const timer = String(now.getHours()).padStart(2, '0');
  const minutter = String(now.getMinutes()).padStart(2, '0');

  return `${dag}. ${måned} ${år}, ${timer}:${minutter}`;
}

const groq = new Groq({ apiKey: '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' });

export async function POST({ request }) {
  const { user_input } = await request.json();
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: `${systemContent} Dato og tid nå: ${getFormattedDateTime()}` },
        { role: 'user', content: user_input }
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.1,
      max_completion_tokens: 32768,
      top_p: 0.95,
      stream: false,
      stop: null
    });
    let response = chatCompletion.choices[0].message.content;
    response = response.replace(/<think>.*?<\/think>/gs, '').trim();
    console.log('AI response before sending:', response);
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