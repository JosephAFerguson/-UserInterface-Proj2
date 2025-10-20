<script>
    import { books_on_shelf, books_off_shelf, search_query } from './lib/bookStore.js';
    import { onDestroy } from 'svelte';

    let shelfView = 'all';
    let sortOption = 'None';

    let searchQuery = '';

    // subscribe once to keep local input in sync with the store
    const unsubscribe = search_query.subscribe(v => {
        searchQuery = v ?? '';
    });
    onDestroy(unsubscribe);

    // update the store on user input
    function handleSearchInput(e) {
        search_query.set(e.target.value);
    }

    $: $books_on_shelf;
    $: $books_off_shelf;

    $: totalBooksOnShelf = $books_on_shelf.length;

    $: allBooks = [...$books_on_shelf, ...$books_off_shelf];

    $: totalGenres = Array.from(new Set($books_on_shelf.map(book => book.Genre)));

    $: mostReadBook = allBooks.reduce((mostRead, book) => {
        return (book.TimesPulledOffShelf > (mostRead?.TimesPulledOffShelf || 0)) ? book : mostRead;
    }, null)?.Title || 'N/A';

    $: oldestBook = allBooks.reduce((oldest, book) => {
        return (new Date(book.DateAdded) < new Date(oldest?.DateAdded || Date.now())) ? book : oldest;
    }, null)?.Title || 'N/A';

    $: filteredBooks = (() => {
        const onShelf = $books_on_shelf;
        const offShelf = $books_off_shelf;

        return [...allBooks]
            .filter(book => {
                const matchesShelf =
                    shelfView === 'all'
                        || (shelfView === 'on' && onShelf.includes(book))
                        || (shelfView === 'off' && offShelf.includes(book));

                const matchesSearch = book.Title.toLowerCase().includes(searchQuery.toLowerCase());

                return matchesShelf && matchesSearch;
            })
            .sort((a, b) => {
                if (sortOption === 'A-Z') return a.Title.localeCompare(b.Title);
                if (sortOption === 'Z-A') return b.Title.localeCompare(a.Title);
                if (sortOption === 'Genre') return a.Genre.localeCompare(b.Genre);
                return 0;
            });
    })();


    $: groupedBooksByGenre = (() => {
        if (sortOption !== 'Genre') return null;

        const grouped = new Map();

        for (const book of filteredBooks) {
            const genre = book.Genre.trim().toLowerCase(); // normalize
            if (!grouped.has(genre)) grouped.set(genre, []);
            grouped.get(genre).push(book);
        }

        // Alphabetical order
        return new Map([...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)));
    })();

    function handleSearch(event) {
        const query = event.target.value;
        // Implement search functionality here
    }
</script>

<main>
    <div id ="data-display-panel">
        <h1>Metrics</h1>
        <div class="metric-entry">Number of Books on Shelf: <strong>{totalBooksOnShelf}</strong></div>
        <div class="metric-entry">Genres Available: <strong>{totalGenres.join(', ')}</strong></div>
        <div class="metric-entry">Most Read Book: <strong>{mostReadBook}</strong></div>
        <div class="metric-entry">Oldest Book: <strong>{oldestBook}</strong></div>
        <div class="metric-entry">Books Off Shelf: <strong>{$books_off_shelf.map(book => book.Title).join(', ')}</strong></div>


        <br/>
        <h1>Search Features</h1>
        <br/>
        <input type="text" placeholder="Search.." id="search" bind:value={searchQuery} on:input={handleSearchInput} />
        <br/>
        <br/>
        <div style="display: flex; gap:8px; height: 40px; align-items: center;">
            <p>Sort by:</p>
            <select bind:value={sortOption}>
                <option value="None">None</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Genre">Genre</option>
            </select>
        </div>

        <h1>Status</h1>
        <div class="shelf-toggle">
            <label><input type="radio" bind:group={shelfView} value="all" /> All</label>
            <label><input type="radio" bind:group={shelfView} value="on" /> On Shelf</label>
            <label><input type="radio" bind:group={shelfView} value="off" /> Off Shelf</label>
        </div>

        {#if shelfView === 'all'}
            {#if filteredBooks.filter(book => $books_on_shelf.includes(book)).length > 0}
                {#each filteredBooks.filter(book => $books_on_shelf.includes(book)) as book}
                    <div class="book-entry">
                        <div class="book-title">
                            {book.Title}
                            ·
                            <span class="book-status">{$books_on_shelf.includes(book) ? 'On Shelf' : 'Off Shelf'}</span>
                        </div>
                        <div class="book-details">
                            Pulled: {book.TimesPulledOffShelf}x <br />
                            Last Read: {book.LastRead || 'N/A'} <br />
                            {book.Genre} | {book.Color} | {book.Pages} pages  
                            <br />
                            Added: {book.DateAdded} | ISBN: {book.ISBN || 'N/A'} <br />
                        </div>
                    </div>
                {/each}
            {/if}

            {#if filteredBooks.filter(book => $books_off_shelf.includes(book)).length > 0}
                <h2 class="section-heading">Off Shelf</h2>
                {#each filteredBooks.filter(book => $books_off_shelf.includes(book)) as book}
                    <div class="book-entry">
                        <div class="book-title">
                            {book.Title}
                            ·
                            <span class="book-status">{$books_on_shelf.includes(book) ? 'On Shelf' : 'Off Shelf'}</span>
                        </div>
                        <div class="book-details">
                            Pulled: {book.TimesPulledOffShelf}x <br />
                            Last Read: {book.LastRead || 'N/A'} <br />
                            {book.Genre} | {book.Color} | {book.Pages} pages  
                            <br />
                            Added: {book.DateAdded} | ISBN: {book.ISBN || 'N/A'} <br />
                        </div>
                    </div>
                {/each}
            {/if}
        {:else}
            {#if sortOption === 'Genre'}
                {#each groupedBooksByGenre as [genre, books]}
                <h2 class="section-heading" style="margin-top: 1rem;">
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </h2>
                {#each books as book}
                    <div class="book-entry">
                    <div class="book-title">
                        {book.Title}
                        ·
                        <span class="book-status">
                        {$books_on_shelf.includes(book) ? 'On Shelf' : 'Off Shelf'}
                        </span>
                    </div>
                        <div class="book-details">
                            Pulled: {book.TimesPulledOffShelf}x <br />
                            Last Read: {book.LastRead || 'N/A'} <br />
                            {book.Genre} | {book.Color} | {book.Pages} pages  
                            <br />
                            Added: {book.DateAdded} | ISBN: {book.ISBN || 'N/A'} <br />
                        </div>
                    </div>
                {/each}
                {/each}
            {:else}
                {#each filteredBooks as book}
                    <div class="book-entry">
                        <div class="book-title">
                        {book.Title}
                        ·
                        <span class="book-status">
                            {$books_on_shelf.includes(book) ? 'On Shelf' : 'Off Shelf'}
                        </span>
                        </div>
                        <div class="book-details">
                            Pulled: {book.TimesPulledOffShelf}x <br />
                            Last Read: {book.LastRead || 'N/A'} <br />
                        {book.Genre} | {book.Color} | {book.Pages} pages  
                        <br />
                        Added: {book.DateAdded} | ISBN: {book.ISBN || 'N/A'} <br />
                        </div>
                    </div>
                {/each}
            {/if}
        {/if}
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

    h1, .section-heading {
        display: block;
        text-align: left;
        margin-left: 5%;
    }

    p {
        margin-left: 5%;
    }

    #data-display-panel {
        height: 95vh;
        overflow-y: auto;

        padding: 20px;
        margin: 5% 6%;
        background-color: black;
        box-sizing: border-box;
        padding: 30px 20px;
    }

    #search {
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;
    }

    .book-entry {
       background-color: #1a1a1a;
       padding: 0.9rem 1.2rem;
       border-radius: 8px;
       font-size: 0.9rem;
       line-height: 1.4;
       color: #eaeaea;
       margin: 12px 5%;
       box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }

    .book-title {
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 0.3rem;
        color: white;
        display: flex;
        justify-content: space-between;
    }

    .book-details {
        color: #cccccc;
        font-size: 0.85rem;
    }

    .metric-entry {
        background-color: #222;
        padding: 12px 16px;
        margin: 10px 5%;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
    }

    .shelf-toggle {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1rem 0;
        font-weight: bold;
    }

    .shelf-toggle input {
        margin-right: 6px;
        accent-color: #563232; 
    }

    .book-status {
        font-weight: normal;
        font-size: 0.85rem;
        color: #888;
    }

    /* Scrollbar styling: make the panel scrollbar match the project's tan-on-dark palette */
    :global(#data-display-panel) {
        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: #d8b4a0 #0f0f0f; /* thumb, track */
    }

    /* WebKit-based browsers (Chrome, Edge, Safari) */
    :global(#data-display-panel::-webkit-scrollbar) {
        width: 10px;
        height: 10px;
    }
    :global(#data-display-panel::-webkit-scrollbar-track) {
        background: #0f0f0f;
        border-radius: 10px;
    }
    :global(#data-display-panel::-webkit-scrollbar-thumb) {
        background-color: #d8b4a0;
        border-radius: 10px;
        border: 2px solid transparent; /* gives a small gap */
        background-clip: padding-box;
    }
    :global(#data-display-panel::-webkit-scrollbar-thumb:hover) {
        background-color: #c4a28f;
    }

</style>