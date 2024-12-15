<!-- PageManager.svelte -->

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import type { SvelteComponent } from "svelte";

  interface Page {
    id: string;
    component: typeof SvelteComponent;
    zIndex: number;
    left?: number;
  }

  // Track open pages and their order
  let openPages: Page[] = [];
  let activePageId: string | null = null;

  // Page dimensions
  const PAGE_WIDTH = 918;
  const TOP_MARGIN = 120;
  const SIDE_MARGIN = 80;

  function updatePositions(): void {
    const totalWidth = window.innerWidth - 2 * SIDE_MARGIN;
    const overlap = openPages.length > 1 
      ? (openPages.length * PAGE_WIDTH - totalWidth) / (openPages.length - 1) 
      : 0;

    if (openPages.length === 1) {
      const centerPosition = (window.innerWidth - PAGE_WIDTH) / 2;
      openPages[0].left = centerPosition;
      return;
    }

    // Update positions in place
    openPages.forEach((page, idx) => {
      page.left = SIDE_MARGIN + idx * (PAGE_WIDTH - overlap);
    });
  }

  function calculatePositions(): Page[] {
    if (openPages.length === 0) return [];
    
    const totalWidth = window.innerWidth - 2 * SIDE_MARGIN;
    const overlap =
      openPages.length > 1
        ? (openPages.length * PAGE_WIDTH - totalWidth) / (openPages.length - 1)
        : 0;

    if (openPages.length === 1) {
      return [{
        ...openPages[0],
        left: (window.innerWidth - PAGE_WIDTH) / 2
      }];
    }

    let nextLeft = SIDE_MARGIN;
    return openPages.map((page, index) => {
      const currentLeft = nextLeft;
      nextLeft += PAGE_WIDTH - overlap;
      return { ...page, left: currentLeft };
    });
  }
  function calculatePositionsClose(): Page[] {
    const num = openPages.length;
    const totalWidth = window.innerWidth - 2 * SIDE_MARGIN;
    const overlap =
      openPages.length > 1
        ? (openPages.length * PAGE_WIDTH - totalWidth) / (openPages.length - 1)
        : 0;

    // Start assigning positions from index 0
    let nextLeft = SIDE_MARGIN;
    if (openPages.length === 1) {
      openPages[0].left = (window.innerWidth - PAGE_WIDTH) / 2;
      return openPages;
    }

    return openPages.map((page) => {
      const currentLeft = nextLeft; // Assign the current position to this page
      nextLeft += PAGE_WIDTH - overlap; // Calculate the position for the next page

      return { ...page, left: currentLeft };
    });
  }

  // Open a new page
  export function openPage(id: string, component: typeof SvelteComponent): void {
    const existingPage = openPages.find(p => p.id === id);
    if (existingPage) {
      setActivePage(id);
      return;
    }

    openPages = [...openPages, {
      id,
      component,
      zIndex: openPages.length + 1,
      left: 0 // Initial position will be updated
    }];
    
    updatePositions();
    activePageId = id;
  }

  function closePage(id: string): void {
    openPages = openPages.filter(p => p.id !== id);
    updatePositions();
    
    if (activePageId === id) {
      activePageId = openPages[openPages.length - 1]?.id || null;
    }
  }


  // Set active page and update z-index
  function setActivePage(id: string): void {
    const highestZIndex =
      Math.max(...openPages.map((page) => page.zIndex), 0) + 1; // Ensure proper z-index increment

    openPages = openPages.map((page) => ({
      ...page,
      zIndex: page.id === id ? highestZIndex : page.zIndex, // Set highest z-index to active page
    }));
  }

  // Handle mouse enter to bring page to front
  function handleMouseEnter(id: string): void {
    setActivePage(id);
  }
  let calculatedPositions = calculatePositions();

  $: {
    console.log("Reactive openPages triggered:", openPages);
    calculatedPositions = calculatePositions();
    console.log("Calculated Positions updated:", calculatedPositions);
  }
</script>

<!-- Rest of the component remains the same -->
<div class="page-container">
  {#each openPages as { id, component, left, zIndex } (id)}
    <div
      class="page"
      role="region"
      aria-label="Page"
      style="
          left: {left}px;
          top: {TOP_MARGIN}px;
          z-index: {zIndex};
        "
      on:mouseenter={() => handleMouseEnter(id)}
      in:fly={{ x: 0, y: 500, duration: 800, delay: 0, easing: cubicOut }}
      out:fly={{ x: 0, y: 500, duration: 800, delay: 0, easing: cubicOut }}
    >
      <div class="page-content">
        <button
          class="close-btn"
          on:click={() => closePage(id)}
          aria-label="Close page"
          >×
        </button>
        <svelte:component this={component} />
      </div>
    </div>
  {/each}
</div>

<style>
  .page-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 100;
  }

  .page {
    position: absolute;
    width: 918px;
    height: 960px;
    background: rgba(28, 28, 28, 0.8);
    border-radius: 15px 15px 0px 0px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(7.5px);
    pointer-events: all;
    overflow: hidden;
    transition:
      left 0.3s ease-out,
      top 0.3s ease-out,
      right 0.3s ease-out;
  }

  .page-content {
    height: 100%;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 10;
  }
</style>
