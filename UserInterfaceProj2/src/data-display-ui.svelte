<script>
    export let books_on_shelf = [];
    export let books_off_shelf = [];

    $: totalBooksOnShelf = books_on_shelf.length;

    $: allBooks = [...books_on_shelf, ...books_off_shelf];

    $: totalGenres = Array.from(new Set(books_on_shelf.map(book => book.Genre)));

    $: mostReadBook = allBooks.reduce((mostRead, book) => {
        return (book.TimesPulledOffShelf > (mostRead?.TimesPulledOffShelf || 0)) ? book : mostRead;
    }, null)?.Title || 'N/A';

    $: oldestBook = allBooks.reduce((oldest, book) => {
        return (new Date(book.DateAdded) < new Date(oldest?.DateAdded || Date.now())) ? book : oldest;
    }, null)?.Title || 'N/A';

    function handleSearch(event) {
        const query = event.target.value;
        // Implement search functionality here
    }
</script>

<main>
    <div id ="data-display-panel">
        <h1>Metrics</h1>
        <p>Number of Books on Shelf: <strong>{totalBooksOnShelf}</strong></p>
        <p>Genres Available: <strong>{totalGenres.join(', ')}</strong></p>
        <p>Most Read Book: <strong>{mostReadBook}</strong></p>
        <p>Oldest Book: <strong>{oldestBook}</strong></p>
        <p>Books Off Shelf: <strong>{(books_off_shelf.map(book => book.Title)).join(', ')}</strong></p>
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