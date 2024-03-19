<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import "tailwindcss/tailwind.css";
</script>

<Navbar></Navbar>
<div class="drawer lg:drawer-open">
  <slot />
</div>
