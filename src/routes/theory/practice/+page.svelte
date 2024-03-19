<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import FloatElement from "$lib/components/FloatElement.svelte";
  import QuestionCard from "$lib/components/QuestionCard.svelte";
  import Main from "$lib/components/Main.svelte";
  import DrawerSide from "$lib/components/DrawerSide.svelte";

  export let data;

  const { questions, lang } = data;
  const length = questions.length;
  const submitText =
    {
      en: "Check",
      he: "בדוק",
      ar: "راجع",
      ru: "Проверять",
      fr: "Vérifier",
    }[lang] ?? "Check";
  const nextText =
    {
      en: "Next",
      he: "הבא",
      ar: "التالي",
      ru: "следующий",
      fr: "suivant",
    }[lang] ?? "Next";
  let score: number = 0;
  let current: number = 0;
  let finished: boolean[] = [];
  let correct: boolean[] = [];

  function submit(): void {
    finished[current] = true;
  }
  function next(): void {
    current++;
  }
</script>

<Main>
  <div class="md:mx-5 py-10">
    {#each questions as question, index}
      <div class:hidden={current != index}>
        <QuestionCard
          {question}
          {index}
          bind:correct={correct[current]}
          finished={finished[current]}
        >
          <div class="card-actions justify-end hidden">
            {#if finished[current]}
              <button class="btn btn-primary" on:click={next}>
                {nextText}
              </button>
            {:else}
              <button class="btn btn-primary" on:click={submit}
                >{submitText}
              </button>
            {/if}
          </div>
        </QuestionCard>
      </div>
    {/each}
  </div>
</Main>

<DrawerSide id="drawer">
  <h1 class="mb-5 text-3xl font-bold ps-1">Questions</h1>
  <div class="grid grid-cols-5 place-items-center gap-4">
    {#each questions as _, index}
      <button
        class="btn btn-circle"
        class:btn-success={finished[index] && correct[index]}
        class:btn-error={finished[index] && !correct[index]}
        on:click={() => (current = index)}>{index + 1}</button
      >
    {/each}
  </div>
</DrawerSide>

<FloatElement>
  {#if finished[current]}
    <button class="btn btn-primary" on:click={next}>
      {nextText}
    </button>
  {:else}
    <button class="btn btn-primary" on:click={submit}>{submitText} </button>
  {/if}
  <label for="drawer" class="btn btn-primary md:hidden">Info</label>
</FloatElement>

<Title title="Practice"></Title>
