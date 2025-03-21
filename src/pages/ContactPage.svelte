<script lang="ts">
  import { fade } from "svelte/transition";
  import emailjs from "@emailjs/browser";
  import { tooltip } from "../components/tooltip";
  import { onMount } from "svelte";

  let name = "";
  let email = "";
  let message = "";
  let sending = false;
  let error = "";
  let success = false;
  let phone = false;
  let discord = false;

  function copyPhoneNumber() {
    const phoneNumber = "+91 95618 78909";
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        phone = true;
        setTimeout(() => {
          phone = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy phone number: ", err);
      });
  }

  function copyDiscord() {
    const username = "r0yalp";
    navigator.clipboard
      .writeText(username)
      .then(() => {
        discord = true;
        setTimeout(() => {
          discord = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy discord ID: ", err);
      });
  }

  onMount(() => {
    const phoneButton = document.querySelector(".phone");
    if (phoneButton) {
      phoneButton.addEventListener("click", copyPhoneNumber);
    }
    const discordButton = document.querySelector(".discord");
    if (discordButton) {
      discordButton.addEventListener("click", copyDiscord);
    }
  });

  const sendEmail = (e: SubmitEvent) => {
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

    emailjs
      .sendForm(
        "service_qf3iwrl",
        "template_wui7cz9",
        e.target as HTMLFormElement,
        {
          publicKey: "1f1Zjvs0DgVovYnLZ",
        }
      )
      .then(
        () => {
          success = true;
          setTimeout(() => {
            success = false;
          }, 3000);
          name = "";
          email = "";
          message = "";
        },
        (error) => {
          error = error.text || "Failed to send message";
        }
      )
      .finally(() => {
        sending = false;
      });
  };

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  $: if (error) {
    setTimeout(() => {
      error = "";
    }, 3000);
  }
</script>

<div class="page-content" transition:fade>
  <div class="flex items-end mb-[30px]">
    <img
      src="/static/emojis/envelope.png"
      alt="stat"
      class="emoji h-[30px] mr-[8px] md:h-[40px] md:mr-[10px]"
    />
    <span class="heading">Contact Here</span>
  </div>
  <p class="quote">
    "The most important thing in communication is hearing what isn’t said." ~
    Peter Drucker
  </p>
  <hr class="separator mt-[10px]" />
  {#if error}
    <div class="error-message jbm font-medium">{error}</div>
  {/if}

  {#if success}
    <div class="success-message jbm font-medium">
      Message sent successfully! Thanks, I'll reply soon.
    </div>
  {/if}
  {#if phone}
    <div class="success-message jbm font-medium">
      Phone number is copied to clipboard!
    </div>
  {/if}
  {#if discord}
    <div class="success-message jbm font-medium">
      Discord ID is copied to clipboard!
    </div>
  {/if}
  <!-- Scrollable content -->
  <div class="content scrollable-section pt-[30px] pb-[200px]">
    <p class="page-text">
      You can reach out to me by filling out the form below. I'll get back to
      you as soon as possible.
    </p>
    <form on:submit|preventDefault={sendEmail}>
      <textarea
        id="message"
        name="message"
        bind:value={message}
        class="txt-area w-full h-[200px] md:h-[250px] mt-[30px] pt-[15px] pl-[20px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[10px] placeholder-[#808080] placeholder-opacity-50 italic"
        placeholder="let me know what you think..."
      ></textarea>

      <div
        class="flex flex-wrap gap-y-[10px] justify-between mt-[40px] items-center"
      >
        <div class="flex items-center gap-[15px]">
          <span class="page-text truncate">by</span>
          <input
            bind:value={name}
            id="name"
            name="from_name"
            type="text"
            class="txt-area w-[150px] md:w-[200px] h-[40px] pl-[10px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[5px] placeholder-[#808080] placeholder-opacity-50 italic"
            placeholder="Yagami Raito..."
          />
        </div>
        <div class="flex items-center gap-[15px] max-w-[400px] w-full">
          <span class="page-text truncate">, get back to me at</span>
          <input
            bind:value={email}
            id="email"
            name="from_email"
            class="txt-area w-[250px] md:w-[300px] h-[40px] pl-[10px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] rounded-[5px] placeholder-[#808080] placeholder-opacity-50 italic"
            placeholder="yagami-raito @ death-note.com..."
          />
        </div>
        <button
          type="submit"
          value="Send"
          class="butt ml-[5px] bg-[rgba(35,35,35,0.80)] border-[0.8px] border-solid border-[rgba(255,255,255,0.15)] text-[#4C86FF] py-[10px] px-[20px] rounded-[5px] cursor-pointer w-[100px] h-[40px] flex justify-center items-center"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
    <p class="page-text mt-[60px]">
      Less preferably, you can ping me on any of the following platforms, also
      the old twitter logo is intentional :)
    </p>
    <div
      class="mt-[40px] flex justify-center flex-wrap gap-[40px] social-icons-container"
    >
      <div
        class="phone h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        use:tooltip={{
          text: "Phone",
          position: "bottom",
        }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.6725 24.7242C32.7995 23.8151 31.7464 23.3291 30.6303 23.3291C29.5232 23.3291 28.4611 23.8061 27.5521 24.7152L24.7079 27.5504C24.4738 27.4244 24.2398 27.3074 24.0148 27.1904C23.6908 27.0284 23.3848 26.8754 23.1237 26.7134C20.4596 25.0212 18.0384 22.8161 15.7162 19.9629C14.5911 18.5408 13.8351 17.3437 13.286 16.1286C14.0241 15.4535 14.7081 14.7515 15.3742 14.0764C15.6262 13.8244 15.8782 13.5634 16.1302 13.3114C18.0204 11.4212 18.0204 8.97304 16.1302 7.0829L13.673 4.62572C13.394 4.3467 13.106 4.05868 12.836 3.77066C12.2959 3.21262 11.7289 2.63658 11.1439 2.09654C10.2708 1.23247 9.22672 0.773438 8.12864 0.773438C7.03056 0.773438 5.96848 1.23247 5.06841 2.09654C5.05941 2.10554 5.05941 2.10554 5.05041 2.11454L1.99018 5.20177C0.838096 6.35385 0.181047 7.75796 0.0370364 9.38708C-0.17898 12.0153 0.595078 14.4635 1.18912 16.0656C2.64723 19.9989 4.82539 23.6441 8.07463 27.5504C12.0169 32.2578 16.7603 35.975 22.1787 38.5942C24.2488 39.5753 27.012 40.7364 30.0993 40.9344C30.2883 40.9434 30.4863 40.9524 30.6663 40.9524C32.7455 40.9524 34.4916 40.2054 35.8597 38.7203C35.8687 38.7023 35.8867 38.6932 35.8957 38.6752C36.3637 38.1082 36.9038 37.5952 37.4708 37.0461C37.8578 36.6771 38.2539 36.2901 38.6409 35.885C39.532 34.958 40 33.8779 40 32.7708C40 31.6547 39.523 30.5836 38.6139 29.6836L33.6725 24.7242ZM36.8948 34.2019C36.8858 34.2109 36.8858 34.2019 36.8948 34.2019C36.5437 34.5799 36.1837 34.922 35.7967 35.3C35.2116 35.858 34.6176 36.4431 34.0596 37.1001C33.1505 38.0722 32.0794 38.5312 30.6753 38.5312C30.5403 38.5312 30.3963 38.5312 30.2613 38.5222C27.5881 38.3512 25.1039 37.3071 23.2408 36.4161C18.1464 33.9499 13.673 30.4486 9.95577 26.0113C6.88654 22.312 4.83439 18.8918 3.47529 15.2195C2.63823 12.9783 2.33221 11.2322 2.46722 9.58509C2.55722 8.53201 2.96225 7.65895 3.70931 6.91189L6.77854 3.84266C7.21957 3.42863 7.6876 3.20362 8.14664 3.20362C8.71368 3.20362 9.17271 3.54564 9.46074 3.83366C9.46974 3.84267 9.47874 3.85167 9.48774 3.86067C10.0368 4.3737 10.5588 4.90474 11.1079 5.47179C11.3869 5.75981 11.6749 6.04783 11.9629 6.34485L14.4201 8.80203C15.3742 9.7561 15.3742 10.6382 14.4201 11.5922C14.1591 11.8533 13.9071 12.1143 13.646 12.3663C12.89 13.1404 12.1699 13.8604 11.3869 14.5625C11.3689 14.5805 11.3509 14.5895 11.3419 14.6075C10.5678 15.3815 10.7118 16.1376 10.8738 16.6506C10.8828 16.6776 10.8918 16.7046 10.9008 16.7316C11.5399 18.2797 12.44 19.7378 13.8081 21.475L13.8171 21.484C16.3012 24.5442 18.9204 26.9294 21.8097 28.7565C22.1787 28.9905 22.5567 29.1795 22.9167 29.3596C23.2408 29.5216 23.5468 29.6746 23.8078 29.8366C23.8438 29.8546 23.8798 29.8816 23.9158 29.8996C24.2218 30.0526 24.5098 30.1246 24.8069 30.1246C25.5539 30.1246 26.022 29.6566 26.175 29.5036L29.2532 26.4253C29.5592 26.1193 30.0453 25.7503 30.6123 25.7503C31.1703 25.7503 31.6294 26.1013 31.9084 26.4073C31.9174 26.4163 31.9174 26.4163 31.9264 26.4253L36.8858 31.3847C37.8128 32.3028 37.8128 33.2478 36.8948 34.2019Z"
            fill="white"
            fill-opacity="0.25"
          />
          <path
            d="M36.8948 34.2019C36.5437 34.5799 36.1837 34.922 35.7967 35.3C35.2116 35.858 34.6176 36.4431 34.0596 37.1001C33.1505 38.0722 32.0794 38.5312 30.6753 38.5312C30.5403 38.5312 30.3963 38.5312 30.2613 38.5222C27.5881 38.3512 25.1039 37.3071 23.2408 36.4161C18.1464 33.9499 13.673 30.4486 9.95577 26.0113C6.88654 22.312 4.83439 18.8918 3.47529 15.2195C2.63823 12.9783 2.33221 11.2322 2.46722 9.58509C2.55722 8.53201 2.96225 7.65895 3.70931 6.91189L6.77854 3.84266C7.21957 3.42863 7.6876 3.20362 8.14664 3.20362C8.71368 3.20362 9.17271 3.54564 9.46074 3.83366L9.48774 3.86067C10.0368 4.3737 10.5588 4.90474 11.1079 5.47179C11.3869 5.75981 11.6749 6.04783 11.9629 6.34485L14.4201 8.80203C15.3742 9.7561 15.3742 10.6382 14.4201 11.5922C14.1591 11.8533 13.9071 12.1143 13.646 12.3663C12.89 13.1404 12.1699 13.8604 11.3869 14.5625C11.3689 14.5805 11.3509 14.5895 11.3419 14.6075C10.5678 15.3815 10.7118 16.1376 10.8738 16.6506L10.9008 16.7316C11.5399 18.2797 12.44 19.7378 13.8081 21.475L13.8171 21.484C16.3012 24.5442 18.9204 26.9294 21.8097 28.7565C22.1787 28.9905 22.5567 29.1795 22.9167 29.3596C23.2408 29.5216 23.5468 29.6746 23.8078 29.8366C23.8438 29.8546 23.8798 29.8816 23.9158 29.8996C24.2218 30.0526 24.5098 30.1246 24.8069 30.1246C25.5539 30.1246 26.022 29.6566 26.175 29.5036L29.2532 26.4253C29.5592 26.1193 30.0453 25.7503 30.6123 25.7503C31.1703 25.7503 31.6294 26.1013 31.9084 26.4073L31.9264 26.4253L36.8858 31.3847C37.8128 32.3028 37.8128 33.2478 36.8948 34.2019Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        use:tooltip={{
          text: "Mail",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        on:click={() => window.open("mailto:nikam@duck.com", "_blank")}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity="0.25"
          />
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "Discord",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        class="discord h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 45 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.1193 2.85629C35.1627 1.50271 32.0415 0.54244 28.8354 0C28.3967 0.784289 27.9998 1.59122 27.6462 2.41741C24.2311 1.90279 20.7581 1.90279 17.343 2.41741C16.9893 1.5913 16.5923 0.784384 16.1538 0C12.9456 0.547021 9.82238 1.50958 6.86286 2.86337C0.987458 11.5561 -0.605271 20.033 0.191094 28.3895C3.63188 30.9317 7.48309 32.8651 11.5773 34.1056C12.4992 32.8657 13.315 31.5503 14.016 30.1734C12.6846 29.6761 11.3995 29.0626 10.1757 28.34C10.4978 28.1064 10.8128 27.8657 11.1172 27.6321C14.6782 29.3067 18.5648 30.175 22.4999 30.175C26.435 30.175 30.3216 29.3067 33.8826 27.6321C34.1906 27.8834 34.5056 28.1241 34.8241 28.34C33.5979 29.0638 32.3105 29.6785 30.9768 30.1769C31.6769 31.5532 32.4927 32.8675 33.4154 34.1056C37.5132 32.8701 41.3673 30.9376 44.8087 28.3931C45.7431 18.7022 43.2125 10.3032 38.1193 2.85629ZM15.0247 23.2503C12.8055 23.2503 10.9721 21.2364 10.9721 18.7588C10.9721 16.2812 12.7418 14.2496 15.0176 14.2496C17.2935 14.2496 19.1127 16.2812 19.0738 18.7588C19.0349 21.2364 17.2864 23.2503 15.0247 23.2503ZM29.9751 23.2503C27.7524 23.2503 25.9261 21.2364 25.9261 18.7588C25.9261 16.2812 27.6958 14.2496 29.9751 14.2496C32.2545 14.2496 34.0596 16.2812 34.0207 18.7588C33.9817 21.2364 32.2368 23.2503 29.9751 23.2503Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "Github",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        on:click={() =>
          window.open("https://github.com/hiprathamesh", "_blank")}
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5 0.194336C9.31773 0.194336 0.25 9.25997 0.25 20.4443C0.25 29.391 6.05223 36.9815 14.0982 39.6592C15.1102 39.8466 15.4817 39.2198 15.4817 38.685C15.4817 38.2025 15.4629 36.607 15.4543 34.9149C9.82076 36.1399 8.63201 32.5256 8.63201 32.5256C7.71083 30.1854 6.38359 29.5627 6.38359 29.5627C4.54628 28.3059 6.52208 28.3317 6.52208 28.3317C8.55549 28.4745 9.62618 30.4187 9.62618 30.4187C11.4323 33.5142 14.3634 32.6193 15.519 32.1018C15.7011 30.7934 16.2255 29.8997 16.8047 29.394C12.3068 28.8823 7.57871 27.1456 7.57871 19.3863C7.57871 17.1758 8.36975 15.3694 9.66516 13.9513C9.4549 13.4409 8.76176 11.3813 9.86163 8.59212C9.86163 8.59212 11.5622 8.04813 15.4315 10.6681C17.0468 10.2195 18.7791 9.99437 20.5 9.98638C22.2209 9.99399 23.9546 10.2194 25.5729 10.6681C29.4379 8.04813 31.1361 8.59212 31.1361 8.59212C32.2383 11.3813 31.5452 13.4409 31.3349 13.9513C32.6334 15.3694 33.4186 17.1758 33.4186 19.3863C33.4186 27.1644 28.6814 28.8766 24.1722 29.3779C24.8986 30.0063 25.5457 31.2387 25.5457 33.1279C25.5457 35.8374 25.5226 38.0181 25.5226 38.685C25.5226 39.2242 25.8868 39.8557 26.9133 39.6568C34.9552 36.9762 40.75 29.3883 40.75 20.4444C40.75 9.25988 31.6836 0.194336 20.5 0.194336Z"
            fill="white"
            fill-opacity="0.25"
          />
          <path
            d="M7.91983 29.268C7.87515 29.3688 7.71689 29.3991 7.57278 29.3297C7.42545 29.2636 7.34342 29.1265 7.39094 29.0255C7.43467 28.9222 7.59284 28.8934 7.73979 28.9625C7.88665 29.0285 7.9704 29.167 7.91983 29.268ZM8.74015 30.1829C8.64357 30.2724 8.45441 30.2308 8.32666 30.0894C8.19387 29.9482 8.16935 29.759 8.26735 29.6686C8.36696 29.579 8.55004 29.6209 8.68245 29.7621C8.81524 29.905 8.8411 30.0924 8.74015 30.1829ZM9.53851 31.349C9.41447 31.4355 9.21124 31.3547 9.08577 31.1747C8.96172 30.9943 8.96172 30.7783 9.08862 30.6918C9.21409 30.6053 9.41428 30.6833 9.54136 30.8618C9.66513 31.0448 9.66512 31.2608 9.53851 31.349ZM10.6322 32.4759C10.5213 32.5982 10.2849 32.5654 10.1118 32.3984C9.93479 32.2351 9.88556 32.0034 9.99649 31.8809C10.1091 31.7583 10.3469 31.7927 10.5212 31.9584C10.697 32.1214 10.7503 32.3548 10.6322 32.4759ZM12.1413 33.1301C12.0919 33.2888 11.8647 33.3605 11.6352 33.2931C11.4061 33.2237 11.2563 33.0383 11.3025 32.878C11.3503 32.718 11.579 32.6432 11.8099 32.7153C12.0386 32.7844 12.1889 32.9688 12.1413 33.1301ZM13.7986 33.2513C13.8043 33.4184 13.6098 33.5569 13.369 33.5598C13.1269 33.5655 12.9308 33.4301 12.9281 33.2657C12.9281 33.0971 13.1186 32.9603 13.3603 32.9558C13.6011 32.9511 13.7986 33.0857 13.7986 33.2513ZM15.3406 32.989C15.3694 33.1515 15.2021 33.3189 14.9631 33.3635C14.728 33.4068 14.5103 33.3058 14.4805 33.1446C14.4513 32.9776 14.6214 32.8103 14.8564 32.767C15.0959 32.7255 15.3101 32.8234 15.3406 32.989Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "Instagram",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        on:click={() =>
          window.open("https://www.instagram.com/prathamesh.flac/", "_blank")}
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 41 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5001 0.25C15.0004 0.25 14.3108 0.273331 12.1509 0.37184C9.99555 0.470168 8.52353 0.812537 7.23544 1.31304C5.90382 1.83054 4.77453 2.523 3.64879 3.64873C2.523 4.77447 1.83054 5.90388 1.3131 7.2355C0.812477 8.52353 0.470228 9.99555 0.371779 12.1509C0.273271 14.3108 0.25 15.0004 0.25 20.5001C0.25 25.9995 0.273271 26.6892 0.371779 28.8491C0.470228 31.0044 0.812477 32.4765 1.3131 33.7645C1.8306 35.0961 2.52306 36.2254 3.64879 37.3513C4.77459 38.477 5.90382 39.1695 7.23544 39.687C8.52353 40.1875 9.99555 40.5298 12.1509 40.6282C14.3108 40.7267 15.0004 40.75 20.5001 40.75C25.9995 40.75 26.6892 40.7267 28.8491 40.6282C31.0044 40.5298 32.4765 40.1875 33.7645 39.687C35.0961 39.1695 36.2254 38.477 37.3513 37.3513C38.477 36.2254 39.1695 35.0961 39.687 33.7645C40.1875 32.4765 40.5298 31.0044 40.6282 28.8491C40.7267 26.6892 40.75 25.9995 40.75 20.5001C40.75 15.0004 40.7267 14.3108 40.6282 12.1509C40.5298 9.99555 40.1875 8.52353 39.687 7.2355C39.1695 5.90388 38.477 4.77447 37.3513 3.64873C36.2254 2.523 35.0961 1.83054 33.7645 1.31304C32.4765 0.812537 31.0044 0.470168 28.8491 0.37184C26.6892 0.273331 25.9995 0.25 20.5001 0.25ZM20.5001 3.89862C25.9069 3.89862 26.5474 3.9193 28.6827 4.01672C30.6571 4.10673 31.7293 4.43662 32.4428 4.71394C33.3881 5.08133 34.0627 5.5201 34.7712 6.22871C35.4799 6.93732 35.9187 7.61193 36.2861 8.55711C36.5634 9.27066 36.8933 10.3429 36.9833 12.3173C37.0807 14.4526 37.1014 15.0931 37.1014 20.5C37.1014 25.9069 37.0807 26.5474 36.9833 28.6827C36.8933 30.6571 36.5634 31.7293 36.2861 32.4428C35.9187 33.3881 35.4799 34.0627 34.7712 34.7712C34.0627 35.4799 33.3881 35.9187 32.4429 36.2861C31.7293 36.5634 30.6571 36.8933 28.6827 36.9833C26.5478 37.0807 25.9074 37.1014 20.5 37.1014C15.0926 37.1014 14.4523 37.0807 12.3173 36.9832C10.3429 36.8933 9.27067 36.5634 8.55717 36.2861C7.61187 35.9187 6.93732 35.4799 6.22877 34.7712C5.52016 34.0627 5.08133 33.3881 4.71394 32.4429C4.43662 31.7293 4.10679 30.6571 4.01672 28.6827C3.9193 26.5474 3.89862 25.9069 3.89862 20.5C3.89862 15.0931 3.9193 14.4526 4.01672 12.3173C4.10679 10.3429 4.43662 9.27067 4.71394 8.55717C5.08133 7.61187 5.52016 6.93732 6.22871 6.22877C6.93732 5.5201 7.61193 5.08133 8.55711 4.71394C9.27066 4.43662 10.3429 4.10673 12.3173 4.01672C14.4526 3.9193 15.0931 3.89862 20.5001 3.89862Z"
            fill="white"
            fill-opacity="0.25"
          />
          <path
            d="M20.5 27.2493C16.772 27.2493 13.7499 24.2273 13.7499 20.4994C13.7499 16.7713 16.772 13.7493 20.5 13.7493C24.2279 13.7493 27.25 16.7713 27.25 20.4994C27.25 24.2273 24.2279 27.2493 20.5 27.2493ZM20.5 10.1007C14.7569 10.1007 10.1013 14.7563 10.1013 20.4994C10.1013 26.2424 14.7569 30.8979 20.5 30.8979C26.243 30.8979 30.8986 26.2424 30.8986 20.4994C30.8986 14.7563 26.243 10.1007 20.5 10.1007ZM33.7395 9.68981C33.7395 11.0319 32.6515 12.1198 31.3095 12.1198C29.9675 12.1198 28.8795 11.0319 28.8795 9.68981C28.8795 8.34776 29.9675 7.25977 31.3095 7.25977C32.6515 7.25977 33.7395 8.34776 33.7395 9.68981Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "LinkedIn",
          position: "bottom",
        }}
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
        role="button"
        tabindex="0"
        on:click={() =>
          window.open("https://www.linkedin.com/in/hiprathamesh", "_blank")}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.7146 39.9302H39.9965L40 25.2987C40 18.1159 38.4523 12.5946 30.0582 12.5946C28.4833 12.5361 26.922 12.9059 25.5405 13.6646C24.1591 14.4233 23.0094 15.5425 22.2137 16.9029H22.1024V13.258H14.1518V39.9293H22.4337V26.7351C22.4337 23.2559 23.0936 19.8861 27.4071 19.8861C31.6594 19.8861 31.7146 23.8675 31.7146 26.9603V39.9302Z"
            fill="white"
            fill-opacity="0.25"
          />
          <path
            d="M2.13669 8.80273C2.92714 9.33069 3.8564 9.6124 4.80694 9.61223C5.43811 9.61212 6.06306 9.48769 6.64612 9.24605C7.22919 9.00442 7.75893 8.65031 8.20513 8.20394C8.65135 7.75757 9.00529 7.22768 9.24671 6.64454C9.48814 6.06139 9.61234 5.4364 9.61222 4.80525C9.61205 3.85469 9.32998 2.92553 8.80173 2.13526C8.27351 1.345 7.52277 0.729125 6.64452 0.365518C5.76625 0.00191342 4.79987 -0.0930949 3.86762 0.0925177C2.93535 0.278128 2.07909 0.736024 1.40707 1.40829C0.735033 2.08056 0.27746 2.93701 0.0921819 3.86934C-0.0930964 4.80166 0.00225937 5.76799 0.366161 6.64613C0.730084 7.52427 1.34623 8.27477 2.13669 8.80273Z"
            fill="white"
            fill-opacity="0.25"
          />
          <path
            d="M0.657367 39.9302H8.94793V13.258H0.657367V39.9302Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "Telegram",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        on:click={() => window.open("https://t.me/r0yaIp)", "_blank")}
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 38 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.52598 14.2179L24.4118 5.2006C26.5722 4.26129 33.8988 1.25551 33.8988 1.25551C33.8988 1.25551 37.2803 -0.0595185 36.9985 3.13412C36.9046 4.44915 36.1532 9.05175 35.4017 14.0301L33.0534 28.7772C33.0534 28.7772 32.8656 30.9376 31.2688 31.3133C29.6719 31.689 27.0419 29.9983 26.5722 29.6226C26.1965 29.3408 19.5274 25.1139 17.0852 23.0474C16.4277 22.4838 15.6763 21.3567 17.1792 20.0416C20.5607 16.9419 24.5997 13.0908 27.0419 10.6486C28.169 9.52141 29.2962 6.89135 24.5997 10.085L11.3555 19.0084C11.3555 19.0084 9.85257 19.9477 7.03465 19.1023C4.21674 18.257 0.929161 17.1298 0.929161 17.1298C0.929161 17.1298 -1.32517 15.7208 2.52598 14.2179Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        use:tooltip={{
          text: "Twitter",
          position: "bottom",
        }}
        role="button"
        tabindex="0"
        on:click={() => window.open("https://x.com/heyprathamesh", "_blank")}
        class="h-[65px] w-[65px] bg-[rgb(35,35,35)] rounded-[6px] cursor-pointer flex justify-center items-center border-[0.01px] border-solid border-[rgba(255,255,255,0.05)]"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 45 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.152 36.5718C31.134 36.5718 40.4208 22.503 40.4208 10.303C40.4208 9.90349 40.4126 9.50574 40.3947 9.10966C42.2015 7.80223 43.761 6.18333 45 4.32885C43.3457 5.06424 41.5656 5.55924 39.6982 5.78242C41.6042 4.63932 43.0676 2.83134 43.758 0.675897C41.9456 1.75109 39.9629 2.509 37.8954 2.91696C36.2106 1.12242 33.8122 0 31.1562 0C26.0577 0 21.9232 4.13466 21.9232 9.23122C21.9232 9.95574 22.0043 10.6605 22.1627 11.3364C14.4894 10.9503 7.68523 7.27646 3.13154 1.6902C2.31138 3.09905 1.87997 4.70038 1.88137 6.33057C1.88137 9.53368 3.51131 12.3614 5.9899 14.0157C4.5238 13.9709 3.08985 13.5749 1.80858 12.8609C1.80722 12.8997 1.80722 12.9375 1.80722 12.9789C1.80722 17.4501 4.98965 21.1832 9.21415 22.0292C8.42072 22.2453 7.602 22.3546 6.77966 22.3541C6.19729 22.3537 5.61627 22.298 5.04446 22.1876C6.21988 25.8559 9.62821 28.5254 13.6691 28.6C10.5092 31.0768 6.52854 32.5519 2.20225 32.5519C1.45795 32.5519 0.722708 32.5096 0 32.4242C4.08604 35.0432 8.93782 36.5714 14.1525 36.5714"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
      </div>
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
    scrollbar-width: none;
    -moz-scrollbar-width: none;
  }

  .scrollable-section::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  .social-icons-container {
    display: flex;
    justify-content: center;
    gap: 40px;
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

    .social-icons-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      justify-items: center;
    }
  }
</style>
