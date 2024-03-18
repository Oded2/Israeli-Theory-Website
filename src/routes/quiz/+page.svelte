<script lang="ts">
  import Card from "$lib/components/QuestionCard.svelte";
  import Container from "$lib/components/Container.svelte";

  export let data;

  const questions = data.questions;
  const correct: boolean[] = [];

  let start: boolean = true;
  let seconds = 0;

  function score(): number {
    let count: number = 0;
    for (let i of correct) if (i) count++;
    return Math.round((count / questions.length) * 100);
  }

  function timer(maxSec: number): void {
    if (seconds == maxSec) return;
    setTimeout(() => {
      seconds++;
      timer(maxSec);
    }, 1000);
  }
  timer(1800);
</script>

<main>
  <Container>
    {#if start}
      <div class="grid grid-cols-4">
        <div class="col-span-3">
          {#each questions as question, index}
            <div class="my-10">
              <Card {question} {index} bind:correct={correct[index]}></Card>
            </div>
          {/each}
        </div>
        <div class="col-span-1 py-10 px-5">
          <h1 class="text-center font-bold text-5xl select-none cursor-default">
            {`${Math.floor(seconds / 60).toLocaleString("en", { minimumIntegerDigits: 2 })}:${(seconds % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}`}
          </h1>
        </div>
      </div>
    {/if}
  </Container>
</main>
