<script>
	import { goto } from '$app/navigation';
  
	let sentence = '';
  
	// Generer en tilfeldig ID (eksempel med enkel tilfeldig streng)
	// function generateRandomId(length = 24) {
	//   const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	//   let result = '';
	//   for (let i = 0; i < length; i++) {
	// 	result += chars.charAt(Math.floor(Math.random() * chars.length));
	//   }
	//   return result;
	// }
  
	function generateLink() {
	  // Kod setningen i URL-en som en query-parameter
	  const encodedSentence = encodeURIComponent(sentence);
	  const newUrl = `/festivalente.no/${encodedSentence}`;
	  // Naviger til den nye siden (eller vis lenken)
	  goto(`/invitasjon/${encodedSentence}`);
	}
  </script>
  
  <h1>Lag en invitasjon</h1>
  <input type="text" bind:value={sentence} placeholder="Jeg inviterer deg.."/>
  <button on:click={generateLink}>Generer invitasjonslenke</button>