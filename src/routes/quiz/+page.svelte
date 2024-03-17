<script lang="ts">
  import Card from "$lib/components/QuestionCard.svelte";
  import Container from "$lib/components/Container.svelte";
  export let data;

  const questions = data.questions;
  const correct: boolean[] = [];

  let start: boolean = true;
  function score(): number {
    let count: number = 0;
    for (let i of correct) if (i) count++;
    return Math.round((count / questions.length) * 100);
  }
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
        <div class="col-span-1 py-10 px-5"></div>
      </div>
    {/if}
  </Container>
</main>
