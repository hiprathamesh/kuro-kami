<script lang="ts">
  import { onMount } from "svelte";
  import { createSwapy } from "swapy";
  import gsap from "gsap";
  import { TextRevealEffect } from "../src/lib/components/ui/text-reveal/index";
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

    // Check if the elements exist before animating
    if (header) {
      // Text Animation for "Hey, Prathamesh here!"
      gsap.from(header, {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "power4.out",
        onComplete: () => {
          if (1) {
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
                delay: 0.2,
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
                delay: 0.6,
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
                delay: 0.4,
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
                delay: 0.8,
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
                delay: 1.0,
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
                delay: 1.2,
              }
            );
          } else {
            console.error("No .item elements found!");
          }
        },
      });
    } else {
      console.error(".head-first element not found!");
    }
  });
</script>

<main>
  <div class="wrapper">
    <div class="outer">
      <TextRevealEffect {words} className="head-first" />
      <div class="wrapper">
        <div class="container">
          <div class="section-1 item1" data-swapy-slot="spot1">
            <div class="item bun" data-swapy-item="slot1">
              <img src="static/emojis/person.png" alt="person" class="emoji" />
              <span>About Me</span>
            </div>
          </div>
          <div class="section-2 item2" data-swapy-slot="spot2">
            <div class="item" data-swapy-item="slot2">
              <img src="static/emojis/hammer.png" alt="person" class="emoji" />
              <span>Skills I Can</span>
            </div>
          </div>
          <div class="section-3 item3" data-swapy-slot="spot3">
            <div class="item" data-swapy-item="slot3">
              <img src="static/emojis/laptop.png" alt="person" class="emoji" />
              <span>My Projects</span>
            </div>
          </div>
          <div class="section-4 item4" data-swapy-slot="spot4">
            <div class="item" data-swapy-item="slot4">
              <img
                src="static/emojis/umbrella.png"
                alt="person"
                class="emoji"
              />
              <span>Other Than Work</span>
            </div>
          </div>
          <div class="section-5 item5" data-swapy-slot="spot5">
            <div class="item" data-swapy-item="slot5">
              <img
                src="static/emojis/envelope.png"
                alt="person"
                class="emoji"
              />
              <span>Contact Here</span>
            </div>
          </div>
          <div class="section-6 item6" data-swapy-slot="spot6">
            <div class="item" data-swapy-item="slot6"></div>
          </div>
          <div class="section-7 item7" data-swapy-slot="spot7">
            <div class="item" data-swapy-item="slot7">
              <img src="static/emojis/stats.png" alt="person" class="emoji" />
              <span>Currently</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
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
