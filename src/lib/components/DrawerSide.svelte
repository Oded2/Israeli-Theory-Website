<script lang="ts">
  export let id: string;
</script>

<input {id} type="checkbox" class="drawer-toggle" />
<div class="drawer-side">
  <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    <slot />
  </ul>
</div>
