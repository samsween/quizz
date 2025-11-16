<!-- src/routes/admin/unconfirmed/+page.svelte -->
<script lang="ts">
  export let data;

  const { unconfirmedUsers } = data;
</script>

<section class="admin-unconfirmed">
  <header class="admin-header">
    <div>
      <h1>Unconfirmed users</h1>
      <p>Only admins can see and confirm newly registered users.</p>
    </div>
  </header>

  {#if unconfirmedUsers.length === 0}
    <div class="empty-state">
      <p>All users are confirmed 🎉</p>
    </div>
  {:else}
    <div class="card">
      <table class="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
            <th style="width: 1%; white-space: nowrap;">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each unconfirmedUsers as u}
            <tr>
              <td>{u.username}</td>
              <td>
                {#if u.confirmed}
                  <span class="badge badge-ok">Confirmed</span>
                {:else}
                  <span class="badge badge-pending">Pending</span>
                {/if}
              </td>
              <td>
                {#if !u.confirmed}
                  <form method="POST" action="?/confirm" class="inline-form">
                    <input type="hidden" name="userId" value={u.id} />
                    <button type="submit" class="btn-confirm">
                      Confirm
                    </button>
                  </form>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>

<style>
  .admin-unconfirmed {
    padding: 1.5rem 1rem;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .admin-header h1 {
    margin: 0;
    font-size: 1.4rem;
    background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .admin-header p {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .card {
    border-radius: var(--radius);
    background: var(--card, rgba(255,255,255,0.05));
    border: 1px solid var(--card-border, rgba(255,255,255,0.10));
    box-shadow: var(--shadow);
    padding: 1rem;
    overflow-x: auto;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .user-table th,
  .user-table td {
    padding: 0.6rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .user-table th {
    font-weight: 500;
    color: var(--muted);
  }

  .user-table tr:last-child td {
    border-bottom: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
  }

  .badge-ok {
    background: rgba(77, 227, 132, 0.15);
    color: #7cf9b0;
  }

  .badge-pending {
    background: rgba(255, 214, 102, 0.15);
    color: #ffd666;
  }

  .inline-form {
    margin: 0;
  }

  .btn-confirm {
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.08);
    color: var(--text);
    cursor: pointer;
    transition: background var(--transition), border var(--transition), transform var(--transition);
  }

  .btn-confirm:hover {
    background: rgba(255,255,255,0.16);
    border-color: rgba(255,255,255,0.22);
    transform: translateY(-1px);
  }

  .btn-confirm:active {
    transform: translateY(0) scale(.98);
  }

  .empty-state {
    border-radius: var(--radius);
    padding: 1.5rem;
    background: var(--card, rgba(255,255,255,0.04));
    border: 1px solid var(--card-border, rgba(255,255,255,0.08));
    text-align: center;
    color: var(--muted);
  }
</style>
