<script lang="ts">
  export let image: string;
  export let title: string;
  export let description: string;
</script>

<div class="hero min-h-screen">
  <div class="hero-content flex-col lg:flex-row">
    <img src={image} class="max-w-sm rounded-lg shadow-2xl" alt="Hero" />
    <div>
      <h1 class="text-5xl font-bold">{title}</h1>
      <p class="py-6">
        {description}
      </p>
      <slot />
    </div>
  </div>
</div>
