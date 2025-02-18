<script lang="ts">
    function previousButton(e: Event){
        console.log("previousButton is clicked");
        const scroller = document.querySelector('.insta-scroller');
        const itemWidth = scroller.firstElementChild.offsetWidth;
        scroller.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        showIndicator = false;
    }

    function nextButton(e: Event){
        const scroller = document.querySelector('.insta-scroller');
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
    <a href="https://facebook.com/snilerevyen" target="_blank" style="width:74px;height:74px">
        <svg viewBox="0 0 45 45" style="width:74px;height:74px">
            <path fill="#ffffff" d="M44.506 22.23C44.506 9.951 34.543 0 22.253 0 9.963 0 0 9.952 0 22.23c0 11.094 8.138 20.29 18.776 21.958V28.655h-5.65V22.23h5.65v-4.897c0-5.571 3.322-8.649 8.405-8.649 2.435 0 4.981.435 4.981.435v5.47h-2.806c-2.764 0-3.626 1.714-3.626 3.472v4.17h6.172l-.987 6.425H25.73V44.19c10.638-1.668 18.776-10.864 18.776-21.96">
            </path>
        </svg>
    </a>
    <a href="https://instagram.com/snilerevyen?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw==" target="_blank" style="width:74px;height:74px">
        <svg viewBox="0 0 43 43" style="width:74px;height:74px">
            <defs>
                <path id="instagram_regular_light_svg__a" d="M.049 12.263C.049 5.506 5.524.028 12.28.028h18.15c6.754 0 12.23 5.478 12.23 12.235V30.19c0 6.757-5.475 12.234-12.23 12.234H12.28C5.525 42.424.05 36.946.05 30.19V12.263zm3.945 0V30.19a8.287 8.287 0 008.286 8.287h18.15a8.286 8.286 0 008.285-8.287V12.263a8.287 8.287 0 00-8.285-8.288H12.28a8.286 8.286 0 00-8.286 8.288zm17.417 20.351c-6.195 0-11.217-5.023-11.217-11.219s5.022-11.219 11.217-11.219c6.194 0 11.216 5.023 11.216 11.22 0 6.195-5.022 11.218-11.216 11.218zm0-3.946a7.272 7.272 0 007.27-7.273 7.272 7.272 0 10-14.541 0 7.272 7.272 0 007.27 7.273zM32.74 12.6a2.706 2.706 0 110-5.411 2.706 2.706 0 010 5.411z">
                </path>
            </defs>
            <use fill="#ffffff" xlink:href="#instagram_regular_light_svg__a">
            </use>
        </svg>
    </a>        
    <a href="https://youtube.com/@snilerevyen?si=egLiXxFl2teC1lCe" target="_blank" style="width:74px;height:74px">
        <svg viewBox="0 0 48 34" style="width:74px;height:74px">
            <path fill="#ffffff" d="M46.724 7.168s.47 3.828.48 7.647v3.58c0 3.828-.471 7.647-.471 7.647s-.46 3.257-1.88 4.687c-1.799 1.881-3.808 1.89-4.73 2.001-6.601.47-16.521.49-16.521.49s-12.271-.111-16.051-.471c-1.051-.203-3.411-.139-5.21-2.02-1.41-1.43-1.87-4.687-1.87-4.687S0 22.214 0 18.395v-3.58c0-3.828.47-7.647.47-7.647S.922 3.91 2.342 2.482C4.14.6 6.149.59 7.072.48 13.671 0 23.582 0 23.582 0h.019s9.91 0 16.512.48c.921.11 2.931.12 4.729 2.002 1.42 1.43 1.88 4.686 1.88 4.686zM18.715 22.74l12.75-6.615-12.75-6.66V22.74z">
            </path>
        </svg>
    </a>
</div> 

<div class="insta-scroller-tag" on:scroll={showIndicatorFalse}>
    <div class="insta-item-tag">
            <div class="snilerevyen-instagram">
                <img alt="1" src="/snilerevyen-instagram.png"
                />
            </div>
    </div>
</div>

<div class="insta-scroller-container">
    {#if showIndicator}
        <img alt="Finger" class="scrollhand" src="/scrollhand.png"/>
    {/if}
    <button class="scroll-button left-button" aria-label="Scroll left" on:click={previousButton}>&#9664;</button>
    <div class="insta-scroller" on:scroll={showIndicatorFalse}>

        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/reel/DEdFHiPsmzv/">
                <div class="cover-item-nedtelling">
                    <img alt="1" src="/sofakos.jpg"
                    />
                </div>
            </a>
        </div>

        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVN2_HtYLZ/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==">
                <div class="cover-item">
                    <img alt="1" src="/image1.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVN2_HtYLZ/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <div class="cover-item">
                    <img alt="2" src="/image2.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVN2_HtYLZ/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <div class="cover-item">
                    <img alt="3" src="/image3.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVN2_HtYLZ/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <div class="cover-item">
                    <img alt="4" src="/image4.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVN2_HtYLZ/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <div class="cover-item">
                    <img alt="5" src="/image5.jpg"
                    />
                </div>
            </a>
        </div>


        
        <div class="insta-item">
            <a href="https://www.instagram.com/p/DEVGHuENbVS/">
                <div class="cover-item-nedtelling">
                    <img alt="1" src="/nedtelling1.jpg"
                    />
                </div>
            </a>
        </div>
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DESTOHItuEA/">
                <div class="cover-item-nedtelling">
                    <img alt="2" src="/nedtelling2.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DEPaBy8tAYO/">
                <div class="cover-item-nedtelling">
                    <img alt="3" src="/nedtelling3.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DEM7uRotzaL/">
                <div class="cover-item-nedtelling">
                    <img alt="4" src="/nedtelling4.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DEKiB6pNwnu/">
                <div class="cover-item-nedtelling">
                    <img alt="5" src="/nedtelling5.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DEH7AO3tA-7/">
                <div class="cover-item-nedtelling">
                    <img alt="6" src="/nedtelling6.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DEE-5nhtE_w/">
                <div class="cover-item-nedtelling">
                    <img alt="7" src="/nedtelling7.jpg"
                    />
                </div>
            </a>
        </div>        
        <div class="insta-item">
            <a href="https://www.instagram.com/snilerevyen/p/DECuDMSNxBm/">
                <div class="cover-item-nedtelling">
                    <img alt="8" src="/nedtelling8.jpg"
                    />
                </div>
            </a>
        </div>
    </div>
    <button class="scroll-button right-button" aria-label="Scroll right" on:click={nextButton}>&#9654;</button>
</div>
