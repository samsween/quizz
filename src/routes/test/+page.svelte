<script>
    import QuizRunner from "$lib/components/QuizRunner.svelte";
    import { questions as q } from "$lib/quizzes/COMMUNICATE";
</script>

<QuizRunner questions={[q[1], q[14]]} page={1} slug={"eee"} />