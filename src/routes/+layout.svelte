<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import "tailwindcss/tailwind.css";
</script>

<Navbar></Navbar>
<div class="drawer md:drawer-open">
  <slot />
</div>
