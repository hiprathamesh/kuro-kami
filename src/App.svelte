<script lang="ts">
  import { onMount } from "svelte";
  import { createSwapy } from "swapy";
  import gsap from "gsap";
  import { TextRevealEffect } from "../src/lib/components/ui/text-reveal/index";
  import { writable } from "svelte/store";

  let person:string="/static/emojis/person.png";
  let hammer:string="/static/emojis/hammer.png";
  let laptop:string="/static/emojis/laptop.png";
  let umbrella:string="/static/emojis/umbrella.png";
  let envelope:string="/static/emojis/envelope.png";
  let stats:string="/static/emojis/stats.png";

  // Define the type with a default empty string for emoji
  interface MarqueeItem {
    id: number;
    content: string;
    emoji?: string;
  }

  // Store to manage marquee components
  export const marqueeItems = writable<MarqueeItem[]>([
    { id: 1, content: "First Item", emoji: person },
    { id: 2, content: "Second Item is really the largest item" },
    { id: 3, content: "This is a new item" },
    { id: 4, content: "About my projects, those suck" },
    { id: 5, content: "Contact me anywhere" },
    { id: 6, content: "Hello, I'm pretty active on LinkedIn" },
    { id: 7, content: "Can't think of anything else now" },
    { id: 8, content: "You can always check my instagram" },
    { id: 9, content: "I don't have one" },
    { id: 10, content: "I listen to kendrick lamar" },
    { id: 11, content: "Not really" },
    { id: 12, content: "Kanye mostly" },
    { id: 13, content: "And I use arch, btw", emoji: laptop},
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
        ease: "power3.out",
        stagger: 0.15,
        delay: 2.2
      }
    );
    gsap.fromTo(
      items2,
      { opacity: 0, y: 50 },
      {
        opacity: 1, // Ensure the tiles are visible after animation
        y: 0, // Set them back to their normal position
        duration: 0.8,
        ease: "power3.out",
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
        ease: "power3.out",
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
        ease: "power3.out",
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
        ease: "power3.out",
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
        ease: "power3.out",
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
        ease: "power3.out",
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
  });
</script>

<main>
  <div class="wrapper">
    <div class="outer">
      <TextRevealEffect {words} className="head-first" />
      <div class="wrapper">
        <div class="container">
          <div class="section-1 item1" data-swapy-slot="spot1">
            <div class="item" data-swapy-item="slot1">
              <img src="/static/emojis/person.png" alt="person" class="emoji" />
              <span>About Me</span>
            </div>
          </div>
          <div class="section-2 item2" data-swapy-slot="spot2">
            <div class="item" data-swapy-item="slot2">
              <img src="/static/emojis/hammer.png" alt="ham" class="emoji" />
              <span>Skills I Can</span>
            </div>
          </div>
          <div class="section-3 item3" data-swapy-slot="spot3">
            <div class="item" data-swapy-item="slot3">
              <img src="/static/emojis/laptop.png" alt="lap" class="emoji" />
              <span>My Projects</span>
            </div>
          </div>
          <div class="section-4 item4" data-swapy-slot="spot4">
            <div class="item" data-swapy-item="slot4">
              <img src="/static/emojis/umbrella.png" alt="umb" class="emoji" />
              <span>Other Than Work</span>
            </div>
          </div>
          <div class="section-5 item5" data-swapy-slot="spot5">
            <div class="item" data-swapy-item="slot5">
              <img src="/static/emojis/envelope.png" alt="env" class="emoji" />
              <span>Contact Here</span>
            </div>
          </div>
          <div class="section-6 item6" data-swapy-slot="spot6">
            <div class="item" data-swapy-item="slot6"></div>
          </div>
          <div class="section-7 item7" data-swapy-slot="spot7">
            <div class="item" data-swapy-item="slot7">
              <img src="/static/emojis/stats.png" alt="stat" class="emoji" />
              <span>Currently</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="marquee-container">
    <div class="marquee-track">
      <div class="marquee">
        {#each $marqueeItems as item (item.id)}
          <div class="marquee-item">
            {#if item.emoji}
              <img src={item.emoji} alt="item emoji" class="emoji" />
            {/if}
            <span>{item.content}</span>
          </div>
        {/each}
        {#each $marqueeItems as item (item.id + "duplicate")}
          <div class="marquee-item">
            {#if item.emoji}
              <img src={item.emoji} alt="item emoji" class="emoji" />
            {/if}
            <span>{item.content}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  .marquee-container {
    position: absolute;
    bottom: 10px;
    width: 100%;
    overflow: hidden;
  }

  .marquee-track {
    width: 100%;
  }

  .marquee {
    display: flex;
    gap: 10px;
    width: max-content;
    animation: marquee 25s linear infinite;
  }

  .marquee:hover {
    animation-play-state: paused;
  }

  .marquee-item {
    max-width: 200px;
    display: flex;
    align-items: center;
    padding: 15px 25px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    border-radius: 10px;
    background-color: rgba(41, 41, 41, 0.5);
    border: 1.2px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    flex-shrink: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: grid;
    grid-template-rows: 345px 345px;
    grid-template-columns: 345px 345px 345px 155px 250px;
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
</style>
