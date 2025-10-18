<script>
  import DeviceUI from './device-ui.svelte';
  import TestingUI from './testing-ui.svelte';
  import DataDisplayUI from './data-display-ui.svelte';
  import { books_on_shelf, books_off_shelf } from './lib/bookStore.js';
</script>

<div id="container"> 
  <div id="device-ui"><DeviceUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} /></div> 
  <div id="data-display-ui"><DataDisplayUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} /></div>
  <div id="testing-ui"><TestingUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} on:goToDisplay={() => showDisplay = true}/>
</div>
</div>

<style>
</style>