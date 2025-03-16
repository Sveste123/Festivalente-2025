<script>
  export let imageChoice;
  export let sentence;

  import App2 from "../lib/components/App2.svelte"

  // Kartlegg bildevalg til bildefiler
  const imageMap = {
    '1': '/Molto_Maestoso.jpg',
    '2': '/Blowin.jpg',
    '3': '/Route66.jpg',
    '4': '/Gospel.jpg'
  };

  // Velg bilde basert på imageChoice, fallback til Gospel.jpg
  $: selectedImage = imageMap[imageChoice] || '';
</script>

<div class="template">
  <h1>{sentence}</h1>
      <img src={selectedImage} alt="Mal" />
  <p><strong>Velkommen til Festivalente.</strong></p>
</div>

<div class="app">
  <App2 />
</div>

<style>
  .app {
    z-index: -1;
  }
  .template {
    position: relative;
    width: 100%;
    max-width: 700px;
    align-content: center;
  }
  img {
    width: 50%;
    height: auto;
    border-radius: 40px;
    overflow: hidden;
    background: transparent;
    margin-top: 5%;
    margin-bottom: 10%;
  }
  @media (max-width: 500px) {
			img {
        width: 75%;
				border-radius: 20px;
        margin-top: 10%;
			}
    }
  /* .overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  } */
</style>