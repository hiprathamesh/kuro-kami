<script lang="ts">
  import { fade } from "svelte/transition";
  let name = "";
  let email = "";
  let message = "";
  let sending = false;
  let error = "";
  let success = false;

  async function handleSubmit() {
    if (!name || !email || !message) {
      error = "All fields are required";
      return;
    }

    if (!isValidEmail(email)) {
      error = "Please enter a valid email";
      return;
    }

    sending = true;
    error = "";

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (data.success) {
        success = true;
        name = "";
        email = "";
        message = "";
      }
    } catch (err: unknown) {
      console.error("Client error:", err);
      error = err instanceof Error ? err.message : "Failed to send message";
    } finally {
      sending = false;
    }
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
</script>

<div class="page-content" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/envelope.png"
      alt="stat"
      class="emoji h-[40px] mr-[10px]"
    />
    <span class="heading">Contact Here</span>
  </div>
  <span class="quote">
    "Be yourself; everyone else is already taken." ~ Oscar Wilde
  </span>
  <hr class="separator mt-[10px]" />
  {#if error}
    <div class="error-message jbm font-medium">{error}</div>
  {/if}

  {#if success}
    <div class="success-message jbm font-medium">Message sent successfully! Thanks, I'll reply soon.</div>
  {/if}
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[90px]">
    <p class="page-text">
      I am a designer line here and more. Project boolean italic edit.
    </p>
    <textarea
      bind:value={message}
      class="txt-area w-full h-[250px] mt-[30px] pt-[15px] pl-[20px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[10px] placeholder-[#808080] placeholder-opacity-50 italic"
      placeholder="let me know what you think..."
    ></textarea>

    <div class="flex justify-between mt-[40px] items-center">
      <span class="page-text">by</span>
      <input
        bind:value={name}
        class="txt-area w-[200px] h-[40px] pl-[10px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[5px] placeholder-[#808080] placeholder-opacity-50 italic"
        placeholder="Yagami Raito..."
      />
      <span class="page-text">, get back to me at</span>
      <input
        bind:value={email}
        class="txt-area w-[300px] h-[40px] pl-[10px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[5px] placeholder-[#808080] placeholder-opacity-50 italic"
        placeholder="yagami-raito @ death-note.com..."
      />
      <button
        on:click={handleSubmit}
        disabled={sending}
        class="butt bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] text-[#4C86FF] py-[10px] px-[20px] rounded-[5px] cursor-pointer w-[100px] h-[40px] flex justify-center items-center"
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
    <p class="page-text mt-[60px]">
      I am a designer line here and more. Project boolean italic edit.
    </p>
    <div class="mt-[40px] flex justify-center gap-[40px]">
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      ></div>
    </div>
  </div>
</div>

<style>
  .error-message {
    color: #ff4444;
    font-size: 13px;
    margin-top: 20px;
  }

  .success-message {
    color: #44ff44;
    font-size: 13px;
    margin-top: 20px;
  }
  .butt {
    font-family: jbm;
    font-size: 15px;
    font-weight: 500;
  }
  .txt-area {
    font-weight: 400;
    font-size: 11.5px;
    font-family: jbm;
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
    overflow: auto; /* Enable scrolling */
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }
</style>
