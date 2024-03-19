<script lang="ts">
  import DrawerSide from "$lib/components/DrawerSide.svelte";
  import Card from "$lib/components/QuestionCard.svelte";
  import FloatElement from "$lib/components/FloatElement.svelte";
  import Main from "$lib/components/Main.svelte";
  import { onMount } from "svelte";

  export let data;

  const questions = data.questions;
  const correct: boolean[] = [];
  let abc: HTMLElement;

  let start: boolean = true;
  let finished: boolean = false;
  let seconds: number = 0;

  onMount(() => {
    // timer(2400);
  });

  function submit(): void {
    finished = true;
  }

  function score(): number {
    let count: number = 0;
    for (let i of correct) if (i) count++;
    return Math.round((count / questions.length) * 100);
  }

  function timer(maxSec: number): void {
    if (seconds == maxSec || finished) return;
    setTimeout(() => {
      seconds++;
      timer(maxSec);
    }, 1000);
  }
</script>

<Main>
  {#if start}
    <div class="md:mx-5">
      {#each questions as question, index}
        <div class="my-10">
          <Card {question} {index} {finished} bind:correct={correct[index]}
          ></Card>
        </div>
      {/each}
    </div>
  {/if}
</Main>
<DrawerSide id="drawer">
  <div class="text-center select-none cursor-default mb-8">
    <h2>Time Left</h2>
    <h1 class="font-bold text-5xl underline underline-offset-8">
      {`${(40 - Math.ceil(seconds / 60)).toLocaleString("en", { minimumIntegerDigits: 2 })}:${((60 - (seconds % 60)) % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}`}
    </h1>
  </div>
  <div>
    <button class="btn btn-primary w-full" disabled={finished} on:click={submit}
      >Finish Test</button
    >
  </div>
</DrawerSide>

<FloatElement>
  <label bind:this={abc} for="drawer" class="btn btn-primary md:hidden"
    >Info</label
  >
</FloatElement>
