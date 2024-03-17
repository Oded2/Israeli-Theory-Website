<script lang="ts">
  export let margin: boolean = false;
  export let padding: boolean = true;
</script>

<div
  class="container mx-auto"
  class:px-2={padding}
  class:sm:px-0={padding}
  class:my-10={margin}
>
  <slot />
</div>
