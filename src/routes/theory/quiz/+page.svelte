<script lang="ts">
  import DrawerSide from "$lib/components/DrawerSide.svelte";
  import Card from "$lib/components/QuestionCard.svelte";
  import FloatElement from "$lib/components/FloatElement.svelte";
  import Main from "$lib/components/Main.svelte";
  import { onMount } from "svelte";
  import Title from "$lib/components/Title.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { countCorrect, showModal } from "../../../hooks.client";
  import { hrefs } from "$lib";
  import Results from "$lib/components/Results.svelte";

  export let data;

  const { questions } = data;
  const length: number = questions.length;
  const correct: boolean[] = [];

  let finished: boolean = false;
  let seconds: number = 0;
  let answered: number = 0;
  let finalCount: number;
  let finalScore: number;

  onMount(() => timer(2400));

  function submit(): void {
    finished = true;
    finalCount = countCorrect(correct);
    finalScore = Math.round((finalCount / length) * 100);
    showModal("score");
  }

  function timer(maxSec: number): void {
    if (seconds == maxSec || finished) {
      submit();
      return;
    }
    setTimeout(() => {
      seconds++;
      timer(maxSec);
    }, 1000);
  }
</script>

<Main>
  <div class="md:mx-5">
    {#if finished}
      <div class="hidden print:block pt-5">
        <Results {finalCount} {finalScore} {length}></Results>
      </div>
    {/if}
    {#each questions as question, index}
      <div class="my-10">
        <Card
          {question}
          {index}
          {finished}
          bind:correct={correct[index]}
          on:answer={() => answered++}
        ></Card>
      </div>
    {/each}
  </div>
</Main>
<DrawerSide id="drawer">
  <div class="text-center select-none cursor-default mb-8">
    <h2>Time Left</h2>
    <h1 class="font-bold text-4xl underline underline-offset-8">
      {`${(40 - Math.ceil(seconds / 60)).toLocaleString("en", { minimumIntegerDigits: 2 })}:${((60 - (seconds % 60)) % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}`}
    </h1>
  </div>
  <div>
    {#if finished}
      <button
        class="btn btn-primary btn-block mb-3"
        on:click={() => showModal("score")}
        ><i class="fa-solid fa-square-poll-vertical"></i> Show Result</button
      >
      <a href={hrefs.home} class="btn btn-primary btn-outline btn-block mb-3"
        ><i class="fa-solid fa-home"></i> Home
      </a>
      <button
        on:click={() => window.print()}
        class="btn btn-accent btn-outline btn-block"
        ><i class="fa-solid fa-print"></i> Print</button
      >
    {:else}
      <button
        class="btn btn-primary w-full"
        disabled={finished}
        on:click={submit}
        ><i class="fa-solid fa-check"></i> Finish Test
      </button>
    {/if}
  </div>
</DrawerSide>

<Modal id="score">
  <Results {finalScore} {finalCount} {length}></Results>
</Modal>

<FloatElement>
  <label for="drawer" class="btn btn-accent md:hidden"
    ><i class="fa-solid fa-info"></i></label
  >
</FloatElement>

<Title title="Practice Test"></Title>
