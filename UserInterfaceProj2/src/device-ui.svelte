<script>
  import { onMount } from 'svelte';
  import BookSVG from './lib/SvgBook.svelte';
  import NullBook from './assets/NullBook.svg';

  const shelves = [1, 2, 3, 4];
  export let books_per_shelf = [
    ["Harry Potter", "", "", "", "", "", "", "", "", ""],
    ["Gathering Blue", "Les Miserables", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""]
  ];

</script>

<main>
  <div class="shelves">
    {#each books_per_shelf as shelf}
      <div class="shelf">
        <div class="books">
          {#each shelf as book}
            {#if book}
              <BookSVG title={book} />
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
    width: 95%;
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
    grid-template-columns: repeat(10, 1fr);
    justify-self: center;
    gap: 1rem;
    padding: 1rem;
  }

  .lights {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #563232;
  }

  .books img {
    width: 100%;  
    height: 100%;
    object-fit: contain;
  }


</style>