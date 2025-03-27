<script>
	import { goto } from '$app/navigation';
  
	let message = '';
	let selectedImage = 0; // Standardvalg er bilde 1
  
	// Definer tegnsettet
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå0123456789";
	const charsetArray = charset.split('');
  
	// Krypteringsfunksjon med Cæsar-chiffer
	function encrypt(text, shift = 3) {
	  return text.split('').map(char => {
		if (!charsetArray.includes(char)) return char;
		const index = charsetArray.indexOf(char);
		const newIndex = (index + shift) % charsetArray.length;
		return charsetArray[newIndex];
	  }).join('');
	}
  
	function generateLink() {
	  const encryptedMessage = encrypt(message);
	  const encodedMessage = encodeURIComponent(encryptedMessage);
	  // Legg til bildevalget som en parameter 'img' i lenken
	  const newUrl = `/invitasjon/show?s=${encodedMessage}&img=${selectedImage}`;
	  goto(newUrl);
	}
  </script>
  
  <h1>Velg konsert, og lag en helt unik invitasjon</h1>
  
  <!-- Sjekkbokser med 6 små bilder -->
  <div class="image-options">
	{#each [0, 1, 2, 3, 4] as imgNum}
	  <label class="checkbox-container">
		<input
		  type="radio"
		  name="image"
		  value={imgNum}
		  bind:group={selectedImage}
		/>
		<img src={`/thumbnail${imgNum}.jpg`} alt={`Valg ${imgNum}`} class="thumbnail" />
	  </label>
	{/each}
  </div>
  
  <input type="text" bind:value={message} placeholder="Jeg inviterer deg..." />
  <button on:click={generateLink}>Generer invitasjonslenke</button>
  
  <style>
	.checkbox-container {
		position: relative;
		cursor: pointer;
	}
	.thumbnail {
		width: 150px;
		height: 150px;
		object-fit: cover;
		border: 2px solid transparent;
	}
	input[type="radio"] {
	  display: none; /* Skjul standard radio-knapp */
	}
	input[type="radio"]:checked + .thumbnail {
	  border: 2px solid #007bff; /* Fremhev valgt bilde */
	}
  </style>