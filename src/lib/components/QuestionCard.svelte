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
</script>

<div class="card w-96 bg-base-300 shadow-xl" dir="auto">
  <div class="card-body">
    <h2 class="card-title">{index}. {question.question}</h2>
    {#each question.answers as answer}
      <div class="form-control">
        <label class="label">
          <span class="label-text">{answer}</span>
          <input
            name="answers"
            on:change={() =>
              (correct =
                simplifyString(answer) ==
                simplifyString(question.correctAnswer))}
            type="radio"
            class="radio checked:bg-secondary"
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
