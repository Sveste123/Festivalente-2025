<script lang="ts">
    import { onMount } from "svelte";

    function previousButton(e: Event){
        console.log("previousButton is clicked");
        const scroller = document.querySelector('.insta-scroller');
        const itemWidth = scroller.firstElementChild.offsetWidth;
        scroller.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        showIndicatorFalse;
    }

    function nextButton(e: Event){
        console.log("nextButton is clicked");
        const scroller = document.querySelector('.insta-scroller');
        const itemWidth = scroller.firstElementChild.offsetWidth;
        scroller.scrollBy({ left: itemWidth, behavior: 'smooth' });
        showIndicatorFalse;
    }
    
    let showIndicator = true; // Bruker en tilstand for å styre synlighet

    function showIndicatorFalse(e: Event){
        showIndicator = false;
    }

    //BUTTON WITH CHANGING COLORS

    let scroller;
    let scrollPercent = 0; // Verdi mellom 0 og 1

    // Denne reaktive deklarasjonen oppdaterer knappens farge hver gang scrollPercent endres.
    $: buttonColor = getButtonColor(scrollPercent);
    $: textColor = getButtonColor(scrollPercent);

    function updateScroll() {
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    scrollPercent = maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0;
    }

    // Funksjonen returnerer ulike hex-koder basert på scroll-prosenten.
    function getButtonColor(percent) {
        // console.log(percent);
        if (percent < 0.25) {
            return "#ff0000"; // For eksempel rød
        } else if (percent < 0.50) {
            return "#00ff00"; // For eksempel grønn
        } else if (percent < 0.75) {
            return "#0000ff"; // For eksempel grønn
        } else if (percent <= 1) {
            return "#ff00f0"; // For eksempel grønn
        } else {
            return "#3357FF"; // For eksempel blå
        }
    }

    onMount(() => {
    if (scroller) {
        scroller.addEventListener("scroll", updateScroll);
        updateScroll(); // Sett initial farge
    }
    });
</script>

<div class="fixed-page-container">
    <h1>Oversikt over konserter</h1>
    <ul>
        <li>Trykk på plakatene for å lese mer</li>
    </ul>
</div>

<div class="insta-scroller-container">
  {#if showIndicator}
      <img alt="Finger" class="scrollhand" src="/scrollhand.png"/>
  {/if}
    <button class="scroll-button left-button" aria-label="Scroll left" on:click={previousButton}>&#9664;</button>
        <div class="insta-scroller-tag" on:scroll={showIndicatorFalse}>
            <div class="insta-item">
                <!-- <button class="scroll-status" style="background-color: {buttonColor}">
                    Inviter
                </button> -->
            </div>
        </div>
        <div class="insta-scroller" on:scroll={showIndicatorFalse} bind:this={scroller}>
            <div class="insta-item">
                <a href="https://www.instagram.com/festivalente2025/p/DHETWXdiJRX/">
                    <div class="cover-item">
                        <img alt="Klassisk" src="/Molto_Maestoso.jpg"
                        />
                    </div>
                </a>
            </div>
            <div class="insta-item">
                <a href="https://www.instagram.com/festivalente2025/p/DHBbEhNCGQz/">
                    <div class="cover-item">
                        <img alt="Blås" src="/Blowin.jpg"
                        />
                    </div>
                </a>
            </div>
            <div class="insta-item">
                <a href="https://www.instagram.com/festivalente2025/p/DHBbF6gikzm/">
                    <div class="cover-item">
                        <img alt="Country" src="/Route66.jpg"
                        />
                    </div>
                </a>
            </div>
            <div class="insta-item">
                <a href="https://www.instagram.com/festivalente2025/p/DHBbJfiiQk8/">
                    <div class="cover-item">
                        <img alt="Gospel" src="/Gospel.jpg"
                        />
                    </div>
                </a>
            </div>
        </div>
    <button class="scroll-button right-button" aria-label="Scroll right" on:click={nextButton}>&#9654;</button>
</div>