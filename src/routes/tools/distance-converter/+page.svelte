<script>
  import { titlePostfix } from '$lib/config';
  import { myShoeSize, friendShoeSize } from '$lib/stores/settings';

    // Reactive variables
    let myMeasuredDistance = 10; // distance in steps
    let friendMeasuredDistance = 0; // distance in steps
    let lastUpdated = 'my'; // Track the last updated field

    // Conversion function: Shoe size to foot length in CM (Paris point system)
    const shoeSizeToFootLength = (size) => size * 0.666;

    // Conversion for distance in steps to meters
    const stepsToMeters = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01;

    // Conversion for distance in steps to stoeptegels
    const stepsToStoeptegels = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01 / 0.3;

    // Conversion for distance in steps to footbags
    const stepsToFootbags = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01 / 0.05715;

    // Helper function to round to the nearest half
    const roundToNearestHalf = (value) => Math.round(value * 2) / 2;

    // Reactive calculations
    $: myFootLength = shoeSizeToFootLength($myShoeSize);
    $: friendFootLength = shoeSizeToFootLength($friendShoeSize);

    $: if (lastUpdated === 'my' && myMeasuredDistance !== 0) {
        friendMeasuredDistance = roundToNearestHalf((myFootLength / friendFootLength) * myMeasuredDistance);
    } else if (lastUpdated === 'friend' && friendMeasuredDistance !== 0) {
        myMeasuredDistance = roundToNearestHalf((friendFootLength / myFootLength) * friendMeasuredDistance);
    }

    function updateMyDistance(value) {
      myMeasuredDistance = Number(value);
        lastUpdated = 'my';
    }

    function updateFriendDistance(value) {
      friendMeasuredDistance = Number(value);
        lastUpdated = 'friend';
    }
</script>

<svelte:head>
    <title>Afstand Analyser 5000™ {titlePostfix}</title>
</svelte:head>

<section class="page-hero">
  <div class="hero-content">
    <span class="hero-badge">🧮 Tool</span>
    <h1>Distance Analyzer 5000™</h1>
    <p class="hero-description">
      For centuries traceurs have struggled with a fundamental problem…<br />
      Thanks to this revolutionary technology you can effortlessly convert jump distances to
      <b>the only correct unit: your shoe size</b>.<br />
      Enter your values and measure once and for all!
    </p>
  </div>
</section>

<section class="content-section">
  <div class="converter-grid">
    <div class="converter-card">
      <h2>Mine</h2>
      <div class="fields">
        <label class="field">
          <span class="label">Shoe size</span>
          <input type="number" bind:value={$myShoeSize} class="input" step="0.5" min="30" max="50" required />
        </label>
        <label class="field">
          <span class="label">Number of steps</span>
          <input
            type="number"
            value={myMeasuredDistance}
            oninput={(e) => updateMyDistance(e.currentTarget.value)}
            class="input"
            step="0.5"
            min="1"
            max="99"
            required
          />
        </label>
      </div>
    </div>

    <div class="converter-card">
      <h2>Friend</h2>
      <div class="fields">
        <label class="field">
          <span class="label">Shoe size</span>
          <input type="number" bind:value={$friendShoeSize} class="input" step="0.5" min="30" max="50" required />
        </label>
        <label class="field">
          <span class="label">Number of steps</span>
          <input
            type="number"
            value={friendMeasuredDistance}
            oninput={(e) => updateFriendDistance(e.currentTarget.value)}
            class="input"
            step="0.5"
            min="1"
            max="99"
            required
          />
        </label>
      </div>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="results-card">
    <h2>Results</h2>
    <p>
      Distance: <strong>{stepsToMeters(myMeasuredDistance).toFixed(2)}</strong> meters.
    </p>
    <p>
      That's <strong>{roundToNearestHalf(stepsToStoeptegels(myMeasuredDistance))}</strong> sidewalk tiles.
    </p>
    <p>
      Or <strong>{roundToNearestHalf(stepsToFootbags(myMeasuredDistance))}</strong> hacky sacks.
    </p>
  </div>
</section>

<style>
  .page-hero {
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--color-card) 92%, var(--color-primary) 8%) 0%,
      var(--color-background) 100%
    );
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 4rem 1.5rem;
    margin: 0 0 2rem 0;
    text-align: center;
    color: var(--color-foreground);
  }

  .page-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        900px 420px at 50% 0%,
        color-mix(in oklab, var(--color-primary) 26%, transparent),
        transparent 60%
      ),
      radial-gradient(
        800px 360px at 15% 15%,
        color-mix(in oklab, var(--color-accent) 18%, transparent),
        transparent 55%
      );
    opacity: 0.65;
    pointer-events: none;
  }

  :global(.dark) .page-hero::before {
    opacity: 0.85;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 52rem;
    margin: 0 auto;
  }

  .hero-badge {
    display: inline-block;
    background: color-mix(in oklab, var(--color-card) 80%, transparent);
    border: 1px solid color-mix(in oklab, var(--color-border) 85%, transparent);
    backdrop-filter: blur(8px);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .page-hero h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--color-foreground);
  }

  .hero-description {
    font-size: 1.125rem;
    opacity: 1;
    color: color-mix(in oklab, var(--color-foreground) 78%, transparent);
    max-width: 44rem;
    margin: 0 auto;
  }

  .page-hero :global(a) {
    color: inherit;
    text-decoration-color: currentColor;
    text-underline-offset: 3px;
  }

  .page-hero :global(a:hover) {
    color: inherit;
    text-decoration-thickness: 2px;
  }

  .content-section {
    margin-bottom: 2rem;
  }

  .converter-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .converter-grid {
      grid-template-columns: 1fr;
    }
  }

  .converter-card,
  .results-card {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 2rem;
  }

  .converter-card h2,
  .results-card h2 {
    margin-top: 0;
  }

  .fields {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
  }

  .field {
    display: grid;
    gap: 0.5rem;
  }

  .label {
    font-weight: 700;
    color: var(--color-foreground);
  }
</style>
