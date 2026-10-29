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

// src/hooks/useLocalDocument.ts
import { useCallback, useEffect as useEffect2, useState as useState2 } from "react";
function useLocalDocument(key, initial, parse, encode) {
  const [loaded] = useState2(() => {
    try {
      if (typeof localStorage === "undefined") return { value: initial, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
      const raw = localStorage.getItem(key);
      return raw ? { value: parse(JSON.parse(raw)), status: "C\xF2pia local recuperada." } : { value: initial, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
    } catch {
      return { value: initial, status: "No s\u2019ha pogut recuperar la c\xF2pia local. No s\u2019ha sobreescrit; pots importar una c\xF2pia JSON." };
    }
  });
  const [value, setValue] = useState2(loaded.value), [dirty, setDirty] = useState2(false), [status, setStatus] = useState2(loaded.status);
  const update = useCallback((next) => {
    setDirty(true);
    setValue(next);
  }, []);
  useEffect2(() => {
    if (!dirty) return;
    try {
      localStorage.setItem(key, JSON.stringify(encode(value)));
      setStatus("Desat en aquest navegador.");
    } catch {
      setStatus("No s\u2019ha pogut desar. Exporta una c\xF2pia JSON per conservar els canvis.");
    }
  }, [value, dirty, key, encode]);
  return { value, setValue: update, status };
}

// src/components/DocumentBackup.tsx
import { useId, useRef as useRef2, useState as useState3 } from "react";

// src/utils/jsonFiles.ts
function downloadJson(name, value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function readJson(text2) {
  if (text2.length > 1e6) throw Error("El document supera el l\xEDmit d\u20191 MB.");
  try {
    return JSON.parse(text2);
  } catch {
    throw Error("El document no \xE9s un JSON v\xE0lid.");
  }
}

// src/components/DocumentBackup.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function DocumentBackup({ value, onRestore, parse, encode, filename, status }) {
  const id = useId(), file = useRef2(null);
  const [source, setSource] = useState3(""), [pending, setPending] = useState3(null), [undo, setUndo] = useState3(null), [error, setError] = useState3(""), [message, setMessage] = useState3(""), [busy, setBusy] = useState3(false);
  function preview(text2) {
    setError("");
    setMessage("");
    setPending(null);
    try {
      setPending({ value: parse(readJson(text2)) });
    } catch (e) {
      setError(e.message);
    }
  }
  async function read(f) {
    if (!f) return;
    setBusy(true);
    setError("");
    setPending(null);
    try {
      if (f.size > 1e6) throw Error("El fitxer supera el l\xEDmit d\u20191 MB.");
      preview(await f.text());
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      if (file.current) file.current.value = "";
    }
  }
  return /* @__PURE__ */ jsxs3("details", { className: "document-backup", children: [
    /* @__PURE__ */ jsx3("summary", { children: "Desa i recupera una c\xF2pia" }),
    /* @__PURE__ */ jsxs3("p", { className: "hint", children: [
      status,
      " Per utilitzar-la en un altre dispositiu, exporta el JSON i importa\u2019l all\xE0. No s\u2019envia cap dada al servidor."
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => downloadJson(filename, encode(value)), children: "Exporta c\xF2pia JSON" }),
      /* @__PURE__ */ jsx3("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa c\xF2pia JSON" })
    ] }),
    /* @__PURE__ */ jsx3("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer de c\xF2pia JSON", accept: ".json,application/json", onChange: (e) => {
      void read(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsx3("label", { htmlFor: id, children: "O enganxa una c\xF2pia JSON" }),
    /* @__PURE__ */ jsx3("textarea", { id, rows: 5, maxLength: 1e6, value: source, onChange: (e) => setSource(e.target.value) }),
    /* @__PURE__ */ jsx3("button", { className: "action", disabled: busy || !source.trim(), onClick: () => preview(source), children: "Revisa la c\xF2pia" }),
    pending && /* @__PURE__ */ jsxs3("section", { className: "import-preview", "aria-label": "Vista pr\xE8via de la c\xF2pia", children: [
      /* @__PURE__ */ jsx3("strong", { children: "C\xF2pia validada" }),
      /* @__PURE__ */ jsx3("pre", { children: JSON.stringify(encode(pending.value), null, 2) }),
      /* @__PURE__ */ jsx3("p", { children: "Substituir\xE0 el contingut i el progr\xE9s actuals d\u2019aquesta eina. Podr\xE0s desfer la importaci\xF3." }),
      /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: () => {
          setUndo({ value });
          onRestore(pending.value);
          setPending(null);
          setMessage("C\xF2pia recuperada.");
        }, children: "Recupera aquesta c\xF2pia" }),
        /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la" })
      ] })
    ] }),
    undo && /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => {
      onRestore(undo.value);
      setUndo(null);
      setMessage("Importaci\xF3 desfeta.");
    }, children: "Desf\xE9s la importaci\xF3" }),
    error && /* @__PURE__ */ jsx3("p", { role: "alert", children: error }),
    message && /* @__PURE__ */ jsx3("p", { role: "status", children: message })
  ] });
}

// src/data/classroomDocuments.ts
var initialRoutine = { title: "LA MEVA RUTINA", steps: ["Preparo el material", "Escolto les instruccions", "Faig l\u2019activitat", "Reviso la feina", "Recullo el material"].map((text2) => ({ text: text2, done: false })) };
var initialSequence = { now: "Fem una activitat", next: "Descansem", done: false };
function object(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("El document ha de contenir un objecte.");
  return input;
}
function text(input, max) {
  if (typeof input !== "string" || input.length > max) throw Error(`Hi ha un text inv\xE0lid o superior a ${max} car\xE0cters.`);
  return input;
}
function sequenceDocument(value) {
  return { schema: "qs33ds.eines-sequence.v1", ...value };
}
function parseSequence(input) {
  const data = object(input);
  if (data.schema !== "qs33ds.eines-sequence.v1" || typeof data.done !== "boolean") throw Error("Aquest document no \xE9s una seq\xFC\xE8ncia compatible.");
  return { now: text(data.now, 90), next: text(data.next, 90), done: data.done };
}

// src/modules/Sequence.tsx
import { ArrowRight, Check, RotateCcw as RotateCcw2 } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Sequence() {
  const local = useLocalDocument("qs33ds_eines_sequence_v1", initialSequence, parseSequence, sequenceDocument);
  const { now, next, done } = local.value;
  const setNow = (now2) => local.setValue((s) => ({ ...s, now: now2 }));
  const setNext = (next2) => local.setValue((s) => ({ ...s, next: next2 }));
  const setDone = (done2) => local.setValue((s) => ({ ...s, done: done2 }));
  return /* @__PURE__ */ jsxs4("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs4("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx4("span", { children: "ANTICIPACI\xD3 VISUAL" }),
      /* @__PURE__ */ jsx4("span", { className: "micro-tag", children: "2 PASSOS" })
    ] }),
    /* @__PURE__ */ jsx4("p", { className: "hint", children: "Escriu dues activitats. Pots projectar la seq\xFC\xE8ncia o utilitzar-la individualment." }),
    /* @__PURE__ */ jsxs4("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs4("label", { children: [
        "Activitat actual",
        /* @__PURE__ */ jsx4("input", { maxLength: 90, value: now, onChange: (e) => {
          setNow(e.target.value);
          setDone(false);
        } })
      ] }),
      /* @__PURE__ */ jsxs4("label", { children: [
        "Activitat seg\xFCent",
        /* @__PURE__ */ jsx4("input", { maxLength: 90, value: next, onChange: (e) => setNext(e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "sequence-grid", children: [
      /* @__PURE__ */ jsxs4("article", { className: done ? "sequence-card done" : "sequence-card", children: [
        /* @__PURE__ */ jsx4("span", { children: "01 / ARA" }),
        /* @__PURE__ */ jsx4("strong", { children: now || "\u2014" }),
        done && /* @__PURE__ */ jsx4(Check, { size: 28 })
      ] }),
      /* @__PURE__ */ jsxs4("article", { className: "sequence-card secondary", children: [
        /* @__PURE__ */ jsx4("span", { children: "02 / DESPR\xC9S" }),
        /* @__PURE__ */ jsx4("strong", { children: next || "\u2014" }),
        /* @__PURE__ */ jsx4(ArrowRight, { size: 28 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx4("button", { className: "action primary", onClick: () => setDone(!done), children: done ? "Marca com a pendent" : "Marca com a fet" }),
      /* @__PURE__ */ jsxs4("button", { className: "action", onClick: () => {
        setNow(next);
        setNext("");
        setDone(false);
      }, children: [
        /* @__PURE__ */ jsx4(RotateCcw2, { size: 17 }),
        " Passa a la seg\xFCent"
      ] })
    ] }),
    /* @__PURE__ */ jsx4(DocumentBackup, { value: local.value, onRestore: local.setValue, parse: parseSequence, encode: sequenceDocument, filename: "QS33DS_sequencia.json", status: local.status }),
    /* @__PURE__ */ jsx4("p", { className: "hint", children: "Els pictogrames es connectaran amb el sistema QS33DS existent despr\xE9s de verificar-ne el format." })
  ] });
}

// src/modules/Groups.tsx
import { useState as useState4 } from "react";
import { Shuffle, Users } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function shuffled(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function Groups() {
  const [names, setNames] = useState4("Alumne A\nAlumne B\nAlumne C\nAlumne D");
  const [result, setResult] = useState4([]);
  const [selected, setSelected] = useState4([]);
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
  return /* @__PURE__ */ jsxs5("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs5("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx5("span", { children: "ORGANITZACI\xD3 DE L'AULA" }),
      /* @__PURE__ */ jsx5("span", { className: "micro-tag", children: "SENSE COMPTE" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "group-layout", children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx5("label", { className: "field-label", htmlFor: "student-names", children: "Llista d\u2019\xE0lies (un per l\xEDnia)" }),
        /* @__PURE__ */ jsx5("textarea", { id: "student-names", value: names, onChange: (e) => {
          setNames(e.target.value);
          setSelected([]);
          setResult([]);
        }, rows: 9 }),
        /* @__PURE__ */ jsx5("p", { className: "hint", children: "Utilitza \xE0lies, no dades personals reals. No es desa cap llista." }),
        /* @__PURE__ */ jsxs5("div", { className: "timer-actions", children: [
          /* @__PURE__ */ jsxs5("button", { className: "action primary", onClick: one, children: [
            /* @__PURE__ */ jsx5(Shuffle, { size: 17 }),
            " Tria un \xE0lies"
          ] }),
          /* @__PURE__ */ jsxs5("button", { className: "action", onClick: pairs, children: [
            /* @__PURE__ */ jsx5(Users, { size: 17 }),
            " Fes parelles"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "results", children: [
        /* @__PURE__ */ jsx5("span", { className: "eyebrow", children: "RESULTAT" }),
        result.length ? result.map((group, i) => /* @__PURE__ */ jsxs5("div", { className: "result-item", children: [
          /* @__PURE__ */ jsx5("small", { children: result.length === 1 ? "SELECCI\xD3" : `GRUP ${String(i + 1).padStart(2, "0")}` }),
          /* @__PURE__ */ jsx5("strong", { children: group.join(" \xB7 ") })
        ] }, i)) : /* @__PURE__ */ jsx5("div", { className: "empty-result", children: "Selecciona una opci\xF3 per comen\xE7ar." })
      ] })
    ] })
  ] });
}

// src/components/useWindows.ts
import { useState as useState5 } from "react";
function constrain(x, y, width, height) {
  const windowWidth = Math.min(740, Math.max(0, width - 24));
  const margin = Math.min(12, Math.max(0, width - windowWidth));
  return { x: Math.max(margin, Math.min(x, Math.max(margin, width - windowWidth - margin))), y: Math.max(0, Math.min(y, Math.max(0, height - 80))) };
}

// src/catalog.ts
var tools = [
  { id: "timer", name: "Temporitzador visual", category: "Gesti\xF3", description: "Fes visible el temps i facilita les transicions.", ready: true, index: "01" },
  { id: "sequence", name: "Ara i despr\xE9s", category: "Suport", description: "Anticipa qu\xE8 fem ara i qu\xE8 vindr\xE0 despr\xE9s.", ready: true, index: "02" },
  { id: "groups", name: "Selector d\u2019alumnes", category: "Gesti\xF3", description: "Tria \xE0lies i forma parelles per organitzar l\u2019aula.", ready: true, index: "03" },
  { id: "autonomy", name: "Llista d\u2019autonomia", category: "Suport", description: "Descompon rutines en passos accessibles.", ready: true, index: "04" },
  { id: "observation", name: "Registre d\u2019observaci\xF3", category: "Seguiment", description: "Registra evid\xE8ncies educatives amb privacitat.", ready: true, index: "05" },
  { id: "syllables", name: "Separaci\xF3 sil\xB7l\xE0bica", category: "Llenguatge", description: "Compta, separa i ordena s\xEDl\xB7labes amb vocabulari revisat.", ready: true, index: "06" },
  { id: "words", name: "Banc de paraules", category: "Llenguatge", description: "Cerca lletres i s\xEDl\xB7labes escrites en paraules.", ready: true, index: "07" },
  { id: "guidelines", name: "Generador de pautes", category: "Materials", description: "Pautes d'escriptura i materials imprimibles.", ready: true, index: "08" }
];

// tests/validation.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
assert.equal(styles.length, 8);
assert.equal(new Set(styles.map((s) => s[0])).size, 8);
for (const [style] of styles) for (const progress of [0, 0.5, 1, -1, 2]) {
  const html = renderToStaticMarkup(/* @__PURE__ */ jsx6(TimerVisual, { style, progress, time: "05:00" }));
  assert(html.includes(`visual-${style}`));
  assert(html.includes("05:00"));
  assert(!html.includes("NaN"));
}
assert.deepEqual(constrain(-1, -20, 390, 844), { x: 12, y: 0 });
assert.deepEqual(constrain(900, 900, 390, 844), { x: 12, y: 764 });
assert.deepEqual(constrain(900, 900, 100, 50), { x: 12, y: 0 });
assert.equal(tools.filter((t) => t.ready).length, 8);
assert.equal(tools.length, 8);
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Timer, {})).includes("05:00"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Sequence, {})).includes("Fem una activitat"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Groups, {})).includes("Alumne A"));
console.log("PASS: 40 timer renders, 8 distinct styles, numeric boundaries, 3 window boundary cases, catalog, 3 original modules SSR.");
