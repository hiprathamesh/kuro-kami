<script lang="ts">
  import { Motion } from "svelte-motion";
  import { cn } from "../../../utils/cn";

  export let words: string;
  export let className: string | undefined = undefined;

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.06, // Adjusted delay for smooth animations
        duration: 0.8, // Animation duration for each character
      },
    }),
    hidden: { opacity: 0 },
  };
</script>

<div class={cn("font-bold", className)}>
  <div class="head-second">
    <Motion
      let:motion
      custom={0}
      {variants}
      initial="hidden"
      animate={"visible"}
    >
      <div use:motion style="display: flex; flex-wrap: wrap; gap: 0;">
        {#if words.includes("<br>")}
          <!-- Handle the case with a line break for mobile -->
          {#each words.split("<br>") as line, lineIdx}
            <div style="width: 100%; {lineIdx > 0 ? 'margin-top: 0.25em;' : ''}">
              {#each line.split("") as char, idx (`${line}${char}${idx}`)}
                <Motion
                  let:motion
                  {variants}
                  custom={idx + 1 + (lineIdx * 20)}
                  initial="hidden"
                  animate={"visible"}
                >
                  <span use:motion style="white-space: pre;">
                    {char}
                  </span>
                </Motion>
              {/each}
            </div>
          {/each}
        {:else}
          <!-- Regular case without line break -->
          {#each words.split("") as char, idx (`${char}${idx}`)}
            <Motion
              let:motion
              {variants}
              custom={idx + 1}
              initial="hidden"
              animate={"visible"}
            >
              <span use:motion style="white-space: pre;">
                {char}
              </span>
            </Motion>
          {/each}
        {/if}
      </div>
    </Motion>
  </div>
</div>

<style>
  .head-second {
    font-size: 45px;
    font-weight: 700;
    color: white;
    margin-bottom: 30px;
    line-height: 1.1; /* Add a tighter line height */
  }
  @media screen and (max-width: 767px) {
    .head-second {
      font-size: 30px;
      margin-bottom: 24px;
      line-height: 1; /* Even tighter for mobile */
    }
  }
</style>