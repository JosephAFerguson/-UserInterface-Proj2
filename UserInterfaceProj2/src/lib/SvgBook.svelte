<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { books_on_shelf, books_off_shelf } from './bookStore.js';

  export let color = "#916A2F";   // spine color
  export let title = "Untitled";  // book title
  export let shelf = null;        // optional: 1-based shelf index
  export let spot = null;         // optional: 1-based spot index
  export let width = 38;
  export let height = 110;
  export let stripHeight = 2     // top/bottom strips

  let fontSize = 20;               // default font size
  let textEl;

  function handleClick() {
    // If shelf and spot are provided, remove the exact book at that location.
    if (shelf != null && spot != null) {
      if (!confirm(`Remove book at shelf ${shelf}, spot ${spot} and move to off-shelf?`)) return;
      books_on_shelf.update(list => {
        const idx = list.findIndex(b =>
          b &&
          Number(b.shelf) === Number(shelf) &&
          Number(b.spot) === Number(spot)
        );
        if (idx === -1) return list;
        const updated = [...list];
        const removed = updated.splice(idx, 1)[0];
        if (removed) books_off_shelf.update(off => [...off, removed]);
        return updated;
      });
      return;
    }

    const bookTitle = title || 'Untitled';
    // nothing to do for placeholder titles
    if (bookTitle === 'Untitled') return;

    if (!confirm(`Remove "${bookTitle}" from the shelf and move to off-shelf?`)) return;

    books_on_shelf.update(books => {
      const idx = books.findIndex(b => (b.title || b.Title) === bookTitle);
      if (idx === -1) return books;
      const updated = [...books];
      const removed = updated.splice(idx, 1)[0];
      // add removed book to off-shelf
      books_off_shelf.update(off => [...off, removed]);
      return updated;
    });
  }

  onMount(() => {
    if (textEl) {
      const textLength = textEl.getComputedTextLength();
      const availableHeight = height - 2 * stripHeight - 25; // leave padding
      if (textLength > availableHeight) {
        fontSize = Math.floor((availableHeight / textLength) * fontSize);
      }
    }
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} on:click={handleClick}>
  <!-- Book spine -->
  <rect width={width} height={height} rx="3" ry="3" fill={color} stroke="black" stroke-width="1" />
  <rect x="0" y="10" width={width} height={stripHeight} fill="black" />
  <rect x="0" y={height - stripHeight-10} width={width} height={stripHeight} fill="black" />

  <!-- Vertical title -->
  <text
    bind:this={textEl}
    x={width / 2}
    y={height / 2}
    fill="black"
    font-size={fontSize}
    font-family="Franklin Gothic Medium"
    text-anchor="middle"
    dominant-baseline="middle"
    transform={`rotate(-90 ${width / 2} ${height / 2})`}
  >
    {title}
  </text>
</svg>
