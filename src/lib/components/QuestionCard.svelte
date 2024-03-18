<script lang="ts">
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

  let val: string;
  let answered: boolean = false;

  function isSame(
    answer: string,
    correctAnswer: string = question.correctAnswer
  ): boolean {
    return simplifyString(answer) === simplifyString(correctAnswer);
  }
</script>

<div class="card w-full bg-base-300 shadow-xl" dir="auto">
  <div class="card-body">
    <h2 class="card-title">{index + 1}. {question.question}</h2>
    {#if finished && !answered}
      <h3 class="text-error text-sm">Not answered</h3>
    {/if}
    {#each question.answers as answer}
      <div class="form-control">
        <label
          class="label bg-opacity-50"
          class:bg-success={finished && isSame(answer)}
          class:bg-error={finished &&
            !correct &&
            answered &&
            isSame(val, answer)}
        >
          <span class="label-text me-1 text-base">{answer}</span>
          <input
            on:change={() => {
              correct = isSame(answer);
              answered = true;
            }}
            type="radio"
            class="radio checked:bg-secondary"
            disabled={finished}
            bind:group={val}
            value={answer}
            name={question.questionNumber}
          />
        </label>
      </div>
    {/each}
  </div>
  {#if question.imageUrl.length > 0}
    <figure>
      <img src={question.imageUrl} alt="Card" />
    </figure>
  {/if}
</div>
