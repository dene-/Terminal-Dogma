<script>
    export let files;

    let input;
</script>

<div class="hex mt10 mb10" on:click={() => input.click()}>
    <span>Select a photo</span>
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 86.6"
        style="enable-background:new 0 0 100 86.6;"
        xml:space="preserve">
        <polygon points="75,0 25,0 0,43.3 25,86.6 75,86.6 100,43.3 " />
    </svg>
</div>
<input
    type="file"
    name="file"
    bind:this={input}
    bind:files={files}
    id="fileInput"
    accept="image/*"
    multiple="false"
/>

<style>
    input {
        display: none;
    }

    .hex {
        position: relative;
        cursor: pointer;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hex::after {
        content: " ";
        display: block;
        width: 100vw;
        transform: translateX(-50%);
        transform-origin: center;
        top: 0;
        height: 5px;
        position: absolute;
        background: red;
        box-shadow: 0px 0px 20px rgba(255, 0, 0, .5);
    }

    .hex::before {
        content: " ";
        display: block;
        width: 100vw;
        transform: translateX(50%);
        transform-origin: center;
        bottom: 0;
        height: 5px;
        position: absolute;
        background: red;
        box-shadow: 0px 0px 20px rgba(255, 0, 0, .5);
    }
    
    .hex span {
        color: rgb(27, 27, 27);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 5vw;
        position: absolute;
        z-index: 1;
    }

    .hex svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0px 0px 20px rgba(255, 0, 0, 0.5));
    }

    .hex svg polygon {
        fill: red;
    }
</style>
