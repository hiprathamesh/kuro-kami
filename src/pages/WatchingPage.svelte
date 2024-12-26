<script lang="ts">
    import { fade } from "svelte/transition";
    import {tooltip} from "../components/tooltip";
  
  </script>
  
  <div class="page-content" transition:fade>
    <div class="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <img
        src="/static/emojis/popcorn.png"
        alt="popcorn"
        class="emoji h-[100px]"
      />
      <span class="quote mt-[20px]">Nothing here yet!</span>
    </div>
    <div class="flex items-end mb-[30px]">
      <img
        src="/static/emojis/popcorn.png"
        alt="popcorn"
        class="emoji h-[40px] mr-[10px]"
      />
      <span class="heading">Currently Watching (Archive)</span>
    </div>
    <span class="quote">
      "Photography is truth, and the cinema is truth twenty-four times per second." ~ Jean-Luc Godard
    </span>
    <hr class="separator mt-[10px]" />
    <!-- Scrollable content -->
    <div class="content scrollable-section pt-[30px] pb-[90px]">
      
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
    }
  
    .scrollable-section::-webkit-scrollbar {
      display: none; /* Hide scrollbar in WebKit browsers */
    }
  </style>
  