<script lang="ts">
    import App from "../lib/components/App.svelte"
    import { List, type ListOptions } from 'svelte-tweakpane-ui';
    import { Analytics } from '@vercel/analytics/next';
</script>

<div class="top-menu">
    <!-- <a href="./">Startside</a> -->
    <a href="./konserter">Konserter</a>
    <!-- <a href="./konseptvideo">Konseptvideo</a> -->
    <!-- <a href="./kontakt">Kontakt</a> -->
    <a href="./om-oss">Om oss</a>
    <a href="./billetter">Billetter</a>
    <a href="./some">SoMe</a>
</div>

<div class="page-container">
    <slot />
</div>

<div class="watermark">
    Alle rettigheter tilhører © Festivalente | Org.nr. xxx xxx xxx
</div>

<Analytics />