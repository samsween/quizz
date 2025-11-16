<script>
  import QuizRunner from '$lib/components/QuizRunner.svelte';
  import { base } from '$app/paths';

  export let data;
  const { quiz, page, totalPages, questions, user, attempts = [] } = data;

  let saveState = 'idle'; // 'idle' | 'saving' | 'saved' | 'error'
  let saveError = '';

  async function handleFinished(e) {
    const { score, total } = e.detail;

    if (!user) return;

    saveState = 'saving';
    saveError = '';

    try {
      const res = await fetch(
        `${base}/quiz/${quiz.slug}/${page}/attempt`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score, total })
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        saveState = 'error';
        saveError = data.message ?? 'Could not save score';
        return;
      }

      saveState = 'saved';

      // Optimistically add to local attempts list
      attempts.unshift({
        id: crypto.randomUUID?.() ?? `temp-${Date.now()}`,
        score,
        totalQuestions: total,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      saveState = 'error';
      saveError = 'Network error saving score';
    }
  }

  function formatDate(d) {
    // basic formatting; tweak if you want
    const date = new Date(d);
    return date.toLocaleString();
  }
</script>

<div class="section-root">
  <!-- MAIN COLUMN: header + quiz -->
  <div class="main">
    <header class="section-header">
      <div class="heading">
        <h1>{quiz.title}</h1>
        <p class="sub">Section {page} of {totalPages}</p>
      </div>

      <div class="rail" aria-hidden="true">
        <div
          class="bar"
          style={`width:${Math.round((page / totalPages) * 100)}%`}
        ></div>
      </div>

      <nav class="toolbar">
        <a class="btn ghost" href={`${base}/quiz/${quiz.slug}`}>⬅ All Sections</a>

        <div class="spacer"></div>

        {#if user}
          {#if saveState === 'saving'}
            <span class="sub">Saving score…</span>
          {:else if saveState === 'saved'}
            <span class="sub">Score saved ✅</span>
          {:else if saveState === 'error'}
            <span class="sub" style="color: var(--danger)">
              {saveError}
            </span>
          {/if}
        {:else}
          <span class="sub">Log in to save your scores</span>
        {/if}
      </nav>
    </header>

    <QuizRunner
      {questions}
      slug={quiz.slug}
      page={page}
      on:finished={handleFinished}
    />
  </div>

  <!-- SIDEBAR: previous attempts -->
  <aside class="sidebar">
    <div class="sidebar-card">
      <h2 class="sidebar-title">Previous attempts</h2>

      {#if !user}
        <p class="sidebar-text">
          Sign in to track your scores over time.
        </p>
      {:else if attempts.length === 0}
        <p class="sidebar-text">
          You haven’t completed this section yet. Your scores will appear here.
        </p>
      {:else}
        <ul class="attempt-list">
          {#each attempts as a, i}
            <li class="attempt-item">
              <div class="attempt-main">
                <span class="attempt-score">
                  {a.score} / {a.totalQuestions}
                </span>
                <span class="attempt-percent">
                  {Math.round((a.score / a.totalQuestions) * 100)}%
                </span>
              </div>
              <div class="attempt-meta">
                <span>Attempt #{attempts.length - i}</span>
                <span>·</span>
                <span>{formatDate(a.createdAt)}</span>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </aside>
</div>

<style>
  .section-root {
    width: min(1100px, 100%);
    margin: 0 auto 2.5rem;
    padding: 2rem 0 3rem;
    display: grid;
    grid-template-columns: minmax(0, 2.1fr) minmax(260px, 1fr);
    gap: 1.5rem;
    align-items: flex-start;
  }

  /* On small screens stack main + sidebar */
  @media (max-width: 900px) {
    .section-root {
      grid-template-columns: 1fr;
    }
    .sidebar {
      order: -1; /* show stats above quiz if you prefer, or remove this */
    }
  }

  .main {
    max-width: 720px;
    justify-self: center;
    width: 100%;
    display: grid;
    gap: 1.5rem;
  }

  .section-header {
    display: grid;
    gap: 0.9rem;
  }

  .heading h1 {
    margin: 0 0 0.2rem;
    font-size: clamp(1.4rem, 1.8vw + 1rem, 2rem);
    letter-spacing: 0.2px;
  }

  .sub {
    margin: 0;
    color: var(--muted);
  }

  .rail {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--card-border);
    border-radius: 999px;
    overflow: hidden;
    backdrop-filter: blur(6px);
  }

  .rail .bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    transition: width var(--transition);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 0.6rem;
    box-shadow: var(--shadow);
    backdrop-filter: blur(8px);
  }

  .spacer {
    flex: 1 1 auto;
  }

  .btn {
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 0.6rem 0.9rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    background: var(--bg-soft);
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition:
      transform var(--transition),
      box-shadow var(--transition),
      border-color var(--transition),
      background var(--transition),
      color var(--transition);
  }

  .btn:hover {
    transform: translateY(-1px);
    border-color: var(--ring);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 0 0 6px var(--ring);
  }

  .btn.primary {
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    color: #fff;
    border-color: transparent;
  }

  .btn.ghost {
    background: transparent;
    border-color: var(--card-border);
    color: var(--muted);
  }

  .btn.ghost:hover {
    color: var(--primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .rail .bar,
    .btn {
      transition: none;
    }
  }

  /* --- Sidebar styles --- */

  .sidebar {
    width: 100%;
  }

  .sidebar-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1rem 1.1rem;
    box-shadow: var(--shadow);
  }

  .sidebar-title {
    margin: 0 0 0.6rem;
    font-size: 1rem;
    letter-spacing: 0.02em;
  }

  .sidebar-text {
    margin: 0.2rem 0 0;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .attempt-list {
    list-style: none;
    margin: 0.4rem 0 0;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }

  .attempt-item {
    padding: 0.55rem 0.6rem;
    border-radius: 12px;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.03);
    display: grid;
    gap: 0.2rem;
  }

  .attempt-main {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }

  .attempt-score {
    font-weight: 700;
  }

  .attempt-percent {
    font-size: 0.9rem;
    color: var(--muted);
  }

  .attempt-meta {
    font-size: 0.8rem;
    color: var(--muted);
    display: flex;
    gap: 0.3rem;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
