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

<div class="insta-scroller-tag" on:scroll={showIndicatorFalse}>
  <div class="insta-item-tag">
          <div class="snilerevyen-instagram">
              <img alt="" src=""
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
