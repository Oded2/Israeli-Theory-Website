<script lang="ts">
  export let id: string;
  export let title: string = "";
</script>

<dialog {id} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    {#if title.length > 0}
      <h3 class="font-bold text-lg">{title}</h3>
    {/if}
    <slot />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>
