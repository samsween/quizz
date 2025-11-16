<!-- src/routes/quizz/+layout.svelte -->
<script lang="ts">
  import { base } from '$app/paths';

  // data comes from your +layout.server.ts / +page.server.ts load
  export let data;
  const { user } = data || {};

  const nav = [
    { href: `${base}/`, label: 'Home', icon: '🏠' },
    { href: `${base}/leaderboard`, label: 'Leaderboard', icon: '📈' },
  ];

  const username = user?.username ?? 'Guest';
  const usernameInitial = username.charAt(0).toUpperCase();
</script>

<div class="app-shell">
  <aside class="sidebar">
    <div class="brand">
      <div class="logo-dot" aria-hidden="true"></div>
      <div class="brand-text">
        <h1>Quizz</h1>
        <p class="tagline">Tiny quizzes, big brain gains.</p>
      </div>
    </div>

    <nav class="sidebar-nav" aria-label="Main">
      {#each nav as item}
        <a class="nav-item" href={item.href}>
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-label">{item.label}</span>
        </a>
      {/each}
    </nav>
  </aside>

  <div class="main-column">
    <header class="topbar">
      <div class="topbar-left">
        <h2 class="top-title">Quiz Library</h2>
        <p class="top-subtitle">Browse and take quizzes saved to your account.</p>
      </div>

      <div class="topbar-right">
        <div class="user-pill" aria-label="Current user">
          <div class="avatar" aria-hidden="true">{usernameInitial}</div>
          <div class="user-meta">
            <span class="user-label">Signed in as</span>
            <span class="user-username">{username}</span>

          </div>
        </div>
          <form method="POST" action="/logout">
    <button class="logout-btn" type="submit">Logout</button>
  </form>
      </div>
    </header>

    <!-- Your quiz list page (the code you pasted) will render here -->
    <main class="page-content">
      <slot />
    </main>
  </div>
</div>

<style>
  :global(body){
    margin:0;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto;
    background:
      radial-gradient(1200px 800px at 10% -20%, #20305b 0%, transparent 60%),
      radial-gradient(1000px 700px at 110% 10%, #20305b 0%, transparent 60%),
      linear-gradient(180deg, #0b1020, #0a0e1b 60%);
    color:#e8ecf8;
    min-height:100vh;
  }

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

  .app-shell{
    min-height:100vh;
    display:grid;
    grid-template-columns: 260px minmax(0,1fr);
    gap:0;
    padding:1.5rem;
    box-sizing:border-box;
  }
  .logout-btn {
  padding: .45rem .9rem;
  font-size: .85rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition), border var(--transition), transform var(--transition);
}

.logout-btn:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-1px);
}

.logout-btn:active {
  transform: translateY(0px) scale(.98);
}


  .sidebar{
    backdrop-filter: blur(14px) saturate(140%);
    background: linear-gradient(180deg, rgba(9,13,30,0.96), rgba(6,10,22,0.96));
    border-radius:24px;
    border:1px solid rgba(255,255,255,0.08);
    box-shadow: var(--shadow);
    padding:1.25rem 1rem 1.5rem;
    display:flex;
    flex-direction:column;
    gap:1.75rem;
  }

  .brand{
    display:flex;
    gap:.75rem;
    align-items:center;
  }

  .logo-dot{
    width:30px;
    height:30px;
    border-radius:999px;
    background: radial-gradient(circle at 30% 20%, var(--brand-2), var(--brand-1));
    box-shadow:0 0 24px rgba(109,242,255,0.5);
  }

  .brand-text h1{
    margin:0;
    font-size:1.2rem;
    letter-spacing:.04em;
  }
  .tagline{
    margin:0;
    font-size:.8rem;
    color:var(--muted);
  }

  .sidebar-nav{
    display:flex;
    flex-direction:column;
    gap:.35rem;
  }

  .nav-item{
    display:flex;
    align-items:center;
    gap:.55rem;
    padding:.55rem .7rem;
    border-radius:999px;
    text-decoration:none;
    color:var(--muted);
    font-size:.9rem;
    transition: background var(--transition), color var(--transition), transform var(--transition);
  }
  .nav-item:hover{
    background:rgba(255,255,255,0.06);
    color:var(--text);
    transform: translateX(2px);
  }
  .nav-icon{ font-size:1rem; }
  .nav-label{ white-space:nowrap; }

  .main-column{
    display:flex;
    flex-direction:column;
    gap:1.25rem;
    padding-left:1.25rem;
  }

  .topbar{
    border-radius:24px;
    backdrop-filter: blur(12px) saturate(130%);
    background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border:1px solid rgba(255,255,255,0.10);
    box-shadow: var(--shadow);
    padding:.9rem 1.4rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1rem;
  }

  .top-title{
    margin:0;
    font-size:1.1rem;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
  }

  .top-subtitle{
    margin:.1rem 0 0;
    font-size:.85rem;
    color:var(--muted);
  }

  .topbar-right{
    display:flex;
    align-items:center;
    gap:.75rem;
  }

  .user-pill{
    display:flex;
    align-items:center;
    gap:.6rem;
    padding:.4rem .8rem;
    border-radius:999px;
    background:rgba(0,0,0,0.35);
    border:1px solid rgba(255,255,255,0.1);
  }

  .avatar{
    width:28px;
    height:28px;
    border-radius:999px;
    display:grid;
    place-items:center;
    font-size:.9rem;
    font-weight:600;
    background:radial-gradient(circle at 30% 20%, var(--brand-2), var(--brand-1));
    box-shadow:0 0 18px rgba(109,242,255,0.55);
  }

  .user-meta{
    display:flex;
    flex-direction:column;
    line-height:1.1;
  }

  .user-label{
    font-size:.7rem;
    color:var(--muted);
  }

  .user-username{
    font-size:.85rem;
  }

  .page-content{
    /* this is where your existing lp-root content goes */
    padding-top:.5rem;
  }

  @media (max-width: 880px){
    .app-shell{
      grid-template-columns: minmax(0,1fr);
      padding:1rem;
    }
    .sidebar{
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      margin-bottom:.75rem;
    }
    .sidebar-nav{
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .main-column{
      padding-left:0;
    }
  }
</style>
