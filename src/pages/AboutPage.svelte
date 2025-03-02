<script lang="ts">
  import { fade } from "svelte/transition";
  import type { SvelteComponent } from "svelte";
  import SkillsPage from "./SkillsPage.svelte";
  import OthersPage from "./OthersPage.svelte";
  let { openPage = (id: string, component: typeof SvelteComponent) => {} } =
    $props();

  // Add carousel functionality
  let currentSlide = $state(0);
  let carouselContainer: HTMLElement;
  let captions = [
    "At my second trip in college.",
    "At my third trip in college.",
  ];

  function scrollToSlide(index: number) {
    if (!carouselContainer) return;
    currentSlide = index;
    carouselContainer.scrollTo({
      left: carouselContainer.clientWidth * index,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    if (!carouselContainer) return;
    const scrollPosition = carouselContainer.scrollLeft;
    const slideWidth = carouselContainer.clientWidth;
    const newSlide = Math.round(scrollPosition / slideWidth);

    // Only update if the slide actually changed
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
    }
  }
</script>

<div class="page-content" id="pagee" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/person.png"
      alt="stat"
      class="emoji h-[30px] mr-[8px] md:h-[40px] md:mr-[10px]"
    />
    <span class="heading">About Me</span>
  </div>
  <p class="quote">
    "Be yourself; everyone else is already taken." ~ Oscar Wilde
  </p>
  <hr class="separator mt-[10px]" />
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[200px]">
    <p class="page-text">
      I am Prathamesh Nikam, a front end developer (React, Svelte), a designer
      with a passion for creating intuitive and dynamic user experiences. I have
      a keen eye for detail and a strong understanding of modern web
      technologies. My work involves transforming complex ideas into elegant and
      functional designs, ensuring seamless interaction and engagement for
      users.
    </p>

    <div class="justify-center flex w-full md:w-fit flex-col mt-[30px]">
      <div class="image-placeholder w-full md:w-[350px] h-[180px]"></div>
      <span class="caption">At my second trip in college.</span>
    </div>

    <div class="content mt-[40px]">
      <p class="page-text">
        I am from Deola, Nashik. I am currently studying Computer Science and
        Engineering at IIIT Bhopal. My journey in the tech world started at an
        early age, and I have always been fascinated by the endless
        possibilities that technology offers. At college, I am actively involved
        in various tech communities and projects, constantly learning and
        growing my skills. Currently, I am the design lead at the college's
        coding club, Codame.
      </p>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <p class="page-text">
      In my free time, I enjoy playing table tennis, which helps me stay active.
      I also love cooking, trying new recipes and flavors. Coding new
      application ideas is another passion of mine, allowing me to bring
      creative solutions to life. Additionally, I unwind by playing games on PC.
    </p>

    <div class="image-section">
      <!-- Desktop view (visible only on larger screens) -->
      <div class="desktop-view flex gap-[20px] md:mt-[30px]">
        <div class="justify-center flex w-fit flex-col">
          <div class="image-placeholder w-[300px] h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
        <div class="justify-center flex w-fit flex-col">
          <div class="image-placeholder w-[300px] h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
      </div>

      <!-- Mobile carousel (visible only on smaller screens) -->
      <div class="mobile-carousel">
        <div
          class="carousel-container"
          bind:this={carouselContainer}
          onscroll={handleScroll}
        >
          <div class="carousel-slide">
            <div class="image-placeholder h-[175px]"></div>
          </div>
          <div class="carousel-slide">
            <div class="image-placeholder h-[175px]"></div>
          </div>
        </div>

        <!-- Caption container with fixed position -->
        <div class="caption-container">
          {#key currentSlide}
            <span class="carousel-caption" transition:fade={{ duration: 200 }}>
              {captions[currentSlide]}
            </span>
          {/key}
        </div>

        <!-- Navigation dots -->
        <div class="carousel-dots">
          {#each [0, 1] as dot, i}
            <button
              class="carousel-dot {currentSlide === i ? 'active' : ''}"
              onclick={() => scrollToSlide(i)}
              aria-label="Go to image {i + 1}"
            ></button>
          {/each}
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-[15px] items-baseline mt-[40px]">
      <span class="page-text"
        >You can check what game I am currently playing at</span
      >
      <button
        class="ml-[5px] py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
        tabindex="0"
        onclick={() => openPage("spot4", OthersPage)}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPage("spot4", OthersPage);
        }}
      >
        <span class="font-normal text-[14px] text-[#4C86FF]"
          >Other Than Work</span
        >
      </button>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <p class="page-text">I am proficient in several languages, including:</p>
    <div class="w-full">
      <div
        class="mt-[30px] flex overflow-x-auto pb-4 justify-start md:justify-center gap-[40px] scrollbar-hide"
      >
        <div class="flex-shrink-0">
          <div
            class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
          ></div>
          <span class="font-normal text-[14px] text-[#D0D0D0]">Marathi</span>
          <div class="flex justify-between mt-[10px] items-center">
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div
            class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
          ></div>
          <span class="font-normal text-[14px] text-[#D0D0D0]">English</span>
          <div class="flex justify-between mt-[10px] items-center">
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div
            class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
          ></div>
          <span class="font-normal text-[14px] text-[#D0D0D0]">Hindi</span>
          <div class="flex justify-between mt-[10px] items-center">
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div
            class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
          ></div>
          <span class="font-normal text-[14px] text-[#D0D0D0]">Japanese</span>
          <div class="flex justify-between mt-[10px] items-center">
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div
            class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
          ></div>
          <span class="font-normal text-[14px] text-[#D0D0D0]">C++</span>
          <div class="flex justify-between mt-[10px] items-center">
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
            <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-[15px] items-baseline mt-[40px] mb-[80px]">
      <p class="page-text">
        See what programming languages I know other than C++ at
      </p>
      <div
        class="py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
        role="button"
        tabindex="0"
        onclick={() => openPage("spot2", SkillsPage)}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPage("spot2", SkillsPage);
        }}
      >
        <span class="font-normal text-[14px] text-[#4C86FF]">Skills I Can</span>
      </div>
    </div>
  </div>
</div>

<style>
  .dot-not {
    background-color: rgba(76, 133, 255, 0.15); /* Blue color */
    border-radius: 50%; /* Makes the div a perfect circle */
    border: 0.001px solid rgba(76, 133, 255);
  }
  .dot {
    width: 6px; /* Same size for all dots */
    height: 6px;
    background-color: #4c86ff; /* Blue color */
    border-radius: 50%; /* Makes the div a perfect circle */
  }
  .page-text {
    color: #d0d0d0;
    font-weight: 300;
    font-size: 11.5px;
    font-family: jbm;
    line-height: 1.75;
  }
  .separator {
    border: none; /* Removes default border */
    height: 0.75px; /* Thickness of the line */
    background-color: rgba(255, 255, 255, 0.15);
    width: 100%; /* Makes the line full-width (can be adjusted) */
  }

  .heading {
    font-size: 30px;
    font-weight: 700;
    font-family: gsans;
  }
  span {
    height: fit-content;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: jbm;
  }

  .page-content {
    height: 100%;
    color: white;
  }

  .quote {
    font-style: italic;
    font-family: jbm;
    font-weight: 400;
    font-size: 11.5px;
    color: #808080;
  }

  .scrollable-section {
    max-height: calc(100%); /* Subtract the height of the pagination */
    overflow: auto;
    scrollbar-width: none;
    -moz-scrollbar-width: none;
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  .image-placeholder {
    background-color: #303030;
    border-radius: 10px;
  }

  .caption {
    text-align: center;
    color: #a0a0a0;
    font-size: 9px;
    margin-top: 12px;
  }

  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  @media screen and (max-width: 767px) {
    .heading {
      font-size: 20px;
    }

    .quote {
      font-size: 10px;
      line-height: 1.8;
    }

    .page-text {
      font-size: 10.5px;
    }
  }

  /* Image section responsive styles */
  .desktop-view {
    display: flex;
  }

  .mobile-carousel {
    display: none;
  }

  @media screen and (max-width: 767px) {
    .desktop-view {
      display: none;
    }

    .mobile-carousel {
      display: block;
      width: 100%;
      position: relative;
      margin: 25px 0;
    }

    .carousel-container {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      width: 100%;
      scroll-behavior: smooth;
      padding: 0 5px; /* Add some padding */
    }

    .carousel-container::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }

    .carousel-slide {
      flex: 0 0 90%; /* Slightly smaller than 100% to show a glimpse of next slide */
      width: 90%;
      scroll-snap-align: center;
      padding: 0 10px; /* Add padding to each slide */
      box-sizing: border-box;
    }

    .mobile-carousel .image-placeholder {
      width: 100%;
      margin: 0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add subtle shadow for depth */
    }

    .caption-container {
      height: 30px; /* Fixed height to prevent layout shifts */
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      position: relative;
      overflow: hidden;
    }

    .caption {
      text-align: center;
      color: #a0a0a0;
      font-size: 9px;
      width: 100%;
      display: inline-block;
    }

    .carousel-caption {
      text-align: center;
      color: #a0a0a0;
      font-size: 9px;
      width: 100%;
      display: block;
      position: absolute; /* Absolute position to avoid layout shifts */
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%); /* Center vertically */
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 2px;
      margin-top: 15px;
    }

    .carousel-dot {
      width: 6px;
      height: 6px;
      border-radius: 80%;
      background-color: rgba(76, 134, 255, 0.3);
      border: none;
      padding: 0;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.6;
    }

    .carousel-dot.active {
      background-color: #4c86ff;
      opacity: 1;
      transform: scale(1.05); /* Slightly enlarge the active dot */
    }
  }
</style>
