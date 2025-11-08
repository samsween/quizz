<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  export let data: {
    quiz: {
      title: string;
      slug: string;
      chunksCount: number;
      questions?: { id?: string }[];
    };
  };

  const { quiz } = data;

  // --- config / helpers
  const perChunkFallback = 20;
  const totalQs = quiz.questions?.length ?? quiz.chunksCount * perChunkFallback;

  const chunkCount = quiz.chunksCount;
  const rangeFor = (i: number) => {
    // i is zero-based chunk index
    const start = i * perChunkFallback + 1;
    const end = Math.min((i + 1) * perChunkFallback, totalQs);
    return { start, end, count: end - start + 1 };
  };

  // prev scores (SSR-safe)
  let prevScores: Record<string, number> = {};
  onMount(() => {
    try {
      const raw = localStorage.getItem("prev-score");
      prevScores = raw ? JSON.parse(raw) : {};
    } catch {
      prevScores = {};
    }
  });

  // derived overall progress
  $: completedSections = Array.from({ length: chunkCount }).reduce((acc, _, i) => {
    const key = `${quiz.slug}-${i + 1}`;
    const { count } = rangeFor(i);
    const got = prevScores?.[key] ?? 0;
    return acc + (got >= count ? 1 : 0);
  }, 0);

  $: totalAnswered = Array.from({ length: chunkCount }).reduce((acc, _, i) => {
    const key = `${quiz.slug}-${i + 1}`;
    return acc + Math.min(prevScores?.[key] ?? 0, rangeFor(i).count);
  }, 0);

  $: overallPct = Math.round((totalAnswered / totalQs) * 100);
</script>

<div class="lp-root">
  <header class="lp-header">
    <nav class="toolbar">
      <a class="btn ghost" href={`${base}/`} aria-label="Go to home">Home</a>
      <div class="spacer" />

    </nav>

    <h1 class="title">{quiz.title}</h1>
    <p class="sub">
      {chunkCount} sections • {totalQs} questions
    </p>

    <div class="progress">
      <div class="track" aria-hidden="true"><div class="bar" style={`width:${overallPct}%`} /></div>
      <div class="progress-row">
        <span class="muted">Overall progress</span>
        <span class="pct" aria-live="polite">{overallPct}%</span>
      </div>
    </div>
  </header>

  <section class="grid" aria-live="polite">
    {#each Array.from({ length: chunkCount }) as _, i}
      {#key i}
        <article class="qcard">
          <a
            class="card-link"
            href={`${base}/quiz/${quiz.slug}/${i + 1}`}
            aria-label={`Open Section ${i + 1}`}
          >
            <div class="body">
              <div class="row">
                <h3 class="section">Section {i + 1}</h3>
                {#if (prevScores?.[`${quiz.slug}-${i + 1}`] ?? 0) >= rangeFor(i).count}
                  <span class="chip success">Completed</span>
                {:else if (prevScores?.[`${quiz.slug}-${i + 1}`])}
                  <span class="chip">In progress</span>
                {/if}
              </div>

              <p class="desc">
                Questions {rangeFor(i).start}–{rangeFor(i).end}
              </p>

              <div class="footer">
                {#if prevScores && prevScores[`${quiz.slug}-${i + 1}`]}
                  <p class="desc">
                    Last score
                    <span class="score">
                      {prevScores[`${quiz.slug}-${i + 1}`]}/{rangeFor(i).count}
                    </span>
                  </p>
                {:else}
                  <p class="desc">Not completed yet</p>
                {/if}

                <!-- tiny progress pill per section -->
                <div class="mini">
                  {#if prevScores && prevScores[`${quiz.slug}-${i + 1}`]}
                    <div class="mini-track" aria-hidden="true">
                      <div
                        class="mini-bar"
                        style={`width:${Math.min(
                          100,
                          Math.round((prevScores[`${quiz.slug}-${i + 1}`] / rangeFor(i).count) * 100)
                        )}%`}
                      />
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </a>
        </article>
      {/key}
    {/each}
  </section>
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
    --ring: rgba(124,156,255,0.45);
    --shadow: 0 18px 40px rgba(0,0,0,.35);
    --radius: 18px;
    --transition: 180ms cubic-bezier(.2,.8,.2,1);
  }

  * { box-sizing: border-box; }
  .lp-root {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: var(--text);
    background:
      radial-gradient(1200px 800px at 10% -20%, #20305b 0%, transparent 60%),
      radial-gradient(1000px 700px at 110% 10%, #20305b 0%, transparent 60%),
      var(--bg);
    min-height: 100vh;
    padding: 2rem 1rem 3rem;
    display: grid;
    gap: 1.5rem;
    place-items: start center;
  }

  .lp-header {
    width: min(1100px, 100%);
    display: grid;
    gap: 0.75rem;
    text-align: left;
  }
  .title { margin: .25rem 0 0; letter-spacing:.2px; }
  .sub { color: var(--muted); margin: 0 0 .25rem; }

  .toolbar {
    display: flex; align-items: center; gap: .5rem;
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04));
    border: 1px solid var(--card-border);
    border-radius: calc(var(--radius) + 6px);
    padding: .5rem;
    box-shadow: var(--shadow);
    backdrop-filter: blur(6px) saturate(120%);
  }
  .spacer { flex: 1; }

  .btn {
    border-radius: 12px;
    padding: .55rem .85rem;
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    color: white;
    text-decoration: none;
    font-weight: 700;
    border: 0;
    cursor: pointer;
    transition: box-shadow var(--transition), transform var(--transition), opacity var(--transition);
  }
  .btn:hover { box-shadow: 0 0 0 6px var(--ring); transform: translateY(-1px); }
  .btn.ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--card-border);
  }
  .btn.ghost:hover { box-shadow: 0 0 0 6px var(--ring); }

  .progress {
    display: grid; gap: .35rem; width: min(1100px, 100%);
  }
  .track {
    height: 10px; border-radius: 999px; overflow: hidden;
    background: rgba(255,255,255,.08); border: 1px solid var(--card-border);
  }
  .bar { height: 100%; width: 0; background: linear-gradient(90deg, var(--primary), var(--primary-strong)); }
  .progress-row { display:flex; justify-content:space-between; align-items:center; }
  .muted { color: var(--muted); }
  .pct { font-variant-numeric: tabular-nums; }

  .grid {
    width: min(1100px, 100%);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .qcard {
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04));
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  }
  .qcard:hover {
    transform: translateY(-3px);
    border-color: var(--ring);
    box-shadow: 0 20px 46px rgba(0,0,0,.45), 0 0 0 6px var(--ring);
  }

  .card-link {
    display: flex; flex-direction: column; color: inherit; text-decoration: none; height: 100%;
    outline: none;
  }
  .card-link:focus-visible { box-shadow: 0 0 0 6px var(--ring); border-radius: inherit; }

  .body { padding: 1rem; display: grid; gap: .5rem; }
  .row { display:flex; align-items:center; justify-content:space-between; gap:.5rem; }
  .section { margin: 0; font-size: 1.05rem; }
  .desc { margin: 0; color: var(--muted); }

  .footer {
    margin-top: .35rem;
    display: flex; gap: .75rem; align-items: center; justify-content: space-between;
  }

  .chip {
    font-size: .75rem; line-height: 1; padding: .45rem .6rem;
    border-radius: 999px; border: 1px solid var(--card-border);
    background: rgba(255,255,255,.05); color: var(--text);
  }
  .chip.success {
    border-color: rgba(62, 255, 156, .45);
    box-shadow: inset 0 0 0 999px rgba(62, 255, 156, .08);
  }

  .mini { width: 90px; }
  .mini-track { height: 6px; border-radius: 999px; background: rgba(255,255,255,.10); overflow: hidden; border: 1px solid var(--card-border); }
  .mini-bar { height: 100%; background: linear-gradient(90deg, var(--primary), var(--primary-strong)); }

  .score { color: #5CFF8A; font-weight: 700; }

  @media (prefers-reduced-motion: reduce) {
    .qcard, .btn, .bar, .mini-bar { transition: none; }
  }
</style>
