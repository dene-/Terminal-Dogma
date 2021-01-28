<script>
    export let files;

    let input;
</script>

<div class="hex mt10 mb10" on:click={() => input.click()}>
    <div class="btn">Select a photo</div>
    <div class="pattern">
    </div>
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
        display: flex;
        justify-content: center;
        align-items: center;
        
        position: relative;
        cursor: pointer;
        text-align: center;
        width: 100%;
        height: 300px;
    }

    .pattern {
        width: 100%;
        height: 100%;
        background-image: url('/pattern.svg');
        background-size: 25%;
        animation: bgchange 100s linear infinite alternate-reverse;
        filter: drop-shadow(0px 0px 10px rgba(255, 0, 0, 0.7));
    }

    @keyframes bgchange {
        to {
            background-position-x: 200%;
        }
    }
    
    .hex .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        width: 80%;
        background-color: rgb(7, 7, 7);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 3vw;
        position: absolute;
        z-index: 1;
        user-select: none;
        filter: none;
    }
</style>
