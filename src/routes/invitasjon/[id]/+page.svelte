<script>
  import { page } from '$app/stores';
  import Template from '$lib/Template.svelte';

  // Samme tegnsett som i krypteringen
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå0123456789";
  const charsetArray = charset.split('');

  // Dekrypteringsfunksjon
  function decrypt(text, shift = 3) {
    return text.split('').map(char => {
      // Hvis tegnet ikke er i charset (f.eks. mellomrom eller emoji), behold det
      if (!charsetArray.includes(char)) return char;

      // Reverser Cæsar-forskyvningen
      const index = charsetArray.indexOf(char);
      const newIndex = (index - shift + charsetArray.length) % charsetArray.length;
      return charsetArray[newIndex];
    }).join('');
  }

  // Hent kryptert melding fra URL
  $: encryptedMessage = $page.url.searchParams.get('s') || '';
  $: concert = $page.url.searchParams.get('img') || ''; // Standard til 1 hvis ikke spesifisert
  $: decryptedMessage = encryptedMessage ? decrypt(decodeURIComponent(encryptedMessage)) : '';

  async function copyToClipboard() {
    try {
      console.log($page.url.href)
      await navigator.clipboard.writeText($page.url.href);
      alert('Lenken er kopiert til utklippstavlen. Kos dere på konsert!');
    } catch (err) {
      console.error('Kunne ikke kopiere til utklippstavlen:', err);
      alert('Noe gikk galt ved kopiering.');
    }
  }

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Sjekk ut denne siden!",
          url: window.location.href
        });
      } catch (error) {
        console.error("Deling mislyktes", error);
        copyToClipboard
      }
    } else {
      copyToClipboard
    }
  };


</script>

<!-- <h1>{decryptedMessage}</h1> -->
<Template sentence={decryptedMessage} concert={concert} />

<a href={$page.url.href} on:click={sharePage}>
  <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 19.0037V8.00368H9V9.50368H7.5V17.5037H16.5V9.50368H15V8.00368H18V19.0037H6Z" fill="#1F2328"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 4.87132L9.47462 6.64669L8.41396 5.58603L12 2L15.586 5.58603L14.5254 6.64669L12.75 4.87132L12.75 12H11.25L11.25 4.87132Z" fill="#1F2328"/>
  </svg>
</a>

