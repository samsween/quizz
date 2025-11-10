<script>
    import { onMount } from 'svelte';

  export let questions = [];
  export let slug = "";
  export let page = "";
    let confetti;
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const mod = await import('canvas-confetti');
      confetti = mod.default;
    }
  });
  function celebrate() {
    if (!confetti) return;


    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });


    let t = 0;
    const pulses = 4;
    const int = setInterval(() => {
      confetti({ particleCount: 60, spread: 70, startVelocity: 45, origin: { y: 0.6 } });
      if (++t >= pulses) clearInterval(int);
    }, 220);
  }
    $: if (finished) {

    setTimeout(celebrate, 150);
  }

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const currentQuestions = shuffleArray(questions);
  $: randomAnswers = shuffleArray([...currentQuestions[currentIndex].answers])

  let currentIndex = 0;
  let selected = [];
  let feedback = "";
  let score = 0;
  let finished = false;
  let answered = false;


  let history = [];

  const total = currentQuestions.length;

  const isCorrectAnswer = (answer, q) =>
    q.correct.map((c) => c.trim()).includes(answer.trim());

  const correctSetFor = (q) => new Set(q.correct.map((c) => c.trim()));
  const selectedSet = () => new Set(selected.map((s) => s.trim()));

  function toggleAnswer(answer) {
    if (answered) return;
    selected = selected.includes(answer)
      ? selected.filter((a) => a !== answer)
      : [...selected, answer];
  }

  function checkAnswer() {
    if (answered) return;
    const current = currentQuestions[currentIndex];
    const correctSet = correctSetFor(current);
    const chosen = selectedSet();

    const isExactMatch =
      correctSet.size === chosen.size && [...correctSet].every((a) => chosen.has(a));

    if (isExactMatch) {
      score++;
      feedback = "✅ Correct!";
    } else {
      feedback = `❌ Not quite. Correct: ${[...correctSet].join(", ")}`;
    }
    answered = true;

    history[currentIndex] = {
      selected: [...selected],
      correct: [...current.correct]
    };
  }

  function nextQuestion() {
    if (!answered) return;
    if (currentIndex < total - 1) {
      currentIndex++;
      selected = [];
      feedback = "";
      answered = false;
    } else {
      finished = true;
      let prev = localStorage.getItem("prev-score");
      if (prev) {
        prev = JSON.parse(prev);
        prev[`${slug}-${page}`] = score;
        localStorage.setItem("prev-score", JSON.stringify(prev))
      } else {
        localStorage.setItem("prev-score", JSON.stringify({[`${slug}-${page}`]: score}))
      }
    }
  }

  function saveQuestion() {
    let saved = localStorage.getItem("saved-questions");
    if (saved) {
      saved
    }
  }

  function restart() {
    const reshuffled = shuffleArray(questions);
    currentQuestions.splice(0, currentQuestions.length, ...reshuffled);
    currentIndex = 0;
    selected = [];
    feedback = "";
    score = 0;
    finished = false;
    answered = false;
    history = [];
  }
2
  function onKey(e) {
    if (finished) return;
    const idx = parseInt(e.key, 10);
    if (!Number.isNaN(idx) && idx >= 1 && idx <= randomAnswers.length) {
      const answer = randomAnswers[idx - 1];
      toggleAnswer(answer);
    } else if (e.key === "Enter") {
      if (!answered && selected.length > 0) checkAnswer();
      else if (answered) nextQuestion();
    }
  }

  $: progressPct = Math.round(((currentIndex + (answered ? 1 : 0)) / total) * 100);
</script>

<div class="quiz-root" on:keydown={onKey} tabindex="0" aria-label="Quiz container">
  {#if !finished}
    <header class="quiz-header">
      <div class="badge">Question {currentIndex + 1} / {total}</div>
      <div class="score">Score: <strong>{score}</strong></div>
    </header>

    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progressPct}>
      <div class="bar" style={`width:${progressPct}%`}></div>
    </div>

    <article class="card">
      <h2 class="question">{currentQuestions[currentIndex].question}</h2>

      {#if currentQuestions[currentIndex].img}
        <figure class="media">
          <img
            src={currentQuestions[currentIndex].img}
            alt="Question image"
            loading="lazy"
          />
        </figure>
      {/if}

      <ul class="answers" role="list">
        {#each randomAnswers as answer, i}
          {#key answer}
            <li>
              <button
                type="button"
                class="
                  answer
                  {selected.includes(answer) && !answered ? 'is-selected' : ''}
                  {answered && isCorrectAnswer(answer, currentQuestions[currentIndex]) ? 'is-correct' : ''}
                  {answered && selected.includes(answer) && !isCorrectAnswer(answer, currentQuestions[currentIndex]) ? 'is-wrong' : ''}
                "
                on:click={() => toggleAnswer(answer)}
                disabled={answered}
                aria-pressed={selected.includes(answer)}
              >
                <span class="index">{i + 1}</span>
                <span class="label">{answer}</span>

                {#if answered}
                  {#if isCorrectAnswer(answer, currentQuestions[currentIndex])}
                    <span class="mark" aria-hidden="true">✔</span>
                  {:else if selected.includes(answer)}
                    <span class="mark" aria-hidden="true">✖</span>
                  {/if}
                {/if}
              </button>
            </li>
          {/key}
        {/each}
      </ul>

      <div class="actions">
        {#if !answered}
          <button
            class="btn primary"
            on:click={checkAnswer}
            disabled={selected.length === 0}
          >
            Submit
          </button>
        {:else}
          <p class="feedback" aria-live="polite">{feedback}</p>
          <button class="btn success" on:click={nextQuestion}>
            {currentIndex === total - 1 ? "Finish" : "Next question"}
          </button>
        {/if}
      </div>
    </article>
  {:else}
    <article class="result">
      <h2>🎉 Quiz complete</h2>
      <p class="final">You scored <strong>{score}</strong> out of <strong>{total}</strong>.</p>
      <button class="btn primary" on:click={restart}>Restart</button>
    </article>


    <section class="review-list" aria-label="Review answers">
      {#each currentQuestions as q, qi}
        <article class="card review-card">
          <h3 class="review-q">Q{qi + 1}. {q.question}</h3>

          {#if history[qi]?.selected}
            {#if history[qi].selected.some(a => !isCorrectAnswer(a, q))}
              <p class="your-picks-line">
                Your wrong pick{history[qi].selected.filter(a => !isCorrectAnswer(a, q)).length > 1 ? 's' : ''}:
                <span class="chips">
                  {#each history[qi].selected.filter(a => !isCorrectAnswer(a, q)) as wp}
                    <span class="chip chip-wrong">{wp}</span>
                  {/each}
                </span>
              </p>
            {/if}
          {/if}

          <ul class="answers review" role="list">
            {#each q.answers as a, ai}
              {#key a}
                <li>
                  <div
                    class="answer readonly
                      {isCorrectAnswer(a, q) ? 'is-correct' : ''}
                      {history[qi]?.selected?.includes(a) && !isCorrectAnswer(a, q) ? 'is-picked-wrong' : ''}"
                    aria-label={isCorrectAnswer(a, q) ? 'Correct answer' : (history[qi]?.selected?.includes(a) ? 'Your pick' : 'Answer')}
                  >
                    <span class="index">{ai + 1}</span>
                    <span class="label">{a}</span>

                    {#if isCorrectAnswer(a, q)}
                      <span class="mark" aria-hidden="true">✔</span>
                    {:else if history[qi]?.selected?.includes(a)}
                      <span class="mark" aria-hidden="true">✖</span>
                    {/if}

                  
                  </div>
                </li>
              {/key}
            {/each}
          </ul>
        </article>
      {/each}
    </section>
  {/if}
</div>

<style>
  :root {
    --bg: #0b1020;
    --bg-soft: #0f1530;
    --card: rgba(255,255,255,0.06);
    --card-border: rgba(255,255,255,0.12);
    --text: #e6e9f2;
    --muted: #9aa3b2;
    --primary: #7c9cff;
    --primary-strong: #547bff;
    --success: #31d0aa;
    --danger: #ff6b6b;
    --ring: rgba(124,156,255,0.45);
    --shadow: 0 10px 30px rgba(0,0,0,0.35);
    --radius: 18px;
    --transition: 180ms cubic-bezier(.2,.8,.2,1);
  }

  @media (prefers-color-scheme: light) {
    :root{
      --bg:#f6f7fb; --bg-soft:#fff; --card:#fff; --card-border:#e9edf4; --text:#1b2430;
      --muted:#5b6574; --primary:#3658ff; --primary-strong:#2746e8; --success:#1fb397; --danger:#e74b4b;
      --ring: rgba(54,88,255,.28);
      --shadow: 0 10px 22px rgba(0,0,0,.08);
    }
  }

  * { box-sizing: border-box; }
  .quiz-root {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
    color: var(--text);
    padding: 2rem 1rem 3rem;
    display: grid;
    gap: 1rem;
    place-items: start center;
    outline: none;
  }

  .quiz-header {
    width: min(880px, 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .75rem;
  }

  .badge {
    background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
    border: 1px solid var(--card-border);
    border-radius: 999px;
    padding: .4rem .85rem;
    font-weight: 600;
    letter-spacing: .2px;
    box-shadow: var(--shadow);
  }

  .score { color: var(--muted); }

  .progress {
    width: min(880px, 100%);
    height: 10px;
    background: rgba(255,255,255,.08);
    border: 1px solid var(--card-border);
    border-radius: 999px;
    overflow: hidden;
    backdrop-filter: blur(6px);
  }
  .progress .bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    transition: width var(--transition);
  }

  .card {
    width: min(880px, 100%);
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1.2rem;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
  }

  .question {
    font-size: clamp(1.1rem, 1.4vw + 1rem, 1.6rem);
    line-height: 1.25;
    margin: .2rem 0 1rem;
    letter-spacing: .2px;
  }

  .media {
    margin: .6rem 0 1.2rem;
    border-radius: calc(var(--radius) - 6px);
    overflow: hidden;
    border: 1px solid var(--card-border);
  }
  .media img {
    width: 100%;
    height: auto;
    display: block;
  }

  .answers {
    display: grid;
    grid-template-columns: repeat(1, minmax(0,1fr));
    gap: .65rem;
    margin: 0; padding: 0; list-style: none;
  }
  @media (min-width: 640px) {
    .answers { grid-template-columns: repeat(2, minmax(0,1fr)); }
  }

  .answer {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: .85rem;
    align-items: center;
    background: var(--bg-soft);
    color: var(--text);
    border: 1px solid var(--card-border);
    border-radius: 14px;
    padding: .9rem 1rem;
    cursor: pointer;
    transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition), background var(--transition), opacity var(--transition);
    box-shadow: 0 3px 14px rgba(0,0,0,.08);
  }
  .answer:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: var(--ring);
    box-shadow: 0 8px 24px rgba(0,0,0,.16), 0 0 0 6px var(--ring);
  }
  .answer:disabled { cursor: default; opacity: .88; }

  .answer .index {
    width: 28px; height: 28px;
    display: grid; place-items: center;
    border-radius: 999px;
    font-weight: 700;
    font-size: .9rem;
    background: rgba(124,156,255,.15);
    border: 1px solid rgba(124,156,255,.35);
  }
  .answer .label { line-height: 1.35; }
  .answer .mark { font-weight: 900; opacity: .95; }

  .answer.is-selected {
    background: linear-gradient(180deg, rgba(124,156,255,.12), rgba(124,156,255,.06));
    border-color: var(--primary);
    box-shadow: 0 6px 18px rgba(124,156,255,.25);
  }
  .answer.is-correct {
    background: linear-gradient(180deg, rgba(49,208,170,.16), rgba(49,208,170,.06));
    border-color: rgba(49,208,170,.6);
  }
  .answer.is-wrong {
    background: linear-gradient(180deg, rgba(255,107,107,.16), rgba(255,107,107,.06));
    border-color: rgba(255,107,107,.6);
    animation: shake .22s ease-in-out 0s 1;
  }

  /* Review: user's wrong picks */
  .answer.is-picked-wrong {
    border-color: rgba(231, 75, 75, .85);
    background: linear-gradient(180deg, rgba(231,75,75,.18), rgba(231,75,75,.06));
    position: relative;
  }
  .tag {
    margin-left: .5rem;
    padding: .1rem .45rem;
    border-radius: 999px;
    font-size: .75rem;
    font-weight: 700;
    border: 1px solid var(--card-border);
    background: rgba(255,255,255,.08);
  }
  .tag-wrong {
    border-color: rgba(231, 75, 75, .65);
    background: rgba(231, 75, 75, .18);
    color: #ffecec;
  }

  .chips { display: inline-flex; gap: .35rem; flex-wrap: wrap; }
  .chip {
    display: inline-flex; align-items: center; gap: .35rem;
    padding: .15rem .5rem; border-radius: 999px;
    font-size: .78rem; font-weight: 700;
    border: 1px solid var(--card-border);
    background: rgba(255,255,255,.06);
  }
  .chip-wrong {
    border-color: rgba(231, 75, 75, .65);
    background: rgba(231, 75, 75, .18);
    color: #ffecec;
  }
  .your-picks-line {
    margin: 0 0 .5rem;
    color: var(--muted);
    font-size: .95rem;
  }

  .actions {
    margin-top: 1.1rem;
    display: flex; align-items: center; gap: .9rem; flex-wrap: wrap;
  }
  .feedback { margin: 0 .25rem 0 0; font-weight: 600; color: var(--muted); }

  .btn {
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: .7rem 1rem;
    font-weight: 700;
    letter-spacing: .2px;
    background: var(--bg-soft);
    color: var(--text);
    cursor: pointer;
    transition: transform var(--transition), box-shadow var(--transition), background var(--transition), border-color var(--transition), opacity var(--transition);
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,0,0,.2), 0 0 0 6px var(--ring);
    border-color: var(--ring);
  }
  .btn:disabled { opacity: .6; cursor: default; }

  .btn.primary {
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    color: white; border-color: transparent;
  }
  .btn.success {
    background: linear-gradient(90deg, var(--success), #25c7b0);
    color: #06211b; border-color: transparent;
  }

  .result {
    width: min(720px, 100%);
    text-align: center;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 2rem 1.4rem;
    box-shadow: var(--shadow);
  }
  .final { color: var(--muted); margin: .4rem 0 1rem; }

  .review-list {
    width: min(880px, 100%);
    display: grid; gap: 1rem;
  }
  .review-card .review-q { margin: 0 0 .6rem; font-size: 1.05rem; }
  .answers.review { grid-template-columns: 1fr; }
  .answer.readonly { cursor: default; }
  .answer.readonly:hover { transform: none; box-shadow: 0 3px 14px rgba(0,0,0,.08); border-color: var(--card-border); }
</style>
