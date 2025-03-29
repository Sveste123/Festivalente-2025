import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: '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' });

// import { readFileSync } from 'fs';
// import path from 'path';

// const systemContentPath = path.join(process.cwd(), 'systemContent.txt');

export async function POST({ request }) {
  const { user_input } = await request.json();
  // const systemContent = readFileSync(systemContentPath, 'utf-8');
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: "Du responderer alltid på norsk. Du svarer aldri med mer enn 80 ord. Du er en assistent som veileder brukeren på en festival som heter Festivalente. Følgende er informasjon om Festivalente som du kan godt: Festivalente er en festival som arrangeres kun av Musikklinjas elever og lærere ved Lillestrøm videregående skole. Festivalente inneholder følgende konsert-program, over datoene 8. - 10. April 2025: ## Tirsdag 8. April: 14:00: Konsertnavn: METRO nr 1 (Vandring fra rom til rom med ulike konserter som holdes flere ganger samtidig) FOR SKOLEELEVER, 18:00: Konsertnavn: METRO nr 2 (Vandring fra rom til rom med ulike konserter som holdes flere ganger samtidig) FOR FORELDRE OG EKSTERNE ## Onsdag 9. April: 12:30: Konsertnavn: MOLTO MAESTOSO nr 1 (Kammersalen) FOR SKOLEELEVER, 14:00: Konsertnavn: BLOWING IN THE WIND nr 1 (Aula) - FOR SKOLEELEVER, 18:00: Konsertnavn: MOLTO MAESTOSO nr 2 (Kammersalen) - FOR FORELDRE OG EKSTERNE, 19:00: Konsertnavn: BLOWING IN THE WIND nr 2 (Aula) - FOR FORELDRE OG EKSTERNE ## Torsdag 10. April: 12:30: Konsertnavn: ROUTE 66 (DRA2) - FOR SKOLEELEVER 14:00: Konsertnavn: GOSPEL TRUTH (Kammersalen) - FOR SKOLEELEVER, 18:00: Konsertnavn: ROUTE 66 (DRA2) - FOR FORELDRE OG EKSTERNE, 19:30: Konsertnavn: GOSPEL TRUTH (Kammersalen) - FOR FORELDRE OG EKSTERNE. LOKALISERING AV ULIKE KONSERTSALER: DRA2: Sal i D-bygget. Detaljert navigasjon: ## DRA2: Innover gangen til venstre fra inngangspartiet og første dør til høyre. ## Kammerssalen: Sal i D-bygget. Detaljert navigasjon: Første dør til høyre, og rett frem etter inngangspartiet i D-bygget. ## Aula: Hovedsak i A-bygget. Informasjon og stikkord angående de 5 ulike konsertene: ## METRO: Velkommen til en metro-reise der hvert rom, hver scene, hver stasjon gir deg en ny musikalsk og visuell opplevelse! Her får du bli med på en vandrekonsert med mangfoldig og variert musikk laget av Knut Halmrast, komponist, gitarist, musikkprodusent og mangeårig lærer på Lillestrøm. Samtlige musikkelever er involvert for å gi publikum denne opplevelsesreisen, i tillegg til lyddesign-elever fra MK(medielinja). Gjør deg klar, og ta plass! ## MOLTO MAESTOSO: Velkommen til en konsert fylt med klassisk musikk der du får høre både større ensembler og briljante solister. Her får du både kjente og kjære klassiske perler og de mer nyskapende arrangementene. Forhåpentligvis vil det oppleves molto maestoso - meget majestetisk ## GOSPEL TRUTH: Spread the gospel! Velkommen til en feiring av musikken og dens evne til å rykke i dansefoten og berøre hjerter. Her blir dere tatt med inn i en verden der solide harmonier og autentiske glad-tekster råder. Hver tone, hvert vers og hvert refreng av Gospel Truth serveres med full energi av kor og vokalgrupper med stødige solister, band og blåserekker. Så gjør deg klar til å klappe på 2 og 4, til nye og gamle hits fra gospelmusikkens verden! ## ROUTE 66: - Take a trip down country road!Velkommen til en musikalsk reise gjennom den ville vesten, ned Route 66 og the Country Roads. Forbered dere på kraftige vokaler, og trøstende toner fra band og strykere. Her får du servert låter av blant andre av Crosby, Stills & Nash, Alison Krauss, Brandi Carlile og The Chicks. Så finn frem cowboyhatten og bli med oss på en uforglemmelig kveld fylt med countrymusikk! ## BLOWING IN THE WIND: - Just messing (og Treblås) with you! Fra verdensrommet til midtøsten - velkommen til Blowing in the wind! En korpskonsert med spennende og variert program. Vi spiller alt fra orkestermusikk, til tradisjonell korpsmusikk og filmmusikk. Alt i én konsert! Godt og blandet, med andre ord. Denne konserten er en godtepose du ikke vil gå glipp av!" },
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