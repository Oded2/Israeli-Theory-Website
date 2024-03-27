<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import FloatElement from "$lib/components/FloatElement.svelte";
  import QuestionCard from "$lib/components/QuestionCard.svelte";
  import Main from "$lib/components/Main.svelte";
  import DrawerSide from "$lib/components/DrawerSide.svelte";
  import { countCorrect, showModal } from "../../../hooks.client.js";
  import Modal from "$lib/components/Modal.svelte";
  import { hrefs } from "$lib";
  import Results from "$lib/components/Results.svelte";

  export let data;

  const { questions, lang } = data;
  const length = questions.length;
  const checkText =
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
  const finished: boolean[] = [];
  const correct: boolean[] = [];

  let finalCount: number;
  let finalScore: number;
  let current: number = 0;
  let isFinished: boolean = false;

  function check(): void {
    finished[current] = true;
  }
  function next(): void {
    current++;
  }

  function finish(): void {
    isFinished = true;
    finalCount = countCorrect(correct);
    finalScore = Math.round((finalCount / length) * 100);
    showResults();
  }
  function showResults(): void {
    showModal("score");
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
          finished={finished[current] || isFinished}
        >
          <div class="card-actions hidden md:block">
            {#if isFinished}
              {#if current === length - 1}
                <button class="btn btn-primary" on:click={showResults}
                  >Show Results</button
                >
              {:else}
                <button class="btn btn-primary" on:click={next}
                  >{nextText}</button
                >
              {/if}
            {:else if !finished[current]}
              <button class="btn btn-primary" on:click={check}
                >{checkText}</button
              >
            {:else if current === length - 1}
              <button class="btn btn-primary" on:click={finish}>Finish</button>
            {:else}
              <button class="btn btn-primary" on:click={next}>{nextText}</button
              >
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
        class:btn-active={current == index}
        class:btn-success={finished[index] && correct[index]}
        class:btn-error={finished[index] && !correct[index]}
        on:click={() => (current = index)}>{index + 1}</button
      >
    {/each}
  </div>
  <div class="divider"></div>
  <div>
    {#if isFinished}
      <button class="btn btn-success btn-block mb-3" on:click={showResults}
        ><i class="fa-solid fa-square-poll-vertical"></i> Show Results
      </button>
      <a href={hrefs.home} class="btn btn-success btn-block btn-outline"
        ><i class="fa-solid fa-home"></i> Home</a
      >
    {:else}
      <button class="btn btn-success btn-block" on:click={finish}
        ><i class="fa-solid fa-check"></i> Finish
      </button>
    {/if}
  </div>
</DrawerSide>

<Modal id="score">
  <Results {finalScore} {finalCount} {length}></Results>
</Modal>

<FloatElement>
  <div class="md:hidden">
    {#if isFinished}
      {#if current === length - 1}
        <button class="btn btn-primary" on:click={showResults}
          >Show Results</button
        >
      {:else}
        <button class="btn btn-primary" on:click={next}>{nextText}</button>
      {/if}
    {:else if !finished[current]}
      <button class="btn btn-primary" on:click={check}>{checkText}</button>
    {:else if current === length - 1}
      <button class="btn btn-primary" on:click={finish}>Finish</button>
    {:else}
      <button class="btn btn-primary" on:click={next}>{nextText}</button>
    {/if}
    <label for="drawer" class="btn btn-secondary"
      ><i class="fa-solid fa-info"></i></label
    >
  </div>
</FloatElement>

<Title title="Practice"></Title>
