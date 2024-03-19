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

  export let data;

  const { questions } = data;
  const length: number = questions.length;
  const correct: boolean[] = [];

  let start: boolean = true;
  let finished: boolean = false;
  let seconds: number = 0;
  let answered: number = 0;
  let finalCount: number;
  let finalScore: number;

  onMount(() => {
    timer(2400);
  });

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
  {#if start}
    <div class="md:mx-5">
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
  {/if}
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
        on:click={() => showModal("score")}>Show Result</button
      >
      <a href={hrefs.home} class="btn btn-primary btn-outline btn-block">Home</a
      >
    {:else}
      <button
        class="btn btn-primary w-full"
        disabled={finished}
        on:click={submit}
        >Finish Test
      </button>
    {/if}
  </div>
</DrawerSide>

<Modal id="score">
  <div class="text-center p-5">
    <h1 class="text-3xl font-bold mb-5">
      Test Result: <span
        class:text-success={finalScore >= 80}
        class:text-error={finalScore < 80}
        >{finalScore >= 80 ? "Pass" : "Fail"}</span
      >
    </h1>
    <h2 class="text-3xl font-semibold mb-3">
      {`${finalScore}%`}
    </h2>
    <h3 class="text-xl font-semibold">
      {`You answered ${finalCount} out of ${length} questions correctly`}
    </h3>
  </div>
</Modal>

<FloatElement>
  <label for="drawer" class="btn btn-primary md:hidden">Options</label>
</FloatElement>

<Title title="Practice Test"></Title>
