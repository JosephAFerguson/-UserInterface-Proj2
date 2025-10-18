<script>
    import { books_on_shelf, books_off_shelf } from './lib/bookStore.js';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let showInfoModal = false;
  
    function handleEyeClick() {
        alert("Eye button clicked!");
    }
  
    function handleInfoButtonClick() {
        showInfoModal = true;
    }
  
    function closeInfoModal() {
        showInfoModal = false;
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
            editedPages = String(book.Pages);
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
  
        editBook = null;
        searchTitle = '';
        showEditForm = false;
    }
  
    let simRunning = false;
    let simInterval = null;
  
    function simulateReadingOverTime() {
        if (simRunning) return;
        simRunning = true;
  
        simInterval = setInterval(() => {
            books_on_shelf.update(books => {
                if (books.length === 0) return books;
  
                const index = Math.floor(Math.random() * books.length);
                const updatedBooks = [...books];
                const offset = Math.floor(Math.random() * 10);
  
                updatedBooks[index] = {
                    ...updatedBooks[index],
                    LastRead: new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10),
                    TimesPulledOffShelf: updatedBooks[index].TimesPulledOffShelf + 1
                };
  
                return updatedBooks;
            });
        }, 1000);
    }
  
    function stopSimulation() {
        clearInterval(simInterval);
        simRunning = false;
    }
  </script>
  
  <section class="control-panel">
    <br/>
    <button id='eye-button' on:click={handleEyeClick}>
        <img src="./public/eye.png" alt="Eye Icon" width="20" height="20"/>
    </button>
    <button id='info-button' on:click={handleInfoButtonClick}>
        <img src="./public/information-button.png" alt="Info Icon" width="20" height="20"/>
    </button>
  
    <div style="display:flex; align-items:center; width:90%;">
        <h1>Testing UI</h1>
    </div>
    
    <div>
        <div style="display:flex; gap:8px;">
            <button type="button" id="add" on:click={() => showForm = !showForm}>+</button>
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
    <div style="display:flex; gap:8px; align-items:center;">
        <button on:click={simulateReadingOverTime}>Run Simulation</button>
        <button on:click={stopSimulation}>Stop</button>
    </div>
    <br/>
    <br/>
    <button on:click={() => dispatch('goToDisplay')}>Go to Data Display</button>
  </section>
  
  {#if showInfoModal}
  <div
    class="modal-overlay"
    on:click={closeInfoModal}
    on:keydown={(e) => e.key === "Escape" && closeInfoModal()}
    role="button"
    tabindex="0"
  >
    <div
      class="modal-window"
      on:click|stopPropagation
      on:keydown={(e) => e.key === "Escape" && closeInfoModal()}
      role="button"
      tabindex="0"
    >
      <h2>Testing UI – Button Guide</h2>
      <ul>
        <li><b>Add Book (+)</b> → Opens a form to add new books to the smart shelf with title, genre, color, pages, and ISBN.</li>
        <li><b>Remove Books (-)</b> → Opens a form to remove books from the shelf by searching for their title.</li>
        <li><b>Edit Book (✎)</b> → Opens a form to search and edit existing book details like title, genre, color, pages, and ISBN.</li>
        <li><b>Run Simulation</b> → Starts automated reading simulation that randomly updates book activity over time.</li>
        <li><b>Stop</b> → Stops the running simulation.</li>
        <li><b>Go to Data Display</b> → Navigates to the analytics and metrics view to see book statistics.</li>
      </ul>
      <button class="close-btn" on:click={closeInfoModal}>Close</button>
    </div>
  </div>
  {/if}
  
  <style>
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
  
    .control-panel {
        background-color: #f5f2eb; 
        color: #3A2322; 
        margin: 1.5rem auto;
        padding: 1.8rem;
        border-radius: 1.5rem;
        font-family: 'Georgia', serif;
        max-width: 380px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
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
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
        border-bottom: 2px solid #d8b4a0;
        padding-bottom: 0.4rem;
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
  
    button:not(#add):not(#remove):not(#edit):not(#eye-button):not(#info-button):not(.close-btn) {
        background-color: #d8b4a0;
        color: #3A2322;
        border: none;
        padding: 0.6rem 1rem;
        font-weight: bold;
        border-radius: 6px;
        transition: 0.2s ease;
    }
  
    button:not(#add):not(#remove):not(#edit):not(#eye-button):not(#info-button):not(.close-btn):hover {
        background-color: #c49a85;
        color: #3A2322;
    }
  
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .modal-window {
      background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
      color: #1a1a1a;
      padding: 20px;
      border-radius: 16px;
      max-width: 340px;
      width: 88%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
  
    .modal-window h2 {
      text-align: center;
      margin: 0 0 14px 0;
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
    }
  
    .modal-window ul {
      list-style: none;
      padding: 0;
      margin: 0 0 16px 0;
    }
  
    .modal-window li {
      margin: 0 0 10px 0;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 8px;
      line-height: 1.4;
      font-size: 13px;
    }
  
    .modal-window li:last-child {
      margin-bottom: 0;
    }
  
    .modal-window li b {
      color: #8B4513;
      font-weight: 600;
      display: block;
      margin-bottom: 2px;
    }
  
    .close-btn {
      display: block;
      margin: 0 auto;
      padding: 10px 24px;
      background: #8B4513;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
  
    .close-btn:hover {
      background: #A0522D;
    }
  
    :global(html), :global(body) {
      background-color: #f5f2eb;
      margin: 0;
      padding: 0;
      height: 100%;
    }
  </style>