// tests/validation.tsx
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";

// src/components/TimerVisual.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var styles = [["circular", "Circular"], ["hourglass", "Rellotge de sorra"], ["digital", "Digital"], ["bar", "Barra"], ["segments", "Segments"], ["candle", "Espelma"], ["orbit", "\xD2rbita"], ["steps", "Escala"]];
function TimerVisual({ style, progress, time }) {
  const p = Math.max(0, Math.min(1, progress));
  return /* @__PURE__ */ jsxs("div", { className: "visual visual-" + style, style: { "--fraction": p, "--angle": `${p * 360}deg` }, children: [
    /* @__PURE__ */ jsx("div", { className: "visual-drawing", "aria-hidden": "true", children: style === "segments" || style === "steps" ? Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ jsx("i", { className: i < Math.ceil(p * 12) ? "filled" : "", style: style === "steps" ? { height: `${20 + i * 6}%` } : {} }, i)) : style === "hourglass" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("i", { className: "sand top", style: { height: `${p * 45}%` } }),
      /* @__PURE__ */ jsx("i", { className: "sand bottom", style: { height: `${(1 - p) * 45}%` } })
    ] }) : style === "candle" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("i", { className: "wax", style: { height: `${p * 90}%` } }),
      /* @__PURE__ */ jsx("i", { className: "flame", style: { bottom: `${p * 90}%`, opacity: p ? 1 : 0 } })
    ] }) : style === "orbit" ? /* @__PURE__ */ jsx("i", { className: "planet" }) : null }),
    /* @__PURE__ */ jsx("output", { className: "visual-time", "aria-label": `Temps restant: ${time}`, children: time })
  ] });
}

// src/modules/Timer.tsx
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Maximize } from "lucide-react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var format = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
function Timer() {
  const [total, setTotal] = useState(300), [remaining, setRemaining] = useState(300), [running, setRunning] = useState(false);
  const [style, setStyle] = useState("circular");
  const end = useRef(0);
  const shell = useRef(null);
  useEffect(() => {
    if (!running) return;
    end.current = Date.now() + remaining * 1e3;
    const id = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((end.current - Date.now()) / 1e3));
      setRemaining(next);
      if (next === 0) setRunning(false);
    }, 200);
    return () => clearInterval(id);
  }, [running]);
  function preset(n) {
    setRunning(false);
    setTotal(n * 60);
    setRemaining(n * 60);
  }
  return /* @__PURE__ */ jsxs2("div", { ref: shell, className: "tool-surface timer-tool", children: [
    /* @__PURE__ */ jsxs2("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx2("span", { children: "COMPTADOR VISUAL" }),
      /* @__PURE__ */ jsx2("button", { className: "icon-btn", "aria-label": "Pantalla completa", onClick: () => {
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => {
        });
        else void shell.current?.requestFullscreen?.().catch(() => {
        });
      }, children: /* @__PURE__ */ jsx2(Maximize, { size: 19 }) })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "presets", children: [1, 2, 5, 10, 15, 20].map((n) => /* @__PURE__ */ jsxs2("button", { className: total === n * 60 ? "chosen" : "", onClick: () => preset(n), children: [
      n,
      " min"
    ] }, n)) }),
    /* @__PURE__ */ jsxs2("label", { className: "style-picker", children: [
      "Estil visual ",
      /* @__PURE__ */ jsx2("select", { value: style, onChange: (e) => setStyle(e.target.value), children: styles.map(([id, label]) => /* @__PURE__ */ jsx2("option", { value: id, children: label }, id)) })
    ] }),
    /* @__PURE__ */ jsx2(TimerVisual, { style, progress: remaining / total, time: format(remaining) }),
    /* @__PURE__ */ jsx2("p", { role: "status", children: remaining === 0 ? "TEMPS ACABAT" : running ? "EN MARXA" : "PREPARAT" }),
    /* @__PURE__ */ jsxs2("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx2("button", { className: "action primary", onClick: () => setRunning(!running), disabled: remaining === 0, children: running ? /* @__PURE__ */ jsxs2(Fragment2, { children: [
        /* @__PURE__ */ jsx2(Pause, { size: 18 }),
        " Pausa"
      ] }) : /* @__PURE__ */ jsxs2(Fragment2, { children: [
        /* @__PURE__ */ jsx2(Play, { size: 18 }),
        " Inicia"
      ] }) }),
      /* @__PURE__ */ jsxs2("button", { className: "action", onClick: () => {
        setRunning(false);
        setRemaining(total);
      }, children: [
        /* @__PURE__ */ jsx2(RotateCcw, { size: 18 }),
        " Reinicia"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("p", { className: "hint", children: "El comptador continua sincronitzat amb el temps real mentre aquesta pantalla est\xE0 oberta." })
  ] });
}

// src/modules/Sequence.tsx
import { useState as useState2 } from "react";
import { ArrowRight, Check, RotateCcw as RotateCcw2 } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Sequence() {
  const [now, setNow] = useState2("Fem una activitat");
  const [next, setNext] = useState2("Descansem");
  const [done, setDone] = useState2(false);
  return /* @__PURE__ */ jsxs3("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs3("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx3("span", { children: "ANTICIPACI\xD3 VISUAL" }),
      /* @__PURE__ */ jsx3("span", { className: "micro-tag", children: "2 PASSOS" })
    ] }),
    /* @__PURE__ */ jsx3("p", { className: "hint", children: "Escriu dues activitats. Pots projectar la seq\xFC\xE8ncia o utilitzar-la individualment." }),
    /* @__PURE__ */ jsxs3("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs3("label", { children: [
        "Activitat actual",
        /* @__PURE__ */ jsx3("input", { maxLength: 90, value: now, onChange: (e) => {
          setNow(e.target.value);
          setDone(false);
        } })
      ] }),
      /* @__PURE__ */ jsxs3("label", { children: [
        "Activitat seg\xFCent",
        /* @__PURE__ */ jsx3("input", { maxLength: 90, value: next, onChange: (e) => setNext(e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "sequence-grid", children: [
      /* @__PURE__ */ jsxs3("article", { className: done ? "sequence-card done" : "sequence-card", children: [
        /* @__PURE__ */ jsx3("span", { children: "01 / ARA" }),
        /* @__PURE__ */ jsx3("strong", { children: now || "\u2014" }),
        done && /* @__PURE__ */ jsx3(Check, { size: 28 })
      ] }),
      /* @__PURE__ */ jsxs3("article", { className: "sequence-card secondary", children: [
        /* @__PURE__ */ jsx3("span", { children: "02 / DESPR\xC9S" }),
        /* @__PURE__ */ jsx3("strong", { children: next || "\u2014" }),
        /* @__PURE__ */ jsx3(ArrowRight, { size: 28 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: () => setDone(!done), children: done ? "Marca com a pendent" : "Marca com a fet" }),
      /* @__PURE__ */ jsxs3("button", { className: "action", onClick: () => {
        setNow(next);
        setNext("");
        setDone(false);
      }, children: [
        /* @__PURE__ */ jsx3(RotateCcw2, { size: 17 }),
        " Passa a la seg\xFCent"
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { className: "hint", children: "Els pictogrames es connectaran amb el sistema QS33DS existent despr\xE9s de verificar-ne el format." })
  ] });
}

// src/modules/Groups.tsx
import { useState as useState3 } from "react";
import { Shuffle, Users } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function shuffled(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function Groups() {
  const [names, setNames] = useState3("Alumne A\nAlumne B\nAlumne C\nAlumne D");
  const [result, setResult] = useState3([]);
  const [selected, setSelected] = useState3([]);
  const list = [...new Set(names.split(/\r?\n/).map((x) => x.trim()).filter(Boolean))];
  function one() {
    const pool = list.filter((x) => !selected.includes(x));
    const candidates = pool.length ? pool : list;
    if (!candidates.length) {
      setResult([]);
      return;
    }
    const pick = shuffled(candidates)[0];
    setSelected(pool.length ? [...selected, pick] : [pick]);
    setResult([[pick]]);
  }
  function pairs() {
    const a = shuffled(list);
    const out = [];
    for (let i = 0; i < a.length; i += 2) out.push(a.slice(i, i + 2));
    setResult(out);
  }
  return /* @__PURE__ */ jsxs4("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs4("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx4("span", { children: "ORGANITZACI\xD3 DE L'AULA" }),
      /* @__PURE__ */ jsx4("span", { className: "micro-tag", children: "SENSE COMPTE" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "group-layout", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { className: "field-label", htmlFor: "student-names", children: "Llista d'\xE0lies (un per l\xEDnia)" }),
        /* @__PURE__ */ jsx4("textarea", { id: "student-names", value: names, onChange: (e) => {
          setNames(e.target.value);
          setSelected([]);
          setResult([]);
        }, rows: 9 }),
        /* @__PURE__ */ jsx4("p", { className: "hint", children: "Utilitza \xE0lies, no dades personals reals. No es desa cap llista." }),
        /* @__PURE__ */ jsxs4("div", { className: "timer-actions", children: [
          /* @__PURE__ */ jsxs4("button", { className: "action primary", onClick: one, children: [
            /* @__PURE__ */ jsx4(Shuffle, { size: 17 }),
            " Tria un torn"
          ] }),
          /* @__PURE__ */ jsxs4("button", { className: "action", onClick: pairs, children: [
            /* @__PURE__ */ jsx4(Users, { size: 17 }),
            " Fes parelles"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "results", children: [
        /* @__PURE__ */ jsx4("span", { className: "eyebrow", children: "RESULTAT" }),
        result.length ? result.map((group, i) => /* @__PURE__ */ jsxs4("div", { className: "result-item", children: [
          /* @__PURE__ */ jsx4("small", { children: result.length === 1 ? "SELECCI\xD3" : `GRUP ${String(i + 1).padStart(2, "0")}` }),
          /* @__PURE__ */ jsx4("strong", { children: group.join(" \xB7 ") })
        ] }, i)) : /* @__PURE__ */ jsx4("div", { className: "empty-result", children: "Selecciona una opci\xF3 per comen\xE7ar." })
      ] })
    ] })
  ] });
}

// src/components/useWindows.ts
import { useState as useState4 } from "react";
function constrain(x, y, width, height) {
  const windowWidth = Math.min(740, Math.max(0, width - 24));
  const margin = Math.min(12, Math.max(0, width - windowWidth));
  return { x: Math.max(margin, Math.min(x, Math.max(margin, width - windowWidth - margin))), y: Math.max(0, Math.min(y, Math.max(0, height - 80))) };
}

// src/catalog.ts
var tools = [
  { id: "timer", name: "Temporitzador Visual", category: "Gesti\xF3", description: "Fes visible el temps i facilita les transicions.", ready: true, index: "01" },
  { id: "sequence", name: "Ara i Despr\xE9s", category: "Suport", description: "Anticipa qu\xE8 fem ara i qu\xE8 vindr\xE0 despr\xE9s.", ready: true, index: "02" },
  { id: "groups", name: "Selector d'Alumnes", category: "Gesti\xF3", description: "Organitza torns, parelles i petits grups.", ready: true, index: "03" },
  { id: "autonomy", name: "Checklist d'Autonomia", category: "Suport", description: "Descompon rutines en passos accessibles.", ready: true, index: "04" },
  { id: "observation", name: "Registre d'Observaci\xF3", category: "Seguiment", description: "Registra evid\xE8ncies educatives amb privacitat.", ready: false, index: "05" },
  { id: "syllables", name: "Laboratori de S\xEDl\xB7labes", category: "Llenguatge", description: "Activitats de consci\xE8ncia sil\xB7l\xE0bica.", ready: false, index: "06" },
  { id: "words", name: "Banc de Paraules per Sons", category: "Llenguatge", description: "Consulta vocabulari classificat per sons.", ready: false, index: "07" },
  { id: "guidelines", name: "Generador de Pautes", category: "Materials", description: "Pautes d'escriptura i materials imprimibles.", ready: false, index: "08" }
];

// tests/validation.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
assert.equal(styles.length, 8);
assert.equal(new Set(styles.map((s) => s[0])).size, 8);
for (const [style] of styles) for (const progress of [0, 0.5, 1, -1, 2]) {
  const html = renderToStaticMarkup(/* @__PURE__ */ jsx5(TimerVisual, { style, progress, time: "05:00" }));
  assert(html.includes(`visual-${style}`));
  assert(html.includes("05:00"));
  assert(!html.includes("NaN"));
}
assert.deepEqual(constrain(-1, -20, 390, 844), { x: 12, y: 0 });
assert.deepEqual(constrain(900, 900, 390, 844), { x: 12, y: 764 });
assert.deepEqual(constrain(900, 900, 100, 50), { x: 12, y: 0 });
assert.equal(tools.filter((t) => t.ready).length, 4);
assert.equal(tools.length, 8);
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Timer, {})).includes("05:00"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Sequence, {})).includes("Fem una activitat"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Groups, {})).includes("Alumne A"));
console.log("PASS: 40 timer renders, 8 distinct styles, numeric boundaries, 3 window boundary cases, catalog, 3 original modules SSR.");
