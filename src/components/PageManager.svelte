<!-- PageManager.svelte -->

<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { cubicOut, quintOut } from "svelte/easing";
  import type { SvelteComponent } from "svelte";
  import gsap from "gsap";
  import { tooltip } from "./tooltip";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { createEventDispatcher } from "svelte";

  export const pageManagerStore = writable({
    openPage: null as any,
  });

  let windowWidth: number;
  let isMobile = false;
  let touchStartX = 0;
  let currentPageIndex = 0;
  let showTabDropdown = false;

  // Track open pages and their order
  let openPages: Page[] = [];
  let activePageId: string | null = null;

  // Store for mobile tab scroll position
  const tabScrollPosition = writable(0);

  let dropdownContainer: HTMLDivElement;
  let scrollableContent: HTMLDivElement;
  let emojiButtons: HTMLButtonElement[] = [];

  // Add these new variables
  let longPressTimer: number | null = null;
  let isLongPressing = false;
  let activeTouchId: number | null = null;
  let currentlyTouchedIcon: number | null = null;
  let autoScrollInterval: number | null = null;
  let autoScrollAnimationId: number | null = null;
  let autoScrollSpeed = 0;
  let autoScrollTarget = 0;
  const LONG_PRESS_DURATION = 300; // ms
  const AUTO_SCROLL_EDGE_THRESHOLD = 60; // px - more reasonable edge detection
  const AUTO_SCROLL_MAX_SPEED = 20; // px per frame - significantly faster
  const AUTO_SCROLL_ACCELERATION = 0.8; // Faster acceleration
  const AUTO_SCROLL_EASING = 0.2; // Easing factor for smooth scrolling

  onMount(() => {
    windowWidth = window.innerWidth;
    isMobile = windowWidth <= 768;

    function handleMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (clientX < 50 && clientY > innerHeight - 50) {
        openPages = [];
      }
    }

    function handleResize() {
      windowWidth = window.innerWidth;
      isMobile = windowWidth <= 768;
      updatePositions();
    }

    function handleTouchStart(event: TouchEvent) {
      if (isMobile && openPages.length > 1) {
        touchStartX = event.touches[0].clientX;
      }
    }

    function handleTouchEnd(event: TouchEvent) {
      if (isMobile && openPages.length > 1) {
        const touchEndX = event.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;

        // Threshold for swipe detection (minimum 50px movement)
        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentPageIndex > 0) {
            // Swipe right - go to previous page
            switchToPage(currentPageIndex - 1);
          } else if (diff < 0 && currentPageIndex < openPages.length - 1) {
            // Swipe left - go to next page
            switchToPage(currentPageIndex + 1);
          }
        }
      }
    }

    function handlePageSelectEvent(event: CustomEvent) {
      handlePageSelect(event);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener(
      "pageselect",
      handlePageSelectEvent as EventListener
    );

    // Add this observer for the dropdown
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && showTabDropdown) {
          requestAnimationFrame(() => {
            updateEmojiScales();
            // Center the scroll position initially
            if (scrollableContent) {
              scrollableContent.scrollLeft =
                (scrollableContent.scrollWidth -
                  scrollableContent.offsetWidth) /
                2;
            }
          });
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener(
        "pageselect",
        handlePageSelectEvent as EventListener
      );
      observer.disconnect();
      if (longPressTimer !== null) {
        clearTimeout(longPressTimer);
      }
      if (autoScrollInterval !== null) {
        clearInterval(autoScrollInterval);
      }
      if (autoScrollAnimationId !== null) {
        cancelAnimationFrame(autoScrollAnimationId);
      }
    };
  });

  interface Page {
    id: string;
    component: typeof SvelteComponent;
    zIndex: number;
    left?: number;
    isOpaque?: boolean;
    emoji?: string; // Added emoji property for tabs
  }

  // Map for page emojis
  const pageEmojis: Record<string, string> = {
    spot1: "/static/emojis/person.png",
    spot2: "/static/emojis/hammer.png",
    spot3: "/static/emojis/laptop.png",
    spot4: "/static/emojis/umbrella.png",
    spot5: "/static/emojis/envelope.png",
    spot6: "/static/emojis/roots.png",
    spot7: "/static/emojis/stats.png",
    spot8: "/static/emojis/game.png",
    spot9: "/static/emojis/headphone.png",
    spot10: "/static/emojis/popcorn.png",
  };

  // Page dimensions
  const PAGE_WIDTH = 918;
  const TOP_MARGIN = 120;
  const SIDE_MARGIN = 80;
  const MOBILE_TAB_HEIGHT = 50;

  function updatePositions(): void {
    if (openPages.length === 0) return;

    if (isMobile) {
      // For mobile, pages are stacked with position based on current index
      return;
    }

    const totalWidth = window.innerWidth - 2 * SIDE_MARGIN;

    if (openPages.length === 1) {
      // Always center the first page
      openPages[0].left = (window.innerWidth - PAGE_WIDTH) / 2;
      return;
    }

    const overlap = Math.max(
      (openPages.length * PAGE_WIDTH - totalWidth) / (openPages.length - 1),
      0
    );

    // Update positions for multiple pages
    openPages.forEach((page, idx) => {
      page.left = SIDE_MARGIN + idx * (PAGE_WIDTH - overlap);
    });
  }

  function calculatePositions(): Page[] {
    if (openPages.length === 0) return [];

    if (isMobile) {
      // For mobile, return pages as is, positioning handled in template
      return openPages;
    }

    const totalWidth = window.innerWidth - 2 * SIDE_MARGIN;

    if (openPages.length === 1) {
      return [
        {
          ...openPages[0],
          left: (window.innerWidth - PAGE_WIDTH) / 2,
        },
      ];
    }

    const overlap = Math.max(
      (openPages.length * PAGE_WIDTH - totalWidth) / (openPages.length - 1),
      0
    );
    let nextLeft = SIDE_MARGIN;

    return openPages.map((page) => {
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
      if (isMobile) {
        // Find the index of the page and switch to it
        const pageIndex = openPages.findIndex((p) => p.id === id);
        if (pageIndex !== -1) {
          switchToPage(pageIndex);
        }
      }
      return;
    }

    // Add emoji information when opening a page
    openPages = [
      ...openPages,
      {
        id,
        component,
        zIndex: openPages.length + 1,
        left: 0, // Initial position will be updated
        emoji: pageEmojis[id], // Add emoji for the page
      },
    ];

    updatePositions();
    activePageId = id;

    if (isMobile) {
      // Switch to the newly opened page
      currentPageIndex = openPages.length - 1;
      // Update tab scroll position to ensure the new tab is visible
      updateTabScrollPosition();
    }
  }

  function closePage(id: string): void {
    const pageIndex = openPages.findIndex((p) => p.id === id);
    openPages = openPages.filter((p) => p.id !== id);

    // Handle current page index for mobile
    if (isMobile && pageIndex <= currentPageIndex) {
      currentPageIndex = Math.max(0, currentPageIndex - 1);
    }

    updatePositions();

    if (activePageId === id) {
      activePageId = openPages[openPages.length - 1]?.id || null;
    }
  }

  // Set active page and update z-index
  function setActivePage(id: string): void {
    const highestZIndex =
      Math.max(...openPages.map((page) => page.zIndex), 0) + 1;

    openPages = openPages.map((page) => ({
      ...page,
      zIndex: page.id === id ? highestZIndex : page.zIndex,
    }));

    activePageId = id;
  }

  // Handle mouse enter to bring page to front
  function handleMouseEnter(id: string): void {
    if (!isMobile) {
      setActivePage(id);
    }
  }

  // Switch to specific page on mobile
  function switchToPage(index: number): void {
    if (index >= 0 && index < openPages.length) {
      currentPageIndex = index;
      setActivePage(openPages[index].id);
      showTabDropdown = false; // Close dropdown when switching pages
      updateTabScrollPosition();
    }
  }

  // Update tab scroll position to keep current tab in view
  function updateTabScrollPosition(): void {
    if (isMobile && openPages.length > 0) {
      // Calculate position to center current tab
      const tabWidth = 60; // Width of each tab + margins
      const containerWidth = Math.min(windowWidth, 400); // Estimated container width
      const center = containerWidth / 2;
      const targetPosition =
        currentPageIndex * tabWidth - center + tabWidth / 2;

      // Limit scroll to valid range
      const maxScroll = Math.max(
        0,
        openPages.length * tabWidth - containerWidth
      );
      $tabScrollPosition = Math.max(0, Math.min(targetPosition, maxScroll));
    }
  }

  function animatePage(id: string): void {
    if (isMobile) return; // Skip animation on mobile

    const pageElement = document.querySelector(`.page[data-page-id="${id}"]`);
    if (pageElement) {
      gsap.fromTo(
        pageElement,
        { y: 0 },
        {
          y: -20,
          duration: 0.3,
          ease: "power4.out",
          onComplete: () => {
            gsap.to(pageElement, {
              y: 0,
              duration: 0.5,
              ease: "power4.out",
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

  // Toggle mobile tab dropdown
  function toggleTabDropdown(): void {
    showTabDropdown = !showTabDropdown;
  }

  // Handle touch start on add button
  function handleAddButtonTouchStart(event: TouchEvent): void {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
    }

    // Save the touch identifier for tracking this specific touch
    activeTouchId = event.touches[0].identifier;

    // Start long press timer
    longPressTimer = window.setTimeout(() => {
      isLongPressing = true;
      showTabDropdown = true;

      // Try to trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      // Initialize the dropdown position
      requestAnimationFrame(() => {
        if (scrollableContent) {
          scrollableContent.scrollLeft =
            (scrollableContent.scrollWidth - scrollableContent.offsetWidth) / 2;
          updateEmojiScales();
        }
      });
    }, LONG_PRESS_DURATION);
  }

  // Handle touch move events for dropdown navigation
  function handleTouchMove(event: TouchEvent): void {
    if (!showTabDropdown || !isLongPressing) return;

    // Find our active touch by ID
    let activeTouch: Touch | undefined;
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier === activeTouchId) {
        activeTouch = event.touches[i];
        break;
      }
    }

    if (!activeTouch || !dropdownContainer || !scrollableContent) return;

    // Prevent default behavior to avoid page scrolling
    event.preventDefault();

    // Get coordinates
    const touchX = activeTouch.clientX;
    const touchY = activeTouch.clientY;

    // Check if touch is within the dropdown container
    const containerRect = dropdownContainer.getBoundingClientRect();
    if (
      touchY >= containerRect.top &&
      touchY <= containerRect.bottom &&
      touchX >= containerRect.left &&
      touchX <= containerRect.right
    ) {
      // Get which emoji the touch is over
      let newTouchedIcon: number | null = null;

      // Calculate position relative to container for better edge detection
      const relativeX = touchX - containerRect.left;
      const containerWidth = containerRect.width;

      // Improved edge detection and scroll speed calculation
      if (relativeX < AUTO_SCROLL_EDGE_THRESHOLD) {
        // Auto-scroll right (towards the start) when near left edge
        const distanceFromEdge = Math.max(
          0,
          AUTO_SCROLL_EDGE_THRESHOLD - relativeX
        );
        const scrollFactor = Math.min(
          1,
          distanceFromEdge / AUTO_SCROLL_EDGE_THRESHOLD
        );

        // More aggressive speed calculation for faster scrolling
        autoScrollSpeed = -AUTO_SCROLL_MAX_SPEED * Math.pow(scrollFactor, AUTO_SCROLL_ACCELERATION);
        startAutoScroll();
      } else if (relativeX > containerWidth - AUTO_SCROLL_EDGE_THRESHOLD) {
        // Auto-scroll left (towards the end) when near right edge
        const distanceFromEdge = Math.max(
          0,
          relativeX - (containerWidth - AUTO_SCROLL_EDGE_THRESHOLD)
        );
        const scrollFactor = Math.min(
          1,
          distanceFromEdge / AUTO_SCROLL_EDGE_THRESHOLD
        );

        // More aggressive speed calculation for faster scrolling
        autoScrollSpeed = AUTO_SCROLL_MAX_SPEED * Math.pow(scrollFactor, AUTO_SCROLL_ACCELERATION);
        startAutoScroll();
      } else {
        // Stop auto-scrolling when not near edges
        stopAutoScroll();

        // Find which button is currently being touched
        for (let i = 0; i < emojiButtons.length; i++) {
          if (!emojiButtons[i]) continue;

          const buttonRect = emojiButtons[i].getBoundingClientRect();
          if (
            touchX >= buttonRect.left &&
            touchX <= buttonRect.right &&
            touchY >= buttonRect.top &&
            touchY <= buttonRect.bottom
          ) {
            newTouchedIcon = i;
            break;
          }
        }
      }

      // Update the currently touched icon
      if (newTouchedIcon !== currentlyTouchedIcon) {
        // Reset previous icon styling
        if (
          currentlyTouchedIcon !== null &&
          emojiButtons[currentlyTouchedIcon]
        ) {
          emojiButtons[currentlyTouchedIcon].classList.remove("touched");
        }

        // Apply styling to new icon
        if (newTouchedIcon !== null && emojiButtons[newTouchedIcon]) {
          emojiButtons[newTouchedIcon].classList.add("touched");
        }

        currentlyTouchedIcon = newTouchedIcon;
      }
    } else {
      // Touch outside dropdown
      resetTouchedIcon();
    }
  }

  // Handle touch end
  function handleTouchEnd(event: TouchEvent): void {
    // Check if this is our tracked touch
    let isActiveTouch = false;
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier === activeTouchId) {
        isActiveTouch = true;
        break;
      }
    }

    if (!isActiveTouch) return;

    // Clear long press timer if it hasn't triggered yet
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }

    // Handle touch end during dropdown interaction
    if (showTabDropdown && isLongPressing && currentlyTouchedIcon !== null) {
      // Get the page ID for the currently touched icon
      const pageId = getClosedPages()[currentlyTouchedIcon];
      if (pageId) {
        // Trigger page select event
        const event = new CustomEvent("pageselect", {
          detail: { id: pageId },
        });
        window.dispatchEvent(event);
      }
    }

    // Reset state
    isLongPressing = false;
    activeTouchId = null;
    resetTouchedIcon();
    stopAutoScroll();

    // Close dropdown after selection
    if (showTabDropdown) {
      showTabDropdown = false;
    }
  }

  function resetTouchedIcon(): void {
    if (currentlyTouchedIcon !== null && emojiButtons[currentlyTouchedIcon]) {
      emojiButtons[currentlyTouchedIcon].classList.remove("touched");
    }
    currentlyTouchedIcon = null;
  }

  // Replace interval-based scrolling with requestAnimationFrame for smoother animation
  function startAutoScroll(): void {
    // Only start a new animation frame if one isn't already running
    if (autoScrollAnimationId === null) {
      autoScrollAnimationId = requestAnimationFrame(autoScrollAnimationFrame);
    }
  }

  function autoScrollAnimationFrame(): void {
    if (!scrollableContent) {
      stopAutoScroll();
      return;
    }

    // Calculate bounds to prevent scrolling beyond limits
    const maxScrollLeft =
      scrollableContent.scrollWidth - scrollableContent.clientWidth;

    // Apply scrolling directly with velocity-based approach instead of target-based
    // This eliminates the janky behavior from the easing calculation
    scrollableContent.scrollLeft += autoScrollSpeed;

    // Clamp to bounds
    if (scrollableContent.scrollLeft < 0) {
      scrollableContent.scrollLeft = 0;
    } else if (scrollableContent.scrollLeft > maxScrollLeft) {
      scrollableContent.scrollLeft = maxScrollLeft;
    }

    // Update emoji scales after scrolling
    updateEmojiScales();

    // Continue the animation loop
    autoScrollAnimationId = requestAnimationFrame(autoScrollAnimationFrame);
  }

  function stopAutoScroll(): void {
    if (autoScrollAnimationId !== null) {
      cancelAnimationFrame(autoScrollAnimationId);
      autoScrollAnimationId = null;
      autoScrollSpeed = 0;
    }
  }

  // Get pages that aren't currently open (for the tab dropdown)
  function getClosedPages(): string[] {
    const openPageIds = openPages.map((page) => page.id);
    return Object.keys(pageEmojis).filter((id) => !openPageIds.includes(id));
  }

  // Helper function to get page names
  function getPageName(pageId: string): string {
    const pageNames: Record<string, string> = {
      spot1: "About Me",
      spot2: "Skills I Can",
      spot3: "My Projects",
      spot4: "Other Than Work",
      spot5: "Contact Here",
      spot6: "Misc",
      spot7: "Currently",
      spot8: "Playing",
      spot9: "Listening",
      spot10: "Watching",
    };

    return pageNames[pageId] || pageId;
  }

  // Update the updateEmojiScales function
  function updateEmojiScales() {
    if (!dropdownContainer || !scrollableContent) return;

    const containerRect = dropdownContainer.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;

    // Very narrow edge threshold (in pixels)
    const edgeThreshold = 25;

    emojiButtons.forEach((button) => {
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const buttonCenter = (rect.left + rect.right) / 2;

      // Default scale and opacity
      let scale = 1;
      let opacity = 1;

      // Calculate distance from edges
      const distFromLeft = buttonCenter - containerLeft;
      const distFromRight = containerRight - buttonCenter;

      // Button is outside the container to the left
      if (buttonCenter < containerLeft) {
        scale = 0.1;
        opacity = 0;
      }
      // Button is outside the container to the right
      else if (buttonCenter > containerRight) {
        scale = 0.1;
        opacity = 0;
      }
      // Button is near the left edge (entering)
      else if (distFromLeft < edgeThreshold) {
        const progress = distFromLeft / edgeThreshold;
        // Non-linear scaling for more dramatic effect at the edge
        scale = 0.1 + Math.pow(progress, 1.8) * 0.8;
        opacity = progress;
      }
      // Button is near the right edge (exiting)
      else if (distFromRight < edgeThreshold) {
        const progress = distFromRight / edgeThreshold;
        // Non-linear scaling for more dramatic effect at the edge
        scale = 0.1 + Math.pow(progress, 1.8) * 0.8;
        opacity = progress;
      }

      // Apply the transformation
      button.style.transform = `scale(${scale})`;
      button.style.opacity = opacity.toString();
    });
  }

  $: {
    console.log(showTabDropdown);
    windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    isMobile = windowWidth <= 768;
    // Only apply calculated positions for desktop
    if (!isMobile) {
      calculatedPositions = calculatePositions();
    }
  }

  let calculatedPositions = calculatePositions();

  // Update the store with reference to the openPage function
  $: {
    pageManagerStore.update((store) => ({
      ...store,
      openPage: openPage,
    }));
  }

  // Function to handle pageselect events directly (without the context module)
  function handlePageSelect(event: CustomEvent) {
    const { id } = event.detail;
    // Dispatch event to parent component to open the correct page
    // since we can't know about actual page components here
    dispatch("open-page", { id });
  }

  const dispatch = createEventDispatcher();
</script>

<div class="page-container">
  {#if isMobile}
    <!-- Add backdrop blur overlay -->
    {#if openPages.length > 0}
      <div 
        class="mobile-backdrop-blur"
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 200 }}
      ></div>
    {/if}
    
    <!-- Mobile Layout with Tabs -->
    <div
      class="mobile-tab-container"
      style="top: {Math.max(10, TOP_MARGIN / 3)}px;"
    >
      {#if openPages.length > 0}
        <div class="mobile-tabs-wrapper w-full">
          <div
            class="mobile-tabs"
            style="transform: translateX(-{$tabScrollPosition}px)"
          >
            {#each openPages as { id, emoji }, index (id)}
              <button
                class="mobile-tab {index === currentPageIndex ? 'active' : ''}"
                onclick={() => switchToPage(index)}
                aria-label={`Switch to page ${index + 1}`}
              >
                <img src={emoji} alt="" class="mobile-tab-emoji" />
              </button>
            {/each}

            <!-- Only show plus button if there are closed pages available -->
          </div>
          {#if getClosedPages().length > 0}
            <button
              class="mobile-tab add-tab absolute right-0 mr-[16px]"
              onclick={() => toggleTabDropdown()}
              ontouchstart={handleAddButtonTouchStart}
              ontouchmove={handleTouchMove}
              ontouchend={handleTouchEnd}
              ontouchcancel={handleTouchEnd}
              aria-label="Add new page"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="rgba(255,255,255,0.6)"
                fill="none"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          {/if}
        </div>

        <!-- Replace the dropdown section with this -->
        {#if showTabDropdown}
          <div
            class="w-[300px] h-[60px] mt-[16px] overflow-hidden bg-[rgba(41,41,41,0.9)] border border-[rgba(255,255,255,0.15)] rounded-[12px] backdrop-blur-[10px] z-[50]"
            transition:slide={{ duration: 200 }}
            bind:this={dropdownContainer}
            ontouchmove={handleTouchMove}
            ontouchend={handleTouchEnd}
            ontouchcancel={handleTouchEnd}
          >
            <div
              class="w-full h-full overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth"
              bind:this={scrollableContent}
              onscroll={() => updateEmojiScales()}
            >
              <div class="h-full w-fit flex items-center gap-[24px] px-[20px]">
                {#each getClosedPages() as pageId, i}
                  <button
                    bind:this={emojiButtons[i]}
                    class="emoji-button-transition flex-none w-[42px] h-[42px] flex items-center justify-center rounded-[8px]"
                    onclick={() => {
                      const event = new CustomEvent("pageselect", {
                        detail: { id: pageId },
                      });
                      window.dispatchEvent(event);
                      showTabDropdown = false;
                    }}
                  >
                    <img
                      src={pageEmojis[pageId]}
                      alt=""
                      class="w-[30px] h-[30px]"
                      draggable="false"
                    />
                  </button>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      {/if}
    </div>

    <!-- Mobile Pages -->
    {#each openPages as { id, component, isOpaque }, index (id)}
      <div
        class="page mobile-page"
        class:active={index === currentPageIndex}
        data-page-id={id}
        role="region"
        aria-label="Page"
        style="
          background-color: rgba(28, 28, 28, {isOpaque ? '1' : '0.8'});
        "
        in:fly={{ x: 0, y: 100, duration: 400, delay: 0, easing: quintOut }}
        out:fly={{ x: 0, y: 100, duration: 300, delay: 0, easing: cubicOut }}
      >
        <div class="page-content px-[20px] pt-[15px]" id="page-content">
          <button
            class="mobile-close-btn"
            onclick={() => closePage(id)}
            aria-label="Close page"
            ><hr
              class="border-none h-[3px] bg-[rgba(255,255,255,0.2)] w-[14px] rounded-full"
            /></button
          >
          <!-- <button
            class="mobile-opacity-btn {isOpaque ? 'is-active' : ''}"
            onclick={() => toggleOpacity(id)}
            aria-label="Toggle opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              stroke-width="2.5"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button> -->
          <svelte:component this={component} {openPage} {closePage} />
        </div>
      </div>
    {/each}
  {:else}
    <!-- Desktop Layout -->
    {#each openPages as { id, component, left, zIndex, isOpaque } (id)}
      <div
        class="page desktop-page"
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
  {/if}

  {#if !isMobile && openPages.length > 1}
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
    background: rgba(28, 28, 28, 0.8);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(7.5px);
    pointer-events: all;
    overflow: hidden;
  }

  .desktop-page {
    width: 918px;
    top: 120px;
    height: calc(100% - 100px);
    border-radius: 15px 15px 0px 0px;
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

  /* Mobile Styles */
  .mobile-page {
    width: 95%;
    height: calc(100% - 70px);
    top: 120px;
    left: 2.5%;
    border-radius: 20px 20px 0 0;
    transform: translateY(100%);
    opacity: 0;
    transition:
      transform 0.4s ease,
      opacity 0.4s ease;
    z-index: 1;
  }

  .mobile-page.active {
    transform: translateY(0);
    opacity: 1;
    z-index: 2;
  }

  .mobile-tab-container {
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 110;
    pointer-events: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobile-tabs-wrapper {
    max-width: 100%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    padding: 0 15px;
    -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }

  .mobile-tabs-wrapper::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome/Safari */
  }

  .mobile-tabs {
    display: flex;
    gap: 10px;
    transition: transform 0.3s ease;
    padding: 0 5px;
  }

  .mobile-tab {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: rgba(41, 41, 41, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    flex-shrink: 0;
  }

  .mobile-tab.active {
    background-color: rgba(60, 60, 60, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .mobile-tab-emoji {
    width: 24px;
    height: 24px;
  }

  .mobile-close-btn {
    position: absolute;
    top: 15px;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: rgba(41, 41, 41, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-close-btn {
    right: 15px;
  }

  @media (max-width: 768px) {
    .page-content {
      padding: 20px 15px !important;
    }
  }

  /* Add this to your existing <style> section */
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  .scroll-smooth {
    scroll-behavior: smooth;
  }

  /* Ensure transforms are GPU-accelerated */
  button {
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  /* Add transition for smooth emoji scaling */
  .emoji-button-transition {
    transition:
      transform 0.08s ease-out,
      opacity 0.08s ease-out;
    will-change: transform, opacity;
  }

  /* Add styles for the touched emoji button */
  .emoji-button-transition {
    transition:
      transform 0.08s ease-out,
      opacity 0.08s ease-out,
      background-color 0.15s ease;
    will-change: transform, opacity;
    transform-origin: center bottom;
  }

  /* Mobile backdrop blur */
  .mobile-backdrop-blur {
    position: fixed;
    inset: 0;
    background-color: rgba(10, 10, 10, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 1;
    pointer-events: none;
  }

  /* Ensure mobile pages are above the blur overlay */
  .mobile-page.active {
    transform: translateY(0);
    opacity: 1;
    z-index: 2;
  }
</style>
