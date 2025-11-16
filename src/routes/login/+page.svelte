<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  const form = (data as any).form ?? {};
</script>

<div class="lp-root">
  <header class="lp-header">
    <div class="title-wrap">
      <h1>Welcome back</h1>
      <p class="sub">Sign in to access your quizzes and scores.</p>
    </div>
  </header>

  <section class="grid login-grid" aria-live="polite">
    <article class="qcard login-card">
      <div class="body">
        <h2 class="login-title">Sign in</h2>
        <p class="login-sub">
          Use the account your quizzes are linked to.
        </p>

        {#if form.error}
          <p class="error-banner" role="alert">
            {form.error}
          </p>
        {/if}

        <form method="POST" class="login-form">
          <div class="field">
            <label for="username">Username</label>
            <input
              id="username"
              name="username"
              type="username"
              class="input"
              autocomplete="username"
              placeholder="sweenmachine"
              value={form.username ?? ''}
              required
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              class="input"
              autocomplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn-primary">
            Log in
          </button>
          
<div class="login-meta">
  <a href="/register">Create an account →</a>
</div>
        </form>
      </div>
    </article>
  </section>
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
  .sr-only{
    position:absolute; width:1px; height:1px; padding:0; margin:-1px;
    overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
  }

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
    display:flex; align-items:flex-end; justify-content:space-between;
    gap:1rem; flex-wrap:wrap;
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

  .grid{
    width:min(1100px,100%);
    display:grid;
    gap:1rem;
  }

  /* Center the login card nicely on wider screens */
  .login-grid{
    grid-template-columns: minmax(260px, 420px);
    justify-content:center;
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

  .qcard:hover{
    transform: translateY(-4px) scale(1.01);
    border-color:transparent;
    box-shadow: 0 20px 46px rgba(0,0,0,.48);
  }
  .qcard:hover::before{ opacity:1; }

  .body{
    padding:1.3rem 1.4rem 1.4rem;
    display:grid;
    gap:.9rem;
  }

  .login-title{
    margin:0;
    font-size:1.2rem;
  }
  .login-sub{
    margin:0;
    color:var(--muted);
    font-size:.95rem;
  }

  .login-form{
    display:grid;
    gap:.9rem;
    margin-top:.5rem;
  }

  .field{
    display:grid;
    gap:.25rem;
  }
  .field label{
    font-size:.85rem;
    color:var(--muted);
  }

  .input{
    appearance:none;
    border:1px solid var(--card-border);
    background:rgba(255,255,255,.06);
    color:var(--text);
    border-radius:12px;
    padding:.7rem .9rem;
    outline:none;
    transition:border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
    width:100%;
  }

  .input:focus{
    border-color:transparent;
    box-shadow:0 0 0 6px var(--ring);
    background:rgba(255,255,255,.08);
  }

  .btn-primary{
    margin-top:.4rem;
    border:none;
    border-radius:999px;
    padding:.7rem 1rem;
    font-weight:500;
    font-size:.95rem;
    cursor:pointer;
    background:linear-gradient(90deg, var(--brand-1), var(--brand-2));
    color:#050814;
    box-shadow:0 14px 30px rgba(0,0,0,.4);
    transition:transform var(--transition), box-shadow var(--transition), filter var(--transition);
  }
  .btn-primary:hover{
    transform:translateY(-1px);
    box-shadow:0 18px 40px rgba(0,0,0,.5);
    filter:brightness(1.05);
  }
  .btn-primary:active{
    transform:translateY(1px) scale(.99);
    box-shadow:0 10px 24px rgba(0,0,0,.55);
  }
  .btn-primary:focus-visible{
    outline:none;
    box-shadow:0 0 0 6px var(--ring), 0 18px 40px rgba(0,0,0,.55);
  }

  .error-banner{
    margin:0;
    padding:.55rem .75rem;
    border-radius:12px;
    background:rgba(255,80,80,.12);
    border:1px solid rgba(255,100,100,.4);
    color:#ffb8b8;
    font-size:.85rem;
  }

  .login-meta{
    margin-top:.4rem;
    font-size:.8rem;
    color:var(--muted);
    display:flex;
    justify-content:flex-end;
  }
  .login-meta a{
    color:var(--brand-2);
    text-decoration:none;
  }
  .login-meta a:hover{
    text-decoration:underline;
  }

  @media (prefers-reduced-motion: reduce){
    .qcard, .btn-primary { transition:none; }
  }
</style>
