<script>
    import { listQuizzes } from "$lib/quizzes";
  const quizzes = listQuizzes();
</script>

<div class="lp-root">
  <header class="lp-header">
    <h1>You will fail unless you study</h1>
    <p class="sub">Made by sweenmachine</p>
  </header>

  <section class="grid">
    {#each quizzes as q}
      <article
        class="qcard"
        on:click={() => (window.location.href = `/quizz/quiz/${q.slug}`)}
      >
        <div class="thumb">
          {#if q.image}
            <img src={q.image} alt="" loading="lazy" />
          {:else}
            <div class="thumb-fallback" />
          {/if}
        </div>

        <div class="body">
          <h3 class="title">{q.title}</h3>
          {#if q.description}<p class="desc">{q.description}</p>{/if}
        </div>

      </article>
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
    --shadow: 0 10px 30px rgba(0,0,0,0.35);
    --radius: 18px;
    --transition: 180ms cubic-bezier(.2,.8,.2,1);
  }

  * { box-sizing: border-box; }
  .lp-root {
    font-family: system-ui, sans-serif;
    color: var(--text);
    background: radial-gradient(1200px 800px at 10% -20%, #20305b 0%, transparent 60%),
                radial-gradient(1000px 700px at 110% 10%, #20305b 0%, transparent 60%),
                var(--bg);
    min-height: 100vh;
    padding: 2rem 1rem 3rem;
    display: grid;
    gap: 2rem;
    place-items: start center;
  }
  .lp-header { text-align: center; }
  .sub { color: var(--muted); }

  .grid {
    width: min(1100px, 100%);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .qcard {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition), box-shadow var(--transition);
  }
  .qcard:hover {
    transform: translateY(-3px);
    border-color: var(--ring);
    box-shadow: 0 10px 30px rgba(0,0,0,.45), 0 0 0 6px var(--ring);
  }

  .thumb { aspect-ratio: 16/9; background: var(--bg-soft); }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }
  .body { padding: 1rem; }
  .title { margin: 0; }
  .desc { margin: .4rem 0 0; color: var(--muted); }
  .cta { padding: 0 1rem 1rem; display: flex; justify-content: flex-end; }
  .btn {
    border-radius: 12px;
    padding: .6rem .9rem;
    background: linear-gradient(90deg, var(--primary), var(--primary-strong));
    color: white;
    text-decoration: none;
    font-weight: 700;
  }
  .btn:hover { box-shadow: 0 0 0 6px var(--ring); }
</style>
