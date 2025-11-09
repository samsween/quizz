<script>
  import { enhance } from '$app/forms';
  export let data;  // { users }
  export let form;  // action result (fail/success)
</script>

<h1 class="text-2xl font-bold mb-4">Users</h1>

<!-- Create -->
<form method="post" use:enhance class="space-y-3 max-w-md">
  <div>
    <label class="block text-sm">Name</label>
    <input name="name" class="border rounded px-2 py-1 w-full" value={form?.values?.name || ''} />
    {#if form?.errors?.name}<p class="text-red-600 text-sm">{form.errors.name}</p>{/if}
  </div>
  <div>
    <label class="block text-sm">Email</label>
    <input name="email" type="email" class="border rounded px-2 py-1 w-full" value={form?.values?.email || ''} />
    {#if form?.errors?.email}<p class="text-red-600 text-sm">{form.errors.email}</p>{/if}
  </div>

  <button class="bg-black text-white px-3 py-1 rounded" formaction="?/create">Create</button>
  {#if form?.success}<p class="text-green-700 mt-1">User created!</p>{/if}
  {#if form?.errors?.form}<p class="text-red-600 mt-1">{form.errors.form}</p>{/if}
</form>

<hr class="my-6" />

<!-- List + inline Update/Delete -->
<ul class="space-y-3">
  {#each data.users as u}
    <li class="border rounded p-3">
      <div class="mb-2">
        <div class="font-medium">{u.name || '(no name)'}</div>
        <div class="text-sm text-gray-600">{u.email}</div>
      </div>

      <!-- Update form -->
      <form method="post" class="flex flex-wrap gap-2 items-end">
        <input type="hidden" name="id" value={u.id} />
        <label class="text-sm">
          Name
          <input name="name" class="border rounded px-2 py-1 ml-2" value={u.name || ''} />
        </label>
        <label class="text-sm">
          Email
          <input name="email" type="email" class="border rounded px-2 py-1 ml-2" value={u.email} />
        </label>
        <button class="border px-3 py-1 rounded" formaction="?/update">Update</button>
      </form>

      <!-- Delete form -->
      <form method="post" class="mt-2">
        <input type="hidden" name="id" value={u.id} />
        <button class="border px-3 py-1 rounded hover:bg-gray-50" formaction="?/delete">Delete</button>
      </form>
    </li>
  {/each}
</ul>
