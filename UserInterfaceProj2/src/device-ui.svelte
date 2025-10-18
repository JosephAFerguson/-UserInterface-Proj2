<script>
  import { books_per_shelf } from './lib/bookStore.js';
  import BookSVG from './lib/SvgBook.svelte';
  import SvgLight from './lib/SvgLight.svelte';
  import NullBook from './assets/NullBook.svg';

  function handleRemove(shelf, book) {
    alert('Remove book feature not implemented yet.');
    return () => {};
  }
</script>


<main>
  <div class="shelves">
    {#each $books_per_shelf as shelf}
      <div class="shelf">
        <div class="books">
          {#each shelf as book}
            {#if book}
              <BookSVG title={book.title} color={book.color} />
            {:else}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
              <img src={NullBook} alt="Empty slot" on:click={handleRemove(shelf, book)} />
            {/if}
          {/each}
        </div>
        <div class="lights">
          {#each shelf as book}
            <SvgLight color={book ? 'white' : 'gray'} character={book ? book.title.charAt(0) : '-'} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    background-color: #563232;
    color: white;
    margin: 1rem;
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
    padding: 1rem;
  }
  
  .books img,
  .books :global(svg) {
    height: 90%;
    max-height: 90%;
    object-fit: contain;
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
</style>