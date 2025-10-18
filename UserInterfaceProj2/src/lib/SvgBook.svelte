<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let color = "#916A2F";   // spine color
  export let title = "Untitled";  // book title
  export let width = 38;
  export let height = 110;
  export let stripHeight = 2     // top/bottom strips

  let fontSize = 20;               // default font size
  let textEl;

  function handleClick() {
    alert('click');
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
