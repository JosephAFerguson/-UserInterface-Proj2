<script>
</script>

<main>
    <br/>
    <button id='eye-button'>
        <img src="./public/eye.png" alt="Eye Icon" width="20" height="20"/>
    </button>
    <button id='info-button'>
        <img src="./public/information-button.png" alt="Info Icon" width="20" height="20"/>
    </button>
    <div style="display:flex; align-items:center; width:90%;">
        <h1>Testing UI</h1>
    </div>
    <div style="display:flex; gap:8px;">
        <button type="button" id="add">+</button>
        <p style="margin:0">Add Books</p>
    </div>
    <br/>
    <div style="display:flex; gap:8px;">
        <button type="button" id="remove">-</button>
        <p style="margin:0">Remove Books</p>
    </div>
    <br/>
    <input type="text" placeholder="Search..">
    <br/>
    <br/>
    <div style="display:flex; gap:8px;">
        <p>Sort by:</p>
        <select>
            <option>None</option>
            <option>A-Z</option>
            <option>Z-A</option>
            <option>Genre</option>
        </select>
    </div>
    <br/>
    <button>Run Simulation</button>
    <br/>
    <br/>
    <button>Go to Data Display</button>
</main>

<style>
    main {
        margin-left: 5%;
    }

    button, select {
        cursor: pointer;
    }

    #eye-button, #info-button {
        background: none;
        border: none;
    }

    #info-button {
        float: right;
        margin-right: 5%;
    }

    #add, #remove {
        border-radius: 50%;
    }
</style>