<script>
  import Questions from '$lib/components/Questions.svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';

  export let data;
  const { quiz, page, totalPages, questions } = data;

  const prevLink = page > 1 ? `/quiz/${quiz.slug}/${page - 1}` : null;
  const nextLink = page < totalPages ? `/quiz/${quiz.slug}/${page + 1}` : null;
</script>

<div class="section-root">
  <header class="lp-header">
    <div class="heading">
      <h1>{quiz.title}</h1>
      <p class="sub">Section {page} of {totalPages}</p>
    </div>

    <div class="rail">
      <div class="bar" style={`width:${Math.round((page/totalPages)*100)}%`}></div>
    </div>

    <nav class="toolbar">
      <a class="btn" href={`${base}/quiz/${quiz.slug}`}>⬅ All Sections</a>
    </nav>
  </header>

  <Questions {questions} slug={quiz.slug} page={page} />
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
    :root {
      --bg:#f6f7fb; --bg-soft:#fff; --card:#fff; --card-border:#e9edf4; --text:#1b2430;
      --muted:#5b6574; --primary:#3658ff; --primary-strong:#2746e8; --success:#1fb397; --danger:#e74b4b;
      --ring: rgba(54,88,255,.28);
      --shadow: 0 10px 22px rgba(0,0,0,.08);
    }
  }

  * { box-sizing: border-box; }

  .section-root {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
    color: var(--text);
    background: radial-gradient(1200px 800px at 10% -20%, #20305b 0%, transparent 60%),
                radial-gradient(1000px 700px at 110% 10%, #20305b 0%, transparent 60%),
                var(--bg);
    min-height: 100vh;
    padding: 2rem 1rem 3rem;
    display: grid;
    place-items: start center;
  }

  .lp-header {
    width: min(880px, 100%);
    display: grid;
    gap: 0.9rem;
  }
  .heading h1 {
    margin: 0 0 .2rem;
    font-size: clamp(1.4rem, 1.8vw + 1rem, 2rem);
    letter-spacing: .2px;
  }
  .sub { margin: 0; color: var(--muted); }

  .rail {
    width: 100%;
    height: 8px;
    background: rgba(255,255,255,.08);
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
    gap: .6rem;
    flex-wrap: wrap;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: .6rem;
    box-shadow: var(--shadow);
    backdrop-filter: blur(8px);
  }
  .spacer { flex: 1 1 auto; }

  .btn {
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: .6rem .9rem;
    font-weight: 700;
    letter-spacing: .2px;
    background: var(--bg-soft);
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition), background var(--transition);
  }
  .btn:hover {
    transform: translateY(-1px);
    border-color: var(--ring);
    box-shadow: 0 8px 24px rgba(0,0,0,.2), 0 0 0 6px var(--ring);
  }
  .btn.primary {
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    color: white;
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
</style>
