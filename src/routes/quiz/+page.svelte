<script lang="ts">
  import Card from "$lib/components/QuestionCard.svelte";
  import Container from "$lib/components/Container.svelte";
  export let data;

  const questions = data.questions;
  let start: boolean = true;
</script>

<main>
  <Container margin>
    {#if start}
      {#each questions as question, index}
        <div class="mb-10 grid place-content-center">
          <Card {question} {index}></Card>
        </div>
      {/each}
    {/if}
  </Container>
</main>
