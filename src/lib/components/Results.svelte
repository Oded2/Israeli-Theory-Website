<script lang="ts">
  export let finalScore: number;
  export let finalCount: number;
  export let length: number;
</script>

<div class="text-center pt-3 pb-5 px-5">
  <h1 class="text-3xl font-bold mb-5">
    Test Result: <span
      class:text-success={finalScore >= 80}
      class:text-error={finalScore < 80}
      >{finalScore >= 80 ? "Pass" : "Fail"}</span
    >
  </h1>
  <h2 class="text-3xl font-semibold mb-3">
    {`${finalScore}%`}
  </h2>
  <h3 class="text-xl font-semibold">
    {`You answered ${finalCount} out of ${length} questions correctly`}
  </h3>
</div>
