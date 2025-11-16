<script>
  import { createEventDispatcher } from "svelte";

  export let question;
  export let freeze = false;

  const dispatch = createEventDispatcher();

  const shuffle = (arr) => {
    if (!arr) return [];
    if (!Array.isArray(arr)) return [];
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  let options = shuffle(question.answers);
  let selected = [];

  const isCorrectAnswer = (answer) =>
    question.correct.map((c) => c.trim()).includes(answer.trim());

  function toggle(answer) {
    if (freeze) return;
    selected = selected.includes(answer)
      ? selected.filter((a) => a !== answer)
      : [...selected, answer];
    dispatchState();
  }

  function dispatchState() {
    const canSubmit = selected.length > 0;
    dispatch("state", { canSubmit });
  }

  function reset() {
    options = shuffle(question.answers);
    selected = [];
    dispatchState();
  }

  function submit() {
    const correctSet = new Set(question.correct.map((c) => c.trim()));
    const chosen = new Set(selected.map((s) => s.trim()));
    const isExact =
      correctSet.size === chosen.size &&
      [...correctSet].every((a) => chosen.has(a));

    const feedback = isExact
      ? "✅ Correct!"
      : `❌ Not quite. Correct: ${[...correctSet].join(", ")}`;

    return {
      isCorrect: isExact,
      feedback,
      history: {
        selected: [...selected],
        correct: [...question.correct]
      }
    };
  }

  // let parent reactively know if we can submit
  $: dispatchState();

  export { reset, submit };
</script>

<h2 class="question">{question.question}</h2>

{#if question.img}
  <figure class="media">
    <img src={question.img} alt="Question image" loading="lazy" />
  </figure>
{/if}

<ul class="answers" role="list">
  {#each options as answer, i (answer)}
    <li>
      <button
        type="button"
        class="
          answer
          {selected.includes(answer) && !freeze ? 'is-selected' : ''}
          {freeze && isCorrectAnswer(answer) ? 'is-correct' : ''}
          {freeze && selected.includes(answer) && !isCorrectAnswer(answer)
            ? 'is-wrong'
            : ''}
        "
        on:click={() => toggle(answer)}
        disabled={freeze}
        aria-pressed={selected.includes(answer)}
      >
        <span class="index">{i + 1}</span>
        <span class="label">{answer}</span>

        {#if freeze}
          {#if isCorrectAnswer(answer)}
            <span class="mark" aria-hidden="true">✔</span>
          {:else if selected.includes(answer)}
            <span class="mark" aria-hidden="true">✖</span>
          {/if}
        {/if}
      </button>
    </li>
  {/each}
</ul>

<style>
  .question {
    font-size: clamp(1.1rem, 1.4vw + 1rem, 1.6rem);
    line-height: 1.25;
    margin: 0.2rem 0 1rem;
    letter-spacing: 0.2px;
  }

  .media {
    margin: 0.6rem 0 1.2rem;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    width: 100%;
  }

  .media img {
    width: 100%;
    height: auto;
    display: block;
  }

  .answers {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.65rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 640px) {
    .answers {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .answer {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
    align-items: center;
    background: var(--bg-soft);
    color: var(--text);
    border: 1px solid var(--card-border);
    border-radius: 14px;
    padding: 0.9rem 1rem;
    cursor: pointer;
    transition:
      transform var(--transition),
      border-color var(--transition),
      box-shadow var(--transition),
      background var(--transition),
      opacity var(--transition);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.08);
  }

  .answer:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: var(--ring);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.16),
      0 0 0 6px var(--ring);
  }

  .answer:disabled {
    cursor: default;
    opacity: 0.88;
  }

  .answer .index {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.9rem;
    background: rgba(124, 156, 255, 0.15);
    border: 1px solid rgba(124, 156, 255, 0.35);
  }

  .answer .label {
    line-height: 1.35;
  }

  .answer .mark {
    font-weight: 900;
    opacity: 0.95;
  }

  .answer.is-selected {
    background: linear-gradient(
      180deg,
      rgba(124, 156, 255, 0.12),
      rgba(124, 156, 255, 0.06)
    );
    border-color: var(--primary);
    box-shadow: 0 6px 18px rgba(124, 156, 255, 0.25);
  }

  .answer.is-correct {
    background: linear-gradient(
      180deg,
      rgba(49, 208, 170, 0.16),
      rgba(49, 208, 170, 0.06)
    );
    border-color: rgba(49, 208, 170, 0.6);
  }

  .answer.is-wrong {
    background: linear-gradient(
      180deg,
      rgba(255, 107, 107, 0.16),
      rgba(255, 107, 107, 0.06)
    );
    border-color: rgba(255, 107, 107, 0.6);
  }
</style>
