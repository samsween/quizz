<script>
  import Questions from '$lib/components/Questions.svelte';
  export let data;
  const { quiz } = data;
</script>

  <Questions questions={quiz.questions} />