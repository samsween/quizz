<!-- src/routes/quizz/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';


  // const quizzes = listQuizzes();
  export let data;
  // @ts-ignore
  const {quizzes} = data;
  // UI state
  let query = "";
  let sortBy: "recent" | "title" = "recent";

  // helper: safe accessors for optional fields
  const getDate = (q: any) => (q.updatedAt ?? q.createdAt ?? 0);
  const getTitle = (q: any) => (q.title ?? "").toString();

  $: filtered = quizzes
    .filter((q) => {
      const t = `${q.title ?? ""} ${q.description ?? ""}`.toLowerCase();
      return t.includes(query.trim().toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "title") return getTitle(a).localeCompare(getTitle(b));
      return getDate(b) - getDate(a); // recent first
    });
</script>

<div class="lp-root">
  <header class="lp-header">
    <div class="title-wrap">
      <div>
        <h1>All quizzes</h1>
        <p class="sub">
          {#if filtered.length === quizzes.length}
            {filtered.length} quizzes available
          {:else}
            Showing {filtered.length} of {quizzes.length} quizzes
          {/if}
        </p>
      </div>
    </div>

    <div class="controls" role="search">
      <label class="sr-only" for="q">Search quizzes</label>
      <input
        id="q"
        class="input"
        placeholder="Search quizzes…"
        bind:value={query}
        autocomplete="off"
      />

      <div class="select-wrap">
        <label class="sr-only" for="sort">Sort by</label>
        <select id="sort" class="select" bind:value={sortBy} aria-label="Sort quizzes">
          <option value="recent">Recent</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
    </div>
  </header>

  {#if filtered.length === 0}
    <p class="empty">No quizzes match “{query}”. Try a different search.</p>
  {:else}
    <section class="grid" aria-live="polite">
      {#each filtered as q}
        <article class="qcard">
          <a
            class="card-link"
            href={`${base}/quiz/${q.slug}`}
            aria-label={`Open quiz: ${q.title}`}
          >
            <div class="thumb">
              {#if q.image}
                <img src={q.image} alt="" loading="lazy" decoding="async" />
              {:else}
                <div class="thumb-fallback" aria-hidden="true">
                  <span class="emoji">🧠</span>
                </div>
              {/if}
            </div>

            <div class="body">
              <h3 class="title">{q.title}</h3>
              {#if q.description}
                <p class="desc">{q.description}</p>
              {/if}

              <div class="meta">
                {#if q.questions?.length}
                  <span class="chip">{q.questions.length} Qs</span>
                {/if}
              </div>
            </div>
          </a>
        </article>
      {/each}
    </section>
  {/if}
</div>

<style>
  /* Reusable screen-reader helper */
  .sr-only {
    position:absolute;
    width:1px;
    height:1px;
    padding:0;
    margin:-1px;
    overflow:hidden;
    clip:rect(0,0,0,0);
    white-space:nowrap;
    border:0;
  }

  /* Page container *inside* the layout */
  .lp-root {
    width: min(1100px, 100%);
    margin: 0 auto 2.5rem;
    padding: 0 0 2rem;
    display: grid;
    gap: 1.5rem;
  }

  .lp-header {
    display: grid;
    gap: 1rem;
  }

  .title-wrap {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .title-wrap h1 {
    margin: 0;
    font-size: clamp(1.4rem, 1rem + 1.4vw, 2rem);
    line-height: 1.1;
    letter-spacing: 0.02em;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 12px rgba(124, 156, 255, 0.15));
  }

  .sub {
    margin: 0.1rem 0 0;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .controls {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    flex-wrap: wrap;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.04));
    border: 1px solid var(--card-border);
    border-radius: calc(var(--radius) + 6px);
    padding: 0.6rem;
    box-shadow: var(--shadow);
    backdrop-filter: saturate(120%) blur(6px);
  }

  .input,
  .select {
    appearance: none;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
    border-radius: 12px;
    padding: 0.7rem 0.9rem;
    outline: none;
    transition:
      border-color var(--transition),
      box-shadow var(--transition),
      background var(--transition),
      transform var(--transition);
  }

  .input {
    flex: 1 1 260px;
    min-width: 200px;
  }

  .select-wrap {
    position: relative;
  }

  .select-wrap::after {
    content: "⌄";
    position: absolute;
    right: 0.6rem;
    top: 50%;
    transform: translateY(-52%);
    pointer-events: none;
    color: var(--muted);
  }

  .select {
    padding-right: 2rem;
  }

  .input:focus,
  .select:focus {
    border-color: transparent;
    box-shadow: 0 0 0 6px var(--ring);
    background: rgba(255, 255, 255, 0.08);
  }

  .empty {
    color: var(--muted);
    margin-top: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }

  .qcard {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.04));
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    will-change: transform;
    transition:
      transform var(--transition),
      box-shadow var(--transition),
      border-color var(--transition);
  }

  .qcard::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(124, 156, 255, 0.35),
      rgba(109, 242, 255, 0.25) 40%,
      transparent 70%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--transition);
  }

  .qcard:hover {
    transform: translateY(-4px) scale(1.01);
    border-color: transparent;
    box-shadow: 0 20px 46px rgba(0, 0, 0, 0.48);
  }

  .qcard:hover::before {
    opacity: 1;
  }

  .card-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
    outline: none;
  }

  .card-link:focus-visible {
    box-shadow: 0 0 0 6px var(--ring);
    border-radius: inherit;
  }

  .thumb {
    aspect-ratio: 16 / 9;
    background: var(--bg-soft);
    position: relative;
    overflow: hidden;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 300ms ease;
  }

  .qcard:hover .thumb img {
    transform: scale(1.03);
  }

  .thumb-fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background:
      radial-gradient(60% 60% at 30% 30%, #1e2a50 0%, transparent 60%),
      radial-gradient(60% 60% at 70% 70%, #183158 0%, transparent 60%),
      var(--bg-soft);
  }

  .emoji {
    font-size: 2rem;
    opacity: 0.9;
  }

  .body {
    padding: 1rem;
    display: grid;
    gap: 0.5rem;
  }

  .title {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.25;
  }

  .desc {
    margin: 0;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .meta {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  .chip {
    font-size: 0.75rem;
    line-height: 1;
    padding: 0.45rem 0.55rem;
    border-radius: 999px;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.05);
    color: var(--text);
  }

  @media (prefers-reduced-motion: reduce) {
    .qcard,
    .thumb img {
      transition: none;
    }
  }
</style>
