<script>
  import { createEventDispatcher, onMount, tick } from "svelte";

  // PROPS
  export let prompt = "Match each term to its correct description";
  export let pairs = [];            // [{ id, term, desc | description }]
  export let image = null;
  export let freeze = false;        // when true: reveal correctness
  export let connections = [];      // [{ rightId, leftId }]; can be bound by parent

  const dispatch = createEventDispatcher();

  // UTIL
  const shuffle = (arr) => {
    if (!arr || !Array.isArray(arr)) return [];
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const letter = (i) => String.fromCharCode("A".charCodeAt(0) + i);
  const objSize = (o) => Object.keys(o).length;

  // Build shuffled columns; normalize `desc`
  const left  = shuffle(pairs ?? []).map((p, i) => ({
    ...p, idx: i, desc: p.desc ?? p.description ?? ""
  }));
  const right = shuffle(pairs ?? []).map((p, i) => ({
    ...p, rIdx: i, desc: p.desc ?? p.description ?? ""
  }));

  // Helpers for id lookups
  function termById(id) {
    return (
      left.find((p) => p.id === id)?.term ??
      pairs.find((p) => p.id === id)?.term ??
      ""
    );
  }
  function descById(id) {
    return (
      right.find((p) => p.id === id)?.desc ??
      pairs.find((p) => p.id === id)?.desc ??
      pairs.find((p) => p.id === id)?.description ??
      ""
    );
  }

  // connections array <-> object map
  function objFromConnections(arr) {
    const o = {};
    for (const c of arr) o[c.rightId] = c.leftId;
    return o;
  }

  // STATE (objects/arrays for easy reactivity)
  let userMatches = objFromConnections(connections); // { [rightId]: leftId }
  let selectedLeft = null;

  const colors = ["#7c9cff","#31d0aa","#ffb347","#ff6b6b","#b47cff","#7cdcff"];
  let matchColors = {}; // { [leftId]: color }

  function hydrateColors() {
    const next = {};
    let i = 0;
    const seen = new Set();
    for (const leftId of Object.values(userMatches)) {
      if (!seen.has(leftId)) {
        next[leftId] = colors[Object.keys(next).length % colors.length];
        seen.add(leftId);
        i++;
      }
    }
    matchColors = next;
  }
  hydrateColors();

  // DOM + geometry
  let wrap;
  let svgW = 0;
  let svgH = 0;
  let lines = [];

  const leftRefs = {};   // { [leftId]: HTMLElement }
  const rightRefs = {};  // { [rightId]: HTMLElement }

  function storeLeft(node, id) {
    leftRefs[id] = node;
    return {
      update(newId) {
        delete leftRefs[id];
        id = newId;
        leftRefs[id] = node;
      },
      destroy() {
        delete leftRefs[id];
      },
    };
  }
  function storeRight(node, id) {
    rightRefs[id] = node;
    return {
      update(newId) {
        delete rightRefs[id];
        id = newId;
        rightRefs[id] = node;
      },
      destroy() {
        delete rightRefs[id];
      },
    };
  }

  function isLeftUsed(leftId) {
    for (const v of Object.values(userMatches)) if (v === leftId) return true;
    return false;
  }

  function pickLeft(id) {
    if (freeze) return;
    selectedLeft = selectedLeft === id ? null : id;
  }

  function setMatchColor(leftId, color) {
    matchColors = { ...matchColors, [leftId]: color };
  }
  function deleteMatchColor(leftId) {
    if (!(leftId in matchColors)) return;
    const { [leftId]: _, ...rest } = matchColors;
    matchColors = rest;
  }

  async function connectRight(rightId) {
    if (freeze || !selectedLeft) return;
    if (rightId in userMatches || isLeftUsed(selectedLeft)) return;

    if (!(selectedLeft in matchColors)) {
      const color = colors[objSize(matchColors) % colors.length];
      setMatchColor(selectedLeft, color);
    }

    userMatches = { ...userMatches, [rightId]: selectedLeft };
    connections = Object.entries(userMatches).map(([r, l]) => ({ rightId: r, leftId: l }));

    selectedLeft = null;
    await tick();
    computeLines();
    emitState();
  }

  async function disconnect(rightId) {
    if (freeze) return;
    const leftId = userMatches[rightId];
    const { [rightId]: _, ...rest } = userMatches;
    userMatches = rest;

    // prune color if this leftId is no longer used
    let stillUsed = false;
    for (const v of Object.values(userMatches)) { if (v === leftId) { stillUsed = true; break; } }
    if (!stillUsed && leftId) deleteMatchColor(leftId);

    connections = Object.entries(userMatches).map(([r, l]) => ({ rightId: r, leftId: l }));

    await tick();
    computeLines();
    emitState();
  }

  function rightForLeft(leftId) {
    for (const [rId, lId] of Object.entries(userMatches)) {
      if (lId === leftId) return rId;
    }
    return null;
  }
  function isLeftCorrect(leftId) {
    const rId = rightForLeft(leftId);
    return !!rId && rId === leftId;
  }
  function isLeftWrong(leftId) {
    const rId = rightForLeft(leftId);
    return !!rId && rId !== leftId;
  }
  function isCorrectTarget(r) {
    const chosenLeft = userMatches[r.id];
    return !!chosenLeft && chosenLeft === r.id;
  }

  // Colors:
  // - when NOT frozen: use per-match color
  // - when frozen: rely on .is-correct / .is-wrong classes (no inline override)
  $: leftColor = (leftId) => {
    if (freeze) return null;
    const rId = rightForLeft(leftId);
    return rId ? (matchColors[leftId] ?? null) : null;
  };
  $: rightColor = (rightId) => {
    if (freeze) return null;
    const leftId = userMatches[rightId];
    return leftId ? (matchColors[leftId] ?? null) : null;
  };

  function centerOf(el, base) {
    if (!el || !base) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    const b = base.getBoundingClientRect();
    return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
    }

  function computeLines() {
    if (!wrap) return;
    svgW = wrap.clientWidth || 0;
    svgH = wrap.clientHeight || 0;
    const conns = [];
    for (const [rightId, leftId] of Object.entries(userMatches)) {
      const lEl = leftRefs[leftId];
      const rEl = rightRefs[rightId];
      if (!lEl || !rEl) continue;
      const a = centerOf(lEl, wrap);
      const b = centerOf(rEl, wrap);
      conns.push({
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        color: freeze
          ? (rightId === leftId ? 'var(--success)' : 'var(--danger)')
          : (matchColors[leftId] || '#7c9cff'),
      });
    }
    lines = conns;
  }

  function emitState() {
    const canSubmit = objSize(userMatches) === right.length;
    dispatch("state", { canSubmit });
  }

  onMount(() => {
    computeLines();
    const onResize = () => computeLines();
    const obs = new ResizeObserver(onResize);
    if (wrap) obs.observe(wrap);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      obs.disconnect();
    };
  });

  // keep prop -> state in sync
  $: {
    const rebuilt = objFromConnections(connections);
    const changed =
      objSize(rebuilt) !== objSize(userMatches) ||
      Object.entries(rebuilt).some(([k, v]) => userMatches[k] !== v);

    if (changed) {
      userMatches = rebuilt;
      hydrateColors();
      computeLines();
      emitState();
    }
  }

  // trigger recompute on any reactive change
  $: (computeLines(), emitState());
</script>

<article class="card match-card">
  <header class="match-header">
    <div class="flex">
      <h2 class="question">{prompt}</h2>
      <div class="badge">Matched: {Object.keys(userMatches).length} / {right.length}</div>
    </div>

    {#if image}
      <figure class="media">
        <img src={image} alt="Question image" loading="lazy" />
      </figure>
    {/if}
  </header>

  <div class="match-wrap" bind:this={wrap}>
    <svg class="links" preserveAspectRatio="none" viewBox={`0 0 ${svgW} ${svgH}`}>
      {#each lines as ln}
        <path
          d={`M ${ln.x1} ${ln.y1} C ${(ln.x1 + ln.x2) / 2} ${ln.y1}, ${(ln.x1 + ln.x2) / 2} ${ln.y2}, ${ln.x2} ${ln.y2}`}
          stroke={ln.color}
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
      {/each}
    </svg>

    <div class="match-grid">
      <!-- LEFT -->
      <section class="col">
        <h3 class="col-title">Terms</h3>
        <ul class="bank" role="list">
          {#each left as l, i (l.id)}
            <li>
             <button
    type="button"
    class="pill {selectedLeft === l.id ? 'is-selected' : ''} {freeze && isLeftCorrect(l.id) ? 'is-correct' : ''} {freeze && isLeftWrong(l.id) ? 'is-wrong' : ''} {isLeftUsed(l.id) && !freeze ? 'is-used' : ''}"
    style:border-color={!freeze && leftColor(l.id) ? `${leftColor(l.id)} !important` : null}
    style:background={!freeze && leftColor(l.id) ? `${leftColor(l.id)}22 !important` : null}
    
    disabled={freeze} 

    on:click={() => pickLeft(l.id)}
    use:storeLeft={l.id}
    aria-pressed={selectedLeft === l.id}
  >
                <span
                  class="index"
                  style:background={!freeze && leftColor(l.id) ? `${leftColor(l.id)}22 !important` : null}
                  style:border-color={!freeze && leftColor(l.id) ? `${leftColor(l.id)}55 !important` : null}
                >
                  {letter(i)}
                </span>
                <span class="label">{l.term}</span>
              </button>
            </li>
          {/each}
        </ul>
      </section>

      <!-- RIGHT -->
      <section class="col">
        <h3 class="col-title">Descriptions</h3>
        <ul class="targets" role="list">
          {#each right as r, i (r.id)}
            <li>
              <div
                class="target"
                class:is-correct={freeze && isCorrectTarget(r)}
                class:is-wrong={freeze && userMatches[r.id] && !isCorrectTarget(r)}
                style:border-color={!freeze && userMatches[r.id] ? `${(rightColor(r.id) ?? '#7c9cff')} !important` : null}
                style:background={!freeze && userMatches[r.id] ? `${(rightColor(r.id) ?? '#7c9cff')}22 !important` : null}
                on:click={() => userMatches[r.id] ? disconnect(r.id) : connectRight(r.id)}
                role="button"
                tabindex="0"
                on:keydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    userMatches[r.id] ? disconnect(r.id) : connectRight(r.id);
                  }
                }}
                use:storeRight={r.id}
              >
                <div class="desc">
                  <span class="index">{i + 1}</span>
                  <span class="label">{descById(r.id)}</span>
                </div>

                <div class="conn">
                  {#if userMatches[r.id]}
                    <span
                      class="conn-pill user"
                      style={freeze && userMatches[r.id] !== r.id
                        ? "border-color: var(--danger); background: rgba(255,107,107,0.12) !important;"
                        : !freeze
                          ? `border-color:${rightColor(r.id) ?? '#7c9cff'} !important; background:${(rightColor(r.id) ?? '#7c9cff')}22 !important; border:2px;`
                          : ""}
                    >
                      {termById(userMatches[r.id])}
                    </span>
                  {:else if !freeze}
                    <span class="hint">
                      Click to connect {selectedLeft ? `(${termById(selectedLeft)})` : ""}
                    </span>
                  {/if}

                  {#if freeze}
                    <span class="conn-pill correct">
                      {termById(r.id)}
                    </span>
                  {/if}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </section>
    </div>
  </div>
</article>

<style>
  :global(:root) {
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
  .flex { display: flex; align-items: center; }
  .card.match-card {
    width: min(880px, 100%);
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    padding: 1.2rem;
    backdrop-filter: blur(10px);
  }
  .match-header {
    display: flex; flex-direction: column; align-items: center; justify-content: space-between;
    gap: 0.75rem; margin-bottom: 0.6rem;
  }

  /* correctness visuals on FREEZE */
  .pill.is-correct {
    background: linear-gradient(180deg, rgba(49,208,170,0.25), rgba(49,208,170,0.12)) !important;
    border-color: rgba(49,208,170,0.9) !important;
    color: #06211b !important;
    box-shadow: 0 0 10px rgba(49,208,170,0.30) !important;
  }
  .pill.is-wrong {
    background: linear-gradient(180deg, rgba(255,107,107,0.25), rgba(255,107,107,0.12)) !important;
    border-color: rgba(255,107,107,0.9) !important;
    color: #fff !important;
    box-shadow: 0 0 10px rgba(255,107,107,0.25) !important;
  }
  .pill.is-used {
  /* This prevents clicks */
  pointer-events: none;
  
  /* This makes it look "used" or "disabled" */
  opacity: 0.6;
}

/* Optional: Prevent hover effects on used pills */
.pill.is-used:hover {
  transform: none;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.08);
  border-color: var(--card-border); 
}

/* If a color is applied, don't fade it out */
.pill.is-used[style*="background"] {
  opacity: 1;
}

  .question { margin: 0.2rem 0; letter-spacing: 0.2px; font-size: clamp(1.1rem, 1.2vw + 1rem, 1.5rem); }
  .media { margin: 0.6rem 0 1.2rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border); }
  .media img { width: 100%; height: auto; display: block; }

  .target.is-correct {
    background: linear-gradient(180deg, rgba(49,208,170,0.25), rgba(49,208,170,0.12)) !important;
    border-color: rgba(49,208,170,0.9) !important;
    color: #06211b !important;
    box-shadow: 0 0 10px rgba(49,208,170,0.3) !important;
  }
  .target.is-wrong {
    background: linear-gradient(180deg, rgba(255,107,107,0.25), rgba(255,107,107,0.12)) !important;
    border-color: rgba(255,107,107,0.9) !important;
    color: #fff !important;
    box-shadow: 0 0 10px rgba(255,107,107,0.25) !important;
  }

  .badge {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
    border: 1px solid var(--card-border); border-radius: 999px; padding: 0.35rem 0.75rem;
    font-weight: 600; color: var(--muted); box-shadow: var(--shadow);
  }
  .match-wrap { position: relative; }
  .links {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; overflow: visible;
  }

  .match-grid { position: relative; display: grid; gap: 1rem; grid-template-columns: 1fr; margin-top: 0.4rem; }
  @media (min-width: 800px) { .match-grid { grid-template-columns: 1fr 1fr; } }

  .col-title { margin: 0 0 0.5rem; color: var(--muted); font-size: 0.95rem; font-weight: 700; letter-spacing: 0.2px; }
  .bank, .targets { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }

  .pill {
    width: 100%; display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 0.7rem;
    background: var(--bg-soft); color: var(--text);
    border: 1px solid var(--card-border); border-radius: 12px; padding: 0.7rem 0.9rem;
    font-weight: 600; letter-spacing: 0.2px; text-align: left;
    transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition), background var(--transition), opacity var(--transition);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.08); cursor: pointer;
  }
  .pill:hover { transform: translateY(-1px); border-color: var(--ring); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16), 0 0 0 6px var(--ring); }
  .pill.is-selected { background: linear-gradient(180deg, rgba(124, 156, 255, 0.12), rgba(124, 156, 255, 0.06)); border-color: var(--primary); }

  .target {
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 0.8rem;
    background: var(--bg-soft); color: var(--text);
    border: 1px solid var(--card-border); border-radius: 12px; padding: 0.75rem 0.9rem;
    transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition), background var(--transition), opacity var(--transition);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.08); cursor: pointer;
  }
  .target:hover { transform: translateY(-1px); border-color: var(--ring); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16), 0 0 0 6px var(--ring); }
  .target.is-correct { background: linear-gradient(180deg, rgba(49, 208, 170, 0.16), rgba(49, 208, 170, 0.06)); border-color: rgba(49, 208, 170, 0.6); }
  .target.is-wrong   { background: linear-gradient(180deg, rgba(255, 107, 107, 0.16), rgba(255, 107, 107, 0.06)); border-color: rgba(255, 107, 107, 0.6); }

  .desc { display: grid; grid-template-columns: auto 1fr; gap: 0.6rem; align-items: center; }
  .index {
    width: 28px; height: 28px; display: grid; place-items: center; border-radius: 999px;
    font-weight: 700; font-size: 0.9rem;
    background: rgba(124, 156, 255, 0.15); border: 1px solid rgba(124, 156, 255, 0.35);
  }
  .label { line-height: 1.35; }

  .conn { display: inline-flex; gap: 0.4rem; align-items: center; flex-wrap: wrap; justify-self: end; }
  .conn-pill {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.15rem 0.55rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700;
    border: 1px solid var(--card-border); background: rgba(255, 255, 255, 0.06);
  }
  .hint { color: var(--muted); font-size: 0.9rem; }
  .conn-pill.correct { border-color: var(--success); background: rgba(49, 208, 170, 0.12); font-weight: 800; }
  .conn-pill.user { background: rgba(255, 255, 255, 0.06); }
</style>
