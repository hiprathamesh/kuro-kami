<script lang="ts">
  import { onMount } from "svelte";
  import { createSwapy } from "swapy";
  import gsap from "gsap";

  let swapy;

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
    const items = document.querySelector(".item1") as HTMLElement;

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
            gsap.from(items, {
              opacity: 0, // Ensure the tiles are visible after animation
              y: -50, // Set them back to their normal position
              duration: 1.2,
              ease: "power4.out",
          

            });
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
      <span class="head-first">Hey, Prathamesh here!</span>
      <div class="wrapper">
        <div class="container">
          <div class="section-1 item1" data-swapy-slot="spot1">
            <div class="item" data-swapy-item="slot1">
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

  .head-first {
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
    display: flex;
    grid-area: 1/1/2/2;
  }
  .item2 {
    display: flex;
    grid-area: 1/2/2/3;
  }
  .item3 {
    display: flex;
    grid-area: 1/3/3/4;
  }
  .item4 {
    display: flex;
    grid-area: 2/1/3/3;
  }
  .item5 {
    display: flex;
    grid-area: 1/4/2/6;
  }
  .item6 {
    display: flex;
    grid-area: 2/4/3/5;
  }
  .item7 {
    display: flex;
    grid-area: 2/5/3/6;
  }
</style>
