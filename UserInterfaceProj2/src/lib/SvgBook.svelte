<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { books_on_shelf, books_off_shelf, user_profile } from './bookStore.js';

  export let color = '#916A2F';
  export let title = 'Untitled';
  export let shelf = null;
  export let spot = null;
  export let stripHeight = 2;

  export let baseWidth = 38;
  export let baseHeight = 140;

  let container;
  let width = baseWidth;
  let height = baseHeight;
  let fontSize = 20;
  let textEl;
  let popup = false;

  let resizeObserver;
  let unsubscribeProfile;

  function handleClick() {
    popup = !popup;
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') closePopup();
  }

  function closePopup() {
    popup = false;
  }

  function removeBook() {
    if (shelf !== null && spot !== null) {
      books_on_shelf.update(list => {
        const idx = list.findIndex(b =>
          b && Number(b.shelf) === Number(shelf) && Number(b.spot) === Number(spot)
        );
        if (idx === -1) return list;
        const updated = [...list];
        const removed = updated.splice(idx, 1)[0];
        if (removed) books_off_shelf.update(off => [...off, removed]);
        return updated;
      });
      return;
    }
    closePopup();
  }

  // Robust resize: set fontSize then measure computed text length; adjust down until it fits.
  async function resizeText() {
    if (!textEl) return;

    // ensure DOM is updated before measuring
    await tick();

    const maxFont = 20;
    const minFont = 6;
    fontSize = maxFont;
    // apply immediate font size to the element
    if (textEl) textEl.setAttribute('font-size', String(fontSize));
    await tick();

    const availableLength = (height || baseHeight) - 2 * stripHeight - 20;

    // measure and reduce fontSize until text length fits or minFont reached
    let attempts = 0;
    while (attempts < 40) {
      if(!textEl) break;
      const textLength = textEl.getComputedTextLength?.() || 0;
      if (textLength <= availableLength || fontSize <= minFont) break;
      fontSize = Math.max(minFont, fontSize - 1);
      textEl.setAttribute('font-size', String(fontSize));
      await tick();
      attempts++;
    }
  }

  // subscribe to profile changes to trigger resize when profile updates
  onMount(() => {
    resizeObserver = new ResizeObserver(() => resizeText());
    if (container) resizeObserver.observe(container);

    unsubscribeProfile = user_profile.subscribe(() => {
      // profile may affect title rendering; recompute font size
      resizeText();
    });

    // initial resize
    resizeText();
  });

  onDestroy(() => {
    if (resizeObserver && container) resizeObserver.unobserve(container);
    if (unsubscribeProfile) unsubscribeProfile();
  });

  // reactive: when title or dimension props change, resize
  $: title, width, height, stripHeight, resizeText();
</script>


<!-- Observe parent dynamically -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={container} style="display:inline-block;">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    on:click={handleClick}
  >
    <!-- Book spine -->
    <rect width={width} height={height} rx="3" ry="3" fill={color} stroke="black" stroke-width="1" />
    <rect x="0" y="10" width={width} height={stripHeight} fill="black" />
    <rect x="0" y={height - stripHeight - 10} width={width} height={stripHeight} fill="black" />

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
</div>

<!-- Popup Modal -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if popup}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="remove-modal-overlay" tabindex="0" on:click={closePopup} on:keydown={handleKeydown}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="remove-modal-window" on:click|stopPropagation>
      <p>Are you sure you want to remove <strong>{title}</strong> from the shelf?</p>

      <div class="remove-modal-buttons">
        <button class="remove-book-btn" on:click={removeBook}>Remove</button>
        <button class="close-remove-btn" on:click={closePopup}>Cancel</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .remove-modal-overlay {
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

  .remove-modal-window {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    color: #1a1a1a;
    padding: 32px;
    border-radius: 20px;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  .remove-modal-buttons {
    display: flex;
  }
  .remove-book-btn {
    display: block;
    margin: 0 auto;
    padding: 10px 24px;
    background: #e41919;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }
  .close-remove-btn {
    display: block;
    margin: 0 auto;
    padding: 10px 24px;
    background: #d8b4a0;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }
</style>