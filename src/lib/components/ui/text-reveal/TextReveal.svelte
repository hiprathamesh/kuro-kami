<script lang="ts">
  import { Motion } from "svelte-motion";
  import { cn } from "../../../utils/cn";

  export let words: string;
  export let className: string | undefined = undefined;

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.08, // Adjusted delay for smooth animations
        duration: 0.8, // Animation duration for each character
      },
    }),
    hidden: { opacity: 0 },
  };
</script>

<div class={cn("font-bold", className)}>
  <div class=" text-[45px] text-black dark:text-white">
    <Motion
      let:motion
      custom={0}
      {variants}
      initial="hidden"
      animate={"visible"}
    >
      <div use:motion style="display: flex; flex-wrap: wrap; gap: 0;">
        {#each words.split("") as char, idx (`${char}${idx}`)}
          <Motion
            let:motion
            {variants}
            custom={idx + 1}
            initial="hidden"
            animate={"visible"}
          >
            <span
              use:motion
              class="text-black dark:text-white"
              style="white-space: pre;"
            >
              {char}
            </span>
          </Motion>
        {/each}
      </div>
    </Motion>
  </div>
</div>
