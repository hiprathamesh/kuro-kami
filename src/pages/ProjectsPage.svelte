<script lang="ts">
  import { fade } from "svelte/transition";

  // Add carousel functionality
  let currentSlide1 = $state(0);
  let currentSlide2 = $state(0);
  let carouselContainer1: HTMLElement;
  let carouselContainer2: HTMLElement;
  let captions1 = [
    "At my first trip in college.",
    "At my second trip in college.",
  ];
  let captions2 = [
    "At my third trip in college.",
    "At my fourth trip in college.",
  ];

  function scrollToSlide1(index: number) {
    if (!carouselContainer1) return;
    currentSlide1 = index;
    carouselContainer1.scrollTo({
      left: carouselContainer1.clientWidth * index,
      behavior: "smooth",
    });
  }

  function scrollToSlide2(index: number) {
    if (!carouselContainer2) return;
    currentSlide2 = index;
    carouselContainer2.scrollTo({
      left: carouselContainer2.clientWidth * index,
      behavior: "smooth",
    });
  }

  function handleScroll1() {
    if (!carouselContainer1) return;
    const scrollPosition = carouselContainer1.scrollLeft;
    const slideWidth = carouselContainer1.clientWidth;
    const newSlide = Math.round(scrollPosition / slideWidth);

    // Only update if the slide actually changed
    if (newSlide !== currentSlide1) {
      currentSlide1 = newSlide;
    }
  }

  function handleScroll2() {
    if (!carouselContainer2) return;
    const scrollPosition = carouselContainer2.scrollLeft;
    const slideWidth = carouselContainer2.clientWidth;
    const newSlide = Math.round(scrollPosition / slideWidth);

    // Only update if the slide actually changed
    if (newSlide !== currentSlide2) {
      currentSlide2 = newSlide;
    }
  }
</script>

<div class="page-content" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/laptop.png"
      alt="stat"
      class="emoji h-[30px] mr-[8px] md:h-[40px] md:mr-[10px]"
    />
    <span class="heading">My Projects</span>
  </div>
  <p class="quote">
    "The best way to predict the future is to invent it." ~ Alan Kay
  </p>
  <hr class="separator mt-[10px]" />
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[200px]">
    <p class="jbm font-bold text-[20px] text-[#D0D0D0]">
      AttendIt - Making Indian Attendance Systems Sensible
    </p>

    <div class="justify-center flex w-full h-fit mt-[30px]">
      <div class="image-placeholder h-[200px]"></div>
    </div>
    <div class="flex justify-between items-end mt-[25px]">
      <p class="jbm font-medium text-[11px] text-[#808080]">BHOPAL, 2023</p>
      <div class="flex gap-[20px]">
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
      </div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill. I am a designer line
      here and more. Project boolean italic edit strikethrough device component
      community fill. Italic selection project reesizing flows. Thumbnail auto
      scale text boolean link strikethrough link italic stroke. Pixel font flows
      follower team fill.
    </p>
    <div class="flex gap-[20px] mt-[20px]">
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <div class="image-section">
      <div class="desktop-view flex gap-[20px] mt-[30px]">
        <div class="justify-center flex w-[250px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
        <div class="justify-center flex w-[400px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
      </div>
      <div class="mobile-carousel">
        <div
          class="carousel-container"
          bind:this={carouselContainer1}
          onscroll={handleScroll1}
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
          {#key currentSlide1}
            <span class="carousel-caption" transition:fade={{ duration: 200 }}>
              {captions1[currentSlide1]}
            </span>
          {/key}
        </div>

        <!-- Navigation dots -->
        <div class="carousel-dots h-fit">
          <div
            class="flex justify-center items-center w-fit h-fit bg-[rgba(255,255,255,0.1)] rounded-[12px] p-[6px]"
          >
            {#each [0, 1] as dot, i}
              <button
                class="carousel-dot {currentSlide1 === i ? 'active' : ''}"
                onclick={() => scrollToSlide1(i)}
                aria-label="Go to image {i + 1}"
              ></button>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <p class="page-text mt-[30px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <hr class="separator mt-[40px] mb-[40px]" />
    <p class="jbm font-bold text-[20px] text-[#D0D0D0]">
      AttendIt - Making Indian Attendance Systems Sensible
    </p>

    <div class="justify-center flex w-full h-fit mt-[30px]">
      <div class="image-placeholder h-[200px]"></div>
    </div>
    <div class="flex justify-between items-end mt-[25px]">
      <p class="jbm font-medium text-[11px] text-[#808080]">BHOPAL, 2023</p>
      <div class="flex gap-[20px]">
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
      </div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill. I am a designer line
      here and more. Project boolean italic edit strikethrough device component
      community fill. Italic selection project reesizing flows. Thumbnail auto
      scale text boolean link strikethrough link italic stroke. Pixel font flows
      follower team fill.
    </p>
    <div class="flex gap-[20px] mt-[20px]">
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <div class="image-section">
      <div class="desktop-view flex gap-[20px] mt-[30px]">
        <div class="justify-center flex w-[250px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
        <div class="justify-center flex w-[400px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
      </div>
      <div class="mobile-carousel">
        <div
          class="carousel-container"
          bind:this={carouselContainer1}
          onscroll={handleScroll1}
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
          {#key currentSlide1}
            <span class="carousel-caption" transition:fade={{ duration: 200 }}>
              {captions1[currentSlide1]}
            </span>
          {/key}
        </div>

        <!-- Navigation dots -->
        <div class="carousel-dots h-fit">
          <div
            class="flex justify-center items-center w-fit h-fit bg-[rgba(255,255,255,0.1)] rounded-[12px] p-[6px]"
          >
            {#each [0, 1] as dot, i}
              <button
                class="carousel-dot {currentSlide1 === i ? 'active' : ''}"
                onclick={() => scrollToSlide1(i)}
                aria-label="Go to image {i + 1}"
              ></button>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <p class="page-text mt-[30px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <hr class="separator mt-[40px] mb-[40px]" />
    <p class="jbm font-bold text-[20px] text-[#D0D0D0]">
      IIIT Bhopal Official Website
    </p>

    <div class="justify-center flex w-full h-fit mt-[30px]">
      <div class="image-placeholder h-[200px]"></div>
    </div>
    <div class="flex justify-between items-end mt-[25px]">
      <p class="jbm font-medium text-[11px] text-[#808080]">BHOPAL, 2023</p>
      <div class="flex gap-[20px]">
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
        <div
          class="h-[45px] w-[45px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        ></div>
      </div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill. I am a designer line
      here and more. Project boolean italic edit strikethrough device component
      community fill. Italic selection project reesizing flows. Thumbnail auto
      scale text boolean link strikethrough link italic stroke. Pixel font flows
      follower team fill.
    </p>
    <div class="flex gap-[20px] mt-[20px]">
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
    </div>
    <p class="page-text mt-[20px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <div class="image-section">
      <div class="desktop-view flex gap-[20px] mt-[30px]">
        <div class="justify-center flex w-[250px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
        <div class="justify-center flex w-[400px] flex-col">
          <div class="image-placeholder h-[175px]"></div>
          <span class="caption">At my second trip in college.</span>
        </div>
      </div>
      <div class="mobile-carousel">
        <div
          class="carousel-container"
          bind:this={carouselContainer2}
          onscroll={handleScroll2}
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
          {#key currentSlide2}
            <span class="carousel-caption" transition:fade={{ duration: 200 }}>
              {captions2[currentSlide2]}
            </span>
          {/key}
        </div>

        <!-- Navigation dots -->
        <div class="carousel-dots h-fit">
          <div
            class="flex justify-center items-center w-fit h-fit bg-[rgba(255,255,255,0.1)] rounded-[12px] p-[6px]"
          >
            {#each [0, 1] as dot, i}
              <button
                class="carousel-dot {currentSlide2 === i ? 'active' : ''}"
                onclick={() => scrollToSlide2(i)}
                aria-label="Go to image {i + 1}"
              ></button>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <p class="page-text mt-[30px] mb-[80px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
  </div>
</div>

<style>
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
    overflow: auto; /* Enable scrolling */
    scrollbar-width: none;
    -moz-scrollbar-width: none;
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  .image-placeholder {
    background-color: #303030;
    width: 100%;
    border-radius: 12px;
  }

  .caption {
    text-align: center;
    color: #a0a0a0;
    font-size: 9px;
    margin-top: 12px;
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
      margin-top: 10px;
    }

    .carousel-dot {
      width: 7px;
      height: 7px;
      border-radius: 80%;
      background-color: rgba(76, 134, 255, 0.3);
      border: none;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.6;
    }

    .carousel-dot.active {
      background-color: #4c86ff;
      opacity: 1;
    }

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
</style>
