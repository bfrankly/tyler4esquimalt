/* Tyler 4 Esquimalt — page template, renderer and content editor.
   index.html is generated from this file plus the content JSON embedded in it.
   The editor (visible only to the site's owner on claude.ai) republishes the page. */
(function (root) {
"use strict";

/* ---------------- styles ---------------- */
const CSS = `
/* ---------- tokens: light (default) ---------- */
:root {
  --ground:  #EEF3F0;   /* sea mist */
  --surface: #FFFFFF;
  --ink:     #10282B;
  --muted:   #4E6467;
  --line:    #CBD8D3;
  --sea:     #0E4F5C;   /* deep Salish Sea teal */
  --sea-ink: #FFFFFF;   /* text on sea */
  --arbutus: #C4522A;   /* Saxe Point arbutus bark */
  --arbutus-ink: #FFFFFF;
  --kelp:    #2F6B4F;
  --sun:     #E9B640;
  --tint:    #DCE8E3;   /* soft teal tint for panels */
  --link:    #0E4F5C;
  --shadow:  0 18px 40px -24px rgba(16,40,43,.35);
  --display: "Bricolage Grotesque", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
  --body:    "Newsreader", "Iowan Old Style", Georgia, "Times New Roman", serif;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ground:  #0E1D1F;
    --surface: #152A2C;
    --ink:     #E7EFEB;
    --muted:   #A3B8B4;
    --line:    #2A4245;
    --sea:     #123F49;
    --sea-ink: #EAF4F2;
    --arbutus: #E0703F;
    --arbutus-ink: #14100C;
    --kelp:    #7DBA95;
    --sun:     #F0C45C;
    --tint:    #1B3336;
    --link:    #8FD0DA;
    --shadow:  0 18px 40px -24px rgba(0,0,0,.7);
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --ground:  #0E1D1F;
  --surface: #152A2C;
  --ink:     #E7EFEB;
  --muted:   #A3B8B4;
  --line:    #2A4245;
  --sea:     #123F49;
  --sea-ink: #EAF4F2;
  --arbutus: #E0703F;
  --arbutus-ink: #14100C;
  --kelp:    #7DBA95;
  --sun:     #F0C45C;
  --tint:    #1B3336;
  --link:    #8FD0DA;
  --shadow:  0 18px 40px -24px rgba(0,0,0,.7);
  color-scheme: dark;
}

/* ---------- base ---------- */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body {
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: var(--body);
  font-size: 1.125rem;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: var(--display);
  line-height: 1.02;
  letter-spacing: -0.015em;
  margin: 0;
  text-wrap: balance;
}
p { margin: 0; }
a { color: var(--link); text-decoration-thickness: 1px; text-underline-offset: 3px; }
:focus-visible { outline: 3px solid var(--arbutus); outline-offset: 3px; border-radius: 2px; }
.wrap { width: min(1120px, calc(100% - 2.5rem)); margin-inline: auto; }
.eyebrow {
  font-family: var(--display);
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--arbutus);
}
.prose { max-width: 66ch; }
.prose p + p { margin-top: 1.1em; }
.lead { font-size: 1.35rem; line-height: 1.45; }
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  font-family: var(--display); font-weight: 700; font-size: 1rem;
  padding: .8rem 1.25rem; border-radius: 999px; text-decoration: none;
  border: 2px solid transparent; cursor: pointer; line-height: 1;
}
.btn-primary { background: var(--arbutus); color: var(--arbutus-ink); border-color: var(--arbutus); }
.btn-primary:hover { filter: brightness(1.07); }
.btn-ghost { background: transparent; color: var(--ink); border-color: var(--line); }
.btn-ghost:hover { border-color: var(--ink); }

/* ---------- nav ---------- */
.nav {
  position: sticky; top: 0; z-index: 10;
  background: color-mix(in srgb, var(--ground) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.nav .wrap { display: flex; align-items: center; justify-content: space-between; gap: 1rem; height: 60px; }
.brand { font-family: var(--display); font-weight: 800; font-size: 1.15rem; color: var(--ink); text-decoration: none; letter-spacing: -0.01em; white-space: nowrap; }
.brand em { font-style: normal; color: var(--arbutus); }
.nav-links { display: flex; gap: 1.4rem; overflow-x: auto; scrollbar-width: none; }
.nav-links::-webkit-scrollbar { display: none; }
.nav-links a { font-family: var(--display); font-weight: 700; font-size: .92rem; color: var(--ink); text-decoration: none; white-space: nowrap; }
.nav-links a:hover { color: var(--arbutus); }

/* ---------- hero: the lawn sign ---------- */
.hero { padding: 2.5rem 0 3.5rem; }
.sign {
  position: relative;
  background: var(--sea);
  color: var(--sea-ink);
  border-radius: 6px;
  padding: clamp(2rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 4.5rem);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.sign::after {
  /* the sign's inner border, like a screen-printed coroplast panel */
  content: ""; position: absolute; inset: 14px; border: 3px solid color-mix(in srgb, var(--sea-ink) 35%, transparent);
  border-radius: 3px; pointer-events: none;
}
.sign .eyebrow { color: var(--sun); }
.sign h1 {
  font-size: clamp(3rem, 11vw, 7.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: .92;
  margin-top: .5rem;
  text-transform: uppercase;
}
.sign .for {
  font-family: var(--display);
  font-weight: 500;
  font-size: clamp(1.4rem, 3.4vw, 2.3rem);
  margin-top: .75rem;
  letter-spacing: -0.01em;
}
.sign .for strong { font-weight: 800; }
.sticker {
  position: absolute; right: clamp(.75rem, 4vw, 3rem); top: clamp(.75rem, 4vw, 2.5rem);
  background: var(--arbutus); color: var(--arbutus-ink);
  font-family: var(--display); font-weight: 800; text-transform: uppercase;
  letter-spacing: .04em; text-align: center; line-height: 1.05;
  width: 9.5rem; aspect-ratio: 1; border-radius: 50%;
  display: grid; place-content: center; gap: .15rem;
  transform: rotate(8deg);
  box-shadow: 0 8px 20px -10px rgba(0,0,0,.5);
}
.sticker small { display: block; font-size: .7rem; font-weight: 700; letter-spacing: .12em; }
.sticker b { font-size: 1.55rem; }
@media (max-width: 640px) {
  .sticker { position: static; transform: rotate(-3deg); margin-top: 1.5rem; width: 8.5rem; }
}
.hero-lead { margin-top: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 4rem; align-items: start; }
.hero-lead h2 { font-size: clamp(1.9rem, 4.2vw, 3rem); font-weight: 700; }
.hero-lead h2 em { font-style: normal; color: var(--arbutus); }
.hero-lead .actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }
@media (max-width: 800px) { .hero-lead { grid-template-columns: 1fr; } }

/* latest dispatches + mailing list, right under the hero */
#dispatches { padding: 0 0 3.5rem; border-top: 0; }
#dispatches, #updates { scroll-margin-top: 5.25rem; }
.updates { background: var(--tint); border-radius: 8px; padding: clamp(1.5rem, 4vw, 2.75rem); display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 2rem 3.5rem; align-items: start; }
@media (max-width: 800px) { .updates { grid-template-columns: 1fr; } }
.updates h2 { font-size: clamp(1.6rem, 3.4vw, 2.3rem); font-weight: 800; margin-top: .4rem; }
.updates .intro { margin-top: .75rem; color: var(--muted); max-width: 52ch; }
.latest { list-style: none; margin: 1.4rem 0 0; padding: 0; display: grid; gap: 0; border-top: 1px solid var(--line); }
.latest li { border-bottom: 1px solid var(--line); }
.latest a { display: grid; grid-template-columns: 3.2rem 1fr; gap: .2rem .8rem; padding: .85rem 0; text-decoration: none; color: var(--ink); align-items: baseline; }
.latest a:hover .t { text-decoration: underline; text-decoration-color: var(--arbutus); text-underline-offset: 4px; }
.latest .n { font-family: var(--display); font-weight: 800; color: var(--arbutus); font-size: .95rem; font-variant-numeric: tabular-nums; }
.latest .t { font-family: var(--display); font-weight: 700; font-size: 1.12rem; line-height: 1.2; }
.latest .d { grid-column: 2; font-family: var(--display); font-size: .82rem; color: var(--muted); }
.updates .all { display: inline-block; margin-top: 1.1rem; font-family: var(--display); font-weight: 700; font-size: .95rem; }
.updates .form { box-shadow: none; }
.updates .form h3 { font-size: 1.25rem; }
.d-sub { font-family: var(--display); font-weight: 700; font-size: .92rem; padding-bottom: .5rem; }

/* tide line divider */
.tide { display: block; width: 100%; height: 22px; color: var(--line); }

/* ---------- sections ---------- */
section { padding: 4.5rem 0; }
section + section { border-top: 1px solid var(--line); }
.section-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 1.5rem 4rem; margin-bottom: 2.5rem; align-items: end; }
.section-head h2 { font-size: clamp(2rem, 4.5vw, 3.1rem); font-weight: 800; }
.section-head p { color: var(--muted); max-width: 60ch; }
@media (max-width: 800px) { .section-head { grid-template-columns: 1fr; } }

/* letter */
.letter { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 2rem 4rem; }
.letter .salutation { font-family: var(--display); font-weight: 800; font-size: clamp(2rem, 4.5vw, 3.1rem); }
.signature { margin-top: 2rem; font-family: var(--display); font-weight: 700; }
.signature span { display: block; color: var(--muted); font-weight: 500; font-size: .95rem; }
@media (max-width: 800px) { .letter { grid-template-columns: 1fr; } }

/* platform list */
.platform { list-style: none; margin: 0; padding: 0; counter-reset: p; display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--line); }
.platform li {
  counter-increment: p;
  display: grid; grid-template-columns: 3.5rem 1fr; gap: 1rem;
  padding: 1.6rem 1.25rem 1.6rem 0;
  border-bottom: 1px solid var(--line);
}
.platform li:nth-child(odd) { border-right: 1px solid var(--line); padding-right: 2rem; }
.platform li:nth-child(even) { padding-left: 2rem; }
.platform li::before {
  content: counter(p);
  font-family: var(--display); font-weight: 800; font-size: 2.4rem; line-height: 1;
  color: var(--arbutus); font-variant-numeric: tabular-nums;
}
.platform li.kelp::before { color: var(--kelp); }
.platform h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: .4rem; }
.platform p { color: var(--muted); font-size: 1.02rem; }
.platform li.wide { grid-column: 1 / -1; border-right: 0; padding-left: 0; padding-right: 0; }
.platform li.wide p { max-width: 70ch; }
@media (max-width: 800px) {
  .platform { grid-template-columns: 1fr; }
  .platform li, .platform li:nth-child(odd), .platform li:nth-child(even) { border-right: 0; padding-left: 0; padding-right: 0; }
}

/* your voice */
.voice { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2.5rem 4rem; align-items: start; }
@media (max-width: 800px) { .voice { grid-template-columns: 1fr; } }
.steps { list-style: none; margin: 1.5rem 0 0; padding: 0; display: grid; gap: 1rem; }
.steps li { display: grid; grid-template-columns: 2rem 1fr; gap: .75rem; align-items: baseline; }
.steps .n { font-family: var(--display); font-weight: 800; color: var(--sea); font-size: 1.1rem; }
.chip {
  display: inline-block; font-family: var(--display); font-weight: 700; font-size: .78rem;
  letter-spacing: .06em; text-transform: uppercase; padding: .3rem .6rem; border-radius: 4px;
  background: var(--arbutus); color: var(--arbutus-ink); vertical-align: middle;
}
.chip.neutral { background: var(--tint); color: var(--ink); }
.form {
  background: var(--surface); border: 1px solid var(--line); border-radius: 8px;
  padding: 1.75rem; display: grid; gap: 1.1rem; box-shadow: var(--shadow);
}
.form h3 { font-size: 1.4rem; font-weight: 700; }
.field { display: grid; gap: .35rem; }
.field label { font-family: var(--display); font-weight: 700; font-size: .9rem; }
.field label small { font-weight: 500; color: var(--muted); }
.field input, .field select, .field textarea {
  font: inherit; font-size: 1.02rem; color: var(--ink);
  background: var(--ground); border: 1px solid var(--line); border-radius: 6px;
  padding: .65rem .8rem; width: 100%;
}
.field textarea { min-height: 6.5rem; resize: vertical; }
.form .note { font-size: .92rem; color: var(--muted); }
.form .hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.form { position: relative; }
.form .thanks { padding: 1.25rem; border-radius: 8px; background: var(--tint); font-family: var(--display); font-weight: 700; }
.form .thanks small { display: block; font-weight: 500; color: var(--muted); margin-top: .35rem; }

/* hearing board */
.board-head { margin-top: 3rem; border-top: 1px solid var(--line); padding-bottom: 1.25rem; }
.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
@media (max-width: 900px) { .board { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .board { grid-template-columns: 1fr; } }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 1.4rem; display: grid; gap: .6rem; align-content: start; }
.card h3 { font-size: 1.15rem; font-weight: 700; }
.card .meta { font-family: var(--display); font-size: .82rem; color: var(--muted); font-weight: 500; }
.card p { font-size: 1rem; }
.card.empty { border-style: dashed; background: transparent; color: var(--muted); }
.legend { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; margin-top: 1.75rem; font-size: .95rem; color: var(--muted); align-items: center; }

/* proposals */
.proposal { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 2.5rem 4rem; align-items: start; }
@media (max-width: 800px) { .proposal { grid-template-columns: 1fr; } }
.proposal h3 a.self { color: inherit; text-decoration: none; }
.proposal h3 a.self:hover { text-decoration: underline; text-decoration-color: var(--arbutus); text-underline-offset: 8px; }
.proposal + .proposal { margin-top: 4rem; padding-top: 3.5rem; border-top: 1px solid var(--line); }
.proposal-id { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
.proposal-id .num { font-family: var(--display); font-weight: 800; font-size: 2.4rem; color: var(--arbutus); line-height: 1; font-variant-numeric: tabular-nums; }
.proposal h3 { font-size: clamp(1.7rem, 3.4vw, 2.4rem); font-weight: 800; margin-bottom: .35rem; }
.proposal .sub { font-family: var(--display); font-weight: 500; font-size: 1.15rem; color: var(--muted); margin-bottom: 1.5rem; }
.proposal h4 { font-size: 1.1rem; font-weight: 700; margin: 1.6em 0 .4em; color: var(--link); }
.proposal ul { margin: .5em 0 0; padding-left: 1.2em; }
.proposal li + li { margin-top: .3em; }
.glance { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 1.5rem; position: sticky; top: 76px; display: grid; gap: 1rem; max-height: calc(100vh - 96px); overflow-y: auto; }
@media (max-width: 800px) { .glance { position: static; max-height: none; } }
.glance h4 { font-size: .78rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--arbutus); margin: 0; }
.glance dl { margin: 0; display: grid; gap: .9rem; }
.glance dt { font-family: var(--display); font-weight: 700; font-size: .85rem; color: var(--muted); }
.glance dd { margin: .1rem 0 0; font-size: 1rem; line-height: 1.4; }
.glance .links { border-top: 1px solid var(--line); padding-top: 1rem; font-family: var(--display); font-weight: 700; font-size: .95rem; }
.platform .more { display: inline-block; margin-top: .5rem; font-family: var(--display); font-weight: 700; font-size: .92rem; }

/* dispatches */
.dispatches { border-top: 1px solid var(--line); }
.dispatches > h3, .board-head { font-size: .78rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--arbutus); padding: 1.5rem 0 .5rem; }
.dispatch { border-bottom: 1px solid var(--line); }
.dispatch > summary { cursor: pointer; list-style: none; padding: 1.25rem 0; display: grid; grid-template-columns: 1fr auto; gap: .35rem 2rem; align-items: baseline; }
.dispatch > summary::-webkit-details-marker { display: none; }
.dispatch .d-title { font-family: var(--display); font-weight: 800; font-size: clamp(1.4rem, 2.8vw, 1.9rem); letter-spacing: -0.015em; }
.dispatch .d-title::before { content: "+"; display: inline-block; width: 1.4rem; color: var(--arbutus); font-weight: 500; }
.dispatch[open] .d-title::before { content: "–"; }
.dispatch .d-date { font-family: var(--display); font-size: .85rem; color: var(--muted); white-space: nowrap; }
.dispatch .d-lede { grid-column: 1 / -1; color: var(--muted); max-width: 66ch; padding-left: 1.4rem; }
.dispatch-body { padding: 0 0 2rem 1.4rem; }
.dispatch-body h4 { font-size: 1.15rem; font-weight: 700; margin: 1.8em 0 .5em; color: var(--link); }
.dispatch-body ul { margin: .6em 0 0; padding-left: 1.2em; }
.dispatch-body li + li { margin-top: .35em; }
.dispatch .d-num { font-weight: 800; color: var(--arbutus); }
.dispatch > summary:focus:not(:focus-visible) { outline: none; }
.dispatch:target, .proposal:target { scroll-margin-top: 76px; }
.proposal:target h3 { text-decoration: underline; text-decoration-color: var(--arbutus); text-underline-offset: 8px; }
.glance .d-share { margin-top: 0; }
.dispatch:target > summary .d-title { text-decoration: underline; text-decoration-color: var(--arbutus); text-underline-offset: 6px; }
.d-share { margin-top: 1.5rem; font-family: var(--display); font-size: .85rem; color: var(--muted); display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; }
.mini-link { font: inherit; font-weight: 700; color: var(--link); background: none; border: 1px solid var(--line); border-radius: 999px; padding: .35rem .8rem; cursor: pointer; }
.mini-link:hover { border-color: var(--link); }
@media (max-width: 640px) { .dispatch > summary { grid-template-columns: 1fr; } .dispatch .d-lede, .dispatch-body { padding-left: 0; } }

/* about */
.about { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 4fr); gap: 2.5rem 4rem; align-items: start; }
@media (max-width: 800px) { .about { grid-template-columns: 1fr; } }
.photo {
  aspect-ratio: 4 / 5; border: 2px dashed var(--line); border-radius: 8px;
  display: grid; place-content: center; text-align: center; padding: 1.5rem;
  color: var(--muted); font-family: var(--display); font-size: .95rem; background: var(--tint);
}
.facts { list-style: none; margin: 1.5rem 0 0; padding: 0; display: grid; gap: .5rem; font-family: var(--display); font-weight: 500; }
.facts li { display: flex; gap: .6rem; align-items: baseline; }
.facts li::before { content: ""; width: .55rem; height: .55rem; border-radius: 50%; background: var(--arbutus); flex: none; transform: translateY(-1px); }

/* get involved */
.involve { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
@media (max-width: 800px) { .involve { grid-template-columns: 1fr; } }
.involve .card { background: var(--tint); border-color: transparent; }
.involve .card a { font-family: var(--display); font-weight: 700; }

/* donate */
.donate { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2.5rem 4rem; align-items: start; }
@media (max-width: 800px) { .donate { grid-template-columns: 1fr; } }
.rules { list-style: none; margin: 1.5rem 0 0; padding: 0; display: grid; gap: .6rem; }
.rules li { display: grid; grid-template-columns: 1.5rem 1fr; gap: .6rem; align-items: baseline; }
.rules li::before { content: "✓"; font-family: var(--display); font-weight: 800; color: var(--kelp); }
.ways { display: grid; gap: .9rem; margin-top: 1.75rem; }
.way { border: 1px solid var(--line); border-radius: 8px; padding: 1rem 1.2rem; background: var(--surface); }
.way h4 { font-size: 1.05rem; font-weight: 700; margin-bottom: .3rem; }
.way p { font-size: 1rem; color: var(--muted); }
.way code { font-family: var(--display); font-weight: 700; color: var(--ink); font-size: .98rem; }
.fine { font-size: .92rem; color: var(--muted); margin-top: 1.5rem; max-width: 60ch; }
.form .attest { display: grid; gap: .55rem; padding: 1rem; border: 1px solid var(--line); border-radius: 8px; background: var(--ground); }
.form .attest label { display: grid; grid-template-columns: 1.4rem 1fr; gap: .6rem; align-items: start; font-family: var(--body); font-size: .98rem; font-weight: 400; cursor: pointer; }
.form .attest input { margin-top: .25rem; width: 1.1rem; height: 1.1rem; }
.form .two { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
@media (max-width: 520px) { .form .two { grid-template-columns: 1fr; } }

/* election strip */
.strip { background: var(--sea); color: var(--sea-ink); padding: 2.5rem 0; }
.strip .wrap { display: flex; flex-wrap: wrap; gap: 1rem 3rem; align-items: center; justify-content: space-between; }
.strip h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 800; }
.strip p { color: color-mix(in srgb, var(--sea-ink) 80%, transparent); }
.strip a { color: var(--sea-ink); }

/* footer */
footer { padding: 3rem 0 3.5rem; color: var(--muted); font-size: .95rem; }
footer .wrap { display: grid; gap: 1.25rem; max-width: 1120px; }
footer .land { max-width: 70ch; color: var(--ink); }
footer .auth { font-family: var(--display); font-size: .85rem; }
.photo-figure { margin: 0; display: grid; gap: .6rem; }
.photo-figure img { width: 100%; height: auto; border-radius: 8px; display: block; box-shadow: var(--shadow); }
.photo-figure figcaption { font-family: var(--display); font-size: .9rem; color: var(--muted); }
.editor-link { font-family: var(--display); font-weight: 700; }
.voice-h, .about-h { font-size: clamp(2rem, 4.5vw, 3.1rem); font-weight: 800; margin-top: .5rem; }
.about-h { margin-bottom: 1.25rem; }
.voice-intro { margin-top: 1.25rem; }
`;

/* ---------------- editor styles (only injected while editing) ---------------- */
const EDITOR_CSS = `
#editor { position: fixed; top: 0; right: 0; bottom: 0; width: min(var(--editor-w, 600px), 100vw); z-index: 50;
  background: var(--surface); color: var(--ink); border-left: 1px solid var(--line);
  box-shadow: -20px 0 50px -30px rgba(0,0,0,.4); display: grid; grid-template-rows: auto 1fr auto;
  font-family: var(--display); font-size: .92rem; }
html.editing body { margin-right: min(var(--editor-w, 600px), 100vw); }
#editor .grip { position: absolute; left: -4px; top: 0; bottom: 0; width: 10px; cursor: col-resize; z-index: 2; }
#editor .grip::after { content: ""; position: absolute; left: 4px; top: 0; bottom: 0; width: 2px; background: transparent; transition: background .15s; }
#editor .grip:hover::after, #editor.resizing .grip::after { background: var(--arbutus); }
#editor.resizing { user-select: none; }
#editor header .tools { display: flex; gap: .4rem; }
#editor header .x { white-space: nowrap; }
@media (max-width: 900px) { #editor .grip, #editor [data-action="width"] { display: none; } }
@media (max-width: 900px) { html.editing body { margin-right: 0; } }
#editor header { display: flex; align-items: center; justify-content: space-between; gap: .75rem; padding: .9rem 1rem; border-bottom: 1px solid var(--line); }
#editor header h2 { font-size: 1.05rem; font-weight: 800; margin: 0; }
#editor header .x { background: none; border: 1px solid var(--line); border-radius: 6px; font: inherit; font-weight: 700; padding: .35rem .6rem; cursor: pointer; color: var(--ink); }
#editor .body { overflow-y: auto; padding: .5rem 0 2rem; }
#editor footer { padding: .9rem 1rem; border-top: 1px solid var(--line); display: grid; gap: .6rem; background: var(--surface); }
#editor .row { display: flex; gap: .5rem; flex-wrap: wrap; align-items: center; }
#editor .status { font-size: .85rem; color: var(--muted); min-height: 1.2em; }
#editor .status.err { color: var(--arbutus); }
#editor details { border-bottom: 1px solid var(--line); }
#editor details > summary { cursor: pointer; padding: .8rem 1rem; font-weight: 800; font-size: .95rem; list-style: none; display: flex; justify-content: space-between; align-items: center; }
#editor details > summary::after { content: "+"; color: var(--muted); font-weight: 500; }
#editor details[open] > summary::after { content: "–"; }
#editor details > summary::-webkit-details-marker { display: none; }
#editor .fields { padding: 0 1rem 1rem; display: grid; gap: .8rem; }
#editor .f { display: grid; gap: .3rem; }
#editor .f label { font-weight: 700; font-size: .82rem; color: var(--muted); }
#editor .f label small { font-weight: 500; }
#editor input[type=text], #editor textarea, #editor select {
  font: inherit; font-family: var(--body); font-size: .98rem; color: var(--ink);
  background: var(--ground); border: 1px solid var(--line); border-radius: 6px; padding: .5rem .6rem; width: 100%; }
#editor textarea { min-height: 4.5rem; resize: vertical; line-height: 1.4; }
#editor textarea.tall { min-height: 9rem; }
#editor .check { display: flex; gap: .5rem; align-items: center; font-weight: 700; font-size: .85rem; }
#editor .item { border: 1px solid var(--line); border-radius: 8px; padding: .75rem; display: grid; gap: .7rem; background: color-mix(in srgb, var(--ground) 50%, transparent); }
#editor .item .bar { display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
#editor .item .bar b { font-size: .85rem; }
#editor .item .bar .tools { display: flex; gap: .25rem; }
#editor .mini { background: var(--surface); border: 1px solid var(--line); border-radius: 5px; font: inherit; font-size: .8rem; font-weight: 700; padding: .25rem .5rem; cursor: pointer; color: var(--ink); }
#editor .mini:hover { border-color: var(--ink); }
#editor .mini.danger { color: var(--arbutus); }
#editor .add { justify-self: start; }
#editor .btn { font-size: .95rem; padding: .7rem 1.1rem; }
#editor .btn[disabled] { opacity: .5; cursor: default; }
#editor .hint { font-size: .8rem; color: var(--muted); line-height: 1.4; }
#editor .photo-preview { width: 100%; border-radius: 6px; display: block; }
#editor .nested { display: grid; gap: .6rem; padding-left: .5rem; border-left: 3px solid var(--line); }
#editor .token { display: grid; gap: .5rem; padding: .9rem 1rem; border: 1px solid var(--arbutus); border-radius: 8px; background: color-mix(in srgb, var(--arbutus) 8%, var(--surface)); }
#editor .token[hidden], #editor [hidden] { display: none !important; }
#editor .token h3 { font-size: .95rem; font-weight: 800; }
#editor .token input { font-family: ui-monospace, Menlo, monospace; font-size: .9rem; }
#editor .token .row { justify-content: space-between; }
`;

/* ---------------- helpers ---------------- */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const safeHref = (u) => /^(https?:\/\/|mailto:|#)/i.test(u) ? u : "#";
// Inline formatting: **bold**, *italic*, [label](url). Newlines become <br>.
function inl(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${esc(safeHref(u))}"${/^https?:/i.test(u) ? ' rel="noopener"' : ""}>${t}</a>`)
    .replace(/\n/g, "<br>");
}
// Blocks separated by blank lines; a block whose lines all start with "- " becomes a list.
function blocks(s) {
  return String(s || "").split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).map(b => {
    if (/^##\s+/.test(b)) return `<h4>${inl(b.replace(/^##\s+/, ""))}</h4>`;
    const lines = b.split("\n");
    if (lines.every(l => /^-\s+/.test(l))) return `<ul>${lines.map(l => `<li>${inl(l.replace(/^-\s+/, ""))}</li>`).join("")}</ul>`;
    return `<p>${inl(b)}</p>`;
  }).join("\n");
}
const lines = (s) => String(s || "").split("\n").map(l => l.trim()).filter(Boolean);
const chip = (kind, c) => kind === "advocate" ? `<span class="chip">${esc(c.hearing.tagAdvocate)}</span>`
  : kind === "compiled" ? `<span class="chip neutral">${esc(c.hearing.tagCompiled)}</span>` : "";

// Stable anchor for a dispatch: its permanent number, never its position.
function dispatchId(d, c) {
  const n = d.n || ((c.hearing.dispatches.length - c.hearing.dispatches.indexOf(d)));
  return "dispatch-" + String(n).padStart(2, "0");
}

function proposalId(p, c) {
  const n = p.n || (c.proposals.items.indexOf(p) + 1);
  return "proposal-" + String(n).padStart(2, "0");
}

/* ---------------- page template ---------------- */
function renderBody(c) {
  const hasProposals = c.proposals.items.length > 0;
  const hasHearing = c.hearing.cards.length > 0;
  return `
<nav class="nav" aria-label="Site">
  <div class="wrap">
    <a class="brand" href="#top">${inl(c.site.brand)}</a>
    <div class="nav-links">
      <a href="#platform">Platform</a>
      <a href="#voice">Your voice</a>
      ${hasHearing ? `<a href="#hearing">${esc(c.hearing.eyebrow)}</a>` : ""}
      ${hasProposals ? `<a href="#proposals">${esc(c.proposals.eyebrow)}</a>` : ""}
      <a href="#about">${esc(c.about.eyebrow)}</a>
      <a href="#involved">${esc(c.involved.eyebrow)}</a>
      ${c.donate && c.donate.enabled ? `<a href="#donate">${esc(c.donate.eyebrow)}</a>` : ""}
    </div>
  </div>
</nav>

<header class="hero" id="top">
  <div class="wrap">
    <div class="sign">
      <p class="eyebrow">${inl(c.site.signEyebrow)}</p>
      <h1>${inl(c.site.signName)}</h1>
      <p class="for">for <strong>${inl(c.site.signOffice)}</strong></p>
      <div class="sticker" aria-label="${esc(c.site.stickerTop + " " + c.site.stickerBig + " " + c.site.stickerBottom)}">
        <small>${esc(c.site.stickerTop)}</small>
        <b>${esc(c.site.stickerBig)}</b>
        <small>${esc(c.site.stickerBottom)}</small>
      </div>
    </div>
    <div class="hero-lead">
      <h2>${inl(c.hero.thesis)}</h2>
      <div>
        <p class="lead">${inl(c.hero.lead)}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#voice">${esc(c.hero.primaryButton)}</a>
          <a class="btn btn-ghost" href="#platform">${esc(c.hero.secondaryButton)}</a>
        </div>
      </div>
    </div>
  </div>
</header>

${c.updates && c.updates.enabled && c.hearing.dispatches.length ? `<section id="dispatches">
  <div class="wrap">
    <a id="updates" aria-hidden="true"></a>
    <div class="updates">
      <div>
        <p class="eyebrow">${esc(c.updates.eyebrow)}</p>
        <h2>${inl(c.updates.heading)}</h2>
        <p class="intro">${inl(c.updates.intro)}</p>
        <ul class="latest">
          ${c.hearing.dispatches.slice(0, Math.max(1, parseInt(c.updates.count, 10) || 3)).map(d => `<li><a href="#${dispatchId(d, c)}"><span class="n">No. ${esc(String(d.n || "").padStart(2, "0"))}</span><span class="t">${inl(d.title)}</span><span class="d">${esc(d.date)}</span></a></li>`).join("")}
        </ul>
        <a class="all" href="#hearing">${esc(c.updates.allLabel)}</a>
      </div>
      <form class="form" id="signup-form" novalidate>
        <h3>${inl(c.updates.signupHeading)}</h3>
        <p class="note">${inl(c.updates.signupIntro)}</p>
        <div class="field"><label for="s-email">Email</label><input id="s-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="s-name">First name <small>(optional)</small></label><input id="s-name" name="name" type="text" autocomplete="given-name"></div>
        <div class="field hp" aria-hidden="true"><label for="s-website">Leave this empty</label><input id="s-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn-primary" type="submit">${esc(c.updates.button)}</button>
        <p class="note" id="signup-note">${inl(c.updates.consent)}</p>
      </form>
    </div>
  </div>
</section>` : ""}

<svg class="tide" viewBox="0 0 1200 22" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 11 C 50 0, 100 0, 150 11 S 250 22, 300 11 S 400 0, 450 11 S 550 22, 600 11 S 700 0, 750 11 S 850 22, 900 11 S 1000 0, 1050 11 S 1150 22, 1200 11" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>

<section id="letter">
  <div class="wrap letter">
    <div>
      <p class="eyebrow">${esc(c.letter.eyebrow)}</p>
      <p class="salutation">${esc(c.letter.salutation)}</p>
    </div>
    <div class="prose">
      ${blocks(c.letter.body)}
      <p class="signature">${esc(c.letter.signName)} <span>${esc(c.letter.signTagline)}</span></p>
    </div>
  </div>
</section>

<section id="platform">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(c.platform.eyebrow)}</p>
        <h2>${inl(c.platform.heading)}</h2>
      </div>
      <p>${inl(c.platform.intro)}</p>
    </div>
    <ol class="platform">
      ${c.platform.items.map((it, i) => {
        const last = i === c.platform.items.length - 1 && c.platform.items.length % 2 === 1;
        return `<li class="${it.green ? "kelp " : ""}${last ? "wide" : ""}">
        <div>
          <h3>${inl(it.title)}</h3>
          <p>${inl(it.text)}</p>
          ${it.linkLabel && it.linkTo ? `<a class="more" href="${esc(safeHref(it.linkTo))}">${esc(it.linkLabel)}</a>` : ""}
        </div>
      </li>`; }).join("\n      ")}
    </ol>
  </div>
</section>

<section id="voice">
  <div class="wrap voice">
    <div>
      <p class="eyebrow">${esc(c.voice.eyebrow)}</p>
      <h2 class="voice-h">${inl(c.voice.heading)}</h2>
      <div class="prose voice-intro">${blocks(c.voice.intro)}</div>
      <ol class="steps">
        ${c.voice.steps.map((s, i) => `<li><span class="n">${i + 1}</span><span>${inl(s)}${i === c.voice.steps.length - 1 ? " " + chip("advocate", c) : ""}</span></li>`).join("\n        ")}
      </ol>
    </div>
    <form class="form" id="concern-form" novalidate>
      <h3>${inl(c.voice.formHeading)}</h3>
      <div class="field">
        <label for="name">Your name <small>(optional)</small></label>
        <input id="name" name="name" type="text" autocomplete="name">
      </div>
      <div class="field">
        <label for="hood">Your part of Esquimalt</label>
        <select id="hood" name="hood">
          <option value="">Choose one</option>
          ${c.voice.neighbourhoods.map(h => `<option>${esc(h)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="concern">Your immediate concern</label>
        <textarea id="concern" name="concern" placeholder="${esc(c.voice.concernPlaceholder)}"></textarea>
      </div>
      <div class="field">
        <label for="vision">Your long‑term vision</label>
        <textarea id="vision" name="vision" placeholder="${esc(c.voice.visionPlaceholder)}"></textarea>
      </div>
      <div class="field hp" aria-hidden="true"><label for="website">Leave this empty</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn-primary" type="submit">${esc(c.voice.formButton)}</button>
      <p class="note" id="form-note">${inl(c.site.formKey ? c.voice.formNote : c.voice.formNoteMailto)}</p>
    </form>
  </div>
</section>

${hasHearing ? `<section id="hearing">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(c.hearing.eyebrow)}</p>
        <h2>${inl(c.hearing.heading)}</h2>
      </div>
      <p>${inl(c.hearing.intro)}</p>
    </div>
    ${(c.hearing.dispatches || []).length ? `<div class="dispatches">
      <h3>${esc(c.hearing.dispatchesHeading || "Dispatches from the doorstep")}</h3>
      ${c.updates && c.updates.enabled ? `<p class="d-sub"><a href="#dispatches">Get these by email →</a></p>` : ""}
      ${c.hearing.dispatches.map((d, i) => { const id = dispatchId(d, c); return `<details class="dispatch"${i === 0 ? " open" : ""} id="${id}">
        <summary><span class="d-title">${inl(d.title)}</span><span class="d-date"><span class="d-num">No. ${esc(String(d.n || "").padStart(2, "0"))}</span> · ${esc(d.date)}</span>${d.summary ? `<span class="d-lede">${inl(d.summary)}</span>` : ""}</summary>
        <div class="prose dispatch-body">${blocks(d.body)}
        <p class="d-share"><button type="button" class="mini-link" data-copy="#${id}">Copy link to this dispatch</button> <span class="d-share-url">tyler4esquimalt.ca/#${id}</span></p></div>
      </details>`; }).join("\n      ")}
    </div>` : ""}
    <h3 class="board-head">${esc(c.hearing.cardsHeading || "By theme")}</h3>
    <div class="board">
      ${c.hearing.cards.map(k => `<div class="card${k.placeholder ? " empty" : ""}">
        <h3>${inl(k.title)}</h3>
        ${k.meta ? `<p class="meta">${inl(k.meta)}</p>` : ""}
        ${blocks(k.text)}
        ${k.tag && k.tag !== "none" ? `<p>${chip(k.tag, c)}</p>` : ""}
      </div>`).join("\n      ")}
    </div>
    <div class="legend">
      <span>${chip("advocate", c)}&nbsp; ${inl(c.hearing.tagAdvocateNote)}</span>
      <span>${chip("compiled", c)}&nbsp; ${inl(c.hearing.tagCompiledNote)}</span>
    </div>
  </div>
</section>` : ""}

${hasProposals ? `<section id="proposals">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(c.proposals.eyebrow)}</p>
        <h2>${inl(c.proposals.heading)}</h2>
      </div>
      <p>${inl(c.proposals.intro)}</p>
    </div>
    ${c.proposals.items.map((p, i) => { const id = proposalId(p, c); return `<article class="proposal" id="${id}">
      <div class="prose">
        <div class="proposal-id">
          <span class="num">${String(p.n || i + 1).padStart(2, "0")}</span>
          ${chip(p.tag, c)}
        </div>
        <h3><a class="self" href="#${id}">${inl(p.title)}</a></h3>
        <p class="sub">${inl(p.subtitle)}</p>
        ${p.sections.map(s => `<h4>${inl(s.heading)}</h4>\n        ${blocks(s.text)}`).join("\n        ")}
      </div>
      <aside class="glance" aria-label="Proposal at a glance">
        <h4>At a glance</h4>
        <dl>
          ${p.glance.map(g => `<div><dt>${inl(g.label)}</dt><dd>${inl(g.value)}</dd></div>`).join("\n          ")}
        </dl>
        ${p.cta ? `<p class="links"><a href="#voice">${esc(p.cta)}</a></p>` : ""}
        <p class="d-share"><button type="button" class="mini-link" data-copy="#${id}">Copy link to this proposal</button> <span class="d-share-url">tyler4esquimalt.ca/#${id}</span></p>
      </aside>
    </article>`; }).join("\n    ")}
  </div>
</section>` : ""}

<section id="about">
  <div class="wrap about">
    <div>
      <p class="eyebrow">${esc(c.about.eyebrow)}</p>
      <h2 class="about-h">${inl(c.about.heading)}</h2>
      <div class="prose">${blocks(c.about.body)}</div>
      ${c.about.facts.length ? `<ul class="facts">${c.about.facts.map(f => `<li>${inl(f)}</li>`).join("")}</ul>` : ""}
    </div>
    ${c.about.photo
      ? `<figure class="photo-figure"><img src="${esc(c.about.photo)}" alt="${esc(c.about.photoAlt)}">${c.about.photoCaption ? `<figcaption>${inl(c.about.photoCaption)}</figcaption>` : ""}</figure>`
      : `<div class="photo">${inl(c.about.photoPlaceholder)}</div>`}
  </div>
</section>

<section id="involved">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(c.involved.eyebrow)}</p>
        <h2>${inl(c.involved.heading)}</h2>
      </div>
      <p>${inl(c.involved.intro)}</p>
    </div>
    <div class="involve">
      ${c.involved.cards.map(k => `<div class="card">
        <h3>${inl(k.title)}</h3>
        <p>${inl(k.text)}</p>
        ${k.href ? `<a href="${esc(safeHref(k.href))}">${esc(k.linkLabel)}</a>` : `<a class="js-mail" data-subject="${esc(k.subject)}" href="mailto:${esc(c.site.email)}?subject=${esc(encodeURIComponent(k.subject))}">${esc(k.linkLabel)}</a>`}
      </div>`).join("\n      ")}
    </div>
  </div>
</section>

${c.donate && c.donate.enabled ? `<section id="donate">
  <div class="wrap donate">
    <div>
      <p class="eyebrow">${esc(c.donate.eyebrow)}</p>
      <h2 class="voice-h">${inl(c.donate.heading)}</h2>
      <div class="prose voice-intro">${blocks(c.donate.intro)}</div>
      <ul class="rules">${c.donate.rules.map(r => `<li><span>${inl(r)}</span></li>`).join("")}</ul>
      <div class="ways">
        ${c.donate.etransferEmail ? `<div class="way"><h4>Interac e‑Transfer</h4><p>Send to <code>${esc(c.donate.etransferEmail)}</code>${c.donate.etransferNote ? ". " + inl(c.donate.etransferNote) : ""}</p></div>` : ""}
        ${c.donate.payUrl ? `<div class="way"><h4>${esc(c.donate.payLabel || "Pay online")}</h4><p>${inl(c.donate.payNote || "")}</p><p style="margin-top:.6rem"><a class="btn btn-primary" href="${esc(safeHref(c.donate.payUrl))}" rel="noopener">${esc(c.donate.payButton || "Contribute online")}</a></p></div>` : ""}
        ${c.donate.chequeTo ? `<div class="way"><h4>Cheque</h4><p>Payable to <code>${esc(c.donate.chequeTo)}</code>${c.donate.chequeAddress ? ", mailed or dropped off at " + inl(c.donate.chequeAddress) : ""}.</p></div>` : ""}
      </div>
      <p class="fine">${inl(c.donate.fine)}</p>
    </div>
    <form class="form" id="donor-form" novalidate>
      <h3>${inl(c.donate.formHeading)}</h3>
      <p class="note">${inl(c.donate.formIntro)}</p>
      <div class="field"><label for="d-name">Full name</label><input id="d-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="d-address">Residential address <small>(street, city, postal code)</small></label><input id="d-address" name="address" type="text" autocomplete="street-address" required></div>
      <div class="field"><label for="d-mailing">Mailing address <small>(only if different)</small></label><input id="d-mailing" name="mailing" type="text"></div>
      <div class="two">
        <div class="field"><label for="d-email">Email</label><input id="d-email" name="email" type="email" autocomplete="email"></div>
        <div class="field"><label for="d-phone">Phone <small>(optional)</small></label><input id="d-phone" name="phone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="two">
        <div class="field"><label for="d-amount">Amount (CAD)</label><input id="d-amount" name="amount" type="text" inputmode="decimal" placeholder="e.g. 50" required></div>
        <div class="field"><label for="d-method">How you sent it</label><select id="d-method" name="method"><option>Interac e‑Transfer</option><option>Online payment</option><option>Cheque</option><option>Other</option></select></div>
      </div>
      <div class="attest">
        ${c.donate.attest.map((a, i) => `<label><input type="checkbox" name="attest${i}" required> <span>${inl(a)}</span></label>`).join("")}
      </div>
      <div class="field hp" aria-hidden="true"><label for="d-website">Leave this empty</label><input id="d-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn-primary" type="submit">${esc(c.donate.formButton)}</button>
      <p class="note" id="donor-note">${inl(c.donate.formNote)}</p>
    </form>
  </div>
</section>` : ""}

<div class="strip">
  <div class="wrap">
    <div>
      <h2>${inl(c.site.votingHeading)}</h2>
      <p>${inl(c.site.votingText)}</p>
    </div>
    <a class="btn btn-primary" href="#voice">${esc(c.site.votingButton)}</a>
  </div>
</div>

<footer>
  <div class="wrap">
    <p class="land">${inl(c.site.landAck)}</p>
    <p class="auth">Authorized by ${esc(c.site.agentName)}, financial agent, ${esc(c.site.agentContact)}.</p>
    <p>${esc(c.site.copyright)} · <a href="mailto:${esc(c.site.email)}?subject=${esc(encodeURIComponent("Hello from the website"))}">Email the campaign</a></p>
  </div>
</footer>`;
}

function renderDocument(c, inlineScript) {
  const json = JSON.stringify(c).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const script = inlineScript ? `<script id="app">\n${inlineScript}\n<\/script>` : `<script src="app.js"><\/script>`;
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.site.title)}</title>
<meta name="description" content="${esc(c.site.description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap">
<style>${CSS}</style>
</head>
<body>
<div id="site">${renderBody(c)}</div>
<script id="content" type="application/json">${json}<\/script>
${script}
</body>
</html>
`;
}

/* ---------------- council report ---------------- */
function renderReport(c) {
  const today = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const h = c.hearing, dispatches = (h.dispatches || []).slice().reverse(); // oldest first
  const mentions = (title) => dispatches.filter(d => (d.body + " " + d.summary).toLowerCase().includes(String(title).toLowerCase())).length;
  const tagLabel = (t) => t === "advocate" ? h.tagAdvocate : t === "compiled" ? h.tagCompiled : "";
  const advocate = h.cards.filter(k => k.tag === "advocate"), compiled = h.cards.filter(k => k.tag === "compiled"), other = h.cards.filter(k => !k.tag || k.tag === "none");
  const cardRow = (k) => `<tr><td><strong>${inl(k.title)}</strong>${k.meta ? `<br><small>${inl(k.meta)}</small>` : ""}</td><td>${blocks(k.text)}</td><td class="num">${mentions(k.title)}</td><td>${esc(tagLabel(k.tag))}</td></tr>`;
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(h.reportTitle || "Council report")}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap">
<style>
  :root { color-scheme: light; }
  body { margin: 0; background: #fff; color: #10282B; font-family: "Newsreader", Georgia, serif; font-size: 12pt; line-height: 1.5; }
  .page { max-width: 46rem; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
  h1, h2, h3, h4 { font-family: "Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif; line-height: 1.1; margin: 0; letter-spacing: -0.01em; }
  h1 { font-size: 2.4rem; font-weight: 800; }
  h2 { font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 .8rem; padding-top: 1rem; border-top: 2px solid #10282B; }
  h3 { font-size: 1.15rem; font-weight: 700; margin: 1.6rem 0 .4rem; }
  h4 { font-size: 1rem; font-weight: 700; margin: 1.2rem 0 .3rem; color: #0E4F5C; }
  p { margin: 0 0 .8em; }
  .kicker { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #C4522A; margin-bottom: .6rem; }
  .sub { font-size: 1.15rem; color: #4E6467; margin: .6rem 0 0; }
  .meta { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: .85rem; color: #4E6467; margin-top: 1.2rem; }
  .placeholder { border: 1px dashed #C4522A; padding: .8rem 1rem; color: #4E6467; font-style: italic; }
  table { width: 100%; border-collapse: collapse; font-size: .95rem; margin: .5rem 0 1rem; }
  th, td { text-align: left; vertical-align: top; padding: .55rem .6rem; border-bottom: 1px solid #CBD8D3; }
  th { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: #4E6467; }
  td p { margin: 0 0 .4em; } td p:last-child { margin: 0; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  small { color: #4E6467; }
  ul { margin: .3em 0 .8em; padding-left: 1.2em; }
  dl { margin: .5rem 0 0; display: grid; grid-template-columns: max-content 1fr; gap: .3rem 1rem; font-size: .95rem; }
  dt { font-family: "Bricolage Grotesque", Arial, sans-serif; font-weight: 700; color: #4E6467; }
  dd { margin: 0; }
  .dispatch { margin-top: 2rem; }
  .dispatch .date { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: .85rem; color: #4E6467; }
  footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #CBD8D3; font-size: .85rem; color: #4E6467; }
  @media print { .page { padding: 0; max-width: none; } h2 { break-after: avoid; } .dispatch, tr { break-inside: avoid; } a { color: inherit; text-decoration: none; } }
</style>
</head>
<body>
<div class="page">
  <p class="kicker">Township of Esquimalt · 2026</p>
  <h1>${inl(h.reportTitle || "What Esquimalt is telling me")}</h1>
  <p class="sub">${inl(h.reportSubtitle || "")}</p>
  <p class="meta">Prepared by Tyler Russell · ${esc(c.site.email)} · Compiled ${esc(today)} from ${dispatches.length} dispatch${dispatches.length === 1 ? "" : "es"} and ${h.cards.length} theme${h.cards.length === 1 ? "" : "s"} published at tyler4esquimalt.ca</p>

  <h2>Summary</h2>
  ${h.reportSummary ? blocks(h.reportSummary) : `<p class="placeholder">No summary written yet. In the site editor, open "Council report" and write two or three paragraphs: what residents raised most, what surprised you, and what you are asking council to do.</p>`}

  <h2>What residents raised</h2>
  <p>Each theme below was raised at the door and recorded on the campaign site. "Dispatches" counts how many of the published write‑ups mention the theme. Nothing is attributed to a resident by name.</p>
  <table>
    <thead><tr><th>Theme</th><th>What was said</th><th>Dispatches</th><th>Status</th></tr></thead>
    <tbody>${[...advocate, ...compiled, ...other].map(cardRow).join("")}</tbody>
  </table>
  <p><small><strong>${esc(h.tagAdvocate)}</strong>: ${inl(h.tagAdvocateNote)}. <strong>${esc(h.tagCompiled)}</strong>: ${inl(h.tagCompiledNote)}.</small></p>

  ${c.proposals.items.length ? `<h2>Proposals for council's consideration</h2>
  ${c.proposals.items.map((p, i) => `<h3>${String(i + 1).padStart(2, "0")} · ${inl(p.title)}</h3>
  <p><em>${inl(p.subtitle)}</em>${tagLabel(p.tag) ? ` <small>· ${esc(tagLabel(p.tag))}</small>` : ""}</p>
  ${p.sections.map(sct => `<h4>${inl(sct.heading)}</h4>${blocks(sct.text)}`).join("")}
  ${p.glance.length ? `<dl>${p.glance.map(g => `<dt>${inl(g.label)}</dt><dd>${inl(g.value)}</dd>`).join("")}</dl>` : ""}`).join("")}` : ""}

  <h2>Appendix: the dispatches in full</h2>
  ${dispatches.length ? dispatches.map(d => `<div class="dispatch"><h3>${inl(d.title)}</h3><p class="date">${esc(d.date)}</p>${d.summary ? `<p><em>${inl(d.summary)}</em></p>` : ""}${blocks(d.body)}</div>`).join("") : `<p class="placeholder">No dispatches published yet.</p>`}

  <footer>
    <p>${esc(c.site.landAck)}</p>
    <p>Authorized by ${esc(c.site.agentName)}, financial agent, ${esc(c.site.agentContact)}. Generated from the campaign site on ${esc(today)}.</p>
  </footer>
</div>
</body>
</html>
`;
}

/* ---------------- editor ---------------- */
const T = (p, l, t, extra) => Object.assign({ p, l, t: t || "text" }, extra || {});
const SCHEMA = [
  { key: "site", title: "Sign, nav and footer", fields: [
    T("site.brand", "Name in the top bar", "text", { hint: "Use *asterisks* to colour a word, like Tyler *4* Esquimalt." }),
    T("site.signEyebrow", "Small line above the name"),
    T("site.signName", "Name on the sign", "textarea", { hint: "Press Enter to break the name across lines." }),
    T("site.signOffice", "Running for"),
    T("site.stickerTop", "Sticker, top line"), T("site.stickerBig", "Sticker, big line"), T("site.stickerBottom", "Sticker, bottom line"),
    T("site.email", "Campaign email address", "text", { hint: "Every email link uses this, and the concern form falls back to it." }),
    T("site.repo", "GitHub repository that hosts the live site (owner/name)", "text", { hint: "Lets the editor at tyler4esquimalt.ca/#editor publish, using a GitHub token you keep in your browser." }),
    T("site.formKey", "Form delivery key (Web3Forms access key)", "text", { hint: "With a key, the concern form sends straight from the page and emails you each submission. Leave blank to fall back to the visitor's email app." }),
    T("site.votingHeading", "Election strip heading", "textarea"),
    T("site.votingText", "Election strip text", "textarea"),
    T("site.votingButton", "Election strip button"),
    T("site.landAck", "Land acknowledgement", "textarea"),
    T("site.agentName", "Financial agent name"), T("site.agentContact", "Financial agent phone or email"),
    T("site.copyright", "Copyright line"),
    T("site.title", "Browser tab title"), T("site.description", "Search engine description", "textarea"),
  ]},
  { key: "hero", title: "Opening statement", fields: [
    T("hero.thesis", "Big line", "textarea", { hint: "*Asterisks* colour a word orange." }),
    T("hero.lead", "Lead paragraph", "textarea"),
    T("hero.primaryButton", "Orange button"), T("hero.secondaryButton", "Outline button"),
  ]},
  { key: "updates", title: "Dispatch invitation and mailing list", fields: [
    T("updates.enabled", "Show this band under the hero", "check"),
    T("updates.eyebrow", "Small heading"), T("updates.heading", "Heading", "textarea"), T("updates.intro", "Intro", "textarea"),
    T("updates.count", "How many recent dispatches to list", "text", { hint: "The newest dispatches appear automatically. Three reads well." }),
    T("updates.allLabel", "Link to all dispatches"),
    T("updates.signupHeading", "Signup heading"), T("updates.signupIntro", "Signup intro", "textarea"),
    T("updates.button", "Signup button"),
    T("updates.consent", "Consent line under the button", "textarea", { hint: "Canada's anti-spam law requires clear consent and a way to unsubscribe. Keep both in this line." }),
  ]},
  { key: "letter", title: "Letter to neighbours", fields: [
    T("letter.eyebrow", "Small heading"), T("letter.salutation", "Salutation"),
    T("letter.body", "Letter", "textarea", { tall: true, hint: "Leave a blank line between paragraphs." }),
    T("letter.signName", "Signed"), T("letter.signTagline", "Line under the signature"),
  ]},
  { key: "platform", title: "Platform", fields: [
    T("platform.eyebrow", "Small heading"), T("platform.heading", "Heading"), T("platform.intro", "Intro", "textarea"),
    T("platform.items", "Platform items", "list", { itemLabel: (it) => it.title || "Untitled", blank: { title: "", text: "", green: false, linkLabel: "", linkTo: "" }, fields: [
      T("title", "Title"), T("text", "Text", "textarea"),
      T("green", "Show the number in green (climate item)", "check"),
      T("linkLabel", "Link text (optional)"), T("linkTo", "Link target", "text", { hint: "For example #proposal-1, or a full https:// address." }),
    ]}),
  ]},
  { key: "voice", title: "Your voice", fields: [
    T("voice.eyebrow", "Small heading"), T("voice.heading", "Heading", "textarea"), T("voice.intro", "Intro", "textarea"),
    T("voice.steps", "Steps, one per line", "lines"),
    T("voice.formHeading", "Form heading"),
    T("voice.neighbourhoods", "Neighbourhood choices, one per line", "lines"),
    T("voice.concernPlaceholder", "Concern box hint"), T("voice.visionPlaceholder", "Vision box hint"),
    T("voice.formButton", "Form button"), T("voice.formNote", "Note under the button (when form delivery is set up)", "textarea"),
    T("voice.formNoteMailto", "Note under the button (email-app fallback)", "textarea"),
  ]},
  { key: "hearing", title: "What I'm hearing", fields: [
    T("hearing.eyebrow", "Small heading"), T("hearing.heading", "Heading"), T("hearing.intro", "Intro", "textarea"),
    T("hearing.cards", "Cards", "list", { itemLabel: (it) => it.title || "Untitled card", blank: { title: "", meta: "", text: "", tag: "none", placeholder: false }, fields: [
      T("title", "Title"), T("meta", "Small line (e.g. 14 doors · Sept 20)"), T("text", "Text", "textarea"),
      T("tag", "Tag", "select", { options: [["none", "No tag"], ["advocate", "I'll advocate for this"], ["compiled", "Compiled for council"]] }),
      T("placeholder", "Show as a dashed placeholder", "check"),
    ], hint: "Delete every card to hide the whole section." }),
    T("hearing.dispatchesHeading", "Dispatches heading"),
    T("hearing.cardsHeading", "Heading above the theme tiles"),
    T("hearing.dispatches", "Dispatches (full write-ups)", "list", { itemLabel: (d) => ("No. " + String(d.n || "?").padStart(2, "0") + " · " + (d.title || "Untitled dispatch")), blank: () => ({ n: Math.max(0, ...state.hearing.dispatches.map(x => x.n || 0)) + 1, title: "", date: "", summary: "", body: "" }), fields: [
      T("n", "Number (permanent; it makes the shareable link, e.g. #dispatch-03)", "text"), T("title", "Title"), T("date", "Date line"), T("summary", "One-line lede", "textarea"),
      T("body", "Full text", "textarea", { tall: true, hint: "Blank line between paragraphs. Start a line with \"## \" for a subheading, \"- \" for a bullet, and write links as [label](https://...)." }),
    ], hint: "The newest dispatch should be first; it opens expanded, older ones stay collapsed." }),
    T("hearing.tagAdvocate", "Orange tag text"), T("hearing.tagAdvocateNote", "Orange tag meaning"),
    T("hearing.tagCompiled", "Grey tag text"), T("hearing.tagCompiledNote", "Grey tag meaning"),
  ]},
  { key: "proposals", title: "Proposals", fields: [
    T("proposals.eyebrow", "Small heading"), T("proposals.heading", "Heading"), T("proposals.intro", "Intro", "textarea"),
    T("proposals.items", "Proposals", "list", { itemLabel: (it) => "No. " + String(it.n || "?").padStart(2, "0") + " · " + (it.title || "Untitled"),
      blank: () => ({ n: Math.max(0, ...state.proposals.items.map(x => x.n || 0)) + 1, title: "", subtitle: "", tag: "advocate", sections: [{ heading: "The problem", text: "" }, { heading: "The proposal", text: "" }], glance: [], cta: "Tell me what you think of this →" }),
      fields: [
        T("n", "Number (permanent; it makes the shareable link, e.g. #proposal-02)", "text"), T("title", "Title"), T("subtitle", "One-line summary", "textarea"),
        T("tag", "Tag", "select", { options: [["advocate", "I'll advocate for this"], ["compiled", "Compiled for council"], ["none", "No tag"]] }),
        T("sections", "Sections", "list", { itemLabel: (s) => s.heading || "Untitled section", blank: { heading: "", text: "" }, fields: [
          T("heading", "Heading"), T("text", "Text", "textarea", { tall: true, hint: "Blank line between paragraphs. Start lines with \"- \" for a bullet list." }),
        ]}),
        T("glance", "At-a-glance rows", "list", { itemLabel: (g) => g.label || "Row", blank: { label: "", value: "" }, fields: [
          T("label", "Label"), T("value", "Value", "textarea"),
        ]}),
        T("cta", "Link at the bottom of the panel"),
      ], hint: "Each proposal keeps its number for life, so links never break. Delete all of them to hide the section." }),
  ]},
  { key: "report", title: "Council report", fields: [
    T("hearing.reportTitle", "Report title"),
    T("hearing.reportSubtitle", "Report subtitle", "textarea"),
    T("hearing.reportSummary", "Executive summary", "textarea", { tall: true, hint: "Two or three paragraphs in your words. The rest of the report (themes, proposals, dispatches) is assembled automatically from the site. Use the \"Compile council report\" button below to produce it." }),
  ]},
  { key: "donate", title: "Donate", fields: [
    T("donate.enabled", "Show the donate section", "check"),
    T("donate.eyebrow", "Small heading"), T("donate.heading", "Heading", "textarea"), T("donate.intro", "Intro", "textarea"),
    T("donate.rules", "Eligibility rules, one per line", "lines", { hint: "These come from the Local Elections Campaign Financing Act. Check with Elections BC before changing them." }),
    T("donate.etransferEmail", "e‑Transfer email (blank to hide)"), T("donate.etransferNote", "e‑Transfer note"),
    T("donate.payUrl", "Online payment link (blank to hide)", "text", { hint: "A payment page you set up, e.g. a Stripe or Square payment link. Must collect the contributor's name." }),
    T("donate.payLabel", "Online payment heading"), T("donate.payNote", "Online payment note", "textarea"), T("donate.payButton", "Online payment button"),
    T("donate.chequeTo", "Cheques payable to (blank to hide)"), T("donate.chequeAddress", "Cheque mailing address"),
    T("donate.fine", "Fine print", "textarea"),
    T("donate.formHeading", "Form heading"), T("donate.formIntro", "Form intro", "textarea"),
    T("donate.attest", "Declarations the contributor must tick, one per line", "lines"),
    T("donate.formButton", "Form button"), T("donate.formNote", "Note under the button", "textarea"),
  ]},
  { key: "about", title: "About Tyler", fields: [
    T("about.eyebrow", "Small heading"), T("about.heading", "Heading", "textarea"), T("about.body", "Bio", "textarea", { tall: true }),
    T("about.facts", "Quick facts, one per line", "lines"),
    T("about.photo", "Photo", "photo"), T("about.photoAlt", "Photo description for screen readers"), T("about.photoCaption", "Caption (optional)"),
    T("about.photoPlaceholder", "Text shown while there is no photo", "textarea"),
  ]},
  { key: "involved", title: "Get involved", fields: [
    T("involved.eyebrow", "Small heading"), T("involved.heading", "Heading"), T("involved.intro", "Intro", "textarea"),
    T("involved.cards", "Cards", "list", { itemLabel: (it) => it.title || "Untitled", blank: { title: "", text: "", linkLabel: "", subject: "", href: "" }, fields: [
      T("title", "Title"), T("text", "Text", "textarea"), T("linkLabel", "Link text"), T("subject", "Email subject line (for an email link)"), T("href", "Or link to a page section instead (e.g. #donate)"),
    ]}),
  ]},
];

const getP = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
function setP(o, path, v) { const ks = path.split("."); const last = ks.pop(); const t = ks.reduce((a, k) => a[k], o); t[last] = v; }
const joinP = (a, b) => a ? a + "." + b : b;

function fieldHTML(f, base, value) {
  const path = joinP(base, f.p);
  const id = "ed-" + path.replace(/[^a-z0-9]/gi, "-");
  const hint = f.hint ? `<span class="hint">${esc(f.hint)}</span>` : "";
  switch (f.t) {
    case "textarea":
      return `<div class="f"><label for="${id}">${esc(f.l)}</label><textarea id="${id}" data-path="${esc(path)}" class="${f.tall ? "tall" : ""}">${esc(value)}</textarea>${hint}</div>`;
    case "lines":
      return `<div class="f"><label for="${id}">${esc(f.l)}</label><textarea id="${id}" data-path="${esc(path)}" data-kind="lines">${esc((value || []).join("\n"))}</textarea>${hint}</div>`;
    case "check":
      return `<label class="check"><input type="checkbox" data-path="${esc(path)}" data-kind="check"${value ? " checked" : ""}> ${esc(f.l)}</label>`;
    case "select":
      return `<div class="f"><label for="${id}">${esc(f.l)}</label><select id="${id}" data-path="${esc(path)}">${f.options.map(([v, l]) => `<option value="${esc(v)}"${v === value ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`;
    case "photo":
      return `<div class="f"><label>${esc(f.l)}</label>
        ${value ? `<img class="photo-preview" src="${esc(value)}" alt=""><div class="row"><button type="button" class="mini danger" data-action="clear-photo" data-path="${esc(path)}">Remove photo</button><span class="hint">${Math.round(value.length * 0.75 / 1024)} KB</span></div>` : ""}
        <input type="file" accept="image/*" data-path="${esc(path)}" data-kind="photo">
        <span class="hint">Any photo works. It is resized to 1400px on its longest side and stored inside the page.</span></div>`;
    case "list":
      return `<div class="f"><label>${esc(f.l)}</label>${hint}
        <div class="nested" data-list="${esc(path)}">
          ${(value || []).map((it, i) => `<div class="item">
            <div class="bar"><b>${esc(f.itemLabel ? f.itemLabel(it, i) : "Item " + (i + 1))}</b>
              <span class="tools">
                <button type="button" class="mini" data-action="move" data-dir="-1" data-path="${esc(path)}" data-index="${i}" title="Move up">↑</button>
                <button type="button" class="mini" data-action="move" data-dir="1" data-path="${esc(path)}" data-index="${i}" title="Move down">↓</button>
                <button type="button" class="mini danger" data-action="remove" data-path="${esc(path)}" data-index="${i}">Delete</button>
              </span></div>
            ${f.fields.map(sf => fieldHTML(sf, path + "." + i, getP(it, sf.p))).join("")}
          </div>`).join("")}
          <button type="button" class="mini add" data-action="add" data-path="${esc(path)}">+ Add</button>
        </div></div>`;
    default:
      return `<div class="f"><label for="${id}">${esc(f.l)}</label><input type="text" id="${id}" data-path="${esc(path)}" value="${esc(value)}">${hint}</div>`;
  }
}

// Look up the schema field for a list path like "proposals.items.0.sections".
function listSpec(path) {
  const ks = path.split(".");
  let fields = SCHEMA.flatMap(s => s.fields), base = "";
  let spec = null;
  for (let i = 0; i < ks.length; i++) {
    const want = joinP(base, ks[i]);
    spec = fields.find(f => joinP(base, f.p) === want || joinP(base, f.p) === want.replace(/\.\d+$/, ""));
    if (!spec) { // path segments may span dotted field names like "site.brand"
      const rest = ks.slice(i).join(".");
      spec = fields.find(f => rest.startsWith(f.p));
      if (!spec) return null;
      i += spec.p.split(".").length - 1;
    }
    if (spec.t === "list" && i + 1 < ks.length) { i += 1; base = joinP(base, spec.p) + "." + ks[i]; fields = spec.fields; }
  }
  return spec;
}

const Editor = {
  el: null, open: false, dirty: false, artifact: null, downloads: null, readOnly: false, openKeys: new Set(["hearing"]),
  github: null, TOKEN: "t4e-publish-token",
  token() { try { return localStorage.getItem(this.TOKEN) || ""; } catch (e) { return ""; } },
  refreshTokenBox() {
    if (!this.el) return;
    const box = this.el.querySelector("#token-box");
    box.hidden = !this.github; box.style.display = this.github ? "" : "none";
    if (this.github) {
      const has = !!this.token();
      box.querySelector("h3").textContent = has ? "Publishing token saved on this browser" : "Publishing token needed";
      box.querySelector("input").hidden = has; box.querySelector('[data-action="token-save"]').hidden = has; box.querySelector('[data-action="token-forget"]').hidden = !has;
      this.diag = "Publishing to " + this.github.owner + "/" + this.github.repo + (has ? " · token saved" : " · no token yet");
      const d = this.el.querySelector("#editor-diag"); if (d) d.textContent = this.diag;
    }
  },
  DRAFT: "t4e-draft",

  mount() {
    if (this.el) return;
    const style = document.createElement("style"); style.id = "editor-css"; style.textContent = EDITOR_CSS; document.head.appendChild(style);
    const el = document.createElement("aside"); el.id = "editor"; el.setAttribute("aria-label", "Content editor");
    el.innerHTML = `<div class="grip" title="Drag to resize"></div>
      <header><h2>Edit the site</h2><span class="tools"><button type="button" class="x" data-action="width" title="Cycle panel width">Width</button><button type="button" class="x" data-action="close">Close</button></span></header>
      <div class="body"></div>
      <footer>
        <div class="row"><button type="button" class="btn btn-primary" data-action="publish">Publish changes</button>
        <button type="button" class="btn btn-ghost" data-action="download">Download site file</button>
        <button type="button" class="btn btn-ghost" data-action="report">Compile council report</button></div>
        <div class="status" id="editor-status"></div>
        <div class="hint" id="editor-diag"></div>
        <div class="token" id="token-box" hidden>
          <h3>Publishing token</h3>
          <span class="hint">Paste the GitHub token that allows publishing to this site. It stays in this browser only. Anyone without a token can look at this panel but cannot publish.</span>
          <input type="password" id="token-input" placeholder="github_pat_…" autocomplete="off" spellcheck="false">
          <div class="row"><button type="button" class="mini" data-action="token-save">Save token</button><button type="button" class="mini danger" data-action="token-forget">Forget token on this browser</button></div>
        </div>
        <span class="hint">Publishing replaces the live page for everyone. Changes preview on the left as you type.</span>
      </footer>`;
    document.body.appendChild(el); this.el = el;
    el.addEventListener("input", (e) => this.onInput(e));
    el.addEventListener("change", (e) => this.onChange(e));
    el.addEventListener("click", (e) => this.onClick(e));
    this.setWidth(this.loadWidth(), false);
    const grip = el.querySelector(".grip");
    grip.addEventListener("pointerdown", (e) => {
      e.preventDefault(); grip.setPointerCapture(e.pointerId); el.classList.add("resizing");
      const move = (ev) => this.setWidth(root.innerWidth - ev.clientX, false);
      const up = () => { grip.removeEventListener("pointermove", move); grip.removeEventListener("pointerup", up); el.classList.remove("resizing"); this.setWidth(this.width, true); };
      grip.addEventListener("pointermove", move); grip.addEventListener("pointerup", up);
    });
    el.addEventListener("toggle", (e) => { const d = e.target; if (d.dataset.key) { d.open ? this.openKeys.add(d.dataset.key) : this.openKeys.delete(d.dataset.key); } }, true);
    root.addEventListener("beforeunload", (e) => { if (this.dirty) { e.preventDefault(); e.returnValue = ""; } });
    this.renderFields();
  },
  width: 600,
  loadWidth() { try { const w = parseInt(localStorage.getItem("t4e-editor-w"), 10); if (w) return w; } catch (e) {} return 600; },
  setWidth(w, save) {
    const max = Math.max(360, Math.min(root.innerWidth * 0.9, 1200));
    this.width = Math.round(Math.min(max, Math.max(360, w)));
    document.documentElement.style.setProperty("--editor-w", this.width + "px");
    if (save) { try { localStorage.setItem("t4e-editor-w", String(this.width)); } catch (e) {} }
  },
  cycleWidth() { const steps = [440, 600, 800, 1000]; const next = steps.find(x => x > this.width + 20) || steps[0]; this.setWidth(next, true); },
  renderFields() {
    const body = this.el.querySelector(".body");
    body.innerHTML = SCHEMA.map(s => `<details data-key="${s.key}"${this.openKeys.has(s.key) ? " open" : ""}><summary>${esc(s.title)}</summary>
      <div class="fields">${s.fields.map(f => fieldHTML(f, "", getP(state, f.p))).join("")}</div></details>`).join("");
  },
  show() {
    this.mount(); this.open = true; document.documentElement.classList.add("editing"); this.el.hidden = false; this.refreshTokenBox();
    try {
      const raw = sessionStorage.getItem(this.DRAFT);
      if (raw && raw !== JSON.stringify(state) && confirm("You have an unpublished draft from earlier. Restore it?")) {
        state = JSON.parse(raw); this.dirty = true; this.renderFields(); renderSite();
      }
    } catch (e) { /* storage unavailable */ }
    if (this.readOnly) this.status("This view is read-only, so changes here cannot be published.", true);
    this.el.querySelector("#editor-diag").textContent = this.diag;
  },
  diag: "",
  hide() { if (this.dirty && !confirm("Close the editor? Your unpublished changes stay in this tab until you reload.")) return;
    this.open = false; document.documentElement.classList.remove("editing"); this.el.hidden = true; if (location.hash === "#editor") history.replaceState(null, "", location.pathname + location.search); },
  status(msg, err) { const s = this.el.querySelector("#editor-status"); s.textContent = msg; s.classList.toggle("err", !!err); },
  touched() { this.dirty = true; try { sessionStorage.setItem(this.DRAFT, JSON.stringify(state)); } catch (e) {} scheduleRender(); },

  onInput(e) {
    const t = e.target, path = t.dataset.path; if (!path || t.type === "file" || t.type === "checkbox" || t.tagName === "SELECT") return;
    setP(state, path, t.dataset.kind === "lines" ? lines(t.value) : (/\.n$/.test(path) && /^\d+$/.test(t.value.trim()) ? Number(t.value) : t.value));
    this.touched();
  },
  onChange(e) {
    const t = e.target, path = t.dataset.path; if (!path) return;
    if (t.dataset.kind === "check") { setP(state, path, t.checked); this.touched(); }
    else if (t.tagName === "SELECT") { setP(state, path, t.value); this.touched(); }
    else if (t.dataset.kind === "photo" && t.files && t.files[0]) {
      this.status("Preparing photo…");
      resizeImage(t.files[0], 1400, 0.82).then(dataUrl => { setP(state, path, dataUrl); this.touched(); this.renderFields(); this.status("Photo added. Publish to make it live."); })
        .catch(() => this.status("That file could not be read as an image.", true));
    }
  },
  onClick(e) {
    const b = e.target.closest("[data-action]"); if (!b) return;
    const a = b.dataset.action, path = b.dataset.path;
    if (a === "close") return this.hide();
    if (a === "width") return this.cycleWidth();
    if (a === "token-save") { const v = this.el.querySelector("#token-input").value.trim(); if (!v) return this.status("Paste a token first.", true); try { localStorage.setItem(this.TOKEN, v); } catch (e) {} this.el.querySelector("#token-input").value = ""; this.refreshTokenBox(); return this.status("Token saved. You can publish now."); }
    if (a === "token-forget") { try { localStorage.removeItem(this.TOKEN); } catch (e) {} this.refreshTokenBox(); return this.status("Token forgotten on this browser."); }
    if (a === "publish") return this.publish();
    if (a === "download") return this.download();
    if (a === "report") return this.report();
    if (a === "clear-photo") { setP(state, path, ""); this.touched(); this.renderFields(); return; }
    const arr = getP(state, path); const i = Number(b.dataset.index);
    if (a === "add") { const spec = listSpec(path); const b = spec && spec.blank; arr.push(typeof b === "function" ? b() : JSON.parse(JSON.stringify(b || {}))); }
    else if (a === "remove") { if (!confirm("Delete this item?")) return; arr.splice(i, 1); }
    else if (a === "move") { const j = i + Number(b.dataset.dir); if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    this.touched(); this.renderFields();
  },

  async publishToGitHub() {
    const g = this.github, tok = this.token();
    if (!tok) return this.status("Add your publishing token below first.", true);
    const btn = this.el.querySelector('[data-action="publish"]'); btn.disabled = true; this.status("Publishing to the live site…");
    try { sessionStorage.setItem(this.DRAFT, JSON.stringify(state)); } catch (e) {}
    const api = "https://api.github.com/repos/" + g.owner + "/" + g.repo + "/contents/";
    const headers = { "Authorization": "Bearer " + tok, "Accept": "application/vnd.github+json", "Content-Type": "application/json" };
    const b64 = (str) => { const bytes = new TextEncoder().encode(str); let bin = ""; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(bin); };
    const put = async (path, content, message) => {
      const cur = await fetch(api + path + "?ref=" + g.branch, { headers, cache: "no-store" });
      let sha; if (cur.status === 200) sha = (await cur.json()).sha; else if (cur.status !== 404) throw { status: cur.status };
      const r = await fetch(api + path, { method: "PUT", headers, body: JSON.stringify({ message, content: b64(content), branch: g.branch, sha }) });
      if (!r.ok) throw { status: r.status, body: await r.json().catch(() => ({})) };
    };
    try {
      const src = await ownSource(); if (!src) throw { code: "no_source" };
      const stamp = new Date().toLocaleString("en-CA");
      await put("index.html", renderDocument(state, src), "Site update from the editor: " + stamp);
      await put("content.json", JSON.stringify(state, null, 2) + "\n", "Content update from the editor: " + stamp);
      this.dirty = false; try { sessionStorage.removeItem(this.DRAFT); } catch (e) {}
      this.status("Published. The live site updates within a minute or two; reload to see it.");
    } catch (err) {
      const st = err && err.status;
      if (st === 401) this.status("GitHub rejected the token. It may have expired; paste a new one below.", true);
      else if (st === 403 || st === 404) this.status("The token does not have permission to write to this site's repository.", true);
      else if (st === 409 || st === 422) this.status("Someone else published first. Reload the page, then redo your change.", true);
      else if (err && err.code === "no_source") this.status("The page could not find its own script, so it cannot republish itself.", true);
      else this.status("Publishing failed (" + (st || (err && err.message) || "network") + "). Try again in a moment.", true);
    }
    btn.disabled = false;
  },
  async publish() {
    if (this.github) return this.publishToGitHub();
    if (!this.artifact) return this.status("Publishing is not available in this view.", true);
    const btn = this.el.querySelector('[data-action="publish"]'); btn.disabled = true; this.status("Publishing…");
    try { sessionStorage.setItem(this.DRAFT, JSON.stringify(state)); } catch (e) {}
    try {
      const src = await ownSource();
      if (!src) throw { code: "no_source" };
      await this.artifact.publish(renderDocument(state, src));
      this.dirty = false; try { sessionStorage.removeItem(this.DRAFT); } catch (e) {}
      this.status("Published. The page is reloading with your changes.");
    } catch (err) {
      const code = err && err.code;
      if (code === "conflict") this.status("Someone published a newer version first. The page is reloading to it; your draft is kept in this tab.", true);
      else if (code === "not_writer" || code === "not_granted" || code === "consent_required") { this.readOnly = true; this.status("This view is read-only, so changes cannot be published.", true); }
      else if (code === "too_large") this.status("The page is too large to publish. Try a smaller photo.", true);
      else if (code === "rate_limited") this.status("Publishing too often. Wait a moment and try again.", true);
      else if (code === "no_source") this.status("The page could not find its own script, so it cannot republish itself.", true);
      else this.status("Publishing failed (" + (code || "unknown") + "). Try again in a moment.", true);
      btn.disabled = false;
    }
  },
  async report() {
    this.status("Compiling the report…");
    const html = renderReport(state);
    await this.saveFile("esquimalt-council-report.html", html, "Saved the council report. Open it in Safari and use File → Print → Save as PDF to share it.");
  },
  async saveFile(filename, data, okMsg) {
    if (this.downloads) {
      try { await this.downloads.save({ filename, data }); this.status(okMsg); }
      catch (err) { this.status(err && err.code === "cancelled" ? "Download cancelled." : "Download is not available here.", true); }
    } else {
      try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], { type: "text/html" })); a.download = filename; a.click(); this.status(okMsg); }
      catch (e) { this.status("Download is not available here.", true); }
    }
  },
  async download() {
    this.status("Preparing the file…");
    const src = await ownSource();
    const html = renderDocument(state, src);
    await this.saveFile("index.html", html, src ? "Saved index.html. It is a single file; upload it to your web host as-is." : "Saved index.html. Upload it together with app.js from your project folder.");
  },
};

async function ownSource() {
  const el = document.getElementById("app");
  if (el && el.textContent.trim()) return el.textContent;
  try { const r = await fetch("app.js"); if (r.ok) return await r.text(); } catch (e) {}
  return null;
}

function resizeImage(file, max, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement("canvas"); cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url); resolve(cv.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}

/* ---------------- boot ---------------- */
let state = null, renderTimer = null;
function scheduleRender() { clearTimeout(renderTimer); renderTimer = setTimeout(renderSite, 120); }
function renderSite() {
  document.getElementById("site").innerHTML = renderBody(state);
  document.title = state.site.title;
  wireSite();
}
function wireSite() {
  const openTarget = () => {
    const m = /^#(dispatch-\d+|proposal-\d+)$/.exec(location.hash); if (!m) return;
    const el = document.getElementById(m[1]); if (!el) return;
    if (el.tagName === "DETAILS") el.open = true;
    el.scrollIntoView({ block: "start", behavior: "instant" });
  };
  if (!wireSite.hashBound) { root.addEventListener("hashchange", openTarget); wireSite.hashBound = true; }
  openTarget();
  // While reading the proposals, the address bar follows the proposal on screen.
  if (!wireSite.spyBound) {
    wireSite.spyBound = true; let ticking = false;
    root.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      setTimeout(() => {
        ticking = false;
        const sec = document.getElementById("proposals"); if (!sec) return;
        const line = 140, sr = sec.getBoundingClientRect();
        if (sr.top > line || sr.bottom < line) { // not reading the proposals section: let go of a stale proposal link
          if (/^#proposal/.test(location.hash)) {
            let here = "";
            document.querySelectorAll("section[id], header[id]").forEach(x => { const r = x.getBoundingClientRect(); if (r.top <= line && r.bottom > line) here = x.id; });
            history.replaceState(null, "", here ? "#" + here : location.pathname + location.search);
          }
          return;
        }
        let current = "proposals";
        sec.querySelectorAll("article.proposal").forEach(a => { const r = a.getBoundingClientRect(); if (r.top <= line && r.bottom > line) current = a.id; });
        if (location.hash !== "#" + current) history.replaceState(null, "", "#" + current);
      }, 120);
    }, { passive: true });
  }
  // Opening a dispatch puts its permanent link in the address bar; closing it steps back to #hearing.
  // Browsers fire "toggle" for a dispatch that is already open when the page renders; only react to real clicks.
  const armedAt = Date.now() + 600;
  document.querySelectorAll("details.dispatch").forEach(d => d.addEventListener("toggle", () => {
    if (Date.now() < armedAt) return;
    if (d.open) history.replaceState(null, "", "#" + d.id);
    else if (location.hash === "#" + d.id) history.replaceState(null, "", "#hearing");
  }));
  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    const url = location.origin + location.pathname + b.dataset.copy;
    const label = b.textContent;
    try { await navigator.clipboard.writeText(url); b.textContent = "Link copied"; } catch (e) { prompt("Copy this link:", url); }
    history.replaceState(null, "", b.dataset.copy);
    setTimeout(() => { b.textContent = label; }, 2000);
  }));
  const signup = document.getElementById("signup-form");
  if (signup) signup.addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target;
    if (f.website && f.website.value) return;
    const note = f.querySelector("#signup-note"), email = f.email.value.trim(), name = f.name.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { f.email.focus(); note.textContent = "Please enter a valid email address."; return; }
    const mailto = () => { root.location.href = "mailto:" + state.site.email + "?subject=" + encodeURIComponent("Please add me to the dispatch list") + "&body=" + encodeURIComponent("Email: " + email + "\nName: " + (name || "(not given)")); };
    if (!state.site.formKey || !root.fetch) return mailto();
    const btn = f.querySelector("button[type=submit]"); btn.disabled = true; note.textContent = "Signing you up…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ access_key: state.site.formKey, subject: "Mailing list signup: " + email, from_name: "Tyler4Esquimalt website", email, name: name || "(not given)", consent: "Signed up on the website to receive campaign updates by email", date: new Date().toISOString().slice(0, 10), botcheck: "" }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error("send failed");
      f.innerHTML = '<div class="thanks">You\'re on the list.<small>Each dispatch will arrive by email as it goes up. Reply to any of them to unsubscribe.</small></div>';
    } catch (err) { btn.disabled = false; note.textContent = "That didn\'t go through. Opening your email app instead…"; setTimeout(mailto, 800); }
  });

  const donor = document.getElementById("donor-form");
  if (donor) donor.addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target;
    if (f.website && f.website.value) return;
    const missing = [...f.querySelectorAll("[required]")].filter(el => el.type === "checkbox" ? !el.checked : !el.value.trim());
    if (missing.length) { missing[0].focus(); f.querySelector("#donor-note").textContent = "Please fill in every required field and tick each declaration."; return; }
    const fields = { name: f.name.value.trim(), address: f.address.value.trim(), mailing: f.mailing.value.trim() || "(same as residential)", email: f.email.value.trim() || "(not given)", phone: f.phone.value.trim() || "(not given)", amount: f.amount.value.trim(), method: f.method.value, declarations: "All " + f.querySelectorAll('.attest input').length + " declarations confirmed", date: new Date().toISOString().slice(0, 10) };
    const body = Object.entries(fields).map(([k, v]) => k + ": " + v).join("\n");
    const mailto = () => { root.location.href = "mailto:" + state.site.email + "?subject=" + encodeURIComponent("Contribution record: " + fields.name) + "&body=" + encodeURIComponent(body); };
    if (!state.site.formKey || !root.fetch) return mailto();
    const btn = f.querySelector("button[type=submit]"); const note = f.querySelector("#donor-note");
    btn.disabled = true; note.textContent = "Sending…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.assign({ access_key: state.site.formKey, subject: "Contribution record: " + fields.name + " ($" + fields.amount + ", " + fields.method + ")", from_name: "Tyler4Esquimalt website", botcheck: "" }, fields)) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error("send failed");
      f.innerHTML = '<div class="thanks">Thank you. Your details are with the financial agent.<small>Your contribution is recorded once the money arrives. Contributions of $100 or more are published by Elections BC with your name and amount, as the law requires.</small></div>';
    } catch (err) { btn.disabled = false; note.textContent = "That didn't go through. Opening your email app instead…"; setTimeout(mailto, 800); }
  });

  const form = document.getElementById("concern-form");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target;
    if (f.website && f.website.value) return; // honeypot: silently drop bots
    const fields = { name: f.name.value || "(not given)", neighbourhood: f.hood.value || "(not given)", concern: f.concern.value || "(blank)", vision: f.vision.value || "(blank)" };
    const body = "Name: " + fields.name + "\nPart of Esquimalt: " + fields.neighbourhood + "\n\nImmediate concern:\n" + fields.concern + "\n\nLong-term vision:\n" + fields.vision + "\n";
    const mailto = () => { root.location.href = "mailto:" + state.site.email + "?subject=" + encodeURIComponent("My concern and vision for Esquimalt") + "&body=" + encodeURIComponent(body); };
    if (!state.site.formKey || !root.fetch) return mailto();
    if (!f.concern.value.trim() && !f.vision.value.trim()) { f.concern.focus(); return; }
    const btn = f.querySelector("button[type=submit]"); const note = f.querySelector("#form-note");
    btn.disabled = true; note.textContent = "Sending…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ access_key: state.site.formKey, subject: "Concern and vision from " + fields.name + " (" + fields.neighbourhood + ")", from_name: "Tyler4Esquimalt website", name: fields.name, neighbourhood: fields.neighbourhood, concern: fields.concern, vision: fields.vision, botcheck: "" }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error(j.message || "send failed");
      f.innerHTML = '<div class="thanks">Thank you. Your concern and vision are on their way to Tyler.<small>Nothing is published from this form. Themes may appear on this page, never names.</small></div>';
    } catch (err) {
      btn.disabled = false; note.textContent = "That didn't go through. Opening your email app instead…"; setTimeout(mailto, 800);
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderDocument, renderBody, renderReport };
} else {
  const contentEl = document.getElementById("content");
  state = JSON.parse(contentEl.textContent);
  wireSite();
  root.T4E_EDITOR = Editor; // for local testing: T4E_EDITOR.show() in the console

  const claude = root.claude;
  const repo = (state.site.repo || "").split("/");
  if (!(claude && typeof claude.use === "function") && repo.length === 2 && location.protocol !== "file:") {
    // Self-hosted: the editor publishes through GitHub with the owner's token.
    Editor.github = { owner: repo[0], repo: repo[1], branch: state.site.repoBranch || "main" };
    const maybeOpen = () => { if (location.hash === "#editor") Editor.show(); };
    root.addEventListener("hashchange", maybeOpen); maybeOpen();
  }
  if (claude && typeof claude.use === "function") {
    (async () => {
      const maybeOpen = () => { if (location.hash === "#editor" && Editor.artifact) Editor.show(); };
      root.addEventListener("hashchange", maybeOpen);
      const artifact = await claude.use("artifact");
      const perms = await claude.use("permissions");
      let st = "n/a";
      if (perms) { try { st = await perms.state("artifact"); } catch (e) { st = "error"; } }
      Editor.diag = "Publishing " + (artifact ? "available" : "unavailable") + " · permission: " + st + " · runtime script " + (document.getElementById("app") ? "inline" : "external");
      if (artifact && st !== "denied") { Editor.artifact = artifact; Editor.downloads = await claude.use("downloads"); }
      maybeOpen();
    })();
  }
}

})(typeof window !== "undefined" ? window : globalThis);
