<script lang="ts">
  export let image: string;
  export let title: string;
  export let description: string;
  export let btnText: string = "Get Started";
  export let href: string = "";
</script>

<div class="hero min-h-screen">
  <div class="hero-content flex-col lg:flex-row">
    <img src={image} class="max-w-sm rounded-lg shadow-2xl" alt="Hero" />
    <div>
      <h1 class="text-5xl font-bold">{title}</h1>
      <p class="py-6">
        {description}
      </p>
      {#if href.length > 0}
        <a {href} class="btn btn-primary">{btnText}</a>
      {:else}
        <button on:click class="btn btn-primary">{btnText}</button>
      {/if}
    </div>
  </div>
</div>
