<script>
  import DeviceUI from './device-ui.svelte';
  import TestingUI from './testing-ui.svelte';
  import DataDisplayUI from './data-display-ui.svelte';
  import { books_on_shelf, books_off_shelf } from './lib/bookStore.js';

  let showDisplay = false;

  // books_on_shelf.set([ 
  //   {
  //     Title: "Sample Book",
  //     Color: "Red",
  //     Genre: "Fiction",
  //     Pages: 300,
  //     Synopsis: "This is a sample synopsis of the book.",
  //     DateAdded: "2024-01-15",
  //     LastRead: "2024-06-10",
  //     TimesPulledOffShelf: 5
  //   },
  //   {
  //     Title: "Another Book",
  //     Color: "Blue",
  //     Genre: "Non-Fiction",
  //     Pages: 250,
  //     Synopsis: "This is another sample synopsis of a different book.",
  //     DateAdded: "2024-02-20",
  //     LastRead: "2024-05-22",
  //     TimesPulledOffShelf: 3
  //   }
  // ]);

  // books_off_shelf.set([
  //   {
  //     Title: "Third Book",
  //     Color: "Green",
  //     Genre: "Mystery",
  //     Pages: 400,
  //     Synopsis: "This is the synopsis of the third book.",
  //     DateAdded: "2024-03-10",
  //     LastRead: "2024-04-15",
  //     TimesPulledOffShelf: 2
  //   }
  // ]);
</script>

<div id="container"> 
  <div id="device-ui"><DeviceUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} /></div> 
  <div id="data-display-ui"><DataDisplayUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} /></div>
  <div id="testing-ui"><TestingUI books_on_shelf={books_on_shelf} books_off_shelf={books_off_shelf} /></div>
</div>

<style>
</style>