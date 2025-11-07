<script>
    import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  export let data;
  const { quiz } = data; // quiz.title, quiz.slug, quiz.chunksCount

  const prevScores = JSON.parse(localStorage.getItem("prev-score"))
</script>

<div class="lp-root">
  <header class="lp-header">
     <nav class="toolbar">
       <button class="btn ghost" on:click={() => goto(`${base}/`)}>🏠 Home</button>
      <div class="spacer"></div>
    </nav>
        <h1>{quiz.title}</h1>
  </header>

  <section class="grid">
    {#each Array.from({ length: quiz.chunksCount }) as _, i}
      <article class="qcard"
       on:click={() => (window.location.href = `/quizz/quiz/${quiz.slug}/${i + 1}`)}
      >
        <div class="body">
          <h3 class="title">Section {i + 1}</h3>
          <div class="footer">
    <p class="desc">Questions {(i*20)+1}-{Math.min((i+1)*20, quiz.questions?.length || (i+1)*20)}</p>
          {#if prevScores && prevScores[`${quiz.slug}-${i+1}`]}
          <p class="desc">Last score <span class="score">{prevScores[`${quiz.slug}-${i+1}`]}/{Math.min((i+1)*20, quiz.questions?.length || (i+1)*20) - (i * 20)  }</span></p> 
          {:else}
            <p class="desc">Not completed yet </p>
          {/if}
          </div>
      
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
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .score {
    color: green;
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

