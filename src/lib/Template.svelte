<script>
  export let sentence;
</script>

<div class="template">
  <p class="overlay-text">{sentence}</p>
  <img src="/Gospel.jpg" alt="Mal" />
</div>

<style>
  .template {
    width: 100%;
    max-width: 600px;
  }
  img {
    top: 80%;
    width: 80%;
  }
  .overlay-text {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(235, 235, 0);
    -webkit-text-stroke: 0.9px red;
    font-size: 34px;
    text-align: center;
  }
</style>