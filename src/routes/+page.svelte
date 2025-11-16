<script>
    export let reason = "Access Restricted";
</script>

<div class="pay-root">
    <article class="card pay-card">
        <h1 class="title">🔒 {reason}</h1>

        <p class="subtitle">
           Please go to the neew domain at <a href="https://quiz.samsweeney.mee">quiz.samsweeney.me</a>

        </p>

        <div class="mock-box">
            <p class="mock-line"> New Domain <strong><a href="https://quiz.samsweeney.me">quiz.samsweeney.me</a></strong></p>
         
        </div>

    </article>
</div>

<style>
    :root {
        --bg: #0b1020;
        --bg-soft: #0f1530;
        --card: rgba(255, 255, 255, 0.06);
        --card-border: rgba(255, 255, 255, 0.12);
        --text: #e6e9f2;
        --muted: #9aa3b2;
        --primary: #7c9cff;
        --primary-strong: #547bff;
        --success: #31d0aa;
        --danger: #ff6b6b;
        --ring: rgba(124, 156, 255, 0.45);
        --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        --radius: 18px;
        --transition: 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .pay-root {
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: var(--bg);
        padding: 2rem;
        color: var(--text);
    }

    .pay-card {
        width: min(480px, 100%);
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 2rem;
        text-align: center;
        backdrop-filter: blur(10px);
    }

    .title {
        font-size: 1.6rem;
        margin: 0 0 0.6rem;
        font-weight: 700;
    }

    .subtitle {
        color: var(--muted);
        margin-bottom: 1.6rem;
        line-height: 1.4;
    }

    .mock-box {
        padding: 1rem;
        border: 1px solid var(--card-border);
        border-radius: 12px;
        background: var(--bg-soft);
        margin-bottom: 1.6rem;
        box-shadow: 0 3px 14px rgba(0,0,0,0.12);
    }

    .mock-line {
        margin: 0.25rem 0;
    }

    .mock-line.small {
        font-size: 0.85rem;
        color: var(--muted);
    }

    .btn {
        border: none;
        border-radius: 12px;
        padding: 0.8rem 1.2rem;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        color: #fff;
        background: linear-gradient(90deg, var(--primary), var(--primary-strong));
        transition:
            transform var(--transition),
            box-shadow var(--transition);
    }

    .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 24px rgba(124,156,255,0.35),
            0 0 0 6px var(--ring);
    }
</style>
