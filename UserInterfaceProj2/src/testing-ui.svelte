<script>
</script>

<main>
    <div style="display:flex; align-items:center; width:90%;">
        <h1>Testing UI</h1>
        <button id='info-button'>i</button>
    </div>
    <button id='eye-button'>
        <img src="./public/eye.png" alt="Eye Icon" width="20" height="20"/>
    </button>
    <br/>
    <br/>
    <div style="display:flex; gap:8px;">
        <button type="button">+</button>
        <p style="margin:0">Add Books</p>
    </div>
    <br/>
    <div style="display:flex; gap:8px;">
        <button type="button">-</button>
        <p style="margin:0">Remove Books</p>
    </div>
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
    #info-button {
        margin-left: 5px;
    }
</style>