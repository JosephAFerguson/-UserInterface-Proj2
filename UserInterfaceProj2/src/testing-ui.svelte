<script>
    import { books_on_shelf, books_off_shelf } from './lib/bookStore.js'

    function handleEyeClick() {
        alert("Eye button clicked!");
    }

    function addBook() {
        books_on_shelf.update(books => [
            ...books,
            {
                Title: "New Book",
                Color: "Purple",
                Genre: "Fantasy",
                Pages: 320,
                Synopsis: "A brand new story.",
                DateAdded: new Date().toISOString().slice(0, 10),
                LastRead: "",
                TimesPulledOffShelf: 0
            }
        ]);
    }

    function removeBook() {
        books_on_shelf.update(books => books.slice(0, -1));
    }

</script>

<main>
    <br/>
    <button id='eye-button' on:click={handleEyeClick}>
        <img src="./public/eye.png" alt="Eye Icon" width="20" height="20"/>
    </button>
    <button id='info-button'>
        <img src="./public/information-button.png" alt="Info Icon" width="20" height="20"/>
    </button>

    <h2>Books on Shelf:</h2>
    <ul>
        {#each $books_on_shelf as book}
            <li>{book.Title} - {book.Genre}</li>
        {/each}
    </ul>

    <div style="display:flex; align-items:center; width:90%;">
        <h1>Testing UI</h1>
    </div>
    <div style="display:flex; gap:8px;">
        <button type="button" id="add" on:click={addBook}>+</button>
        <p style="margin:0" id="add-text">Add Books</p>
    </div>
    <br/>
    <div style="display:flex; gap:8px;">
        <button type="button" id="remove" on:click={removeBook}>-</button>
        <p style="margin:0" id="remove-text">Remove Books</p>
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
        width: 25px;
        height: 25px;
    }

    #add-text, #remove-text {
        align-items: center;
        display: flex;
    }
</style>