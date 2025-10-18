<script>
  function handleEyeClick() {
    alert("Eye button clicked!");
  }

  let showInfoModal = false;

  function handleInfoButtonClick() {
    showInfoModal = true;
  }

  function closeInfoModal() {
    showInfoModal = false;
  }

  export let books_on_shelf = [];
  export let books_off_shelf = [];
</script>

<main>
  <br />
  <button id="eye-button" on:click={handleEyeClick}>
    <img src="./public/eye.png" alt="Eye Icon" width="20" height="20" />
  </button>
  <button id="info-button" on:click={handleInfoButtonClick}>
    <img
      src="./public/information-button.png"
      alt="Info Icon"
      width="20"
      height="20"
    />
  </button>
  <div style="display:flex; align-items:center; width:90%;">
    <h1>Testing UI</h1>
  </div>
  <div style="display:flex; gap:8px;">
    <button type="button" id="add">+</button>
    <p style="margin:0" id="add-text">Add Books</p>
  </div>
  <br />
  <div style="display:flex; gap:8px;">
    <button type="button" id="remove">-</button>
    <p style="margin:0" id="remove-text">Remove Books</p>
  </div>
  <br />
  <button>Run Simulation</button>
  <br />
  <br />
  <button>Go to Data Display</button>
</main>

{#if showInfoModal}
  <div
    class="modal-overlay"
    on:click={closeInfoModal}
    on:keydown={(e) => e.key === "Escape" && closeInfoModal()}
    role="button"
    tabindex="0"
  >
    <div
      class="modal-window"
      on:click|stopPropagation
      on:keydown={(e) => e.key === "Escape" && closeInfoModal()}
      role="button"
      tabindex="0"
    >
      <h2>Testing UI – Button Guide</h2>
      <ul>
        <li><b>Add Books</b> → Adds new books to the smart shelf.</li>
        <li><b>Remove Books</b> → Removes selected books from the shelf.</li>
        <li>
          <b>Run Simulation</b> → Starts the automated shelf visualization.
        </li>
        <li><b>Go to Data Display</b> → Opens the analytics / metrics view.</li>
      </ul>
      <button class="close-btn" on:click={closeInfoModal}>Close</button>
    </div>
  </div>
{/if}

<style>
  main {
    margin-left: 5%;
  }

  button,
  select {
    cursor: pointer;
  }

  #eye-button,
  #info-button {
    background: none;
    border: none;
  }

  #info-button {
    float: right;
    margin-right: 5%;
  }

  #add,
  #remove {
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }

  #add-text,
  #remove-text {
    align-items: center;
    display: flex;
  }

  .modal-overlay {
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

.modal-window {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  color: #1a1a1a;
  padding: 32px;
  border-radius: 20px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-window h2 {
  text-align: center;
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.modal-window ul {
  list-style: none;
  padding: 0;
  margin: 0 0 28px 0;
}

.modal-window li {
  margin: 0 0 16px 0;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  line-height: 1.6;
  display: flex;
  align-items: center;
}

.modal-window li:last-child {
  margin-bottom: 0;
}

.modal-window li b {
  color: #8B4513;
  font-weight: 600;
  min-width: 140px;
}

.close-btn {
  display: block;
  margin: 0 auto;
  padding: 14px 32px;
  background: #8B4513;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}


</style>
