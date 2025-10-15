<script>
  import { onMount } from 'svelte'
</script>

<main>
  <div id="shelf-1">
    <div id="books"></div>
    <div id="lights">
      <!-- put lights here -->
    </div>
  </div>
  <div id="shelf-2">
    <div id="books"></div>
    <div id="lights">
      <!-- put lights here -->
    </div>
  </div>
  <div id="shelf-3">
    <div id="books"></div>
    <div id="lights">
      <!-- put lights here -->
    </div>
  </div>
  <div id="shelf-4">
    <div id="books"></div>
    <div id="lights">
      <!-- put lights here -->
    </div>
  </div>
</main>

<style>
  main {
    background-color: #563232;
    color: white;
    width: 100%;
    height: 100%;
  }

  #shelf-1, #shelf-2, #shelf-3, #shelf-4 {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    height: 18%;
    background-color: black;
  }
</style>