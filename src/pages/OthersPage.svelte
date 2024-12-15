<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div class="page-content" transition:fade>
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
    <div class="content">
      <p class="page-text">
        I am a designer line here and more. Project boolean italic edit
        strikethrough device component community fill. Italic selection project
        reesizing flows. Thumbnail auto scale text boolean link strikethrough
        link italic stroke. Pixel font flows follower team fill.
      </p>
    </div>

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

    <div class="content mt-[60px]">
      <p class="page-text">I am a designer, line here and more and more new.</p>
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
    max-height: calc(100% - 200px); /* Subtract the height of the pagination */
    overflow: auto; /* Enable scrolling */
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
