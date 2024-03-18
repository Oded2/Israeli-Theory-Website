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
    {#each question.answers as answer, index}
      <div class="form-control">
        <label
          class="label bg-opacity-50"
          class:bg-success={finished && isSame(answer)}
          class:bg-error={finished && !correct && isSame(val, answer)}
        >
          <span class="label-text me-1 text-base">{answer}</span>
          <input
            on:change={() => (correct = isSame(answer))}
            required={index == 0}
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
