<script lang="ts">
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
</script>

<div class="fixed-page-container">
    <div class="page-container">
        <h1>Oversikt over konserter</h1>
        <p><strong>Her vil det komme oversikt over konsertene som skal spilles på Festivalente</strong></p>
        <strong>(Bildene under er kun til demonstrering)</strong>
    </div>
</div>

<div class="insta-scroller-container">
  {#if showIndicator}
      <img alt="Finger" class="scrollhand" src="/scrollhand.png"/>
  {/if}
<button class="scroll-button left-button" aria-label="Scroll left" on:click={previousButton}>&#9664;</button>
    <div class="insta-scroller-tag" on:scroll={showIndicatorFalse}>
        <!-- <div class="insta-item-tag">
            <div class="festivalente-instagram">
                <img alt="1" src="/festivalente-instagram.png"
                />
            </div>
        </div> -->
    </div>
    <div class="insta-scroller" on:scroll={showIndicatorFalse}>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/iwyefgbc">
                <div class="cover-item">
                    <img alt="1" src="/Route66.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/iwyefgbc">
                <div class="cover-item">
                    <img alt="2" src="/image2.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/iwyefgbc">
                <div class="cover-item">
                    <img alt="3" src="/image3.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/iwyefgbc">
                <div class="cover-item">
                    <img alt="4" src="/image4.jpg"
                    />
                </div>
            </a>
        </div>
        <!-- <div class="insta-item">
        <a href="https://www.instagram.com/p/iwyefgbc">
                <div class="cover-item">
                    <img alt="5" src="/image5.jpg"
                    />
                </div>
            </a>
        </div> -->
    </div>
    <button class="scroll-button right-button" aria-label="Scroll right" on:click={nextButton}>&#9654;</button>
</div>
