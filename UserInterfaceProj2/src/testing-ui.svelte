<script>
  // Stores are passed in as props from `App.svelte` (they are Svelte writables)
  // Do not provide defaults here; App.svelte binds real writable store objects.
  import { books_on_shelf } from './lib/bookStore.js';
  import { user_profile, setProfile } from './lib/bookStore.js';
  import digitalSketch from './lib/digitalsketch.png';
  export let books_off_shelf;

  // Local UI state
  let showInfoModal = false;
  let showForm = false;
  let showRemoveForm = false;
  let showEditForm = false;

  // Form fields for add / edit / remove
  let newTitle = '';
  let newGenre = '';
  let newColor = '';
  let newPages = '';
  let newISBN = '';

  let titleToRemove = '';

  let searchTitle = '';
  let editBook = null;
  let editedTitle = '';
  let editedGenre = '';
  let editedColor = '';
  let editedPages = '';
  let editedISBN = '';

  // Modal controls
  function handleInfoButtonClick() {
    showInfoModal = true;
  }

  function closeInfoModal() {
    showInfoModal = false;
  }

  // Eye icon action 

 
  let showHybridModal = false;

  function handleEyeClick() {
    showHybridModal = true;
  }

  function closeHybridModal() {
    showHybridModal = false;
  }


  // Remove a book by title and move it to off-shelf
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
  // Load a book into the edit form by searching title
  function loadBookForEditing() {
    const book = $books_on_shelf.find(b => b.Title.toLowerCase() === searchTitle.toLowerCase());
    if (book) {
      editBook = book;
      editedTitle = book.Title;
      editedGenre = book.Genre;
      editedColor = book.Color;
      // ensure editedPages (bound to an <input>) is a string
      editedPages = String(book.Pages);
      editedISBN = book.ISBN || '';
    } else {
      alert(`No book found with title: "${searchTitle}"`);
      editBook = null;
    }
  }

  // Submit changes from the edit form
  function submitEdit() {
    if (!editBook) return;

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

    // Reset edit state
    editBook = null;
    searchTitle = '';
    showEditForm = false;
  }

  // Simulation state: periodically update LastRead and TimesPulledOffShelf
  let simRunning = false;
  let simInterval = null;

  function simulateReadingOverTime() {
    if (simRunning) return;
    simRunning = true;

  //simulation: move books between shelves and update stats
  simInterval = setInterval(() => {
    const chance = Math.random();
    if (chance < 0.3 && $books_on_shelf.length > 0) {
      const index = Math.floor(Math.random() * $books_on_shelf.length);
      const removed = $books_on_shelf[index];
      books_on_shelf.update(b => b.filter((_, i) => i !== index));
      books_off_shelf.update(b => [...b, removed]);
    } else if (chance > 0.7 && $books_off_shelf.length > 0) {
      const index = Math.floor(Math.random() * $books_off_shelf.length);
      const restored = $books_off_shelf[index];
      books_off_shelf.update(b => b.filter((_, i) => i !== index));
      books_on_shelf.update(b => [...b, restored]);
    } else {
      books_on_shelf.update(books => {
        if (books.length === 0) return books;

        const index = Math.floor(Math.random() * books.length);
        const updatedBooks = [...books];
        const offset = Math.floor(Math.random() * 10); //up to 10 dayss

        updatedBooks[index] = {
          ...updatedBooks[index],
          LastRead: new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10),
          TimesPulledOffShelf: (updatedBooks[index].TimesPulledOffShelf || 0) + 1
        };

        return updatedBooks;
      });
    }
  }, 1000); //every 3 seconds (for demo)
  }

  function stopSimulation() {
    clearInterval(simInterval);
    simRunning = false;
  }

  const profileNames = {
    1: 'Joe',
    2: 'Joseph',
    3: 'Joanne',
    4: 'Eli'
  };

</script>

<!-- exportable submit for on click -->
<script context="module">
  import { get } from 'svelte/store';
  // avoid duplicate declaration with the instance script by aliasing the imports for module scope
  import { books_on_shelf as books_on_shelf_store, books_off_shelf as books_off_shelf_store } from './lib/bookStore.js';

  // layout constants (adjust if your shelf/spot counts differ)
  const SHELVES = 4;
  const SPOTS = 10;

  function findNextOpenSlot(books) {
    // build a quick occupancy map by 1-based shelf/spot
    const occupied = new Set();
    for (const b of books) {
      if (b && b.shelf != null && b.spot != null) {
        occupied.add(`${Number(b.shelf)}:${Number(b.spot)}`);
      }
    }

    for (let s = 1; s <= SHELVES; s++) {
      for (let p = 1; p <= SPOTS; p++) {
        if (!occupied.has(`${s}:${p}`)) return { shelf: s, spot: p };
      }
    }
    // fallback if full
    return { shelf: null, spot: null };
  }

  // Submit a new book using the Add form fields
  export function submitNewBook(title, genre, color, pages, isbn, shelf, spot) {
    const current = get(books_on_shelf_store) || [];
    const next = (shelf != null && spot != null)
      ? { shelf: Number(shelf), spot: Number(spot) }
      : findNextOpenSlot(current);

    const targetShelf = next.shelf ?? 2;
    const targetSpot = next.spot ?? 5;

    books_on_shelf_store.update(books => [
      ...books,
      {
        Title: title || 'Untitled',
        Color: color || '#916A2F',
        Genre: genre || '',
        Pages: parseInt(pages) || 0,
        DateAdded: new Date().toISOString().slice(0, 10),
        LastRead: '',
        TimesPulledOffShelf: 0,
        shelf: targetShelf,
        spot: targetSpot,
        ISBN: (isbn == null ? '' : String(isbn)).trim()
      }
    ]);
  }
</script>

<main class="control-panel">
  <br />
  <button id="eye-button" on:click={handleEyeClick}>
    <img src="./public/eye.png" alt="Eye Icon" width="20" height="20" />
  </button>
  <button id="info-button" on:click={handleInfoButtonClick}>
    <img
      src="./public/information-button.png"
      alt="Info Icon"
      width="20"
      height="20"
  />
  </button>
  <div style="display:flex; align-items:center; width:90%;">
    <h1>Testing UI</h1>
  </div>

  <div class="profile-section">
    <p style="margin: 0; font-weight: bold;">Active Profile: {profileNames[$user_profile]}</p>
    <div class="profile-buttons">
      <button class:selected={$user_profile === 1} on:click={() => setProfile(1)}>Joe</button>
      <button class:selected={$user_profile === 2} on:click={() => setProfile(2)}>Joseph</button>
      <button class:selected={$user_profile === 3} on:click={() => setProfile(3)}>Joanne</button>
      <button class:selected={$user_profile === 4} on:click={() => setProfile(4)}>Eli</button>
    </div>
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
        <button on:click={() =>submitNewBook(newTitle, newGenre, newColor, newPages, newISBN)}>Submit</button>
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
  <button class:running={simRunning} on:click={simRunning ? stopSimulation : simulateReadingOverTime}>{simRunning ? 'Stop Simulation' : 'Run Simulation'}</button>
  </div>
  <br/>
  <br/>
</main>

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
    <h2>Smart Shelf – Quick Controls</h2>
    <ul>
      <li><b>Add Book</b> → Click the add button or hover an empty spot to add a book.</li>
      <li><b>Remove Book</b> → Click the remove button or click a book to remove it.</li>
      <li><b>Edit Book</b> → Update any book’s info directly.</li>
      <li><b>Run Simulation</b> → Watch how the shelf behaves in real time.</li>
      <li><b>Eye Button</b> → View a sketch of the physical smart shelf.</li>
      <li><b>User Profiles</b> → Switch between profiles to view shelf data.</li>
    </ul>
    <button class="close-btn" on:click={closeInfoModal}>Close</button>
    </div>
  </div>
{/if}



<!-- Eye Button -->
{#if showHybridModal}
  <div
    class="hybrid-overlay no-outline"
    on:click={closeHybridModal}
    on:keydown={(e) => e.key === "Escape" && closeHybridModal()}
    role="button"
    tabindex="0"
  >
    <div
      class="hybrid-modal no-outline"
      on:click|stopPropagation
      on:keydown={(e) => e.key === "Escape" && closeHybridModal()}
      role="button"
      tabindex="0"
    >
      <h2>Smart Bookshelf Concept Sketch</h2>
      <img
        src={digitalSketch}
        alt="Hybrid sketch showing how the smart bookshelf integrates physical and digital features"
        class="hybrid-image"
      />
      <p>
        This concept sketch illustrates the smart bookshelf in its physical form.
        The shelf displays books, and the left panel adds a digital screen with
        stats and control buttons. 
      </p>
      <button class="close-btn" on:click={closeHybridModal}>Close</button>
    </div>
  </div>
{/if}



<style>
/* === Layout and General === */
main {
  margin: 0;
}

:global(html), :global(body) {
  background-color: #f5f2eb; /* parchment tone */
  margin: 0;
  padding: 0;
  height: 100%;
}

button, select, input, label, p, h1, h2, h3, h4, h5, h6 {
  color: #3A2322;
  font-family: 'Georgia', serif;
  cursor: pointer;
}

/* === Top Buttons (Eye, Info) === */
#eye-button,
#info-button {
  background-color: #d8b4a0;
  border: none;
  border-radius: 10px;
  padding: 0.4rem 0.6rem;
  margin: 0.2rem;
}

#info-button {
  float: right;
  margin-right: 5%;
}

/* === Control Buttons (Add, Remove, Edit) === */
#add,
#remove,
#edit {
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

#add:hover,
#remove:hover,
#edit:hover {
  background-color: #c49a85;
}

#add-text,
#remove-text,
p {
  align-items: center;
  display: flex;
  color: #3A2322;
  font-weight: bold;
}

/* === Forms === */
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

/* === Generic Buttons (not control or icon buttons) === */
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
}

/* === Headings === */
h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #d8b4a0;
  padding-bottom: 0.5rem;
}


.control-panel {
  background-color: #f5f2eb;
  color: #3A2322;
  padding: 20px;
  border-radius: 1.5rem;
  font-family: 'Georgia', serif;
  max-width: 400px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  max-height: 95vh;          
  overflow-y: auto;          
  scrollbar-width: thin;
}

/* info Modal Styles */
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
  padding: 28px;
  border-radius: 18px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-window h2 {
  text-align: center;
  margin: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: #3a2322;
  border-bottom: 2px solid #d8b4a0;
  padding-bottom: 8px;
}

.modal-window ul {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.modal-window li {
  margin-bottom: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  line-height: 1.4;
  display: flex;
  align-items: center;
}

.modal-window li:last-child {
  margin-bottom: 0;
}

.modal-window li b {
  color: #8B4513;
  font-weight: 600;
  min-width: 110px;
}

.close-btn {
  display: block;
  margin: 0 auto;
  padding: 10px 24px;
  background: #8B4513;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease-in-out;
}

.close-btn:hover {
  background-color: #73400f;
}


.profile-section {
  margin-bottom: 1rem;
}

.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 0.5rem;
}

.profile-buttons button.selected {
  background-color: #7F9D84 !important;
  font-weight: bold;
  box-shadow: 0 0 0 2px #3A2322 inset;
  color: #fff !important;
}

.profile-buttons button {
  transition: all 0.2s ease;
}

button.running:not(#add):not(#remove):not(#edit):not(#eye-button):not(#info-button) {
  background-color: #A14B3F!important;
  color: white;
}



/*Shelf Modal */
.hybrid-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }

  .hybrid-modal {
    background: #fff;
    padding: 32px;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .hybrid-modal h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1a1a1a;
  }

  .hybrid-image {
  width: 65%;        
  max-width: 220px;  
  height: auto;      
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  margin: 10px auto 20px;
  display: block;
}

  .hybrid-modal p {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .close-btn {
    background-color: #8B4513;
    color: #fff;
    border: none;
    padding: 10px 22px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }

  .close-btn:hover {
    background-color: #73400f;
  }

  /* === Remove Yellow Focus Outlines === */
  .no-outline,
  .no-outline:focus,
  .no-outline:active {
    outline: none !important;
    box-shadow: none !important;
  }

  /* Keep subtle focus ring for keyboard users */
  button:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid #38bdf8;
    outline-offset: 3px;
    border-radius: 6px;
  }

</style>

