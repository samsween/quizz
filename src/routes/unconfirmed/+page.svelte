<script>
  import { base } from '$app/paths';
</script>

<div class="unconfirmed-wrapper">
  <div class="unconfirmed-card">
    <h1 class="title">Account Not Confirmed</h1>
    <p class="subtitle">
      Your account is created, but still needs verification.
    </p>

    <p class="info">
      Please talk to AC Sweeney for access.
      Once confirmed, you'll gain full access to all quizzes and features.
    </p>

    <div class="actions">
      <a href={`${base}/`} class="btn back-btn">← Back to Home</a>
         <form method="POST" action="/logout">
    <button class="logout-btn" type="submit">Logout</button>
  </form>
    </div>
  </div>
</div>

<style>
  .unconfirmed-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 1rem;
  }

  .unconfirmed-card {
    width: min(500px, 100%);
    padding: 2rem;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px) saturate(130%);
    animation: fadeIn 0.45s ease-out;
  }

  .title {
    margin: 0;
    font-size: 1.6rem;
    text-align: center;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    text-align: center;
    margin: .6rem 0 1.2rem;
    color: var(--muted);
    font-size: .95rem;
  }

  .info {
    text-align: center;
    line-height: 1.6;
    font-size: .95rem;
    margin-bottom: 2rem;
    color: var(--text);
  }

  .actions {
    margin-top: 1.4rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btn {
    padding: .55rem 1rem;
    font-size: .9rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    transition: background var(--transition), border var(--transition), transform var(--transition);
  }

  .btn:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }

  .btn:active {
    transform: translateY(0px) scale(.98);
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
