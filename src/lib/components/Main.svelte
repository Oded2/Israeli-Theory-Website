<script>
  import Container from "$lib/components/Container.svelte";
</script>

<div class="drawer-content flex justify-center">
  <div class="w-full">
    <Container>
      <slot />
    </Container>
  </div>
</div>
