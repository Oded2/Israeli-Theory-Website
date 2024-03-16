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

  let correct: boolean = false;
  let checked: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<div class="card w-96 bg-base-300 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{question.question}</h2>
    {#each question.answers as answer, index}
      <div class="form-control">
        <label class="label" class:cursor-pointer={!checked}>
          <span class="label-text">{answer}</span>
          <input
            disabled={checked}
            name="answers"
            on:change={() =>
              (correct =
                simplifyString(answer) ==
                simplifyString(question.correctAnswer))}
            value={index}
            type="radio"
            class="radio checked:bg-secondary"
          />
        </label>
      </div>
    {/each}
    <div class="card-actions justify-end">
      <button
        on:click={() => {
          if (correct && !checked) dispatch("correct");
          checked = true;
        }}
        class="btn btn-primary">Check</button
      >
    </div>
  </div>
  {#if question.imageUrl.length > 0}
    <figure>
      <img src={question.imageUrl} alt="Card" />
    </figure>
  {/if}
</div>
