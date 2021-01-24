<script>
    import { fade } from 'svelte/transition';

    export let loading;

    let hexHeight = '130px';
    let text = '"LOADING"';

    let innerHeight;
    let innerWidth;
    let loader;
    let count = [];

    // Calculates how many hexagons fit the screen, kind of
    $: if (innerWidth && innerHeight) {
        let hexHeightPixel = parseInt(hexHeight);
        let hexWidthPixel = Math.floor((hexHeightPixel * 86.6) / 100);
        count = Array(
            Math.floor(((innerHeight / hexWidthPixel) * (innerWidth / hexHeightPixel)) / 2)
        );
    }

    // Reacts when the loader div is binded
    $: if (loader) {
        let time = innerHeight / 40;
        let opacity = 1;
        let processed = 0;

        // Processes the animation
        let process = () => {
            Array.prototype.slice
                .call(loader.querySelectorAll('.hex'), 0)
                .sort((a, b) => Math.random() - 0.5 /* by rows a.offsetHeight > b.offsetHeight */)
                .forEach((el, index, array) => {
                    setTimeout(() => {
                        el.style.opacity = opacity;
                        processed++;

                        // When we iterated all the array we execute the process funcion again
                        if (processed === array.length) {
                            processed = 0;
                            opacity = opacity === 1 ? 0 : 1;
                            process();
                        }
                    }, time * index);
                });
        };
        // Timeout to execute the process funcion after count array has values
        // Works for some reason, angularjs flashbacks
        setTimeout(() => process());
    }
</script>

<svelte:window bind:innerHeight bind:innerWidth />

{#if loading}
    <div id="grid">
        <div
            class="loader"
            style="--hex-height: {hexHeight};"
            transition:fade={{ duration: 500 }}
            bind:this={loader}
        >
            {#each count as _, i}
                <div class="pair" style="--text: {Math.random() - 0.5 > 0 ? text : '"EMERGENCY"'}">
                    <div class="hex" />
                    <div class="hex" />
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .loader {
        --separation: 10px;
        --hex-width: calc(var(--hex-height) * 100 / 86.6);
        --hex-small: calc(var(--hex-width) * 25 / 100);
        --half-separation: calc(var(--separation) / 2);
        --half-height: calc(var(--hex-height) / 2);
        --half-width: calc(var(--hex-width) / 2);
    }

    .loader {
        background-color: rgb(7, 7, 7);
        position: fixed;
        top: 0;
        left: calc(var(--hex-small) / 2 * -1);
        width: calc(100% + var(--hex-width) * 1.5);
        height: calc(100% + var(--hex-height));
        line-height: 1.3;
        z-index: 3;
        overflow: hidden;
    }

    .pair {
        display: inline-block;
        margin-right: calc((var(--hex-width) / 2) + var(--separation) * 2);
        margin-top: calc((var(--half-height) * -1));
    }

    .pair .hex {
        position: relative;
        opacity: 0;
        background-image: url('/hex.svg');
        background-repeat: no-repeat;
        background-size: cover;
        height: var(--hex-height);
        width: var(--hex-width);
        filter: drop-shadow(0px 0px 30px rgba(255, 0, 0, 0.7));
    }

    .pair .hex:nth-child(2) {
        transform: translateX(calc(75% + var(--separation)));
        margin-top: calc(var(--half-height) * -1 + var(--half-separation));
    }

    .pair .hex::before {
        font-family: 'Acumin Pro', Helvetica, sans-serif !important;
        position: absolute;
        color: black;
        font-weight: 800;
        font-size: calc(var(--hex-height) / 7);
        content: var(--text);

        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%) scaleY(1.5);
    }

    .pair .hex::after {
        font-family: 'Acumin Pro', Helvetica, sans-serif !important;
        position: absolute;
        color: rgba(255, 0, 0, 0.5);
        font-weight: 800;
        font-size: calc(var(--hex-height) / 7);
        content: var(--text);

        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%) scaleY(1.5);
    }
</style>
