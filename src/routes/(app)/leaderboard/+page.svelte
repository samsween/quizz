<script>
  import { base } from '$app/paths';

  export let data;
  const { attempts = [] } = data;

  // ----- UI state -----
  let sortBy = 'score-desc';   // 'score-desc' | 'score-asc' | 'user' | 'newest' | 'oldest'
  let quizFilter = '';         // filter by quiz title / slug
  let sectionFilter = '';      // filter by section number (string -> int)

  // Base grouping (quiz + section)
  const baseGroups = (() => {
    const map = new Map();

    for (const a of attempts) {
      const section = a.section ?? 1;
      const key = `${a.quizSlug}::${section}`;
      if (!map.has(key)) {
        map.set(key, {
          quizSlug: a.quizSlug,
          quizTitle: a.quizTitle,
          section,
          attempts: []
        });
      }
      map.get(key).attempts.push(a);
    }

    return Array.from(map.values()).sort((g1, g2) => {
      if (g1.quizTitle === g2.quizTitle) {
        return (g1.section ?? 1) - (g2.section ?? 1);
      }
      return g1.quizTitle.localeCompare(g2.quizTitle);
    });
  })();

  // --- Filter groups by quiz + section ---
  $: filteredGroups = baseGroups.filter((g) => {
    const qf = (quizFilter ?? '').toString().trim().toLowerCase();

    let sfValue = null;
    if (sectionFilter !== '' && sectionFilter !== null && sectionFilter !== undefined) {
      const n = Number(sectionFilter);
      if (!Number.isNaN(n)) sfValue = n;
    }

    if (qf) {
      const hay = `${g.quizTitle} ${g.quizSlug}`.toLowerCase();
      if (!hay.includes(qf)) return false;
    }

    if (sfValue !== null && g.section !== sfValue) return false;

    return true;
  });

  // Derived groups: best attempt per user (server already grouped, but this is harmless) + sort
  $: groups = filteredGroups.map((group) => {
    let rows = group.attempts;

    // --- Best attempt per user (per quiz+section) ---
    const byUser = new Map();
    for (const a of rows) {
      const key = a.userId ?? 'anon';
      const existing = byUser.get(key);

      if (
        !existing ||
        a.score > existing.score ||
        (a.score === existing.score &&
          new Date(a.createdAt) < new Date(existing.createdAt))
      ) {
        byUser.set(key, a);
      }
    }
    rows = Array.from(byUser.values());

    // --- Sorting ---
    rows = [...rows].sort((a, b) => {
      if (sortBy === 'score-desc') {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === 'score-asc') {
        if (a.score !== b.score) return a.score - b.score;
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === 'user') {
        const ua = (a.username ?? '').toLowerCase();
        const ub = (b.username ?? '').toLowerCase();
        if (ua && ub) return ua.localeCompare(ub);
        if (ua) return -1;
        if (ub) return 1;
        return 0;
      }

      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      return 0;
    });

    return {
      ...group,
      attempts: rows
    };
  });

  function formatDate(d) {
    const date = new Date(d);
    return date.toLocaleString();
  }

  function pct(a) {
    if (!a.totalQuestions) return '-';
    return Math.round((a.score / a.totalQuestions) * 100);
  }

  function sortByLabel(sb) {
    switch (sb) {
      case 'score-desc':
        return 'Score (high → low)';
      case 'score-asc':
        return 'Score (low → high)';
      case 'user':
        return 'Username (A–Z)';
      case 'newest':
        return 'Newest first';
      case 'oldest':
        return 'Oldest first';
      default:
        return 'Score (high → low)';
    }
  }
</script>

<div class="page-root">
  <header class="leader-header">
    <div>
      <h1>Leaderboard</h1>
      <p class="sub">
        Top score from each user, per quiz and section.
        <br />
        Sort: {sortByLabel(sortBy)}
      </p>
    </div>

    <div class="controls">
      <div class="control wide">
        <label for="quizFilter" class="label">Filter by quiz</label>
        <input
          id="quizFilter"
          class="input"
          placeholder="Search by quiz title or slug…"
          bind:value={quizFilter}
        />
      </div>

      <div class="control small">
        <label for="sectionFilter" class="label">Section</label>
        <input
          id="sectionFilter"
          class="input"
          type="number"
          min="1"
          placeholder="Any"
          bind:value={sectionFilter}
        />
      </div>

      <div class="control">
        <label for="sort" class="label">Sort by</label>
        <select id="sort" bind:value={sortBy}>
          <option value="score-desc">Score (high → low)</option>
          <option value="score-asc">Score (low → high)</option>
          <option value="user">Username (A–Z)</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <a class="btn ghost" href={`${base}/quizz`}>
        ⬅ Back to quizzes
      </a>
    </div>
  </header>

  {#if groups.length === 0}
    <p class="empty">
      No attempts match the current filters. Try clearing quiz/section filters.
    </p>
  {:else}
    <section class="grid">
      {#each groups as group}
        <article class="card">
          <header class="card-head">
            <div>
              <h2 class="quiz-title">
                {group.quizTitle}
              </h2>
              <p class="pill">
                Section {group.section} • {group.attempts.length} player{group.attempts.length === 1 ? '' : 's'}
              </p>
            </div>

            <a
              class="link"
              href={`${base}/quiz/${group.quizSlug}/${group.section}`}
            >
              Open section →
            </a>
          </header>

          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
                <th>%</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {#each group.attempts as a, i}
                <tr>
                  <td class="rank">{i + 1}</td>
                  <td class="user">
                    {#if a.username}
                      {a.username}
                    {:else}
                      (unknown)
                    {/if}
                  </td>
                  <td>{a.score} / {a.totalQuestions}</td>
                  <td>{pct(a)}%</td>
                  <td class="when">{formatDate(a.createdAt)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </article>
      {/each}
    </section>
  {/if}
</div>

<style>
  .page-root {
    width: min(1100px, 100%);
    margin: 0 auto 2.5rem;
    padding: 2rem 0 3rem;
    display: grid;
    gap: 1.5rem;
  }

  .leader-header {
    display: grid;
    gap: 0.75rem;
  }

  .leader-header h1 {
    margin: 0;
    font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.2rem);
    letter-spacing: 0.02em;
  }

  .sub {
    margin: 0.25rem 0 0;
    font-size: 0.95rem;
    color: var(--muted);
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: flex-end;
  }

  .control {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .control.wide {
    flex: 1 1 260px;
  }

  .control.small {
    width: 90px;
  }

  .label {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .input,
  select {
    appearance: none;
    border-radius: 10px;
    border: 1px solid var(--card-border);
    background: var(--bg-soft);
    color: var(--text);
    padding: 0.45rem 0.75rem;
    font-size: 0.9rem;
    outline: none;
    transition:
      border-color var(--transition),
      box-shadow var(--transition),
      background var(--transition);
  }

  .input:focus-visible,
  select:focus-visible {
    border-color: transparent;
    box-shadow: 0 0 0 6px var(--ring);
    background: rgba(255, 255, 255, 0.08);
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

  .btn.ghost {
    background: transparent;
    border-color: var(--card-border);
    color: var(--muted);
  }

  .btn.ghost:hover {
    color: var(--primary);
  }

  .empty {
    margin: 0.5rem 0 0;
    color: var(--muted);
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }

  @media (min-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1rem 1.1rem;
    box-shadow: var(--shadow);
    display: grid;
    gap: 0.6rem;
  }

  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .quiz-title {
    margin: 0;
    font-size: 1.05rem;
  }

  .pill {
    margin: 0.15rem 0 0;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--muted);
  }

  .link {
    font-size: 0.85rem;
    color: var(--primary);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  .table th,
  .table td {
    padding: 0.45rem 0.35rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .table th {
    font-weight: 600;
    color: var(--muted);
    font-size: 0.8rem;
  }

  .rank {
    width: 2rem;
    text-align: center;
  }

  .user {
    max-width: 180px;
    word-break: break-word;
  }

  .when {
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    .when {
      white-space: normal;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .input,
    select,
    .btn {
      transition: none;
    }
  }
</style>
