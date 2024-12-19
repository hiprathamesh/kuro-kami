<script lang="ts">
  import { fade } from "svelte/transition";
  import type { SvelteComponent } from "svelte";
  import SkillsPage from "./SkillsPage.svelte";
  import OthersPage from "./OthersPage.svelte";
  let { openPage = (id: string, component: typeof SvelteComponent) => {} } =
    $props();
</script>

<div class="page-content" id="pagee" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/person.png"
      alt="stat"
      class="emoji h-[40px] mr-[10px]"
    />
    <span class="heading">About Me</span>
  </div>
  <span class="quote">
    "Be yourself; everyone else is already taken." ~ Oscar Wilde
  </span>
  <hr class="separator mt-[10px]" />
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px]">
    <p class="page-text">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>

    <div class="justify-center flex w-fit flex-col">
      <div class="image-placeholder"></div>
      <span class="caption">At my second trip in college.</span>
    </div>

    <div class="content mt-[40px]">
      <p class="page-text">
        College and Village here maybe idk. Project boolean italic edit
        strikethrough device component community fill. Italic selection project
        reesizing flows. Thumbnail auto scale text boolean link strikethrough
        link italic stroke. Pixel font flows follower team fill. College and
        Village here maybe idk. Project boolean italic edit strikethrough device
        component community fill. Italic selection project reesizing flows.
      </p>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <p class="page-text">
      I am a designer line here and more. Project boolean italic edit
      strikethrough device component community fill. Italic selection project
      reesizing flows. Thumbnail auto scale text boolean link strikethrough link
      italic stroke. Pixel font flows follower team fill.
    </p>

    <div class="flex gap-[20px]">
      <div class="justify-center flex w-fit flex-col">
        <div class="image-placeholder h-[175px]"></div>
        <span class="caption">At my second trip in college.</span>
      </div>
      <div class="justify-center flex w-fit flex-col">
        <div class="image-placeholder h-[175px]"></div>
        <span class="caption">At my second trip in college.</span>
      </div>
    </div>

    <div class="flex gap-[15px] items-baseline mt-[40px]">
      <p class="page-text">Interest in Programming and Technology at</p>
      <div
        class="py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
      >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <span class="font-normal text-[14px] text-[#4C86FF]" onclick={() => openPage("spot4", OthersPage)}>Other Than Work</span>
      </div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <p class="page-text">College and Village here maybe idk. Project boolean</p>
    <div class="mt-[30px] flex justify-center gap-[40px]">
      <div>
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
      <div>
        <div
        class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
        ></div>
        <span class="font-normal text-[14px] text-[#D0D0D0]">Java</span>
        <div class="flex justify-between mt-[10px] items-center">
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
        </div>
      </div>
      <div>
        <div
        class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
        ></div>
        <span class="font-normal text-[14px] text-[#D0D0D0]">Python</span>
        <div class="flex justify-between mt-[10px] items-center">
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
        </div>
      </div>
      <div>
        <div
        class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
        ></div>
        <span class="font-normal text-[14px] text-[#D0D0D0]">Kotlin</span>
        <div class="flex justify-between mt-[10px] items-center">
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
        </div>
      </div>
      <div>
        <div
        class="h-[65px] w-[65px] mb-[10px] bg-[rgb(35,35,35)] rounded-[8px] cursor-pointer flex justify-center items-center border-[0.35px] border-solid border-[rgba(255,255,255,0.15)]"
        ></div>
        <span class="font-normal text-[14px] text-[#D0D0D0]">C</span>
        <div class="flex justify-between mt-[10px] items-center">
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot w-[8px] h-[8px] rounded-full bg-[#4C86FF]"></div>
          <div class="dot-not w-[6px] h-[6px] rounded-full"></div>
        </div>
      </div>
    </div>
    <div class="flex gap-[15px] items-baseline mt-[40px] mb-[80px]">
      <p class="page-text">Interest in Programming and Technology at</p>
      <div
        class="py-[10px] px-[25px] bg-[rgb(35,35,35)] rounded-[5px] cursor-pointer flex justify-center items-center border-[0.25px] border-solid border-[rgba(255,255,255,0.15)]"
      >
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span class="font-normal text-[14px] text-[#4C86FF]" onclick={() => openPage("spot2", SkillsPage)}>Skills I Can</span>
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
    max-height: calc(100% - 200px); /* Subtract the height of the pagination */
    overflow: auto;
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  .image-placeholder {
    background-color: #303030;
    aspect-ratio: 3 / 2;
    width: 325px;
    margin-top: 25px;
    border-radius: 10px;
  }

  .caption {
    text-align: center;
    color: #a0a0a0;
    font-size: 9px;
    margin-top: 12px;
  }
</style>
