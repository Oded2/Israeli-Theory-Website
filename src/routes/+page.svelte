<script lang="ts">
  import { hrefs } from "$lib";
  import Container from "$lib/components/Container.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Main from "$lib/components/Main.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Title from "$lib/components/Title.svelte";
  import learning from "$lib/images/learning.png";
  import { addParamsString, showModal } from "../hooks.client";

  let lang: string = "en";
  let len: number = 30;
</script>

<Main>
  <Hero
    image={learning}
    title="Learn to Drive"
    description="Master the Israeli driver theory without a problem. Practice the test as much times as needed, and come ready for the real thing."
  >
    <div class="grid grid-flow-col w-2/3 gap-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Language</span>
        </div>
        <select id="lang" class="select select-primary" bind:value={lang}>
          <option value="he">Hebrew</option>
          <option value="ar">Arabic</option>
          <option selected value="en">English</option>
          <option value="ru">Russian</option>
          <option value="fr">French</option>
        </select>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">No. of Questions</span>
        </div>
        <input
          type="number"
          placeholder="No. of Questions"
          min="1"
          max="100"
          bind:value={len}
          class="input input-primary"
        />
      </label>
      <label for="modal" class="form-control w-full max-w-xs">
        <div class="label"><span class="label-text">&nbsp;</span></div>
        <button on:click={() => showModal("modal")} class="btn btn-primary"
          >Get Started</button
        >
      </label>
    </div>
  </Hero>
</Main>

<Modal id="modal" title="Choose Mode">
  <div class="flex justify-around p-10 gap-4">
    <button class="btn btn-primary btn-outline w-1/2">Practice</button>

    <a
      class="btn btn-primary w-1/2"
      href={addParamsString(hrefs.quiz, { lang, len })}>Test</a
    >
  </div>
</Modal>

<Title title="Home"></Title>
