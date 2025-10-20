<script>
  import { books_per_shelf, search_query } from './lib/bookStore.js';
  import BookSVG from './lib/SvgBook.svelte';
  import SvgLight from './lib/SvgLight.svelte';
  import NullBook from './assets/NullBook.svg';
  import { submitNewBook } from './testing-ui.svelte';

  let showAddModal = false;
  let addTitle = '';
  let addGenre = '';
  let addColor = '';
  let addPages = '';
  let addISBN = '';
  let targetShelf = null;
  let targetSpot = null;

  function handleAdd(shelfIndex, spotIndex) {
    targetShelf = Number(shelfIndex);
    targetSpot = Number(spotIndex);
    addTitle = '';
    addGenre = '';
    addColor = '';
    addPages = '';
    addISBN = '';
    showAddModal = true;
  }

  function closeAddModal() {
    showAddModal = false;
    targetShelf = null;
    targetSpot = null;
  }

  function submitAddBook() {
    const title = (addTitle || 'Untitled').trim();
    if (!title) return;

    const shelf = targetShelf;
    const spot = targetSpot;

    closeAddModal();

    try {
      // call the shared submit (keeps existing testing-ui logic)
      submitNewBook(title, addGenre, addColor , Number(addPages), addISBN, shelf, spot);
    } catch (err) {
      console.error('submitNewBook failed:', err);
    }
  }
</script>


<main>
  <div class="shelves">
    {#each $books_per_shelf as shelf, sIdx}
      <div class="shelf">
        <div class="books">
          {#each shelf as book, bIdx}
            {#if book}
              <BookSVG title={book.title} color={book.color} shelf={sIdx+1} spot={bIdx+1} />
            {:else}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
              <img src={NullBook} alt="Empty slot" on:click={() => handleAdd(sIdx+1, bIdx+1)} />
            {/if}
          {/each}
        </div>
        <div class="lights">
          {#each shelf as book}
            <SvgLight 
              color={book ? 'white' : 'gray'} 
              character={book ? book.title.charAt(0) : '-'} 
              active={book && $search_query && book.title.toLowerCase().includes($search_query.toLowerCase())}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>

{#if showAddModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click={closeAddModal}>
    <div class="modal-window" on:click|stopPropagation>
      <h3>Add Book</h3>
      <div class="book-form">
        <input placeholder="Title" bind:value={addTitle} />
        <input placeholder="Genre" bind:value={addGenre} />
        <input placeholder="Color (name or hex)" bind:value={addColor} />
        <input placeholder="Pages" type="number" bind:value={addPages} />
        <input placeholder="ISBN" bind:value={addISBN} />
      </div>
      <div class="modal-btns">
        <button on:click={closeAddModal}>Cancel</button>
        <button on:click={submitAddBook}>Add Book</button>
      </div>
    </div>
  </div>
{/if}

<style>
  main {
    background-color: #563232;
    height: 95vh;
    color: white;
    margin: 2vh;
  }
  .shelves {
    display: grid;
    height: 100%;
    grid-template-rows: repeat(4, 1fr);
    box-sizing: border-box;
  }
  .shelf {
    display: grid;
    grid-template-rows: 85% 15%;
    background-color: black;
  }

  .books {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(10, minmax(1%, 1fr));
    justify-self: center;
    justify-items: center;
    padding: 1vh;
  }
  
  .books img,
  .books :global(svg) {
    object-fit: contain;
  }

  .books img {
    height: 90%;
    filter: grayscale(100%) brightness(70%);
  }
  
  .books :global(svg):hover,
  .books img:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .lights {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(10, minmax(1%, 1fr));
    justify-self: center;
    justify-items: center;
    align-items: center;
    background-color: #563232;
  }

  .lights :global(svg) {
    height:100%;
    object-fit: contain;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index: 999;
  }
  .modal-window {
    background: #fff;
    color: #222;
    padding: 1rem;
    border-radius: 8px;
    min-width: 260px;
    max-width: 420px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .modal-btns{
    display: block;
    justify-self: right;
  }
  .modal-btns button{
    border: none;
    border-radius: 12px;
    background: #d8b4a0;
    color: black;
  }
  .modal-btns button:hover{
    cursor: pointer;
  }
  .book-form { display:flex; flex-direction:column; gap:8px; margin:0.5rem 0 1rem; }
  .book-form input { padding:8px; border-radius:6px; border:1px solid #ccc; }
</style>