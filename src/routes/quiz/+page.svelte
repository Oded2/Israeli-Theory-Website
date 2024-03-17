<script lang="ts">
  import FloatElement from "$lib/components/FloatElement.svelte";
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
  <Container margin>
    {#if start}
      {#each questions as question, index}
        <div class="mb-10 grid place-content-center">
          <Card {question} {index} bind:correct={correct[index]}></Card>
        </div>
      {/each}
    {/if}
  </Container>
</main>
