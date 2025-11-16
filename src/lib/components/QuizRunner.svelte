<!-- QuizRunner.svelte -->
<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import MCQ from "./questions/MCQ.svelte";
  import Match from "./questions/Match.svelte";

  export let questions = [];
  let matchConnections = [];
  export let slug = "";
  export let page = "";

  const dispatch = createEventDispatcher();

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const currentQuestions = shuffle(questions);
  let currentIndex = 0;

  let score = 0;
  let finished = false;
  let answered = false;
  let feedback = "";
  let history = [];

  const total = currentQuestions.length;

  let childRef;
  let canSubmit = false;
  let confetti;

  onMount(async () => {
    if (typeof window !== "undefined") {
      const mod = await import("canvas-confetti");
      confetti = mod.default;
    }
  });

  function celebrate() {
    if (!confetti) return;
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
    let t = 0;
    const pulses = 4;
    const int = setInterval(() => {
      confetti({
        particleCount: 60,
        spread: 70,
        startVelocity: 45,
        origin: { y: 0.6 },
      });
      if (++t >= pulses) clearInterval(int);
    }, 220);
  }

  function onState(e) {
    canSubmit = !!e.detail?.canSubmit;
  }

  function submit() {
    const q = currentQuestions[currentIndex];

    if (q.type === "match") {
      const getDescById = (id) => {
        const p = q.pairs.find((x) => x.id === id);
        return p?.desc ?? p?.description ?? "";
      };

      const m = new Map(
        matchConnections.map(({ rightId, leftId }) => [rightId, leftId])
      );

      let correct = 0;
      let total = 0;

      q.pairs.forEach((p) => {
        const leftId = m.get(p.id);
        if (!leftId) return;
        total++;

        const rightDesc = getDescById(p.id);
        const leftDesc = getDescById(leftId);

        if (rightDesc && rightDesc === leftDesc) correct++;
      });

      const isCorrect = correct === total && total > 0;

      feedback = isCorrect
        ? "✅ Perfect match!"
        : `❌ ${correct}/${q.pairs.length} matched correctly`;

      if (isCorrect) score++;

      answered = true;
      history[currentIndex] = { matches: matchConnections.slice() };
      return;
    } else {
      if (!childRef || answered) return;
      const res = childRef.submit();
      answered = true;
      feedback =
        res.feedback ||
        (res.isCorrect ? "✅ Correct!" : "❌ Not quite.");
      if (res.isCorrect) score++;
      history[currentIndex] = res.history || {};
    }
  }

  function next() {
    if (!answered) return;
    if (currentIndex < total - 1) {
      currentIndex++;
      answered = false;
      feedback = "";
      matchConnections = [];
      canSubmit = false;
      childRef?.reset?.();
    } else {
      finished = true;

      // 🔹 NEW: notify parent with final score
      dispatch("finished", {
        score,
        total,
        slug,
        page,
      });

      setTimeout(celebrate, 150);

      // keep your localStorage prev-score logic if you still like it
      let prev = localStorage.getItem("prev-score");
      if (prev) {
        prev = JSON.parse(prev);
        prev[`${slug}-${page}`] = score;
        localStorage.setItem("prev-score", JSON.stringify(prev));
      } else {
        localStorage.setItem(
          "prev-score",
          JSON.stringify({ [`${slug}-${page}`]: score })
        );
      }
    }
  }

  function restart() {
    const reshuffled = shuffle(questions);
    currentQuestions.splice(0, currentQuestions.length, ...reshuffled);
    currentIndex = 0;
    score = 0;
    finished = false;
    answered = false;
    feedback = "";
    canSubmit = false;
    history = [];
    matchConnections = [];
    childRef?.reset?.();
  }

  $: progressPct = Math.round(
    ((currentIndex + (answered ? 1 : 0)) / total) * 100
  );
</script>

<!-- …rest of markup & styles unchanged… -->


<div class="quiz-root" tabindex="0" aria-label="Quiz container">
  {#if !finished}
    <header class="quiz-header">
      <div class="badge">Question {currentIndex + 1} / {total}</div>
      <div class="score">Score: <strong>{score}</strong></div>
    </header>

    <div
      class="progress"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={progressPct}
    >
      <div class="bar" style={`width:${progressPct}%`}></div>
    </div>

    <article class="card">
      {#if currentQuestions[currentIndex].type === "mcq"}
        <MCQ
          bind:this={childRef}
          question={currentQuestions[currentIndex]}
          freeze={answered}
          on:state={onState}
        />
      {:else if currentQuestions[currentIndex].type === "match"}
        <Match
          bind:this={childRef}
          image={currentQuestions[currentIndex].img}
          prompt={currentQuestions[currentIndex].prompt}
          pairs={currentQuestions[currentIndex].pairs}
          freeze={answered}
          bind:connections={matchConnections}
          on:state={onState}
        />
      {:else}
        <MCQ
          bind:this={childRef}
          question={currentQuestions[currentIndex]}
          freeze={answered}
          on:state={onState}
        />
      {/if}

      <div class="actions">
        {#if !answered}
          <button
            class="btn primary"
            on:click={submit}
            disabled={!canSubmit}
          >
            Submit
          </button>
        {:else}
          <p class="feedback" aria-live="polite">{feedback}</p>
          <button class="btn success" on:click={next}>
            {currentIndex === total - 1 ? "Finish" : "Next question"}
          </button>
        {/if}
      </div>
    </article>
  {:else}
    <article class="result">
      <h2>🎉 Quiz complete</h2>
      <p class="final">
        You scored <strong>{score}</strong> / <strong>{total}</strong>.
      </p>
      <button class="btn primary" on:click={restart}>Restart</button>
    </article>

    <section class="review-list" aria-label="Review answers">
      {#each currentQuestions as q, qi}
        <article class="card review-card">
          <h3 class="review-q">
            Q{qi + 1}. {q?.type === "mcq" || !q?.type ? q.question : q.prompt}
          </h3>

          {#if q.type === "mcq" || !q.type}
            {#if history[qi]?.selected?.length}
              {#if history[qi].selected.some((a) => !q.correct
                .map((c) => c.trim())
                .includes(a.trim()))}
                <p class="your-picks-line">
                  Your wrong pick
                  {history[qi].selected.filter(
                    (a) =>
                      !q.correct
                        .map((c) => c.trim())
                        .includes(a.trim())
                  ).length > 1
                    ? "s"
                    : ""}:
                  <span class="chips">
                    {#each history[qi].selected.filter((a) => !q.correct
                      .map((c) => c.trim())
                      .includes(a.trim())) as wp}
                      <span class="chip chip-wrong">{wp}</span>
                    {/each}
                  </span>
                </p>
              {/if}
            {/if}

            <ul class="answers review" role="list">
              {#each q.answers as a, ai}
                <li>
                  <div
                    class={`answer readonly
                      ${q.correct.map((c) => c.trim()).includes(a.trim()) ? "is-correct" : ""}
                      ${history[qi]?.selected?.includes(a) &&
                      !q.correct.map((c) => c.trim()).includes(a.trim())
                        ? "is-picked-wrong"
                        : ""}`}
                  >
                    <span class="index">{ai + 1}</span>
                    <span class="label">{a}</span>
                    {#if q.correct.map((c) => c.trim()).includes(a.trim())}
                      <span class="mark" aria-hidden="true">✔</span>
                    {:else if history[qi]?.selected?.includes(a)}
                      <span class="mark" aria-hidden="true">✖</span>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          {:else if q.type === "match"}
            <ul class="answers review" role="list">
              {#each q.pairs as p, i}
                <li>
                  <div class="answer readonly is-correct">
                    <span class="index">{i + 1}</span>
                    <span class="label">{p.term} — {p.desc}</span>
                    <span class="mark" aria-hidden="true">✔</span>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </article>
      {/each}
    </section>
  {/if}
</div>

<style>
  /* Root fits naturally into the layout's page-content */
  .quiz-root {
    width: min(1100px, 100%);
    margin: 0 auto 2.5rem;
    padding: 0.75rem 0 2rem;
    display: grid;
    gap: 1rem;
  }

  .quiz-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .badge {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.02)
    );
    border: 1px solid var(--card-border);
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: var(--shadow);
  }

  .score {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .progress {
    width: 100%;
    height: 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--card-border);
    border-radius: 999px;
    overflow: hidden;
    backdrop-filter: blur(6px);
  }

  .progress .bar {
    height: 100%;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    transition: width var(--transition);
  }

  .card {
    width: 100%;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1.2rem;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
  }

  .actions {
    margin-top: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .feedback {
    margin: 0 0.25rem 0 0;
    font-weight: 600;
    color: var(--muted);
  }

  .btn {
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 0.7rem 1rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    background: var(--bg-soft);
    color: var(--text);
    cursor: pointer;
    font-size: 0.9rem;
    transition:
      transform var(--transition),
      box-shadow var(--transition),
      background var(--transition),
      border-color var(--transition),
      opacity var(--transition);
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 0 0 6px var(--ring);
    border-color: var(--ring);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .btn.primary {
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    color: #fff;
    border-color: transparent;
  }

  .btn.success {
    background: linear-gradient(90deg, #31d0aa, #25c7b0);
    color: #06211b;
    border-color: transparent;
  }

  .result {
    width: 100%;
    text-align: center;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 2rem 1.4rem;
    box-shadow: var(--shadow);
  }

  .final {
    color: var(--muted);
    margin: 0.4rem 0 1rem;
  }

  .review-list {
    width: 100%;
    display: grid;
    gap: 1rem;
  }

  .review-card .review-q {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  .answers.review {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.65rem;
  }

  .answer.readonly {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
    align-items: center;
    background: var(--bg-soft);
    color: var(--text);
    border: 1px solid var(--card-border);
    border-radius: 14px;
    padding: 0.9rem 1rem;
  }

  .answer.readonly.is-correct {
    background: linear-gradient(
      180deg,
      rgba(49, 208, 170, 0.16),
      rgba(49, 208, 170, 0.06)
    );
    border-color: rgba(49, 208, 170, 0.6);
  }

  .answer.readonly.is-picked-wrong {
    border-color: rgba(231, 75, 75, 0.85);
    background: linear-gradient(
      180deg,
      rgba(231, 75, 75, 0.18),
      rgba(231, 75, 75, 0.06)
    );
  }

  .index {
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

  .label {
    line-height: 1.35;
  }

  .mark {
    font-weight: 900;
    opacity: 0.95;
  }

  .chips {
    display: inline-flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.06);
  }

  .chip-wrong {
    border-color: rgba(231, 75, 75, 0.65);
    background: rgba(231, 75, 75, 0.18);
    color: #ffecec;
  }

  .your-picks-line {
    margin: 0 0 0.5rem;
    color: var(--muted);
    font-size: 0.95rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress .bar,
    .btn,
    .card,
    .answer.readonly {
      transition: none;
    }
  }
</style>
