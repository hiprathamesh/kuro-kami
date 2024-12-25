<script lang="ts">
  import { fade } from "svelte/transition";
  import type { SvelteComponent } from "svelte";
  import PlayingPage from "./PlayingPage.svelte";
  import ListeningPage from "./ListeningPage.svelte";
  import WatchingPage from "./WatchingPage.svelte";
  let { openPage = (id: string, component: typeof SvelteComponent) => {} } =
    $props();
</script>

<div class="page-content" id="pagee" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/umbrella.png"
      alt="stat"
      class="emoji h-[40px] mr-[10px]"
    />
    <span class="heading">Other Than Work</span>
  </div>
  <span class="quote">
    "Be yourself; everyone else is already taken." ~ Oscar Wilde
  </span>
  <hr class="separator mt-[10px]" />
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[90px]">
    <div class="justify-center flex w-full h-fit">
      <div class="image-placeholder h-[200px]"></div>
    </div>
    <p class="page-text mt-[40px]">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>
    <hr class="separator mt-[40px] mb-[40px]" />
    <p class="jbm font-bold text-[20px] text-[#d0d0d0]">
      Currently Playing: It Takes Two (EA Sports Inc.)
    </p>
    <div class="justify-center flex w-[400px] flex-col mt-[30px]">
      <div class="image-placeholder h-[175px]"></div>
    </div>
    <div class="mt-[20px] flex justify-start gap-[20px]">
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <div
        class="max-w-[200px] mt-[20px] py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
        role="button"
        tabindex="0"
        onclick={() => openPage("spot8", PlayingPage)}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPage("spot8", PlayingPage); }}
      >
        <span class="font-normal text-[14px] text-[#4C86FF]">See Archived List</span>
      </div>
    <hr class="separator mt-[40px] mb-[40px]" />
    <p class="jbm font-bold text-[20px] text-[#d0d0d0]">
      Currently Listening: Lemonade (Beyoncé)
    </p>
    <div class="justify-center flex w-[175px] flex-col mt-[30px]">
      <div class="image-placeholder h-[175px]"></div>
    </div>
    <div class="mt-[20px] flex justify-start gap-[20px]">
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <div
        class="max-w-[200px] mt-[20px] py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
        role="button"
        tabindex="0"
        onclick={() => openPage("spot9", ListeningPage)}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPage("spot9", ListeningPage); }}
      >
        <span class="font-normal text-[14px] text-[#4C86FF]">See Archived List</span>
      </div>
    <hr class="separator mt-[40px] mb-[40px]" />
    <p class="jbm font-bold text-[20px] text-[#d0d0d0]">
      Currently Watching: 13 Reasons Why (Netflix)
    </p>
    <div class="justify-center flex w-[300px] flex-col mt-[30px]">
      <div class="image-placeholder h-[175px]"></div>
    </div>
    <div class="mt-[20px] flex justify-start gap-[20px]">
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
      <div class="h-[40px] w-[40px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <div
        class="max-w-[200px] mb-[80px] mt-[20px] py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
        role="button"
        tabindex="0"
        onclick={() => openPage("spot10", WatchingPage)}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPage("spot10", WatchingPage); }}
      >
        <span class="font-normal text-[14px] text-[#4C86FF]">See Archived List</span>
      </div>
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
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  .image-placeholder {
    background-color: #303030;
    width: 100%;
    border-radius: 12px;
  }
</style>
