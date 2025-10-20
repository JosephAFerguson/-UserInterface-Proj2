<script>
  import { onMount } from 'svelte';

  export let color = "white";   // circle fill
  export let character = "A";   // character to display
  export let active = false;    // whether to highlight the light

  let fontSize = 12;            // initial font size
  let textEl;
  const radius = 8;            // radius of the circle
  const padding = 2;            // space between text and circle edge

  onMount(() => {
    if (textEl) {
      // Get the computed text length
      const textLength = textEl.getComputedTextLength();
      const availableWidth = radius * 1.75 - 2 * padding;

      // Scale font size if text is too long
      if (textLength > availableWidth) {
        fontSize = Math.floor((availableWidth / textLength) * fontSize);
      }
    }
  });
</script>

<svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
  <!-- Circle -->
  <circle 
    cx="10" 
    cy="10" 
    r={radius} 
    fill={active ? 'yellow' : color} 
    stroke= 'black'
  />

  <!-- Centered character -->
  <text
    bind:this={textEl}
    x="10"
    y="10"
    fill="black"
    font-size={fontSize}
    font-family="Arial"
    text-anchor="middle"
    dominant-baseline="middle"
  >
    {character}
  </text>
</svg>
