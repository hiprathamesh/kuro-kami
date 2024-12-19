<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div class="page-content" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/stats.png"
      alt="stat"
      class="emoji h-[40px] mr-[10px]"
    />
    <span class="heading">Currently</span>
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
    <div class="flex justify-between mt-[30px] items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >Codeforces- Pupil (1268)</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <div class="flex justify-between items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >CodeChef- 3* (1730)</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <div class="flex justify-between items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >LeetCode- Knight (1268)</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <div class="flex justify-between items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >Cumulative GPA- 8.41</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <div class="flex justify-between items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >Github- 143 Stars</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
    <div class="flex justify-between items-center">
      <div class="flex gap-[10px] items-end">
        <div class="flex items-end">
          <img
            src="/static/emojis/stats.png"
            alt="stat"
            class="emoji h-[25px] mr-[8px]"
          />
          <span class="jbm font-bold text-[20px] text-[#D0D0D0]"
            >LeetCode- 197 Questions (47, 98, 33)</span
          >
        </div>
        <span class="jbm font-normal italic text-[10px] text-[#808080]"
          >last updated: July 9th, 2023</span
        >
      </div>
      <div class="h-[35px] w-[35px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"></div>
    </div>
    <hr class="separator mt-[30px] mb-[30px]" />
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
    max-height: calc(100% - 200px); /* Subtract the height of the pagination */
    overflow: auto; /* Enable scrolling */
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }
</style>
