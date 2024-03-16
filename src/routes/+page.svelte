<script lang="ts">
  import { hrefs } from "$lib";
  import Container from "$lib/components/Container.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import learning from "$lib/images/learning.png";
</script>

<main>
  <Container
    ><Hero
      image={learning}
      title="Learn to Drive"
      description="Master the Israeli driver theory without a problem. Practice the test as much times as needed, and come ready for the real thing."
      href={hrefs.quiz}
    ></Hero>
  </Container>
</main>
