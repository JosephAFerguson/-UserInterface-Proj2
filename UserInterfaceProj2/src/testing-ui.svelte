<script>
    import { books_on_shelf, books_off_shelf } from './lib/bookStore.js'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

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

    let titleToRemove = '';
    let showRemoveForm = false;

    function removeBookByTitle() {
        books_on_shelf.update(books => {
            const index = books.findIndex(book => book.Title.toLowerCase() === titleToRemove.toLowerCase());
            if (index !== -1) {
                const updatedBooks = [...books];
                const removed = updatedBooks.splice(index, 1)[0];
                books_off_shelf.update(off => [...off, removed]);
                return updatedBooks;
            } else {
                alert(`No book found with title: "${titleToRemove}"`);
                return books;
            }
        });

        titleToRemove = '';
    }


    let showForm = false;
    let newTitle = '';
    let newGenre = '';
    let newColor = '';
    let newPages = '';
    let newISBN = '';

    function submitNewBook() {
        books_on_shelf.update(books => [
            ...books,
            {
                Title: newTitle || 'Untitled',
                Genre: newGenre || 'Unknown',
                Color: newColor || 'Gray',
                Pages: parseInt(newPages) || 0,
                ISBN: newISBN || 'N/A',
                Synopsis: '',
                DateAdded: new Date().toISOString().slice(0, 10),
                LastRead: '',
                TimesPulledOffShelf: 0
            }
        ]);

        // Optional: reset form
        newTitle = newGenre = newColor = newISBN = '';
        newPages = '';
        showForm = false;
    }

    let showEditForm = false;
    let searchTitle = '';
    let editBook = null;

    let editedTitle = '';
    let editedGenre = '';
    let editedColor = '';
    let editedPages = '';
    let editedISBN = '';

    function loadBookForEditing() {
        const book = $books_on_shelf.find(b => b.Title.toLowerCase() === searchTitle.toLowerCase());
        if (book) {
            editBook = book;
            editedTitle = book.Title;
            editedGenre = book.Genre;
            editedColor = book.Color;
            editedPages = book.Pages;
            editedISBN = book.ISBN || '';
        } else {
            alert(`No book found with title: "${searchTitle}"`);
            editBook = null;
        }
    }

    function submitEdit() {
        books_on_shelf.update(books => books.map(book => {
            if (book.Title === editBook.Title) {
                return {
                    ...book,
                    Title: editedTitle || book.Title,
                    Genre: editedGenre || book.Genre,
                    Color: editedColor || book.Color,
                    Pages: parseInt(editedPages) || book.Pages,
                    ISBN: editedISBN || 'N/A'
                };
            }
            return book;
        }));

        //reset
        editBook = null;
        searchTitle = '';
        showEditForm = false;
    }

</script>

<section class="control-panel">
    <br/>
    <button id='eye-button' on:click={handleEyeClick}>
        <img src="./public/eye.png" alt="Eye Icon" width="20" height="20"/>
    </button>
    <button id='info-button'>
        <img src="./public/information-button.png" alt="Info Icon" width="20" height="20"/>
    </button>


    




    <div style="display:flex; align-items:center; width:90%;">
        <h1>Testing UI</h1>
    </div>
    
    <div>
        <div style="display:flex; gap:8px;">
            <button type="button" id="add" on:click={() =>  showForm = ! showForm}>+</button>
            <p style="margin:0" id="add-text">{showForm ? 'Cancel' : 'Add Book'}</p>
        </div>


        {#if showForm}
            <div class="book-form">
                <input bind:value={newTitle} placeholder="Title" />
                <select bind:value={newGenre}>
                    <option value="">Select Genre</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Classic">Classic</option>
                    <option value="Other">Other</option>
                </select>
                <input bind:value={newColor} placeholder="Color" />
                <input type="number" bind:value={newPages} placeholder="Pages" min="1" />
                <input bind:value={newISBN} placeholder="ISBN" />
                <button on:click={submitNewBook}>Submit</button>
            </div>
        {/if}
    </div>


    <br/>
    <div style="display:flex; gap:8px;">
        <button type="button" id="remove" on:click={() => showRemoveForm = !showRemoveForm}>-</button>
        <p style="margin:0" id="remove-text">{showRemoveForm ? 'Cancel Remove' : 'Remove Books'}</p>
    </div>
    {#if showRemoveForm}
        <div class="book-form">
            <input bind:value={titleToRemove} placeholder="Title to remove" />
            <button on:click={removeBookByTitle}>Remove by Title</button>
        </div>
    {/if}

    <br>


    <div style="display:flex; gap:8px;">
        <button type="button" id="edit" on:click={() => showEditForm = !showEditForm}>✎</button>
        <p style="margin:0">{showEditForm ? 'Cancel Edit' : 'Edit Book'}</p>
    </div>

    {#if showEditForm}
        <div class="book-form">
            {#if !editBook}
                <input bind:value={searchTitle} placeholder="Search title to edit" />
                <button on:click={loadBookForEditing}>Load Book</button>
            {:else}
                <input bind:value={editedTitle} placeholder="New Title" />
                <input bind:value={editedGenre} placeholder="New Genre" />
                <input bind:value={editedColor} placeholder="New Color" />
                <input type="number" bind:value={editedPages} placeholder="New Pages" />
                <input bind:value={editedISBN} placeholder="New ISBN" />
                <button on:click={submitEdit}>Submit Changes</button>
            {/if}
        </div>
    {/if}

    <br/>
    <button>Run Simulation</button>
    <br/>
    <br/>
    <button  on:click={() => dispatch('goToDisplay')}>Go to Data Display</button>
</section>

<style>
    /* main {
        margin-left: 5%;
    } */

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

    .book-form {
        margin: 10px 30px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .control-panel {
        background-color: #f5f2eb; 
        color: #3A2322; 
        margin: 2rem;
        padding: 2rem;
        border-radius: 1.5rem;
        font-family: 'Georgia', serif;
        max-width: 400px;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
    }
    button, select, input, label, p, h1, h2, h3, h4, h5, h6 {
        color: #3A2322;
    }
    button, select {
        cursor: pointer;
        font-family: inherit;
    }

    #eye-button, #info-button {
        background-color: #d8b4a0;
        border: none;
        border-radius: 10px;
        padding: 0.4rem 0.6rem;
        margin: 0.2rem;
    }
    h1 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #d8b4a0;
        padding-bottom: 0.5rem;
    }
    #add, #remove, #edit {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 1.2rem;
        border: none;
        background-color: #d8b4a0;
        color: #3A2322;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: 0.2s ease;
    }
    #add:hover, #remove:hover, #edit:hover {
    background-color: #c49a85;
    }
    #add-text, #remove-text, p {
        align-items: center;
        display: flex;
        color: #3A2322;
        font-weight: bold;
    }
    .book-form {
        margin: 1rem 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .book-form input,
    .book-form select {
        padding: 0.5rem;
        border: 1px solid #d3c3b5;
        border-radius: 6px;
        background-color: #fff;
        color: #3A2322;
        font-family: inherit;
    }
    .book-form input::placeholder {
        color: #999;
    }
    .book-form input:focus,
    .book-form select:focus {
        outline: none;
        border-color: #c49a85;
        box-shadow: 0 0 5px rgba(196, 154, 133, 0.4);
    }
    button:not(#add):not(#remove):not(#edit):not(#eye-button):not(#info-button) {
        background-color: #d8b4a0;
        color: #3A2322;
        border: none;
        padding: 0.6rem 1rem;
        font-weight: bold;
        border-radius: 6px;
        transition: 0.2s ease;
    }
    button:not(#add):not(#remove):not(#edit):not(#eye-button):not(#info-button):hover {
        background-color: #c49a85;
        color: #3A2322;
    }

:global(html), :global(body) {
  background-color: #f5f2eb; /* parchment */
  margin: 0;
  padding: 0;
  height: 100%;
}

</style>