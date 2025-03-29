import { writable } from 'svelte/store';
import { Groq } from 'groq-sdk';

export const groqClient = writable(null);

if (import.meta.env.VITE_GROQ_API_KEY) {
    groqClient.set(new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY }));
} else {
    console.error("GROQ_API_KEY is not set!");
}

console.log("Groq API Key:", import.meta.env.VITE_GROQ_API_KEY);
