<script>
    function handleSearch(event) {
        const query = event.target.value;
        // Implement search functionality here
    }
</script>

<main>
    <div id ="data-display-panel">
        <h1>Metrics</h1>
        <p>Number of Books: </p>
        <p>Genres Available: </p>
        <p>Average Reading Time: </p>
        <p>Most Read Book: </p>
        <br/>
        <h1>Search Features</h1>
        <br/>
        <input type="text" placeholder="Search.." id="search"/>
        <br/>
        <br/>
        <div style="display: flex; gap:8px; height: 40px; align-items: center;">
            <p>Sort by:</p>
            <select>
                <option>None</option>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Genre</option>
            </select>
        </div>
    </div>
</main>

<style>
    main {
        background-color: #3e2424;
        color: white;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        box-sizing: border-box;
    }

    h1 {
        display: flex;
        justify-content: center;
    }

    p {
        margin-left: 5%;
    }

    #data-display-panel {
        height: 67%;
        margin-top: 6%;
        margin-left: 6%;
        margin-right: 6%;
        background-color: black;
    }

    #search {
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;
    }
</style>