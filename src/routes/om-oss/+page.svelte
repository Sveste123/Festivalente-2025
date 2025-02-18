<script lang="ts">
    function previousButton(e: Event){
        console.log("previousButton is clicked");
        const scroller = document.querySelector('.youtube-scroller');
        const itemWidth = scroller.firstElementChild.offsetWidth;
        scroller.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        showIndicator = false;
    }

    function nextButton(e: Event){
        const scroller = document.querySelector('.youtube-scroller');
        const itemWidth = scroller.firstElementChild.offsetWidth;
        scroller.scrollBy({ left: itemWidth, behavior: 'smooth' });
        showIndicator = false;
    }
    
    let showIndicator = true; // Bruker en tilstand for å styre synlighet

    function showIndicatorFalse(e: Event){
        showIndicator = false;
    }
</script>


<div class="fixed-page-container">
    <div class="page-container">
        <h1>Hvem er vi?</h1>
        <p><strong>Vi er skolerevyen ved Lillestrøm videregående skole. Revyen er helt elevstyrt og har vært det helt siden den ble startet.</strong></p>
    </div>
</div>

<div class="youtube-scroller-container">
    {#if showIndicator}
        <img alt="Finger" class="scrollhand" src="/scrollhand.png"/>
    {/if}
    <button class="scroll-button left-button" aria-label="Scroll left" on:click={previousButton}>&#9664;</button>
    <div class="youtube-scroller" on:scroll={showIndicatorFalse}>
        <div class="youtube-item">
            <iframe
                title="Video 1"
                src="https://www.youtube.com/embed/KV9tyDtX304"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 2"
                src="https://www.youtube.com/embed/DAGYyxnpMB0?si=XPONuGmsKH3qNzFH&amp;start=93"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 3"
                src="https://www.youtube.com/embed/2fYC9juFc_w?si=2AV4QIVWp2WNYnPK"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 4"
                src="https://www.youtube.com/embed/s7GUdvgOoBw?si=-2H1O6nTgp8c5IgL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 5"
                src="https://www.youtube.com/embed/34DaGtQ00Uc?si=prVdGH5aERRMBqGv"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 6"
                src="https://www.youtube.com/embed/2fVGdzQer5E?si=VgejqQeOcPgDhOfL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 7"
                src="https://www.youtube.com/embed/WnnpH-FyH8w?si=-aFxx77VipOZ0Eab"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 8"
                src="https://www.youtube.com/embed/ROsvgcgg8vI?si=vREllk12rCgfXjQc"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 9"
                src="https://www.youtube.com/embed/BG3uTOiiL7M?si=owF3CONcgS_fzJfu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <iframe
                title="Video 10"
                src="https://www.youtube.com/embed/V-ckvXu-_HE?si=n-w_NBHDBgsypv4j"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="youtube-item">
            <a href="https://www.youtube.com/watch?v=V-ckvXu-_HE&t=8s">
                <div class="cover-item">
                    <img alt="2014" src="./Snilerevyen 2014.png" />
                </div>
            </a>
        </div>
    </div>
    <button class="scroll-button right-button" aria-label="Scroll right" on:click={nextButton}>&#9654;</button>
</div>
