<!-- PageManager.svelte -->

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import {
    backOut,
    cubicOut,
    expoOut,
    quadOut,
    quintOut,
    sineOut,
  } from "svelte/easing";
  import type { SvelteComponent } from "svelte";
  import gsap from "gsap";
  import { on } from "svelte/events";
  import { tooltip } from "./tooltip";
  import { onMount } from "svelte";

  onMount(() => {
    function handleMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (clientX < 50 && clientY > innerHeight - 50) {
        openPages = [];
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  interface Page {
    id: string;
    component: typeof SvelteComponent;
    zIndex: number;
    left?: number;
    isOpaque?: boolean;
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
    const overlap =
      openPages.length > 1
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
      return [
        {
          ...openPages[0],
          left: (window.innerWidth - PAGE_WIDTH) / 2,
        },
      ];
    }

    let nextLeft = SIDE_MARGIN;
    return openPages.map((page, index) => {
      const currentLeft = nextLeft;
      nextLeft += PAGE_WIDTH - overlap;
      return { ...page, left: currentLeft };
    });
  }

  // Open a new page
  export function openPage(
    id: string,
    component: typeof SvelteComponent
  ): void {
    const existingPage = openPages.find((p) => p.id === id);
    if (existingPage) {
      setActivePage(id);
      return;
    }

    openPages = [
      ...openPages,
      {
        id,
        component,
        zIndex: openPages.length + 1,
        left: 0, // Initial position will be updated
      },
    ];

    updatePositions();
    activePageId = id;
  }

  function closePage(id: string): void {
    openPages = openPages.filter((p) => p.id !== id);
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

  function animatePage(id: string): void {
    const pageElement = document.querySelector(`.page[data-page-id="${id}"]`);
    console.log("Page Element:", pageElement);
    if (pageElement) {
      gsap.fromTo(
        pageElement,
        { y: 0 }, // Start from the original position
        {
          y: -20, // Move up by 20px
          duration: 0.3, // Duration of the upward movement
          ease: "power4.out", // Fast start, decelerates towards the end
          onComplete: () => {
            // Translate back down
            gsap.to(pageElement, {
              y: 0, // Return to original position
              duration: 0.5,
              ease: "power4.out", // Smooth and elastic-like return
            });
          },
        }
      );
    }
  }

  function toggleOpacity(pageId: string): void {
    openPages = openPages.map((page) => {
      if (page.id === pageId) {
        return { ...page, isOpaque: !page.isOpaque };
      }
      return page;
    });
  }

  $: {
    console.log("Reactive openPages triggered:", openPages);
    calculatedPositions = calculatePositions();
    console.log("Calculated Positions updated:", calculatedPositions);
  }
</script>

<!-- Rest of the component remains the same -->
<div class="page-container">
  {#each openPages as { id, component, left, zIndex, isOpaque } (id)}
    <div
      class="page"
      data-page-id={id}
      role="region"
      aria-label="Page"
      style="
          left: {left}px;
          top: {TOP_MARGIN}px;
          z-index: {zIndex};
          background-color: rgba(28, 28, 28, {isOpaque ? '1' : '0.8'});
        "
      onmouseenter={() => {
        handleMouseEnter(id);
        animatePage(id);
      }}
      in:fly={{ x: 0, y: 200, duration: 600, delay: 0, easing: quintOut }}
      out:fly={{ x: 0, y: 200, duration: 600, delay: 0, easing: cubicOut }}
    >
      <div class="page-content px-[40px] pt-[30px]" id="page-content">
        <button
          class="h-[45px] w-[45px] bg-[rgba(41,41,41,0.60)] rounded-[8px] absolute top-[30px] right-[30px] cursor-pointer flex justify-center items-center"
          onclick={() => closePage(id)}
          aria-label="Close page"
          use:tooltip={{ text: "Minimize", position: "top" }}
          ><hr
            class="border-none h-[3.5px] bg-[rgba(255,255,255,0.2)] w-[16px] rounded-full"
          /></button
        >
        <button
          class="eye-btn absolute top-[30px] right-[85px] cursor-pointer flex justify-center items-center"
          class:is-active={isOpaque}
          class:active={isOpaque}
          onclick={() => toggleOpacity(id)}
          aria-label="Toggle opacity"
          use:tooltip={{
            text: isOpaque ? "Enable Blur" : "Disable Blur",
            position: "top",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2.5"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <svelte:component this={component} {openPage} {closePage} />
      </div>
    </div>
  {/each}
  {#if openPages.length > 1}
    <button
      class="h-[45px] w-[45px] bg-[rgba(41,41,41,0.60)] rounded-[8px] absolute top-[25px] left-[50%] transform -translate-x-1/2 cursor-pointer flex justify-center items-center pointer-events-auto"
      onclick={() => (openPages = [])}
      aria-label="Close all pages"
      in:fly={{ y: -50, duration: 600, easing: quintOut }}
      out:fly={{ y: -50, duration: 600, easing: quintOut }}
      use:tooltip={{ text: "Close All", position: "bottom" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        stroke-width="2.5"
      >
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  {/if}
</div>

<style>
  .eye-btn {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    background: transparent;
    transition: background 0.3s ease;
  }

  .eye-btn:hover {
    background: rgba(41, 41, 41, 0.4);
  }

  .eye-btn.is-active {
    background: rgba(41, 41, 41, 0.6);
  }
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
    top: 120px;
    height: calc(100% - 100px);
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
    position: relative;
    overflow: hidden;
  }
</style>
