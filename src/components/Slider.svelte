<script>
    import { fade } from 'svelte/transition';

    export let value, name, min, max;

    let slider, nameWrapper;

    $: if (value && slider && nameWrapper) {
        const val = slider.value;
        const min = slider.min ? slider.min : 0;
        const max = slider.max ? slider.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        let newPos = 50 - newVal * 0.2;
        nameWrapper.style.left = `calc(${newVal}% + (${newPos}px))`;
    }
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<div class="wrapper mt10 mb10">
    <div class="counter">
        {#each Array(value) as _, i}
            <div class="square" transition:fade={{ duration: 100 }}>
                {#if name === 'scale' && value === 1}
                    No
                {:else if name === 'noise' && value === 0}
                    No
                {:else}
                    {value}
                {/if}
            </div>
        {/each}
        {#if value === 0}
            <span class="cero" transition:fade={{ duration: 100 }}>0</span>
        {/if}
    </div>
    <div class="rangeSlider">
        <div class="name" bind:this={nameWrapper}>
            {#if name === 'scale'}
                <svg
                    enable-background="new 0 0 100 100"
                    version="1.1"
                    viewBox="0 0 100 100"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m13.66 52.86c2.47 4.44 3.71 10.94 3.71 19.47 0 8.54-0.81 15.37-2.42 20.5-1.51 4.79-3.61 7.17-6.29 7.17-2.58 0-4.57-2.22-5.97-6.66-1.73-5.46-2.59-11.96-2.59-19.47v-5.12h3.71v4.61c0 5.47 0.43 9.57 1.29 12.3 0.86 2.74 1.94 4.1 3.23 4.1 1.72 0 3.01-1.36 3.87-4.1 0.97-3.07 1.45-7 1.45-11.78 0-5.12-0.75-9.22-2.26-12.3-2.68-5.47-5.21-11.28-7.58-17.43-1.72-4.44-2.64-10.42-2.74-17.93-0.11-7.52 0.7-13.84 2.42-18.97 1.61-4.78 3.39-7.17 5.33-7.17 2.37 0 4.2 2.05 5.49 6.15 1.61 5.12 2.37 12.3 2.26 21.52h-3.71c0.21-5.8-0.22-10.42-1.29-13.84-0.75-2.39-1.67-3.59-2.74-3.59-1.08 0-1.99 1.2-2.74 3.59-0.97 3.07-1.45 6.66-1.45 10.76 0 4.44 0.75 8.71 2.26 12.81 2.24 6.16 4.5 11.28 6.76 15.38z"
                    />
                    <path
                        d="m35.44 92.83c-1.51 4.79-3.28 7.17-5.33 7.17-2.04 0-3.82-2.39-5.33-7.17-2.69-8.53-4.03-21.86-4.03-39.97 0-21.18 1.45-36.38 4.36-45.6 1.51-4.78 3.23-7.17 5.16-7.17 2.04 0 3.66 1.88 4.84 5.64 2.26 7.17 3.33 16.91 3.23 29.21h-3.54c-0.11-10.94-0.75-18.29-1.94-22.05-0.65-2.05-1.51-3.07-2.58-3.07-0.97 0-1.83 1.2-2.58 3.59-2.15 6.84-3.23 19.65-3.23 38.43 0 16.4 0.91 27.5 2.74 33.31 0.86 2.74 1.83 4.1 2.9 4.1 0.97 0 1.88-1.36 2.74-4.1 1.07-3.41 1.67-11.27 1.78-23.57h3.87c-0.31 15.36-1.34 25.79-3.06 31.25z"
                    />
                    <path
                        d="m44.32 100h-3.87l8.07-99.92h3.23l8.06 99.92h-3.87l-2.26-29.21h-7.1l-2.26 29.21zm5.97-72.76h-0.32l-2.58 33.82h5.49l-2.59-33.82z"
                    />
                    <path d="M62.56,0.08h3.71v90.18h13.07V100H62.56V0.08z" />
                    <path
                        d="M87.25,42.1h10.98v9.74H87.25v38.43H100V100H83.54V0.08h15.66v9.74H87.25V42.1z"
                    />
                </svg>
            {:else if name === 'noise'}
                <svg
                    enable-background="new 0 0 100 100"
                    version="1.1"
                    viewBox="0 0 100 100"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.83,0v100H12.3L3.88,25.13H3.72V100H0V0h4.53l8.41,74.87h0.16V0H16.83z"
                    />
                    <path
                        d="m38.19 49.74c0 21.54-1.19 36.07-3.56 43.59-1.4 4.45-3.18 6.67-5.34 6.67-2.27 0-4.1-2.22-5.5-6.67-2.37-7.52-3.56-22.05-3.56-43.59 0-21.19 1.19-35.55 3.56-43.08 1.4-4.43 3.23-6.66 5.5-6.66 2.16 0 3.94 2.23 5.34 6.67 2.37 7.52 3.56 21.88 3.56 43.07zm-14.24 0c0 19.49 0.7 31.46 2.1 35.9 0.97 3.08 2.05 4.62 3.24 4.62 1.08 0 2.1-1.54 3.07-4.62 1.4-4.44 2.1-16.41 2.1-35.9 0-19.14-0.7-30.94-2.1-35.38-0.97-3.08-2-4.62-3.07-4.62-1.19 0-2.27 1.54-3.24 4.62-1.4 4.45-2.1 16.24-2.1 35.38z"
                    />
                    <path
                        d="M51.78,88.72h1.78V100h-7.28V88.72h1.78V11.28h-1.78V0h7.28v11.28h-1.78V88.72z"
                    />
                    <path
                        d="m75.57 52.82c2.48 4.45 3.72 10.94 3.72 19.49s-0.81 15.39-2.43 20.51c-1.51 4.79-3.62 7.18-6.31 7.18-2.59 0-4.59-2.22-5.99-6.67-1.73-5.46-2.59-11.96-2.59-19.49v-5.13h3.72v4.62c0 5.47 0.43 9.58 1.29 12.31 0.86 2.74 1.94 4.1 3.24 4.1 1.72 0 3.02-1.36 3.88-4.1 0.97-3.08 1.46-7 1.46-11.79 0-5.13-0.76-9.23-2.27-12.31-2.7-5.46-5.23-11.28-7.6-17.44-1.73-4.44-2.64-10.42-2.75-17.95-0.11-7.52 0.7-13.85 2.43-18.97 1.62-4.78 3.4-7.18 5.34-7.18 2.37 0 4.21 2.05 5.5 6.15 1.62 5.13 2.37 12.31 2.27 21.54h-3.72c0.21-5.81-0.22-10.42-1.29-13.85-0.76-2.39-1.67-3.59-2.75-3.59s-2 1.2-2.75 3.59c-0.97 3.08-1.46 6.67-1.46 10.77 0 4.45 0.75 8.72 2.27 12.82 2.26 6.16 4.52 11.29 6.79 15.39z"
                    />
                    <path
                        d="M87.22,42.05h11v9.74h-11v38.46H100V100H83.5V0h15.7v9.74H87.22V42.05z"
                    />
                </svg>
            {/if}
        </div>
        <input bind:this={slider} type="range" class="slider" {name} {min} {max} bind:value />
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    :root {
        --height: 60px;
    }

    .counter {
        position: relative;
        width: var(--height);
        height: var(--height);
        background: #491616;
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        margin-right: 20px;
    }

    .counter .cero {
        font-size: calc(var(--height) / 2);
        font-weight: bold;
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        line-height: var(--height);
    }

    .counter .square {
        box-sizing: border-box;
        width: calc(var(--height) / 2);
        height: calc(var(--height) / 2);
        background: red;
        color: rgb(27, 27, 27);
        flex-shrink: 0;
        padding: 2px;
        font-weight: bold;
        box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
    }

    .rangeSlider {
        position: relative;
        width: 100%;
    }

    .rangeSlider .name {
        pointer-events: none;
        box-sizing: border-box;
        padding: 5px;
        position: absolute;
        width: var(--height);
        height: var(--height);
        display: none;
    }

    .counter .name svg {
        width: 90px;
        height: 90px;
    }

    .counter .name svg path {
        fill: rgb(27, 27, 27);
    }

    input[type='range'].slider {
        width: 100%;
        margin: 0 0;
        background-color: transparent;
        -webkit-appearance: none;
    }

    input[type='range'].slider:focus {
        outline: none;
    }

    input[type='range'].slider::-webkit-slider-runnable-track {
        background: #491616;
        border: 0;
        width: 70%;
        height: var(--height);
        cursor: pointer;
    }

    input[type='range'].slider::-webkit-slider-thumb {
        margin-top: 0px;
        width: var(--height);
        height: var(--height);
        background: #ff0000;
        border: 0px solid rgba(0, 0, 0, 0);
        border: 0;
        cursor: pointer;
        -webkit-appearance: none;
        box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
    }

    input[type='range'].slider::-moz-range-track {
        background: #491616;
        border: 0;
        width: 100%;
        height: var(--height);
        cursor: pointer;
    }

    input[type='range'].slider::-moz-range-thumb {
        width: var(--height);
        height: var(--height);
        background: #ff0000;
        border: 0px solid rgba(0, 0, 0, 0);
        border: 0;
        cursor: pointer;
    }

    input[type='range'].slider::-ms-track {
        background: transparent;
        border-color: transparent;
        border-width: 0.8px 0;
        color: transparent;
        width: 100%;
        height: var(--height);
        cursor: pointer;
    }

    input[type='range'].slider::-ms-fill-lower {
        background: #e60000;
        border: 0;
    }

    input[type='range'].slider::-ms-fill-upper {
        background: #491616;
        border: 0;
    }

    input[type='range'].slider::-ms-thumb {
        width: var(--height);
        height: var(--height);
        background: #ff0000;
        border: 0px solid rgba(0, 0, 0, 0);
        border: 0;
        cursor: pointer;
        margin-top: 0px;
        /*Needed to keep the Edge thumb centred*/
    }

    input[type='range'].slider:focus::-ms-fill-lower {
        background: #491616;
    }

    input[type='range'].slider:focus::-ms-fill-upper {
        background: #ff1a1a;
    }

    /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
    @supports (-ms-ime-align: auto) {
        /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
        input[type='range'].slider {
            margin: 0;
            /*Edge starts the margin from the thumb, not the track as other browsers do*/
        }
    }
</style>
