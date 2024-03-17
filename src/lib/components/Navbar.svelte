<script>
  import { hrefs } from "$lib";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import Container from "./Container.svelte";
  onMount(() => themeChange(false));
</script>

<div class="navbar bg-base-300">
  <Container>
    <div class="flex-1">
      <a href={hrefs.home} class="btn btn-ghost text-xl">ilTest</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <details>
            <summary> Theme </summary>
            <ul class="p-2 bg-base-100 rounded-t-none">
              <li><button data-set-theme="light">Light</button></li>
              <li><button data-set-theme="dark">Dark</button></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </Container>
</div>
