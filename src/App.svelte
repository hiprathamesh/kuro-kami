<script lang="ts">
  import { onMount } from "svelte";
  import { createSwapy } from "swapy";
  import gsap from "gsap";
  import { TextRevealEffect } from "../src/lib/components/ui/text-reveal/index";
  import { GradientAnimation } from "../src/lib/components/ui/gradient/index";
  import { writable } from "svelte/store";
  import PageManager from "./components/PageManager.svelte";
  import AboutPage from "./pages/AboutPage.svelte";
  import SkillsPage from "./pages/SkillsPage.svelte";
  import ProjectsPage from "./pages/ProjectsPage.svelte";
  import OthersPage from "./pages/OthersPage.svelte";
  import ContactPage from "./pages/ContactPage.svelte";
  import MisPage from "./pages/MisPage.svelte";
  import CurrentlyPage from "./pages/CurrentlyPage.svelte";
  import Stars from "./components/Stars.svelte";
  import { magneticHover } from './components/magneticHover';
  import {tooltip} from "./components/tooltip";



  let pageManager: PageManager;

  const pageComponents: Record<string, any> = {
    spot1: AboutPage,
    spot2: SkillsPage,
    spot3: ProjectsPage,
    spot4: OthersPage,
    spot5: ContactPage,
    spot6: MisPage,
    spot7: CurrentlyPage,
  };

  function handleGridClick(id: string) {
    console.log("Clicked ID:", id);
    if (pageComponents[id]) {
      console.log("Found component for ID:", id);
      console.log("Opening page:", id, pageComponents[id]);
      pageManager?.openPage(id, pageComponents[id]);
    } else {
      console.error("No component found for ID:", id);
    }
  }
  function handleOpenPage(event: CustomEvent<{ id: string; component: any }>) {
    const { id, component } = event.detail;
    pageManager.openPage(id, component);
  }

  let person: string = "/static/emojis/person.png";
  let hammer: string = "/static/emojis/hammer.png";
  let laptop: string = "/static/emojis/laptop.png";
  let umbrella: string = "/static/emojis/umbrella.png";
  let envelope: string = "/static/emojis/envelope.png";
  let stats: string = "/static/emojis/stats.png";

  // Define the type with a default empty string for emoji
  interface MarqueeItem {
    id: number;
    content: string;
    emoji?: string;
  }

  // Store to manage marquee components
  export const marqueeItems = writable<MarqueeItem[]>([
    { id: 0, content: "First Item", emoji: person },
    { id: 1, content: "Second Item is really the largest item" },
    { id: 2, content: "This is a new item" },
    { id: 3, content: "About my projects, those suck" },
    { id: 4, content: "Contact me anywhere" },
    { id: 5, content: "Hello, I'm pretty active on LinkedIn" },
    { id: 6, content: "Can't think of anything else now" },
    { id: 7, content: "You can always check my instagram" },
    { id: 8, content: "I don't have one" },
    { id: 9, content: "I listen to kendrick lamar" },
    { id: 10, content: "Not really" },
    { id: 11, content: "Kanye mostly" },
    { id: 12, content: "And I use arch, btw", emoji: laptop },
  ]);

  // Function to add a new item to the marquee
  export function addMarqueeItem(item: { content: string; emoji?: string }) {
    marqueeItems.update((items) => [
      ...items,
      {
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        ...item,
      },
    ]);
  }

  // Function to remove an item from the marquee
  export function removeMarqueeItem(id: number) {
    marqueeItems.update((items) => items.filter((item) => item.id !== id));
  }

  // Function to update an existing item
  export function updateMarqueeItem(id: number, updates: Partial<MarqueeItem>) {
    marqueeItems.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }
  let swapy;
  const words = `Hey, Prathamesh here!`;
  let ani = "back.out(1.5)";
  onMount(() => {
    // Ensure the container exists before initializing Swapy
    const container = document.querySelector(
      ".container"
    ) as HTMLElement | null;

    if (container) {
      swapy = createSwapy(container, {
        animation: "spring", // Options: dynamic, spring, or none
      });

      // Enable Swapy
      swapy.enable(true);
    } else {
      console.error("Swapy container not found!");
    }

    const header = document.querySelector(".head-first") as HTMLElement | null;
    const items1 = document.querySelector(".item1") as HTMLElement;
    const items2 = document.querySelector(".item2") as HTMLElement;
    const items3 = document.querySelector(".item3") as HTMLElement;
    const items4 = document.querySelector(".item4") as HTMLElement;
    const items5 = document.querySelector(".item5") as HTMLElement;
    const items6 = document.querySelector(".item6") as HTMLElement;
    const items7 = document.querySelector(".item7") as HTMLElement;

    // Staggered Animation for Tiles after Text Animation Completes
    gsap.fromTo(
      items1,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 2.2,
      }
    );
    gsap.fromTo(
      items2,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 2.4,
      }
    );
    gsap.fromTo(
      items3,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 2.8,
      }
    );
    gsap.fromTo(
      items4,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 2.6,
      }
    );
    gsap.fromTo(
      items5,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 3.0,
      }
    );
    gsap.fromTo(
      items6,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 3.2,
      }
    );
    gsap.fromTo(
      items7,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: ani,
        stagger: 0.15,
        delay: 3.4,
      }
    );

    // Select all elements with the class 'item'
    const items = document.querySelectorAll(".item");

    // Function to check and update the visibility of the span
    function checkWidth(item: HTMLElement) {
      const span = item.querySelector("span");
      if (span && item instanceof HTMLElement) {
        if (item.offsetWidth <= 160) {
          span.style.opacity = "0"; // Hide the span if the item width is <= 150px
        } else {
          span.style.opacity = "1"; // Show the span if the item width is > 150px
        }
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      // Recheck width for each item whenever its size changes
      items.forEach((item) => {
        checkWidth(item as HTMLElement);
      });
    });

    // Start observing each item for size changes
    items.forEach((item) => {
      if (item instanceof HTMLElement) {
        resizeObserver.observe(item);
        checkWidth(item); // Check width on initial load
      }
    });

    const marqueeContainer = document.querySelector(".marquee-container");
    const marqueeTrack = document.querySelector(".marquee-track");

    if (marqueeContainer && marqueeTrack) {
      // Initially hide and position the marquee at the bottom right
      gsap.set(marqueeContainer, {
        opacity: 0,
        //x: '10%',
        y: "100%",
      });

      // Create a timeline to animate the marquee after other animations
      const marqueeTimeline = gsap.timeline();

      marqueeTimeline
        .to(marqueeContainer, {
          opacity: 1,
          x: "0%",
          y: "0%",
          duration: 2.3,
          ease: "power4.inOut",
          delay: 2.3, // Adjust this delay to match the end of your tile animations
        })
        .add(() => {
          // Start the infinite marquee animation
          marqueeTrack.classList.add("animate");
        });
    }

    let remem = 0;
    let remem2 = 0;
    // Hover effect logic
    const marqueeItems = document.querySelectorAll(".marquee-item");

    marqueeItems.forEach((item) => {
      item.addEventListener("mouseenter", (event) => {
        const hItem = event.currentTarget as HTMLElement;
        const itemId: number = hItem.dataset.id
          ? parseInt(hItem.dataset.id)
          : 0;
        let originalWidth = hItem.offsetWidth;
        let neww = (originalWidth * 1.3 - originalWidth) / 2;

        // Reference the specific item using its ID
        const targetElement = document.querySelector(
          `.marquee-item[data-id="${(itemId + 1) % 25}"]`
        ) as HTMLElement;
        const targetElement2 = document.querySelector(
          `.marquee-item[data-id="${(itemId + 24) % 25}"]`
        ) as HTMLElement;
        let width1 = targetElement.offsetWidth;
        let width2 = targetElement2.offsetWidth;
        remem = width1;
        remem2 = width2;
        // Apply GSAP animation
        gsap.to(targetElement, {
          x: neww,
          //width: width1 - neww + "px", // Adjust the width to match your design
          duration: 0.01,
          ease: "elastic.in",
          zIndex: -1,
        });

        // Apply GSAP animation
        gsap.to(targetElement2, {
          x: -neww,
          //width: width2 - neww + "px",
          duration: 0.01,
          ease: "elastic.in",
          zIndex: -1,
        });

        gsap.to(hItem, {
          scale: 1.3,
          duration: 0.05,
          ease: "power3.out",
          transformOrigin: "bottom",
        });
      });

      item.addEventListener("mouseleave", (event) => {
        const hItem = event.currentTarget as HTMLElement;
        const itemId: number = hItem.dataset.id
          ? parseInt(hItem.dataset.id)
          : 0;
        let wwidth = hItem.offsetWidth;
        let neww = (wwidth - wwidth / 1.2) / 2;
        let neww2 = (wwidth * 1.2 - wwidth) / 2;

        // Reference the specific item using its ID
        const targetElement = document.querySelector(
          `.marquee-item[data-id="${(itemId + 1) % 25}"]`
        );
        const targetElement2 = document.querySelector(
          `.marquee-item[data-id="${(itemId + 24) % 25}"]`
        );

        // Apply GSAP animation
        gsap.to(targetElement, {
          x: 0,
          //width: remem + "px",
          duration: 0.01,
          ease: "elastic.out",
          zIndex: 0,
        });

        // Apply GSAP animation
        gsap.to(targetElement2, {
          x: 0,
          //width: remem2 + "px",
          duration: 0.01,
          ease: "elastic.out",
          zIndex: 0,
        });

        gsap.to(hItem, {
          scale: 1,
          duration: 0.05,
          ease: "power3.in",
          transformOrigin: "bottom",
        });
      });
    });
    const button = document.querySelector(".button1");
    const grid1 = document.querySelector(".item1") as HTMLElement;
    const grid2 = document.querySelector(".item2") as HTMLElement;
    const grid3 = document.querySelector(".item3") as HTMLElement;
    const grid4 = document.querySelector(".item4") as HTMLElement;
    const grid5 = document.querySelector(".item5") as HTMLElement;
    const grid6 = document.querySelector(".item6") as HTMLElement;
    const grid7 = document.querySelector(".item7") as HTMLElement;
    let duration = 0.5;
    function resetGridSmoothly() {
      const slots = [
        { slot: "slot1", area: "1/1/2/2" },
        { slot: "slot2", area: "1/2/2/3" },
        { slot: "slot3", area: "1/3/3/4" },
        { slot: "slot4", area: "2/1/3/3" },
        { slot: "slot5", area: "1/4/2/6" },
        { slot: "slot6", area: "2/4/3/5" },
        { slot: "slot7", area: "2/5/3/6" },
      ];

      // Create a timeline for the reset animation
      const resetTimeline = gsap.timeline();

      // First, fade out all items
      resetTimeline.to(".section", {
        opacity: 0,
        duration: 0.4,
        ease: "power1.in",
      });

      // Then reset grid positions
      resetTimeline.add(() => {
        slots.forEach(({ slot, area }) => {
          const items = document.querySelector(
            `[data-swapy-item="${slot}"]`
          ) as HTMLElement;

          const gridContainer = document.querySelector(
            "[data-grid-container]"
          ) as HTMLElement;

          if (items && gridContainer) {
            const itemParent = items.parentElement as HTMLElement;

            itemParent.style.gridArea = area;
            itemParent.style.position = "static";
            itemParent.style.top = "auto";
            itemParent.style.left = "auto";
            itemParent.style.width = "auto";
            itemParent.style.height = "auto";
          }
        });
      });

      // Finally, fade in the items
      resetTimeline.to(".section", {
        delay: 0.6,
        opacity: 1,
        duration: 0.4,
        ease: "power1.in",
      });
    }
    if (button) {
      console.log("Button found, adding event listener");
      button.addEventListener("click", (e) => {
        console.log("Button clicked");
        resetGridSmoothly();
      });
    } else {
      console.error("Button not found");
    }
  });
</script>

<main>
  <PageManager bind:this={pageManager} />
  <GradientAnimation>
    <div
      class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <div class="outer">
        <div class="button1 cursor-pointer">
          <TextRevealEffect {words} className="head-first" />
        </div>
        <div class="wrapper">
          <div class="container popo" data-grid-container>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="section item1" data-swapy-slot="spot1">
              <div
                class="item z-20"
                data-swapy-item="slot1"
                onclick={() => handleGridClick("spot1")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img
                  src="/static/emojis/person.png"
                  alt="person"
                  class="emoji"
                />
                <span>About Me</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/about-me-1.webp"
                    class="absolute bottom-0 right-0 max-h-[85%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/about-me-1.png"
                    class="absolute bottom-0 right-0 max-h-[85%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/about-me.webp" class="absolute bottom-0 right-0 max-h-[85%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/about-me.png" alt="about me" class="absolute bottom-0 right-0 max-h-[85%]" draggable="false"/>
                </picture>
              </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="section item2" data-swapy-slot="spot2">
              <div
                class="item z-20"
                data-swapy-item="slot2"
                onclick={() => handleGridClick("spot2")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img src="/static/emojis/hammer.png" alt="ham" class="emoji" />
                <span>Skills I Can</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/skills-1.webp"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/skills-1.png"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/skills.webp" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/skills.png" alt="about me" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                </picture>
              </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="section item3" data-swapy-slot="spot3">
              <div
                class="item z-20"
                data-swapy-item="slot3"
                onclick={() => handleGridClick("spot3")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img src="/static/emojis/laptop.png" alt="lap" class="emoji" />
                <span>My Projects</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/projects-1.webp"
                    class="absolute bottom-0 right-0 max-h-[100%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/projects-1.png"
                    class="absolute bottom-0 right-0 max-h-[100%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/projects.webp" class="absolute bottom-0 right-0 max-h-[100%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/projects.png" alt="about me" class="absolute bottom-0 right-0 max-h-[100%]" draggable="false"/>
                </picture>
              </div>
            </div>
            <div class="section item4" data-swapy-slot="spot4">
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <div
                class="item z-20"
                data-swapy-item="slot4"
                onclick={() => handleGridClick("spot4")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img
                  src="/static/emojis/umbrella.png"
                  alt="umb"
                  class="emoji"
                />
                <span>Other Than Work</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/others-1.webp"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/others-1.png"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/others.webp" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/others.png" alt="about me" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                </picture>
              </div>
            </div>
            <div class="section item5" data-swapy-slot="spot5">
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <div
                class="item"
                data-swapy-item="slot5"
                onclick={() => handleGridClick("spot5")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img
                  src="/static/emojis/envelope.png"
                  alt="envelope"
                  class="emoji"
                />
                <span>Contact Here</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/contact-1.webp"
                    class="absolute bottom-0 right-0 max-h-[95%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/contact-1.png"
                    class="absolute bottom-0 right-0 max-h-[95%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/contact.webp" class="absolute bottom-0 right-0 max-h-[95%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/contact.png" alt="about me" class="absolute bottom-0 right-0 max-h-[95%]" draggable="false"/>
                </picture>
              </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="section item6" data-swapy-slot="spot6">
              <div
                class="item-star"
                data-swapy-item="slot6"
                onclick={() => handleGridClick("spot6")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 50, scale: 0.95 }}
              >
                <Stars starCount={100} backgroundColor="rgba(41,41,41,1)" />
              </div>
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="section item7" data-swapy-slot="spot7">
              <div
                class="item"
                data-swapy-item="slot7"
                onclick={() => handleGridClick("spot7")}
                role="button"
                tabindex="0"
                use:magneticHover={{ intensity: 15, scale: 1.02 }}
              >
                <img src="/static/emojis/stats.png" alt="stat" class="emoji" />
                <span>Currently</span>
                <picture>
                  <source
                    type="image/webp"
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/webp/currently-1.webp"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source
                    media="(-webkit-min-device-pixel-ratio: 1.5)"
                    srcset="/static/tilePhotos/jpg/currently-1.png"
                    class="absolute bottom-0 right-0 max-h-[90%]"
                    draggable="false"
                  />
                  <source type="image/webp" srcset="/static/tilePhotos/webp/currently.webp" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                  <img src="/static/tilePhotos/jpg/currently.png" alt="about me" class="absolute bottom-0 right-0 max-h-[90%]" draggable="false"/>
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee-container z-50">
      <div class="marquee-track">
        <div class="marquee">
          {#each $marqueeItems as item (item.id)}
            <div class="marquee-item-wrapper">
              <div class="marquee-item" data-id={item.id}>
                {#if item.emoji}
                  <img src={item.emoji} alt="item emoji" class="emoji" />
                {/if}
                <span>{item.content}</span>
              </div>
            </div>
          {/each}
          {#each $marqueeItems as item (item.id)}
            <div class="marquee-item-wrapper">
              <div class="marquee-item" data-id={item.id + 13}>
                {#if item.emoji}
                  <img src={item.emoji} alt="item emoji" class="emoji" />
                {/if}
                <span>{item.content}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </GradientAnimation>
</main>

<style>
  .marquee-container {
    position: absolute;
    bottom: 10px;
    width: 100%;
    overflow: visible;
  }

  .marquee-track {
    width: 100%;
  }

  .marquee {
    display: flex;
    gap: 10px;
    width: max-content;
    animation: marquee 25s linear infinite;
    transition: transform 0.3s linear;
    will-change: transform; /* For better animation performance */
  }

  .marquee-item {
    max-width: 200px;
    gap: 5px;
    display: flex;
    align-items: center;
    padding: 15px 25px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    border-radius: 10px;
    background-color: rgba(41, 41, 41, 0.5);
    border: 1.2px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    flex-shrink: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition:
      transform 0.3s ease-out,
      margin 0.3s ease-out;
  }

  .marquee-item-wrapper {
    display: flex;
    align-items: flex-end;
    width: auto;
    transition: width 0.3s ease-out;
    overflow: visible;
  }

  .marquee-item:hover {
    z-index: 10;
  }

  .marquee-item .emoji {
    height: 15px;
    margin-right: 5px;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  .outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: fit-content;
  }

  :global(.head-first) {
    font-size: 45px;
    font-weight: 700;
    color: white;
    margin-bottom: 30px;
  }

  span {
    height: fit-content;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .emoji {
    height: 25px;
    margin-right: 10px;
  }

  .item {
    display: flex;
    padding: 30px;
    font-size: 25px;
    font-weight: 700;
    color: white;
    border-radius: 32px;
    background-color: rgba(41, 41, 41, 0.5);
    border: 1.2px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    flex: 1;
    overflow: hidden; /* Prevent content from overflowing */
    white-space: nowrap; /* Force text to stay on one line */
    text-overflow: ellipsis; /* Add "..." when text overflows */
  }
  .item-star {
    opacity: 0.5;
    display: flex;
    padding: 30px;
    font-size: 25px;
    font-weight: 700;
    color: white;
    border-radius: 32px;
    background-color: rgba(41, 41, 41, 0);
    border: 1.2px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    flex: 1;
    overflow: hidden; /* Prevent content from overflowing */
    white-space: nowrap; /* Force text to stay on one line */
    text-overflow: ellipsis; /* Add "..." when text overflows */
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: grid;
    grid-template-rows: 31.944vh 31.944vh;
    grid-template-columns: 17.969vw 17.969vw 17.969vw 8.073vw 13.021vw;
    gap: 30px;
  }

  .item1 {
    opacity: 0;
    display: flex;
    grid-area: 1/1/2/2;
  }
  .item2 {
    opacity: 0;
    display: flex;
    grid-area: 1/2/2/3;
  }
  .item3 {
    opacity: 0;
    display: flex;
    grid-area: 1/3/3/4;
  }
  .item4 {
    opacity: 0;
    display: flex;
    grid-area: 2/1/3/3;
  }
  .item5 {
    opacity: 0;
    display: flex;
    grid-area: 1/4/2/6;
  }
  .item6 {
    opacity: 0;
    display: flex;
    grid-area: 2/4/3/5;
  }
  .item7 {
    opacity: 0;
    display: flex;
    grid-area: 2/5/3/6;
  }

  /* Tablet layout (768px to 1024px) */
  @media screen and (max-width: 1024px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
    }

    .item1 { grid-area: 1/1/2/3; }
    .item2 { grid-area: 1/3/2/5; }
    .item3 { grid-area: 2/1/3/3; }
    .item4 { grid-area: 2/3/3/5; }
    .item5 { grid-area: 3/1/4/2; }
    .item6 { grid-area: 3/2/4/3; }
    .item7 { grid-area: 3/3/4/5; }
  }

  /* Mobile layout (320px to 767px) */
  @media screen and (max-width: 767px) {
    .container {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 12px;
    }

    .item1,
    .item2,
    .item3,
    .item4,
    .item5,
    .item6,
    .item7 {
      grid-area: auto;
    }

    .item {
      height: 180px;  /* Shorter height for mobile */
    }

    .emoji {
      width: 24px;  /* Smaller emoji for mobile */
      height: 24px;
    }

    span {
      font-size: 14px;  /* Smaller text for mobile */
    }

    picture img {
      max-height: 80%;  /* Slightly smaller images */
    }
  }

  /* Adjustments for smaller tablets */
  @media screen and (max-width: 900px) {
    .container {
      padding: 15px;
    }
  }

  /* Handle landscape mode on mobile */
  @media screen and (max-width: 767px) and (orientation: landscape) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
