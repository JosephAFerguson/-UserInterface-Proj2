<script>
  export let color = "#916A2F"; // book color
  export let title = "Untitled"; // book title
  export let width = 45;
  export let height = 150;
  export let stripHeight = 2; // height of the top/bottom strips
</script>

<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
  <!-- Main book rectangle -->
  <rect width={width} height={height} rx="3" ry="3" fill={color} stroke="black" stroke-width="1" />

  <!-- Top black strip -->
  <rect x="0" y="10" width={width} height={stripHeight} fill="black" />

  <!-- Bottom black strip -->
  <rect x="0" y={height - stripHeight-10} width={width} height={stripHeight} fill="black" />

  <!-- Vertical title text (rotated 90 degrees counterclockwise) -->
  <text
    x={width / 2}
    y={height / 2}
    fill="black"
    font-size="16"
    font-family="Franklin Gothic Medium"
    text-anchor="middle"
    dominant-baseline="middle"
    transform={`rotate(-90 ${width / 2} ${height / 2})`}
  >
    {title}
  </text>
</svg>
