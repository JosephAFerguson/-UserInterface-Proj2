<script>
  import { books_per_shelf } from './lib/bookStore.js';
  import BookSVG from './lib/SvgBook.svelte';
  import NullBook from './assets/NullBook.svg';
</script>


<main>
  <div class="shelves">
    {#each $books_per_shelf as shelf}
      <div class="shelf">
        <div class="books">
          {#each shelf as book}
            {#if book}
              <BookSVG title={book.title} color={book.color}/>
            {:else}
              <img src={NullBook} alt="Empty slot" />
            {/if}
          {/each}
        </div>
        <div class="lights">
          {#each Array(10) as _}
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
            </svg>
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
    width: 100%;
    height: 95vh;
    margin: 1rem;
  }
  .shelves {
    display: grid;
    width: 97.5%;
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
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(10, minmax(20px, 1fr));
    justify-self: center;
    justify-items: center;
    padding: 1rem;
    margin: 0.4rem;
  }
  
  .books img,
  .books :global(svg) {
    width:auto;
    height: 90%;
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
    grid-template-columns: repeat(10, minmax(20px, 1fr));
    justify-self: center;
    justify-items: center;
    gap: 1rem;
    align-items: center;
    background-color: #563232;
  }
</style>