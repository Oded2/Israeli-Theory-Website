<script lang="ts">
  import { hrefs } from "$lib";
  import Container from "$lib/components/Container.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import learning from "$lib/images/learning.png";
  import { addParamsString } from "../hooks.client";

  let lang: string = "en";
  let len: number = 30;
</script>

<main>
  <Container
    ><Hero
      image={learning}
      title="Learn to Drive"
      description="Master the Israeli driver theory without a problem. Practice the test as much times as needed, and come ready for the real thing."
      href={addParamsString(hrefs.quiz, { lang, len })}
    >
      <select class="select select-primary me-3" bind:value={lang}>
        <option value="he">Hebrew</option>
        <option value="ar">Arabic</option>
        <option selected value="en">English</option>
        <option value="ru">Russian</option>
        <option value="fr">French</option>
      </select>
      <input
        type="number"
        placeholder="No. of Questions"
        min="1"
        max="100"
        bind:value={len}
        class="input input-primary max-w-xs me-3"
      />
    </Hero>
  </Container>
</main>
