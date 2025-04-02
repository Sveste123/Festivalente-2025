import { Groq } from 'groq-sdk';
import systemContent from '/src/lib/systemContent.txt?raw';
import systemContent_csv from '/src/lib/systemContent.csv?raw';
import ansvar_csv from '/src/lib/ansvar.csv?raw';

// Parse CSV
const lines = systemContent_csv.split('\n');
const days = lines[0].split(';').slice(1).map(day => day.trim()); // ["Mandag 07.04", "Tirsdag 08.04", ...]
const schedule = {};
let currentTime = null;

for (let i = 2; i < lines.length; i++) { // Hopper over overskrift og undertittel
  if (lines[i].startsWith('Fargekoder')) break; // Stopper ved metadata
  const row = lines[i].split(';').map(cell => cell.trim());
  if (row[0] !== '') {
    currentTime = row[0]; // Oppdater tidspunkt hvis ikke tom
  }
  for (let j = 1; j < row.length; j++) {
    const day = days[j - 1];
    const activity = row[j];
    if (activity !== '') {
      if (!schedule[day]) schedule[day] = {};
      if (!schedule[day][currentTime]) schedule[day][currentTime] = [];
      schedule[day][currentTime].push(activity);
    }
  }
}

// Generer tekstlig representasjon
let scheduleText = '';
for (const day of days) {
  scheduleText += `**Dato: ${day}**\n`;
  if (schedule[day]) {
    for (const time in schedule[day]) {
      const activities = schedule[day][time].join(', ');
      scheduleText += `- Tid: ${time}, Aktiviteter: ${activities}\n`;
    }
  }
  scheduleText += '\n';
}


// Parse ansvar.CSV (som vist over)
const linesAnsvar = ansvar_csv.split('\n');
const headersAnsvar = linesAnsvar[0].split(';').map(header => header.trim());
const responsibilities = [];

for (let i = 1; i < linesAnsvar.length; i++) {
  const row = linesAnsvar[i].split(';').map(cell => cell.trim());
  const entry = {};
  headersAnsvar.forEach((header, index) => {
    entry[header] = row[index] || '';
  });
  responsibilities.push(entry);
}

let responsibilitiesText = '**Ansvarsfordeling:**\n';
responsibilities.forEach(entry => {
  if (entry['OMRÅDE'] || entry['SJEF/HOVEDANSVARLIG/ELEV-ANSVARLIG']) {
    responsibilitiesText += `- Område: ${entry['OMRÅDE'] || 'N/A'}\n`;
    if (entry['ROM']) responsibilitiesText += `  - Rom: ${entry['ROM']}\n`;
    if (entry['Ansvarlig lærer']) responsibilitiesText += `  - Ansvarlig lærer: ${entry['Ansvarlig lærer']}\n`;
    if (entry['SJEF/HOVEDANSVARLIG/ELEV-ANSVARLIG']) {
      responsibilitiesText += `  - Sjef/Hovedansvarlig: ${entry['SJEF/HOVEDANSVARLIG/ELEV-ANSVARLIG']}\n`;
    }
    responsibilitiesText += '\n';
  }
});

console.log(scheduleText, responsibilitiesText);

//KLOKKE OG DATO
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
  const { user_input, chatHistory } = await request.json();  // Hent chatHistory

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: `${systemContent} Dato og tid nå: ${getFormattedDateTime()} Her er timeplanen over hele Festivalente:\n${scheduleText}\n VÆR OBMERKSOM PÅ AT TIDSPUNKTENE I TIMEPLANEN IKKE ALLTID STÅR I KRONOLOGISK REKKEFØLGE, SORTER DEM LOGISK; FEKS: 08:10-09:50 VIL SI AT DU PLASSERER DEN TIDLIGST\nHer er ansvarsfordelingen for Festivalente-produksjonen:\n${responsibilitiesText}\n` },
        ...chatHistory,  // Bruk historikken fra frontend
        { role: 'user', content: user_input }  // Legg til siste brukerinput
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
    console.error('Feil i backend:', error);  // Logg hele feilmeldingen
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
