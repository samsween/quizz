<script lang="ts">
  import { listQuizzes } from "$lib/quizzes";
  const quizzes = listQuizzes();

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
          <a class="card-link" href={`/quizz/quiz/${q.slug}`} aria-label={`Open quiz: ${q.title}`}>
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
  :root{
    --bg: #0b1020;
    --bg-soft: #0f1530;
    --text: #e8ecf8;
    --muted: #9aa3b2;

    --card: rgba(255,255,255,0.05);
    --card-border: rgba(255,255,255,0.10);
    --ring: rgba(124,156,255,0.45);

    --brand-1:#7c9cff;
    --brand-2:#6df2ff;

    --shadow: 0 18px 40px rgba(0,0,0,.35);
    --radius: 18px;
    --transition: 180ms cubic-bezier(.2,.8,.2,1);
  }

  *{ box-sizing: border-box; }
  .sr-only{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }

  .lp-root{
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color:var(--text);
    background:
      radial-gradient(1200px 800px at 10% -20%, #20305b 0%, transparent 60%),
      radial-gradient(1000px 700px at 110% 10%, #20305b 0%, transparent 60%),
      linear-gradient(180deg, #0b1020, #0a0e1b 60%);
    min-height:100vh;
    padding:2rem 1rem 3.5rem;
    display:grid;
    gap:1.75rem;
    place-items:start center;
  }

  .lp-header{
    width:min(1100px,100%);
    display:grid;
    gap:1rem;
  }

  .title-wrap{
    display:flex; align-items:flex-end; justify-content:space-between; gap:1rem; flex-wrap:wrap;
  }
  .title-wrap h1{
    margin:0;
    font-size:clamp(1.6rem, 1.1rem + 2vw, 2.4rem);
    line-height:1.1;
    letter-spacing:.2px;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    -webkit-background-clip:text; background-clip:text; color:transparent;
    filter: drop-shadow(0 0 12px rgba(124,156,255,.15));
  }
  .sub{ color:var(--muted); margin:0; }

  .controls{
    display:flex; gap:.6rem; align-items:center; flex-wrap:wrap;
    background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04));
    border:1px solid var(--card-border);
    border-radius:calc(var(--radius) + 6px);
    padding:.6rem;
    box-shadow: var(--shadow);
    backdrop-filter:saturate(120%) blur(6px);
  }

  .input, .select{
    appearance:none;
    border:1px solid var(--card-border);
    background:rgba(255,255,255,.06);
    color:var(--text);
    border-radius:12px;
    padding:.7rem .9rem;
    outline:none;
    transition:border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
  }
  .input{ flex:1 1 260px; min-width:220px; }
  .select-wrap{ position:relative; }
  .select-wrap::after{
    content:"⌄"; position:absolute; right:.6rem; top:50%; transform:translateY(-52%); pointer-events:none; color:var(--muted);
  }
  .select{ padding-right:2rem; }

  .input:focus, .select:focus{
    border-color:transparent;
    box-shadow:0 0 0 6px var(--ring);
    background:rgba(255,255,255,.08);
  }

  .empty{ width:min(1100px,100%); color:var(--muted); margin-top:.5rem; }

  .grid{
    width:min(1100px,100%);
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap:1rem;
  }

  .qcard{
    position:relative;
    border-radius:var(--radius);
    overflow:hidden;
    background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04));
    border:1px solid var(--card-border);
    box-shadow: var(--shadow);
    will-change: transform;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  }

  .qcard::before{
    content:""; position:absolute; inset:-1px;
    border-radius:inherit;
    padding:1px; /* glow border */
    background: linear-gradient(135deg, rgba(124,156,255,.35), rgba(109,242,255,.25) 40%, transparent 70%);
    -webkit-mask: 
      linear-gradient(#000 0 0) content-box, 
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events:none;
    opacity:.0; transition:opacity var(--transition);
  }

  .qcard:hover{ transform: translateY(-4px) scale(1.01); border-color:transparent; box-shadow: 0 20px 46px rgba(0,0,0,.48); }
  .qcard:hover::before{ opacity:1; }

  .card-link{
    display:flex; flex-direction:column; text-decoration:none; color:inherit; height:100%;
    outline:none;
  }
  .card-link:focus-visible{ box-shadow: 0 0 0 6px var(--ring); border-radius:inherit; }

  .thumb{ aspect-ratio:16/9; background:var(--bg-soft); position:relative; overflow:hidden; }
  .thumb img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform 300ms ease; }
  .qcard:hover .thumb img{ transform:scale(1.03); }

  .thumb-fallback{
    width:100%; height:100%;
    display:grid; place-items:center;
    background:
      radial-gradient(60% 60% at 30% 30%, #1e2a50 0%, transparent 60%),
      radial-gradient(60% 60% at 70% 70%, #183158 0%, transparent 60%),
      var(--bg-soft);
  }
  .emoji{ font-size:2rem; opacity:.9; }

  .body{ padding:1rem; display:grid; gap:.5rem; }
  .title{ margin:0; font-size:1.05rem; line-height:1.25; }
  .desc{ margin:0; color:var(--muted); font-size:.95rem; }

  .meta{ display:flex; gap:.4rem; flex-wrap:wrap; margin-top:.25rem; }
  .chip{
    font-size:.75rem; line-height:1;
    padding:.45rem .55rem; border-radius:999px;
    border:1px solid var(--card-border);
    background:rgba(255,255,255,.05);
    color:var(--text);
  }

  /* motion prefs */
  @media (prefers-reduced-motion: reduce){
    .qcard, .thumb img { transition:none; }
  }
</style>
