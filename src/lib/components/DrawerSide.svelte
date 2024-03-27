<script lang="ts">
  export let id: string;
</script>

<input {id} type="checkbox" class="drawer-toggle" />
<div class="drawer-side">
  <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
  <div class="p-4 w-80 min-h-full bg-base-200 text-base-content print:hidden">
    <slot />
  </div>
</div>
