<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { simplifyString } from "../../hooks.client";
  export let question: {
    questionNumber: string;
    question: string;
    answers: string[];
    correctAnswer: string;
    category: string;
    imageUrl: string;
  };
  export let index: number;
  export let correct: boolean = false;
  export let finished: boolean = false;

  const dispatch = createEventDispatcher();

  let val: string;
  let answered: boolean = false;

  function isSame(
    answer: string,
    correctAnswer: string = question.correctAnswer
  ): boolean {
    return simplifyString(answer) === simplifyString(correctAnswer);
  }
</script>

<div class="card w-full bg-base-300 shadow-xl p-3" dir="auto">
  <div class="card-body">
    <h3 class="font-medium">{question.category}</h3>
    <h2 class="card-title">{index + 1}. {question.question}</h2>
    {#if finished && !answered}
      <h4 class="text-error text-sm">Not answered</h4>
    {/if}
    {#each question.answers as answer}
      <div class="form-control">
        <label
          class="label justify-start bg-opacity-50 rounded"
          class:bg-success={finished && isSame(answer)}
          class:bg-error={finished &&
            !correct &&
            answered &&
            isSame(val, answer)}
        >
          <input
            on:change={() => {
              correct = isSame(answer);
              if (!answered) dispatch("answer");
              answered = true;
            }}
            type="radio"
            class="radio checked:bg-secondary"
            disabled={finished}
            bind:group={val}
            value={answer}
            name={question.questionNumber}
          />
          <span class="label-text ms-4 text-base">{answer}</span>
        </label>
      </div>
    {/each}
    <slot />
  </div>
  {#if question.imageUrl.length > 0}
    <figure>
      <img src={question.imageUrl} alt="Card" />
    </figure>
  {/if}
</div>
