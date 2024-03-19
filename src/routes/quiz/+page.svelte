<script lang="ts">
  import Card from "$lib/components/QuestionCard.svelte";
  import Container from "$lib/components/Container.svelte";

  export let data;

  const questions = data.questions;
  const correct: boolean[] = [];

  let start: boolean = true;
  let submit: boolean = false;
  let seconds: number = 0;

  function score(): number {
    let count: number = 0;
    for (let i of correct) if (i) count++;
    return Math.round((count / questions.length) * 100);
  }

  function timer(maxSec: number): void {
    if (seconds == maxSec || submit) return;
    setTimeout(() => {
      seconds++;
      timer(maxSec);
    }, 1000);
  }
  // timer(1800);
</script>

<main>
  <Container>
    {#if start}
      <div class="grid md:grid-cols-4">
        <div class="col-span-4">
          <form on:submit|preventDefault={() => (submit = true)}>
            {#each questions as question, index}
              <div class="my-10">
                <Card
                  {question}
                  {index}
                  finished={submit}
                  bind:correct={correct[index]}
                ></Card>
              </div>
            {/each}
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
        <!-- <div class="col-span-1 py-10 px-5">
          <div class="fixed bg-red-500">
            <h1
              class="text-center font-bold text-5xl select-none cursor-default"
            >
              {`${Math.floor(seconds / 60).toLocaleString("en", { minimumIntegerDigits: 2 })}:${(seconds % 60).toLocaleString("en", { minimumIntegerDigits: 2 })}`}
            </h1>
          </div>
        </div> -->
      </div>
    {/if}
  </Container>
</main>
