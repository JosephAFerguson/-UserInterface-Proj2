<script>
  import { onMount } from 'svelte'

  export let books_on_shelf = [];
  export let books_off_shelf = [];
</script>

<main>
  <div id="shelves">
    <div id="shelf-1">
      <div id="books-1">
      </div>
      <div id="lights-1">
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
      </div>
    </div>
    <div id="shelf-2">
      <div id="books-2"></div>
      <div id="lights-2">
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
      </div>
    </div>
    <div id="shelf-3">
      <div id="books-3"></div>
      <div id="lights-3">
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
      </div>
    </div>
    <div id="shelf-4">
      <div id="books-4"></div>
      <div id="lights-4">
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="white" fill="white" />
        </svg>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    background-color: #563232;
    color: white;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
  }
  #shelves {
    height: 94%;
    margin-top: 3%;
    margin-bottom: 3%;
    margin-left: 3%;
    margin-right: 3%;
  }

  #shelf-1, #shelf-2, #shelf-3, #shelf-4 {
    width: 100%;
    height: 25%;
    background-color: black;
  }

  #books-1, #books-2, #books-3, #books-4 {
    height: 85%;
    width: full;
  }

  #lights-1, #lights-2, #lights-3, #lights-4 {
    height: 15%;
    width: full;
    background-color: #563232;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>