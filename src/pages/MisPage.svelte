<script lang="ts">
  import { fade } from "svelte/transition";
  import {tooltip} from "../components/tooltip";

</script>

<div class="page-content" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/roots.png"
      alt="roots"
      class="emoji h-[30px] mr-[8px] md:h-[40px] md:mr-[10px]"
    />
    <span class="heading">Roots</span>
  </div>
  <p class="quote">
    "If I have seen further, it is by standing on the shoulders of giants." ~ Isaac Newton
  </p>
  <hr class="separator mt-[10px]" />
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[200px]">
    <div class="flex items-center justify-center flex-col">
      <p class="naga text-[150px] text-[#D0D0D0]">黒紙</p>
      <div class="flex items-center justify-center gap-[10px] mt-[5px]">
        <div class=" w-[6px] h-[6px] rounded-full bg-[#292929]"></div>
        <div class=" w-[6px] h-[6px] rounded-full bg-[#292929]"></div>
        <div class=" w-[6px] h-[6px] rounded-full bg-[#292929]"></div>
      </div>
      <p class="jbm font-semibold text-[15px] text-[#D0D0D0] italic mt-[30px]">
        Designed & Developed by <regular
          class="jbm font-semibold text-[15px] text-[#E8D284] not-italic cursor-pointer"
          use:tooltip={{ text: "that's me!", position: "top" }}
          >Royalp</regular
        >
      </p>
    </div>
    <p class="jbm font-bold text-[18px] text-[#D0D0D0] mt-[40px]">KuroKami</p>
    <p class="jbm font-light text-[11px] text-[#808080] mt-[5px]">/ˈkuː.roʊ ˈka.mi/</p>
    <p class="jbm font-medium text-[11.5px] text-[#808080] mt-[20px]">NOUN</p>
    <p class="jbm font-light text-[11.5px] text-[#D0D0D0] mt-[10px]">
      The term can be interpreted literally as "black paper", but it may also
      have symbolic or metaphorical meanings, depending on context.
    </p>
    <p class="jbm font-light text-[11.5px] text-[#D0D0D0] mt-[20px]">
      The color black (黒) often symbolizes death, mystery, or the unknown in
      Japanese culture. <br>"Paper" (紙) can signify writing, stories, or fate.
      Together, 黒紙 could evoke the imagery of writing something dark,
      mysterious, or fateful.
    </p>
  </div>
</div>

<style>
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

</style>
