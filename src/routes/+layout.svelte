<script lang="ts">
    import App from "../lib/components/App.svelte"
    import { List, type ListOptions } from 'svelte-tweakpane-ui';
    import { onDestroy, onMount } from 'svelte';

    // Måldato: 8. april 2025 kl. 00:00:00
    const targetDate = new Date("2025-04-08T00:00:00").getTime();

    let countdown = getRemainingTime();

    function getRemainingTime() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    };
    }

    const interval = setInterval(() => {
    countdown = getRemainingTime();
    }, 1000);

    onDestroy(() => clearInterval(interval));

</script>

<div class="top-menu">
    <a href="../konserter">Konserter</a>
    <a href="../om-oss">Om oss</a>
    <a href="../billetter">Billetter</a>
    <a href="../some">SoMe</a>
</div>

<div class="page-container">
    <slot />
</div>

<div class="watermark">
    Alle rettigheter tilhører © Festivalente | Org.nr. xxx xxx xxx
</div>

<div class="countdown">
    Festivalente starter om: {`${countdown.days}d : ${countdown.hours}t : ${countdown.minutes}m : ${countdown.seconds}s`}
</div>