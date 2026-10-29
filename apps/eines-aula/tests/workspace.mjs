// tests/workspace.tsx
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";

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

// src/data/toolLaunch.ts
function toolLaunch(search) {
  const params = new URLSearchParams(search);
  const tool = tools.find((t) => t.ready && t.id === params.get("tool"));
  return { tool: tool?.id ?? null, embedded: !!tool && params.get("embed") === "1" };
}
var panelTools = tools.filter((t) => t.ready).map((t) => ({ value: `eines-aula/?tool=${t.id}&embed=1`, label: t.name }));
function standaloneTool(value) {
  const url = new URL(value, "https://aula.invalid/");
  url.searchParams.delete("embed");
  return url.pathname.slice(1) + url.search;
}
var DEFAULT_PANEL_TOOL = "eines-aula/?tool=timer&embed=1";

// src/dashboard-state.ts
var apps = [
  ["eines-aula/", "Eines d\u2019Aula", "Temporitzadors, s\xEDl\xB7labes i rutines", "\u25F7"],
  ["files/", "FILES \xB7 El meu n\xFAvol", "Documents privats i carpetes", "\u2601"],
  ["lecto-publisher.html", "LECTO Publisher \xB7 v1.3", "Quaderns de lectura i escriptura", "\u25A4"],
  ["pictogrames.html", "Pictogrames", "Comunicaci\xF3 i suport visual", "\u25C8"],
  ["lecto.html", "Lecto", "Lectura i flu\xEFdesa", "Aa"],
  ["observapt.html", "ObservaPT", "Observaci\xF3 i seguiment", "\u25CE"],
  ["laboratori-nombres.html", "Laboratori de nombres", "Numeraci\xF3 i c\xE0lcul", "123"],
  ["referents-escriptura.html", "Referents d\u2019escriptura", "Vocabulari i autonomia", "\u270E"],
  ["calendari.html", "Calendari escolar", "Reunions i organitzaci\xF3", "\u25A6"],
  ["mi-tablon.html", "Tauler de notes", "Notes i llistes", "\u2611"],
  ["https://qs33ds-alt.github.io/Font-Freda-Diversitat/", "Font Freda Diversitat", "Suports i coordinaci\xF3", "\u25C7"],
  ["https://qs33ds-alt.github.io/generador-pi-primaria/", "Generador PI \xB7 v0.88.2", "Plans individualitzats", "\xB6"]
];

// src/data/dashboardPreferences.ts
var panelOptions = [...panelTools, ...apps.filter((a) => !a[0].startsWith("https:") && a[0] !== "files/").map((a) => ({ value: a[0], label: a[1] }))];
function preferences(input, day = 0) {
  const v = input;
  return { quad: v?.quad === true, day: Number.isInteger(v?.day) && v.day >= 0 && v.day <= 4 ? v.day : day, tool: panelOptions.some((t) => t.value === v?.tool) ? v.tool : DEFAULT_PANEL_TOOL };
}

// src/modules/Timer.tsx
import { useEffect, useRef, useState } from "react";

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
function useLocalDocument(key, initial2, parse, encode) {
  const [loaded] = useState2(() => {
    try {
      if (typeof localStorage === "undefined") return { value: initial2, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
      const raw = localStorage.getItem(key);
      return raw ? { value: parse(JSON.parse(raw)), status: "C\xF2pia local recuperada." } : { value: initial2, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
    } catch {
      return { value: initial2, status: "No s\u2019ha pogut recuperar la c\xF2pia local. No s\u2019ha sobreescrit; pots importar una c\xF2pia JSON." };
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
  async function read2(f) {
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
      void read2(e.target.files?.[0]);
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
function routineDocument(value) {
  return { schema: "qs33ds.eines-autonomy.v1", ...value };
}
function parseRoutine(input) {
  const data = object(input);
  if (data.schema !== "qs33ds.eines-autonomy.v1") throw Error("Aquest document no \xE9s una rutina compatible.");
  if (!Array.isArray(data.steps) || data.steps.length > 30) throw Error("La rutina pot tenir un m\xE0xim de 30 passos.");
  return { title: text(data.title, 80), steps: data.steps.map((step) => {
    const s = object(step);
    if (typeof s.done !== "boolean") throw Error("Cada pas ha de tenir done: true o false.");
    return { text: text(s.text, 120), done: s.done };
  }) };
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

// src/modules/Autonomy.tsx
import { useId as useId2, useState as useState5 } from "react";
import { Plus, RotateCcw as RotateCcw3, Trash2, Undo2 } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function Autonomy() {
  const prefix = useId2();
  const local = useLocalDocument("qs33ds_eines_autonomy_v1", initialRoutine, parseRoutine, routineDocument);
  const { title, steps } = local.value;
  const setTitle = (title2) => local.setValue((s) => ({ ...s, title: title2 }));
  const setSteps = (next) => local.setValue((s) => ({ ...s, steps: typeof next === "function" ? next(s.steps) : next }));
  const [draft, setDraft] = useState5("");
  const [removed, setRemoved] = useState5(null);
  const completed = steps.filter((s) => s.done).length;
  function add() {
    const text2 = draft.trim();
    if (!text2 || steps.length >= 30) return;
    setSteps((s) => [...s, { text: text2, done: false }]);
    setDraft("");
  }
  return /* @__PURE__ */ jsxs6("div", { className: "tool-surface autonomy-tool", children: [
    /* @__PURE__ */ jsxs6("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx6("span", { children: "AUTONOMIA PAS A PAS" }),
      /* @__PURE__ */ jsx6("span", { className: "micro-tag", children: "RUTINA VISUAL" })
    ] }),
    /* @__PURE__ */ jsx6("label", { className: "field-label", htmlFor: prefix + "title", children: "Nom de la rutina" }),
    /* @__PURE__ */ jsx6("input", { id: prefix + "title", maxLength: 80, value: title, onChange: (e) => setTitle(e.target.value) }),
    /* @__PURE__ */ jsxs6("div", { className: "routine-progress", children: [
      /* @__PURE__ */ jsx6("strong", { children: title || "LA MEVA RUTINA" }),
      /* @__PURE__ */ jsx6("p", { role: "status", children: steps.length && completed === steps.length ? "RUTINA COMPLETADA!" : `PASSOS FETS: ${completed} / ${steps.length}` }),
      /* @__PURE__ */ jsx6("progress", { "aria-label": "Progr\xE9s de la rutina", value: completed, max: steps.length || 1 })
    ] }),
    /* @__PURE__ */ jsx6("ol", { className: "routine-steps", children: steps.map((step, index) => /* @__PURE__ */ jsxs6("li", { className: step.done ? "is-done" : "", children: [
      /* @__PURE__ */ jsx6("span", { className: "step-number", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxs6("label", { className: "step-check", children: [
        /* @__PURE__ */ jsx6("input", { type: "checkbox", checked: step.done, "aria-label": `Marca el pas ${index + 1} com a fet`, onChange: () => setSteps((s) => s.map((x, i) => i === index ? { ...x, done: !x.done } : x)) }),
        /* @__PURE__ */ jsx6("span", { children: step.done ? "FET" : "PENDENT" })
      ] }),
      /* @__PURE__ */ jsx6("input", { className: "step-text", "aria-label": `Text del pas ${index + 1}`, maxLength: 120, value: step.text, onChange: (e) => setSteps((s) => s.map((x, i) => i === index ? { ...x, text: e.target.value } : x)) }),
      /* @__PURE__ */ jsx6("button", { className: "icon-btn", "aria-label": `Elimina el pas ${index + 1}`, onClick: () => {
        setRemoved({ step, index });
        setSteps((s) => s.filter((_, i) => i !== index));
      }, children: /* @__PURE__ */ jsx6(Trash2, { size: 18 }) })
    ] }, index)) }),
    !steps.length && /* @__PURE__ */ jsx6("p", { className: "hint", children: "Afegeix el primer pas per preparar la teva rutina." }),
    removed && /* @__PURE__ */ jsxs6("button", { disabled: steps.length >= 30, className: "action", onClick: () => {
      setSteps((s) => {
        const a = [...s];
        a.splice(Math.min(removed.index, a.length), 0, removed.step);
        return a;
      });
      setRemoved(null);
    }, children: [
      /* @__PURE__ */ jsx6(Undo2, { size: 17 }),
      " Desf\xE9s l\u2019\xFAltima eliminaci\xF3"
    ] }),
    /* @__PURE__ */ jsxs6("form", { className: "routine-add", onSubmit: (e) => {
      e.preventDefault();
      add();
    }, children: [
      /* @__PURE__ */ jsx6("label", { className: "field-label", htmlFor: prefix + "new", children: "Nou pas (m\xE0xim 30)" }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx6("input", { id: prefix + "new", value: draft, maxLength: 120, placeholder: "Escriu un pas curt...", onChange: (e) => setDraft(e.target.value) }),
        /* @__PURE__ */ jsxs6("button", { className: "action primary", disabled: !draft.trim() || steps.length >= 30, children: [
          /* @__PURE__ */ jsx6(Plus, { size: 18 }),
          " Afegeix"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("button", { className: "action", disabled: !completed, onClick: () => {
      setSteps((s) => s.map((x) => ({ ...x, done: false })));
      setRemoved((r) => r ? { ...r, step: { ...r.step, done: false } } : null);
    }, children: [
      /* @__PURE__ */ jsx6(RotateCcw3, { size: 17 }),
      " Torna a comen\xE7ar"
    ] }),
    /* @__PURE__ */ jsx6("p", { className: "hint", children: "La rutina i els passos marcats es conserven en aquest navegador. Fes servir textos d\u2019activitats, sense dades personals." }),
    /* @__PURE__ */ jsx6(DocumentBackup, { value: local.value, onRestore: (value) => {
      local.setValue(value);
      setRemoved(null);
      setDraft("");
    }, parse: parseRoutine, encode: routineDocument, filename: "QS33DS_rutina.json", status: local.status })
  ] });
}

// src/modules/Observation.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function Observation() {
  return /* @__PURE__ */ jsxs7("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx7("div", { className: "tool-top", children: /* @__PURE__ */ jsx7("span", { children: "OBSERVAPT \xB7 EINA QS33DS EXISTENT" }) }),
    /* @__PURE__ */ jsx7("p", { className: "hint", children: "Registre funcional complet. ObservaPT desa les dades en aquest navegador: fes servir \xE0lies i exporta els registres que vulguis conservar." }),
    /* @__PURE__ */ jsx7("a", { className: "action", href: "../observapt.html", target: "_blank", rel: "noopener noreferrer", children: "Obre ObservaPT en una pestanya" }),
    /* @__PURE__ */ jsx7("iframe", { className: "existing-tool", src: "../observapt.html", title: "ObservaPT \xB7 Registre d\u2019observaci\xF3 funcional" }),
    /* @__PURE__ */ jsx7("p", { className: "hint", children: "Si no es mostra la vista integrada, utilitza el bot\xF3 per obrir l\u2019eina." })
  ] });
}

// src/modules/Syllables.tsx
import { useId as useId3, useMemo, useState as useState6 } from "react";

// src/data/vocabulary.ts
var topics = { animals: "Animals", aula: "Aula", casa: "Casa", aliments: "Aliments", natura: "Natura", transport: "Transports", cos: "Cos", roba: "Roba", joc: "Jocs i m\xFAsica", persones: "Persones" };
var vocabulary = [
  {
    "word": "casa",
    "syllables": [
      "ca",
      "sa"
    ],
    "topic": "casa"
  },
  {
    "word": "pilota",
    "syllables": [
      "pi",
      "lo",
      "ta"
    ],
    "topic": "joc"
  },
  {
    "word": "taula",
    "syllables": [
      "tau",
      "la"
    ],
    "topic": "casa",
    "note": "Les vocals au formen un diftong i es mantenen juntes."
  },
  {
    "word": "escola",
    "syllables": [
      "es",
      "co",
      "la"
    ],
    "topic": "aula"
  },
  {
    "word": "mama",
    "syllables": [
      "ma",
      "ma"
    ],
    "topic": "persones"
  },
  {
    "word": "papa",
    "syllables": [
      "pa",
      "pa"
    ],
    "topic": "persones"
  },
  {
    "word": "pera",
    "syllables": [
      "pe",
      "ra"
    ],
    "topic": "aliments"
  },
  {
    "word": "poma",
    "syllables": [
      "po",
      "ma"
    ],
    "topic": "aliments"
  },
  {
    "word": "lluna",
    "syllables": [
      "llu",
      "na"
    ],
    "topic": "natura"
  },
  {
    "word": "sabata",
    "syllables": [
      "sa",
      "ba",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "m\xE0",
    "syllables": [
      "m\xE0"
    ],
    "topic": "cos"
  },
  {
    "word": "mar",
    "syllables": [
      "mar"
    ],
    "topic": "natura"
  },
  {
    "word": "sol",
    "syllables": [
      "sol"
    ],
    "topic": "natura"
  },
  {
    "word": "gat",
    "syllables": [
      "gat"
    ],
    "topic": "animals"
  },
  {
    "word": "gos",
    "syllables": [
      "gos"
    ],
    "topic": "animals"
  },
  {
    "word": "tren",
    "syllables": [
      "tren"
    ],
    "topic": "transport"
  },
  {
    "word": "flor",
    "syllables": [
      "flor"
    ],
    "topic": "natura"
  },
  {
    "word": "platja",
    "syllables": [
      "plat",
      "ja"
    ],
    "topic": "natura",
    "note": "El grup tj se separa: plat-ja."
  },
  {
    "word": "aigua",
    "syllables": [
      "ai",
      "gua"
    ],
    "topic": "natura",
    "note": "Els grups ai i gua es mantenen dins les seves s\xEDl\xB7labes."
  },
  {
    "word": "finestra",
    "syllables": [
      "fi",
      "nes",
      "tra"
    ],
    "topic": "casa"
  },
  {
    "word": "cotxe",
    "syllables": [
      "cot",
      "xe"
    ],
    "topic": "transport",
    "note": "El grup tx se separa: cot-xe."
  },
  {
    "word": "llibre",
    "syllables": [
      "lli",
      "bre"
    ],
    "topic": "aula"
  },
  {
    "word": "paper",
    "syllables": [
      "pa",
      "per"
    ],
    "topic": "aula"
  },
  {
    "word": "caramel",
    "syllables": [
      "ca",
      "ra",
      "mel"
    ],
    "topic": "aliments"
  },
  {
    "word": "cadira",
    "syllables": [
      "ca",
      "di",
      "ra"
    ],
    "topic": "casa"
  },
  {
    "word": "papallona",
    "syllables": [
      "pa",
      "pa",
      "llo",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "vaca",
    "syllables": [
      "va",
      "ca"
    ],
    "topic": "animals"
  },
  {
    "word": "cavall",
    "syllables": [
      "ca",
      "vall"
    ],
    "topic": "animals"
  },
  {
    "word": "ovella",
    "syllables": [
      "o",
      "ve",
      "lla"
    ],
    "topic": "animals"
  },
  {
    "word": "conill",
    "syllables": [
      "co",
      "nill"
    ],
    "topic": "animals",
    "note": "El d\xEDgraf ll es mant\xE9 junt."
  },
  {
    "word": "gallina",
    "syllables": [
      "ga",
      "lli",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "pollet",
    "syllables": [
      "po",
      "llet"
    ],
    "topic": "animals"
  },
  {
    "word": "\xE0nec",
    "syllables": [
      "\xE0",
      "nec"
    ],
    "topic": "animals"
  },
  {
    "word": "ocell",
    "syllables": [
      "o",
      "cell"
    ],
    "topic": "animals"
  },
  {
    "word": "peix",
    "syllables": [
      "peix"
    ],
    "topic": "animals"
  },
  {
    "word": "bou",
    "syllables": [
      "bou"
    ],
    "topic": "animals"
  },
  {
    "word": "porc",
    "syllables": [
      "porc"
    ],
    "topic": "animals"
  },
  {
    "word": "cargol",
    "syllables": [
      "car",
      "gol"
    ],
    "topic": "animals"
  },
  {
    "word": "formiga",
    "syllables": [
      "for",
      "mi",
      "ga"
    ],
    "topic": "animals"
  },
  {
    "word": "mosca",
    "syllables": [
      "mos",
      "ca"
    ],
    "topic": "animals"
  },
  {
    "word": "aranya",
    "syllables": [
      "a",
      "ra",
      "nya"
    ],
    "topic": "animals"
  },
  {
    "word": "abella",
    "syllables": [
      "a",
      "be",
      "lla"
    ],
    "topic": "animals"
  },
  {
    "word": "girafa",
    "syllables": [
      "gi",
      "ra",
      "fa"
    ],
    "topic": "animals"
  },
  {
    "word": "elefant",
    "syllables": [
      "e",
      "le",
      "fant"
    ],
    "topic": "animals"
  },
  {
    "word": "tortuga",
    "syllables": [
      "tor",
      "tu",
      "ga"
    ],
    "topic": "animals"
  },
  {
    "word": "granota",
    "syllables": [
      "gra",
      "no",
      "ta"
    ],
    "topic": "animals"
  },
  {
    "word": "serp",
    "syllables": [
      "serp"
    ],
    "topic": "animals"
  },
  {
    "word": "ratol\xED",
    "syllables": [
      "ra",
      "to",
      "l\xED"
    ],
    "topic": "animals"
  },
  {
    "word": "esquirol",
    "syllables": [
      "es",
      "qui",
      "rol"
    ],
    "topic": "animals"
  },
  {
    "word": "dof\xED",
    "syllables": [
      "do",
      "f\xED"
    ],
    "topic": "animals"
  },
  {
    "word": "balena",
    "syllables": [
      "ba",
      "le",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "lle\xF3",
    "syllables": [
      "lle",
      "\xF3"
    ],
    "topic": "animals",
    "note": "Les vocals e i \xF3 formen un hiat: lle-\xF3."
  },
  {
    "word": "llapis",
    "syllables": [
      "lla",
      "pis"
    ],
    "topic": "aula"
  },
  {
    "word": "goma",
    "syllables": [
      "go",
      "ma"
    ],
    "topic": "aula"
  },
  {
    "word": "llibreta",
    "syllables": [
      "lli",
      "bre",
      "ta"
    ],
    "topic": "aula"
  },
  {
    "word": "carpeta",
    "syllables": [
      "car",
      "pe",
      "ta"
    ],
    "topic": "aula"
  },
  {
    "word": "tisores",
    "syllables": [
      "ti",
      "so",
      "res"
    ],
    "topic": "aula"
  },
  {
    "word": "pissarra",
    "syllables": [
      "pis",
      "sar",
      "ra"
    ],
    "topic": "aula",
    "note": "Els grups ss i rr se separen: pis-sar-ra."
  },
  {
    "word": "guix",
    "syllables": [
      "guix"
    ],
    "topic": "aula"
  },
  {
    "word": "pintura",
    "syllables": [
      "pin",
      "tu",
      "ra"
    ],
    "topic": "aula"
  },
  {
    "word": "pinzell",
    "syllables": [
      "pin",
      "zell"
    ],
    "topic": "aula"
  },
  {
    "word": "regle",
    "syllables": [
      "re",
      "gle"
    ],
    "topic": "aula"
  },
  {
    "word": "estoig",
    "syllables": [
      "es",
      "toig"
    ],
    "topic": "aula"
  },
  {
    "word": "full",
    "syllables": [
      "full"
    ],
    "topic": "aula"
  },
  {
    "word": "dibuix",
    "syllables": [
      "di",
      "buix"
    ],
    "topic": "aula"
  },
  {
    "word": "paraula",
    "syllables": [
      "pa",
      "rau",
      "la"
    ],
    "topic": "aula"
  },
  {
    "word": "lletra",
    "syllables": [
      "lle",
      "tra"
    ],
    "topic": "aula"
  },
  {
    "word": "n\xFAmero",
    "syllables": [
      "n\xFA",
      "me",
      "ro"
    ],
    "topic": "aula"
  },
  {
    "word": "mestre",
    "syllables": [
      "mes",
      "tre"
    ],
    "topic": "aula"
  },
  {
    "word": "mestra",
    "syllables": [
      "mes",
      "tra"
    ],
    "topic": "aula"
  },
  {
    "word": "company",
    "syllables": [
      "com",
      "pany"
    ],
    "topic": "aula"
  },
  {
    "word": "porta",
    "syllables": [
      "por",
      "ta"
    ],
    "topic": "casa"
  },
  {
    "word": "llit",
    "syllables": [
      "llit"
    ],
    "topic": "casa"
  },
  {
    "word": "sof\xE0",
    "syllables": [
      "so",
      "f\xE0"
    ],
    "topic": "casa"
  },
  {
    "word": "cuina",
    "syllables": [
      "cui",
      "na"
    ],
    "topic": "casa"
  },
  {
    "word": "plat",
    "syllables": [
      "plat"
    ],
    "topic": "casa"
  },
  {
    "word": "got",
    "syllables": [
      "got"
    ],
    "topic": "casa"
  },
  {
    "word": "tassa",
    "syllables": [
      "tas",
      "sa"
    ],
    "topic": "casa"
  },
  {
    "word": "cullera",
    "syllables": [
      "cu",
      "lle",
      "ra"
    ],
    "topic": "casa"
  },
  {
    "word": "forquilla",
    "syllables": [
      "for",
      "qui",
      "lla"
    ],
    "topic": "casa"
  },
  {
    "word": "ganivet",
    "syllables": [
      "ga",
      "ni",
      "vet"
    ],
    "topic": "casa"
  },
  {
    "word": "rellotge",
    "syllables": [
      "re",
      "llot",
      "ge"
    ],
    "topic": "casa"
  },
  {
    "word": "mirall",
    "syllables": [
      "mi",
      "rall"
    ],
    "topic": "casa"
  },
  {
    "word": "coix\xED",
    "syllables": [
      "coi",
      "x\xED"
    ],
    "topic": "casa"
  },
  {
    "word": "catifa",
    "syllables": [
      "ca",
      "ti",
      "fa"
    ],
    "topic": "casa"
  },
  {
    "word": "dutxa",
    "syllables": [
      "dut",
      "xa"
    ],
    "topic": "casa"
  },
  {
    "word": "sab\xF3",
    "syllables": [
      "sa",
      "b\xF3"
    ],
    "topic": "casa"
  },
  {
    "word": "tovallola",
    "syllables": [
      "to",
      "va",
      "llo",
      "la"
    ],
    "topic": "casa"
  },
  {
    "word": "escala",
    "syllables": [
      "es",
      "ca",
      "la"
    ],
    "topic": "casa"
  },
  {
    "word": "armari",
    "syllables": [
      "ar",
      "ma",
      "ri"
    ],
    "topic": "casa"
  },
  {
    "word": "pa",
    "syllables": [
      "pa"
    ],
    "topic": "aliments"
  },
  {
    "word": "llet",
    "syllables": [
      "llet"
    ],
    "topic": "aliments"
  },
  {
    "word": "ou",
    "syllables": [
      "ou"
    ],
    "topic": "aliments"
  },
  {
    "word": "arr\xF2s",
    "syllables": [
      "ar",
      "r\xF2s"
    ],
    "topic": "aliments"
  },
  {
    "word": "sopa",
    "syllables": [
      "so",
      "pa"
    ],
    "topic": "aliments"
  },
  {
    "word": "pasta",
    "syllables": [
      "pas",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "patata",
    "syllables": [
      "pa",
      "ta",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "tom\xE0quet",
    "syllables": [
      "to",
      "m\xE0",
      "quet"
    ],
    "topic": "aliments"
  },
  {
    "word": "pastanaga",
    "syllables": [
      "pas",
      "ta",
      "na",
      "ga"
    ],
    "topic": "aliments"
  },
  {
    "word": "enciam",
    "syllables": [
      "en",
      "ci",
      "am"
    ],
    "topic": "aliments",
    "note": "Les vocals i i a formen un hiat: en-ci-am."
  },
  {
    "word": "ceba",
    "syllables": [
      "ce",
      "ba"
    ],
    "topic": "aliments"
  },
  {
    "word": "formatge",
    "syllables": [
      "for",
      "mat",
      "ge"
    ],
    "topic": "aliments"
  },
  {
    "word": "iogurt",
    "syllables": [
      "io",
      "gurt"
    ],
    "topic": "aliments"
  },
  {
    "word": "galeta",
    "syllables": [
      "ga",
      "le",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "xocolata",
    "syllables": [
      "xo",
      "co",
      "la",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "mandarina",
    "syllables": [
      "man",
      "da",
      "ri",
      "na"
    ],
    "topic": "aliments"
  },
  {
    "word": "taronja",
    "syllables": [
      "ta",
      "ron",
      "ja"
    ],
    "topic": "aliments"
  },
  {
    "word": "maduixa",
    "syllables": [
      "ma",
      "dui",
      "xa"
    ],
    "topic": "aliments"
  },
  {
    "word": "pl\xE0tan",
    "syllables": [
      "pl\xE0",
      "tan"
    ],
    "topic": "aliments"
  },
  {
    "word": "s\xEDndria",
    "syllables": [
      "s\xEDn",
      "dri",
      "a"
    ],
    "topic": "aliments",
    "note": "Les vocals i i a finals formen un hiat: s\xEDn-dri-a."
  },
  {
    "word": "pr\xE9ssec",
    "syllables": [
      "pr\xE9s",
      "sec"
    ],
    "topic": "aliments"
  },
  {
    "word": "ra\xEFm",
    "syllables": [
      "ra",
      "\xEFm"
    ],
    "topic": "aliments",
    "note": "La di\xE8resi indica que a i \xEF es pronuncien en s\xEDl\xB7labes diferents."
  },
  {
    "word": "mel",
    "syllables": [
      "mel"
    ],
    "topic": "aliments"
  },
  {
    "word": "sal",
    "syllables": [
      "sal"
    ],
    "topic": "aliments"
  },
  {
    "word": "cel",
    "syllables": [
      "cel"
    ],
    "topic": "natura"
  },
  {
    "word": "n\xFAvol",
    "syllables": [
      "n\xFA",
      "vol"
    ],
    "topic": "natura"
  },
  {
    "word": "pluja",
    "syllables": [
      "plu",
      "ja"
    ],
    "topic": "natura"
  },
  {
    "word": "neu",
    "syllables": [
      "neu"
    ],
    "topic": "natura"
  },
  {
    "word": "vent",
    "syllables": [
      "vent"
    ],
    "topic": "natura"
  },
  {
    "word": "riu",
    "syllables": [
      "riu"
    ],
    "topic": "natura"
  },
  {
    "word": "muntanya",
    "syllables": [
      "mun",
      "ta",
      "nya"
    ],
    "topic": "natura",
    "note": "El d\xEDgraf ny es mant\xE9 junt."
  },
  {
    "word": "pedra",
    "syllables": [
      "pe",
      "dra"
    ],
    "topic": "natura"
  },
  {
    "word": "arbre",
    "syllables": [
      "ar",
      "bre"
    ],
    "topic": "natura"
  },
  {
    "word": "bosc",
    "syllables": [
      "bosc"
    ],
    "topic": "natura"
  },
  {
    "word": "fulla",
    "syllables": [
      "fu",
      "lla"
    ],
    "topic": "natura"
  },
  {
    "word": "herba",
    "syllables": [
      "her",
      "ba"
    ],
    "topic": "natura"
  },
  {
    "word": "terra",
    "syllables": [
      "ter",
      "ra"
    ],
    "topic": "natura"
  },
  {
    "word": "sorra",
    "syllables": [
      "sor",
      "ra"
    ],
    "topic": "natura"
  },
  {
    "word": "estrella",
    "syllables": [
      "es",
      "tre",
      "lla"
    ],
    "topic": "natura"
  },
  {
    "word": "bolet",
    "syllables": [
      "bo",
      "let"
    ],
    "topic": "natura"
  },
  {
    "word": "roca",
    "syllables": [
      "ro",
      "ca"
    ],
    "topic": "natura"
  },
  {
    "word": "foc",
    "syllables": [
      "foc"
    ],
    "topic": "natura"
  },
  {
    "word": "bus",
    "syllables": [
      "bus"
    ],
    "topic": "transport"
  },
  {
    "word": "moto",
    "syllables": [
      "mo",
      "to"
    ],
    "topic": "transport"
  },
  {
    "word": "avi\xF3",
    "syllables": [
      "a",
      "vi",
      "\xF3"
    ],
    "topic": "transport",
    "note": "Les vocals i i \xF3 pertanyen a s\xEDl\xB7labes diferents."
  },
  {
    "word": "cami\xF3",
    "syllables": [
      "ca",
      "mi",
      "\xF3"
    ],
    "topic": "transport",
    "note": "Les vocals i i \xF3 formen un hiat: ca-mi-\xF3."
  },
  {
    "word": "barca",
    "syllables": [
      "bar",
      "ca"
    ],
    "topic": "transport"
  },
  {
    "word": "vaixell",
    "syllables": [
      "vai",
      "xell"
    ],
    "topic": "transport"
  },
  {
    "word": "bicicleta",
    "syllables": [
      "bi",
      "ci",
      "cle",
      "ta"
    ],
    "topic": "transport"
  },
  {
    "word": "patinet",
    "syllables": [
      "pa",
      "ti",
      "net"
    ],
    "topic": "transport"
  },
  {
    "word": "tractor",
    "syllables": [
      "trac",
      "tor"
    ],
    "topic": "transport"
  },
  {
    "word": "helic\xF2pter",
    "syllables": [
      "he",
      "li",
      "c\xF2p",
      "ter"
    ],
    "topic": "transport"
  },
  {
    "word": "ambul\xE0ncia",
    "syllables": [
      "am",
      "bu",
      "l\xE0n",
      "ci",
      "a"
    ],
    "topic": "transport"
  },
  {
    "word": "cap",
    "syllables": [
      "cap"
    ],
    "topic": "cos"
  },
  {
    "word": "peu",
    "syllables": [
      "peu"
    ],
    "topic": "cos"
  },
  {
    "word": "nas",
    "syllables": [
      "nas"
    ],
    "topic": "cos"
  },
  {
    "word": "ull",
    "syllables": [
      "ull"
    ],
    "topic": "cos"
  },
  {
    "word": "boca",
    "syllables": [
      "bo",
      "ca"
    ],
    "topic": "cos"
  },
  {
    "word": "bra\xE7",
    "syllables": [
      "bra\xE7"
    ],
    "topic": "cos"
  },
  {
    "word": "cama",
    "syllables": [
      "ca",
      "ma"
    ],
    "topic": "cos"
  },
  {
    "word": "dit",
    "syllables": [
      "dit"
    ],
    "topic": "cos"
  },
  {
    "word": "orella",
    "syllables": [
      "o",
      "re",
      "lla"
    ],
    "topic": "cos"
  },
  {
    "word": "panxa",
    "syllables": [
      "pan",
      "xa"
    ],
    "topic": "cos"
  },
  {
    "word": "cabell",
    "syllables": [
      "ca",
      "bell"
    ],
    "topic": "cos"
  },
  {
    "word": "esquena",
    "syllables": [
      "es",
      "que",
      "na"
    ],
    "topic": "cos"
  },
  {
    "word": "genoll",
    "syllables": [
      "ge",
      "noll"
    ],
    "topic": "cos"
  },
  {
    "word": "llengua",
    "syllables": [
      "llen",
      "gua"
    ],
    "topic": "cos"
  },
  {
    "word": "samarreta",
    "syllables": [
      "sa",
      "mar",
      "re",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "pantalons",
    "syllables": [
      "pan",
      "ta",
      "lons"
    ],
    "topic": "roba"
  },
  {
    "word": "jaqueta",
    "syllables": [
      "ja",
      "que",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "mitj\xF3",
    "syllables": [
      "mit",
      "j\xF3"
    ],
    "topic": "roba"
  },
  {
    "word": "faldilla",
    "syllables": [
      "fal",
      "di",
      "lla"
    ],
    "topic": "roba"
  },
  {
    "word": "vestit",
    "syllables": [
      "ves",
      "tit"
    ],
    "topic": "roba"
  },
  {
    "word": "bufanda",
    "syllables": [
      "bu",
      "fan",
      "da"
    ],
    "topic": "roba"
  },
  {
    "word": "gorra",
    "syllables": [
      "gor",
      "ra"
    ],
    "topic": "roba"
  },
  {
    "word": "guant",
    "syllables": [
      "guant"
    ],
    "topic": "roba"
  },
  {
    "word": "bot\xF3",
    "syllables": [
      "bo",
      "t\xF3"
    ],
    "topic": "roba"
  },
  {
    "word": "nina",
    "syllables": [
      "ni",
      "na"
    ],
    "topic": "joc"
  },
  {
    "word": "dau",
    "syllables": [
      "dau"
    ],
    "topic": "joc"
  },
  {
    "word": "joc",
    "syllables": [
      "joc"
    ],
    "topic": "joc"
  },
  {
    "word": "corda",
    "syllables": [
      "cor",
      "da"
    ],
    "topic": "joc"
  },
  {
    "word": "conte",
    "syllables": [
      "con",
      "te"
    ],
    "topic": "joc"
  },
  {
    "word": "can\xE7\xF3",
    "syllables": [
      "can",
      "\xE7\xF3"
    ],
    "topic": "joc"
  },
  {
    "word": "timbal",
    "syllables": [
      "tim",
      "bal"
    ],
    "topic": "joc"
  },
  {
    "word": "guitarra",
    "syllables": [
      "gui",
      "tar",
      "ra"
    ],
    "topic": "joc",
    "note": "El grup gu no se separa; el grup rr s\xED."
  },
  {
    "word": "piano",
    "syllables": [
      "pi",
      "a",
      "no"
    ],
    "topic": "joc",
    "note": "Les vocals i i a formen un hiat: pi-a-no."
  },
  {
    "word": "m\xFAsica",
    "syllables": [
      "m\xFA",
      "si",
      "ca"
    ],
    "topic": "joc"
  }
];
function normalize(text2) {
  return text2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("ca").trim();
}
function matchesWritten(word, query, position) {
  const w = normalize(word), q = normalize(query);
  if (!q) return true;
  if (position === "start") return w.startsWith(q);
  if (position === "end") return w.endsWith(q);
  if (position === "middle") {
    for (let i = 1; i + q.length < w.length; i++) if (w.slice(i, i + q.length) === q) return true;
    return false;
  }
  return w.includes(q);
}

// src/data/vocabularyStore.ts
import { useSyncExternalStore } from "react";

// src/data/vocabularyImport.ts
var VOCABULARY_SCHEMA = "qs33ds.eines-vocabulary.v1";
var MAX_CUSTOM_WORDS = 500;
var MAX_DOCUMENT_WORDS = MAX_CUSTOM_WORDS + vocabulary.length;
var canonical = (s) => s.trim().normalize("NFC").toLocaleLowerCase("ca");
var wordKey = (s) => canonical(s);
var letters = /^(?=.*\p{L})[\p{L}\p{M}·'’-]+$/u;
function validateWord(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("Cada entrada ha de ser un objecte amb word i syllables.");
  const item = input;
  if (typeof item.word !== "string" || !Array.isArray(item.syllables) || item.syllables.length < 1 || item.syllables.length > 8) throw Error("Cal una paraula i entre 1 i 8 s\xEDl\xB7labes expl\xEDcites.");
  const word = canonical(item.word);
  if (!word || word.length > 40 || !letters.test(word)) throw Error("La paraula ha de tenir entre 1 i 40 car\xE0cters, sense espais ni n\xFAmeros.");
  const syllables = item.syllables.map((s) => {
    if (typeof s !== "string") throw Error("Cada s\xEDl\xB7laba ha de ser text.");
    const value = canonical(s);
    if (!value || value.length > 40 || !letters.test(value)) throw Error("Les s\xEDl\xB7labes han de contenir lletres.");
    return value;
  });
  if (syllables.join("") !== word) throw Error(`Les s\xEDl\xB7labes de \xAB${word}\xBB no reconstrueixen la paraula. Revisa accents i separaci\xF3.`);
  return { word, syllables };
}
function parseVocabulary(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("El JSON no t\xE9 el format del banc de vocabulari.");
  const data = input;
  if (data.schema !== VOCABULARY_SCHEMA || data.language !== "ca" || !Array.isArray(data.words)) throw Error("Cal schema qs33ds.eines-vocabulary.v1, language ca i una llista words.");
  if (data.words.length < 1 || data.words.length > MAX_DOCUMENT_WORDS) throw Error(`El fitxer ha de contenir entre 1 i ${MAX_DOCUMENT_WORDS} paraules, incl\xF2s el banc inicial.`);
  const words = data.words.map((w, i) => {
    try {
      return validateWord(w);
    } catch (e) {
      throw Error(`Entrada ${i + 1}: ${e.message}`);
    }
  });
  const seen = /* @__PURE__ */ new Set();
  for (const w of words) {
    const key = wordKey(w.word);
    if (seen.has(key)) throw Error(`La paraula \xAB${w.word}\xBB est\xE0 repetida dins del fitxer.`);
    seen.add(key);
  }
  return words;
}
function parseVocabularyText(text2) {
  if (text2.length > 1e6) throw Error("El fitxer supera el l\xEDmit d\u20191 MB.");
  let data;
  try {
    data = JSON.parse(text2);
  } catch {
    throw Error("El fitxer no \xE9s un JSON v\xE0lid.");
  }
  return parseVocabulary(data);
}
function vocabularyDocument(words) {
  return { schema: VOCABULARY_SCHEMA, language: "ca", words };
}
function mergeVocabulary(base, custom, incoming) {
  const map = new Map([...base, ...custom].map((w) => [wordKey(w.word), w]));
  const additions = [];
  for (const w of incoming) {
    const existing = map.get(wordKey(w.word));
    if (existing) {
      if (existing.syllables.join("|") !== w.syllables.join("|")) throw Error(`\xAB${w.word}\xBB ja existeix amb una separaci\xF3 diferent. No s\u2019ha incorporat cap entrada.`);
      continue;
    }
    additions.push(w);
    map.set(wordKey(w.word), w);
  }
  if (custom.length + additions.length > MAX_CUSTOM_WORDS) throw Error("El banc personalitzat no pot superar 500 paraules.");
  return { custom: [...custom, ...additions], added: additions.length, skipped: incoming.length - additions.length };
}

// src/data/vocabularyStore.ts
var VOCABULARY_KEY = "qs33ds_eines_vocabulary_v1";
var initial = { words: vocabulary, custom: [], warning: "" };
function read() {
  try {
    if (typeof localStorage === "undefined") return initial;
    const raw = localStorage.getItem(VOCABULARY_KEY);
    if (!raw) return initial;
    const incoming = parseVocabulary(JSON.parse(raw));
    const merged = mergeVocabulary(vocabulary, [], incoming);
    return { words: [...vocabulary, ...merged.custom], custom: merged.custom, warning: "" };
  } catch {
    return { ...initial, warning: "No s\u2019ha pogut llegir el banc desat. Es conserva el banc inicial; el fitxer desat no s\u2019ha sobreescrit." };
  }
}
var state = read();
var listeners = /* @__PURE__ */ new Set();
function notify() {
  listeners.forEach((l) => l());
}
function save(custom) {
  let warning = "";
  try {
    if (typeof localStorage === "undefined") throw Error();
    if (custom.length) localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabularyDocument(custom)));
    else localStorage.removeItem(VOCABULARY_KEY);
  } catch {
    warning = "El navegador no permet desar el banc. Les paraules es mantenen en aquesta sessi\xF3; exporta-les per conservar-les.";
  }
  state = { words: [...vocabulary, ...custom], custom, warning };
  notify();
}
function addVocabulary(incoming) {
  const result = mergeVocabulary(vocabulary, state.custom, parseVocabulary(vocabularyDocument(incoming)));
  if (result.added) save(result.custom);
  return result;
}
function removeVocabulary(word) {
  save(state.custom.filter((w) => wordKey(w.word) !== wordKey(word)));
}
function getVocabularySnapshot() {
  return state;
}
function useVocabulary() {
  return useSyncExternalStore((l) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, getVocabularySnapshot, () => initial);
}
if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("storage", (e) => {
  if (e.key === VOCABULARY_KEY || e.key === null) {
    state = read();
    notify();
  }
});

// src/data/syllableActivities.ts
function boundaries(item) {
  let total = 0;
  return item.syllables.slice(0, -1).map((s) => {
    total += Array.from(s).length;
    return total;
  });
}
function correctBoundaries(item, selected) {
  const expected = boundaries(item);
  const actual = [...new Set(selected)].sort((a, b) => a - b);
  return expected.length === actual.length && expected.every((n, i) => n === actual[i]);
}
function correctOrder(item, order) {
  return order.length === item.syllables.length && new Set(order).size === order.length && order.every((i) => Number.isInteger(i) && i >= 0 && i < item.syllables.length) && order.map((i) => item.syllables[i]).join("|") === item.syllables.join("|");
}
function shuffledIndices(length) {
  const a = Array.from({ length }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((v, i) => v === i)) a.push(a.shift());
  return a;
}

// src/modules/Syllables.tsx
import { Fragment as Fragment3, jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next, previous, mode, uppercase }) {
  const [answer, setAnswer] = useState6(null), [revealed, setRevealed] = useState6(false), [cuts, setCuts] = useState6([]), [order, setOrder] = useState6([]), [result, setResult] = useState6(null);
  const [tokens] = useState6(() => shuffledIndices(item.syllables.length));
  const show = (s) => uppercase ? s.toLocaleUpperCase("ca") : s;
  const letters2 = Array.from(item.word);
  function check() {
    setResult(mode === "split" ? correctBoundaries(item, cuts) : correctOrder(item, order));
  }
  return /* @__PURE__ */ jsxs8("section", { className: "syllable-question", children: [
    /* @__PURE__ */ jsxs8("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx8("span", { children: "SEPARACI\xD3 SIL\xB7L\xC0BICA" }),
      /* @__PURE__ */ jsxs8("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx8("p", { children: mode === "count" ? "Digues la paraula i fes una picada de mans per cada s\xEDl\xB7laba." : mode === "split" ? "Marca els l\xEDmits entre les s\xEDl\xB7labes. Si nom\xE9s en t\xE9 una, no marquis cap tall." : "Tria les s\xEDl\xB7labes en l\u2019ordre correcte per formar la paraula." }),
    /* @__PURE__ */ jsx8("div", { className: "syllable-word", children: show(item.word) }),
    mode === "count" ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
      /* @__PURE__ */ jsx8("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
      /* @__PURE__ */ jsx8("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx8("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
        setAnswer(n);
        setResult(n === item.syllables.length);
      }, children: n }, n)) })
    ] }) : mode === "split" ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
      /* @__PURE__ */ jsx8("div", { className: "letter-boundaries", role: "group", "aria-label": "L\xEDmits entre s\xEDl\xB7labes", children: letters2.map((letter, i) => /* @__PURE__ */ jsxs8("span", { children: [
        /* @__PURE__ */ jsx8("b", { children: show(letter) }),
        i < letters2.length - 1 && /* @__PURE__ */ jsx8("button", { className: cuts.includes(i + 1) ? "cut chosen" : "cut", "aria-label": `Separa despr\xE9s de ${letters2.slice(0, i + 1).join("")} (posici\xF3 ${i + 1})`, "aria-pressed": cuts.includes(i + 1), onClick: () => {
          setCuts((c) => c.includes(i + 1) ? c.filter((n) => n !== i + 1) : [...c, i + 1]);
          setResult(null);
        }, children: cuts.includes(i + 1) ? "|" : "\uFF0B" })
      ] }, i)) }),
      /* @__PURE__ */ jsx8("button", { className: "action primary", onClick: check, children: "Comprova la separaci\xF3" }),
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => {
        setCuts([]);
        setResult(null);
      }, children: "Esborra els talls" })
    ] }) : /* @__PURE__ */ jsxs8(Fragment3, { children: [
      /* @__PURE__ */ jsx8("div", { className: "assembled-word", "aria-label": "S\xEDl\xB7labes ordenades", children: order.length ? order.map((i) => /* @__PURE__ */ jsx8("span", { children: show(item.syllables[i]) }, i)) : /* @__PURE__ */ jsx8("span", { children: "Tria la primera s\xEDl\xB7laba." }) }),
      /* @__PURE__ */ jsx8("div", { className: "syllable-parts", children: tokens.map((i) => /* @__PURE__ */ jsx8("button", { className: "action", disabled: order.includes(i), onClick: () => {
        setOrder((o) => [...o, i]);
        setResult(null);
      }, children: show(item.syllables[i]) }, i)) }),
      /* @__PURE__ */ jsxs8("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx8("button", { className: "action primary", disabled: order.length !== item.syllables.length, onClick: check, children: "Comprova l\u2019ordre" }),
        /* @__PURE__ */ jsx8("button", { className: "action", disabled: !order.length, onClick: () => {
          setOrder((o) => o.slice(0, -1));
          setResult(null);
        }, children: "Desf\xE9s l\u2019\xFAltima s\xEDl\xB7laba" }),
        /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => {
          setOrder([]);
          setResult(null);
        }, children: "Torna a ordenar" })
      ] })
    ] }),
    /* @__PURE__ */ jsx8("p", { className: "syllable-feedback", role: "status", children: result === null ? mode === "count" ? "Tria una resposta." : "Prepara la resposta i comprova-la." : result ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. POTS CONSULTAR LA SOLUCI\xD3." }),
    revealed && /* @__PURE__ */ jsxs8("div", { className: "syllable-solution", children: [
      /* @__PURE__ */ jsx8("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx8("span", { children: show(s) }, i)) }),
      /* @__PURE__ */ jsxs8("p", { children: [
        item.syllables.length,
        " ",
        item.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes",
        item.note ? ` \xB7 ${item.note}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: previous, children: "\u2190 Paraula anterior" }),
      /* @__PURE__ */ jsx8("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] })
  ] });
}
function Syllables() {
  const id = useId3(), bank = useVocabulary();
  const [source, setSource] = useState6("all"), [index, setIndex] = useState6(0), [mode, setMode] = useState6("count"), [count, setCount] = useState6("all"), [topic, setTopic] = useState6("all"), [uppercase, setUppercase] = useState6(true);
  const words = useMemo(() => {
    const pool = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
    return pool.filter((w) => (count === "all" || w.syllables.length === Number(count)) && (topic === "all" || w.topic === topic));
  }, [bank, source, count, topic]);
  const current = index % Math.max(1, words.length), item = words[current];
  return /* @__PURE__ */ jsxs8("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs8("div", { className: "syllable-controls form-grid", children: [
      /* @__PURE__ */ jsxs8("label", { htmlFor: id + "source", children: [
        "Paraules de l\u2019activitat",
        /* @__PURE__ */ jsxs8("select", { id: id + "source", value: source, onChange: (e) => {
          setSource(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx8("option", { value: "all", children: "Tot el banc compartit" }),
          /* @__PURE__ */ jsx8("option", { value: "base", children: "Banc inicial revisat" }),
          /* @__PURE__ */ jsx8("option", { value: "custom", children: "Nom\xE9s personalitzades" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("label", { htmlFor: id + "mode", children: [
        "Activitat",
        /* @__PURE__ */ jsxs8("select", { id: id + "mode", value: mode, onChange: (e) => setMode(e.target.value), children: [
          /* @__PURE__ */ jsx8("option", { value: "count", children: "Compta les s\xEDl\xB7labes" }),
          /* @__PURE__ */ jsx8("option", { value: "split", children: "Marca la separaci\xF3" }),
          /* @__PURE__ */ jsx8("option", { value: "order", children: "Ordena les s\xEDl\xB7labes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("label", { htmlFor: id + "count", children: [
        "Nombre de s\xEDl\xB7labes",
        /* @__PURE__ */ jsxs8("select", { id: id + "count", value: count, onChange: (e) => {
          setCount(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx8("option", { value: "all", children: "Qualsevol" }),
          Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsxs8("option", { value: i + 1, children: [
            i + 1,
            " ",
            i === 0 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
          ] }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("label", { htmlFor: id + "topic", children: [
        "Tema",
        /* @__PURE__ */ jsxs8("select", { id: id + "topic", value: topic, onChange: (e) => {
          setTopic(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx8("option", { value: "all", children: "Qualsevol tema" }),
          Object.entries(topics).map(([key, label]) => /* @__PURE__ */ jsx8("option", { value: key, children: label }, key))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "syllable-toolbar", children: [
      /* @__PURE__ */ jsxs8("label", { children: [
        /* @__PURE__ */ jsx8("input", { type: "checkbox", checked: uppercase, onChange: (e) => setUppercase(e.target.checked) }),
        " Mostra les paraules en maj\xFAscules"
      ] }),
      /* @__PURE__ */ jsx8("button", { className: "action", disabled: !words.length, onClick: () => setIndex((i) => words.length > 1 ? i + 1 + Math.floor(Math.random() * (words.length - 1)) : i + 1), children: "Tria una paraula a l\u2019atzar" }),
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => {
        setCount("all");
        setTopic("all");
        setSource("all");
        setIndex(0);
      }, children: "Neteja els filtres" })
    ] }),
    /* @__PURE__ */ jsxs8("p", { className: "hint", children: [
      words.length,
      " ",
      words.length === 1 ? "paraula disponible" : "paraules disponibles",
      " amb aquests filtres \xB7 ",
      vocabulary.length,
      " al banc inicial."
    ] }),
    item ? /* @__PURE__ */ jsx8(SyllableQuestion, { item, index: current, total: words.length, uppercase, mode, next: () => setIndex((i) => i + 1), previous: () => setIndex((i) => i === 0 ? words.length - 1 : i - 1) }, [source, mode, count, topic, index, item.word, item.syllables.join("|")].join(":")) : /* @__PURE__ */ jsx8("p", { role: "status", children: "No hi ha paraules amb aquests filtres. Neteja\u2019ls o importa paraules des del Banc de paraules." }),
    /* @__PURE__ */ jsxs8("details", { className: "syllable-guide", children: [
      /* @__PURE__ */ jsx8("summary", { children: "Orientacions i criteris ling\xFC\xEDstics" }),
      /* @__PURE__ */ jsx8("p", { children: "Una s\xEDl\xB7laba \xE9s un cop de veu. El nombre de lletres no determina el nombre de s\xEDl\xB7labes. Els d\xEDgrafs ll i ny es mantenen junts; en mots com cotxe i platja, tx i tj es reparteixen entre dues s\xEDl\xB7labes. Cal tenir en compte els diftongs i els hiats." }),
      /* @__PURE__ */ jsx8("p", { children: "Practiquem la divisi\xF3 sil\xB7l\xE0bica de paraules a\xEFllades. La partici\xF3 a final de ratlla t\xE9 restriccions addicionals: no \xE9s el mateix exercici. Les separacions importades les ha de revisar el docent." }),
      /* @__PURE__ */ jsxs8("p", { children: [
        "Fonts: ",
        /* @__PURE__ */ jsx8("a", { href: "https://www.cpnl.cat/gramatica/39/15-les-sil-labes", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Les s\xEDl\xB7labes" }),
        " \xB7 ",
        /* @__PURE__ */ jsx8("a", { href: "https://www.cpnl.cat/gramatica/32/16-la-separacio-de-sil-labes-amb-diftongs-i-hiats", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Diftongs i hiats" })
      ] })
    ] })
  ] });
}

// src/modules/Words.tsx
import { useId as useId5, useState as useState8 } from "react";

// src/components/VocabularyEditor.tsx
import { useId as useId4, useRef as useRef3, useState as useState7 } from "react";
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
var example = vocabularyDocument([{ word: "motxilla", syllables: ["mot", "xi", "lla"] }]);
function VocabularyEditor() {
  const id = useId4(), bank = useVocabulary();
  const [word, setWord] = useState7(""), [parts, setParts] = useState7(""), [message, setMessage] = useState7(""), [error, setError] = useState7(""), [pending, setPending] = useState7(null);
  const [removed, setRemoved] = useState7(null);
  const [busy, setBusy] = useState7(false);
  const [jsonText, setJsonText] = useState7("");
  const file = useRef3(null);
  function preview(text2) {
    setError("");
    setMessage("");
    setPending(null);
    try {
      setPending(parseVocabularyText(text2));
    } catch (e) {
      setError(e.message);
    }
  }
  async function readFile(f) {
    if (!f) return;
    setError("");
    setMessage("");
    setPending(null);
    setBusy(true);
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
  return /* @__PURE__ */ jsxs9("details", { className: "vocabulary-editor", children: [
    /* @__PURE__ */ jsx9("summary", { children: "Amplia i conserva el banc de paraules" }),
    /* @__PURE__ */ jsx9("p", { children: "Les paraules afegides es comparteixen amb el laboratori de s\xEDl\xB7labes i es desen nom\xE9s en aquest navegador. Exporta una c\xF2pia per portar-les a un altre dispositiu." }),
    bank.warning && /* @__PURE__ */ jsx9("p", { role: "alert", children: bank.warning }),
    /* @__PURE__ */ jsxs9("form", { onSubmit: (e) => {
      e.preventDefault();
      setError("");
      setMessage("");
      try {
        const entry = validateWord({ word, syllables: parts.trim().split(/\s*[·\-]\s*|\s+/u) });
        const result = addVocabulary([entry]);
        setMessage(result.added ? "Paraula afegida al banc compartit." : "Aquesta paraula ja \xE9s al banc.");
        setWord("");
        setParts("");
      } catch (e2) {
        setError(e2.message);
      }
    }, children: [
      /* @__PURE__ */ jsxs9("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs9("label", { htmlFor: id + "word", children: [
          "Paraula nova",
          /* @__PURE__ */ jsx9("input", { id: id + "word", maxLength: 40, value: word, onChange: (e) => setWord(e.target.value), placeholder: "motxilla", required: true })
        ] }),
        /* @__PURE__ */ jsxs9("label", { htmlFor: id + "parts", children: [
          "S\xEDl\xB7labes separades per guions",
          /* @__PURE__ */ jsx9("input", { id: id + "parts", maxLength: 100, value: parts, onChange: (e) => setParts(e.target.value), placeholder: "mot-xi-lla", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx9("button", { className: "action primary", disabled: !word.trim() || !parts.trim(), children: "Afegeix al banc" })
    ] }),
    /* @__PURE__ */ jsxs9("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx9("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa JSON" }),
      /* @__PURE__ */ jsx9("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari.json", vocabularyDocument(bank.words)), children: "Exporta el banc JSON" }),
      /* @__PURE__ */ jsx9("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari_model.json", example), children: "Descarrega el model JSON" })
    ] }),
    /* @__PURE__ */ jsx9("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer JSON de vocabulari", accept: ".json,application/json", onChange: (e) => {
      void readFile(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsxs9("details", { children: [
      /* @__PURE__ */ jsx9("summary", { children: "O enganxa el JSON directament" }),
      /* @__PURE__ */ jsx9("label", { htmlFor: id + "json", children: "JSON per importar" }),
      /* @__PURE__ */ jsx9("textarea", { id: id + "json", rows: 7, maxLength: 1e6, value: jsonText, onChange: (e) => setJsonText(e.target.value), placeholder: "Enganxa el document JSON complet..." }),
      /* @__PURE__ */ jsx9("button", { className: "action", disabled: busy || !jsonText.trim(), onClick: () => preview(jsonText), children: "Valida el JSON enganxat" })
    ] }),
    pending && /* @__PURE__ */ jsxs9("section", { className: "import-preview", "aria-label": "Revisi\xF3 de la importaci\xF3", children: [
      /* @__PURE__ */ jsxs9("strong", { children: [
        pending.length,
        " ",
        pending.length === 1 ? "entrada amb format v\xE0lid" : "entrades amb format v\xE0lid"
      ] }),
      /* @__PURE__ */ jsxs9("p", { children: [
        pending.slice(0, 5).map((w) => `${w.word}: ${w.syllables.join(" \u2013 ")}`).join("; "),
        pending.length > 5 ? "\u2026" : ""
      ] }),
      /* @__PURE__ */ jsx9("p", { children: "La validaci\xF3 comprova el format i la reconstrucci\xF3 de cada paraula; revisa que la separaci\xF3 ling\xFC\xEDstica sigui correcta." }),
      /* @__PURE__ */ jsxs9("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx9("button", { className: "action primary", onClick: () => {
          setError("");
          try {
            const r = addVocabulary(pending);
            setMessage(`${r.added} ${r.added === 1 ? "paraula afegida" : "paraules afegides"}; ${r.skipped} ${r.skipped === 1 ? "ja existia" : "ja existien"}.`);
            setPending(null);
          } catch (e) {
            setError(e.message);
          }
        }, children: "Incorpora les paraules" }),
        /* @__PURE__ */ jsx9("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la la importaci\xF3" })
      ] })
    ] }),
    message && /* @__PURE__ */ jsx9("p", { role: "status", children: message }),
    error && /* @__PURE__ */ jsx9("p", { role: "alert", children: error }),
    bank.custom.length > 0 && /* @__PURE__ */ jsxs9("details", { children: [
      /* @__PURE__ */ jsxs9("summary", { children: [
        "Paraules personalitzades (",
        bank.custom.length,
        "/500)"
      ] }),
      /* @__PURE__ */ jsx9("ul", { className: "custom-words", children: bank.custom.map((w) => /* @__PURE__ */ jsxs9("li", { children: [
        /* @__PURE__ */ jsxs9("span", { children: [
          w.word.toLocaleUpperCase("ca"),
          " \xB7 ",
          w.syllables.join(" \u2013 ")
        ] }),
        /* @__PURE__ */ jsx9("button", { className: "action", "aria-label": `Elimina ${w.word}`, onClick: () => {
          setRemoved(w);
          removeVocabulary(w.word);
          setMessage(`\xAB${w.word}\xBB eliminada del banc personalitzat.`);
        }, children: "Elimina" })
      ] }, w.word)) })
    ] }),
    removed && /* @__PURE__ */ jsx9("button", { className: "action", onClick: () => {
      setError("");
      try {
        addVocabulary([removed]);
        setRemoved(null);
        setMessage("Paraula restaurada.");
      } catch (e) {
        setError(e.message);
      }
    }, children: "Desf\xE9s l\u2019\xFAltima eliminaci\xF3" }),
    /* @__PURE__ */ jsxs9("details", { children: [
      /* @__PURE__ */ jsx9("summary", { children: "Format compatible per generar paraules amb ChatGPT" }),
      /* @__PURE__ */ jsx9("p", { children: "Demana paraules en catal\xE0 amb aquest format, sense explicacions fora del JSON. Cada word ha de coincidir amb la uni\xF3 de les syllables. No hi incloguis dades d\u2019alumnat." }),
      /* @__PURE__ */ jsx9("pre", { children: JSON.stringify(example, null, 2) })
    ] })
  ] });
}

// src/modules/Words.tsx
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
function Words() {
  const { words: vocabulary2 } = useVocabulary();
  const id = useId5();
  const [query, setQuery] = useState8(""), [position, setPosition] = useState8("any");
  const filtered = vocabulary2.filter((w) => matchesWritten(w.word, query, position));
  return /* @__PURE__ */ jsxs10("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx10("div", { className: "tool-top", children: /* @__PURE__ */ jsx10("span", { children: "BANC COMPARTIT DE VOCABULARI" }) }),
    /* @__PURE__ */ jsx10("p", { className: "hint", children: "Cerca lletres o s\xEDl\xB7labes escrites. S\u2019ignoren els accents en la cerca; no \xE9s una classificaci\xF3 fon\xE8tica." }),
    /* @__PURE__ */ jsxs10("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs10("label", { htmlFor: id + "q", children: [
        "Lletra o s\xEDl\xB7laba",
        /* @__PURE__ */ jsx10("input", { id: id + "q", maxLength: 30, value: query, placeholder: "Ex.: ma, p, ca...", onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs10("label", { htmlFor: id + "pos", children: [
        "Posici\xF3",
        /* @__PURE__ */ jsxs10("select", { id: id + "pos", value: position, onChange: (e) => setPosition(e.target.value), children: [
          /* @__PURE__ */ jsx10("option", { value: "any", children: "Qualsevol" }),
          /* @__PURE__ */ jsx10("option", { value: "start", children: "Al principi" }),
          /* @__PURE__ */ jsx10("option", { value: "middle", children: "Al mig" }),
          /* @__PURE__ */ jsx10("option", { value: "end", children: "Al final" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("p", { role: "status", children: [
      filtered.length,
      " ",
      filtered.length === 1 ? "paraula" : "paraules"
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "word-bank", children: filtered.map((w) => /* @__PURE__ */ jsxs10("article", { children: [
      /* @__PURE__ */ jsx10("strong", { children: w.word.toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsx10("span", { children: w.syllables.join(" \u2013 ").toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsxs10("small", { children: [
        w.syllables.length,
        " ",
        w.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
      ] })
    ] }, w.word)) }),
    !filtered.length && /* @__PURE__ */ jsx10("p", { children: "Cap paraula del banc coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx10("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" }),
    /* @__PURE__ */ jsx10(VocabularyEditor, {})
  ] });
}

// src/modules/Guidelines.tsx
import { useId as useId6, useState as useState9 } from "react";
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
function Guidelines() {
  const id = useId6();
  const [height, setHeight] = useState9(2), [rows, setRows] = useState9(7), [model, setModel] = useState9(""), [title, setTitle] = useState9("PRACTIQUEM L\u2019ESCRIPTURA");
  function printSheet() {
    document.body.classList.add("printing-guidelines");
    const cleanup = () => document.body.classList.remove("printing-guidelines");
    window.addEventListener("afterprint", cleanup, { once: true });
    try {
      window.print();
    } finally {
      cleanup();
    }
  }
  return /* @__PURE__ */ jsxs11("div", { className: "tool-surface guidelines-tool", children: [
    /* @__PURE__ */ jsxs11("div", { className: "guidelines-controls", children: [
      /* @__PURE__ */ jsx11("div", { className: "tool-top", children: /* @__PURE__ */ jsx11("span", { children: "PAUTES A4 \xB7 MESURES EN CENT\xCDMETRES" }) }),
      /* @__PURE__ */ jsxs11("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs11("label", { htmlFor: id + "title", children: [
          "T\xEDtol",
          /* @__PURE__ */ jsx11("input", { id: id + "title", maxLength: 60, value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs11("label", { htmlFor: id + "model", children: [
          "Model (opcional)",
          /* @__PURE__ */ jsx11("input", { id: id + "model", maxLength: 40, value: model, onChange: (e) => setModel(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs11("label", { htmlFor: id + "height", children: [
          "Al\xE7ada entre les dues l\xEDnies",
          /* @__PURE__ */ jsxs11("select", { id: id + "height", value: height, onChange: (e) => setHeight(Number(e.target.value)), children: [
            /* @__PURE__ */ jsx11("option", { value: 1, children: "1 cm" }),
            /* @__PURE__ */ jsx11("option", { value: 1.5, children: "1,5 cm" }),
            /* @__PURE__ */ jsx11("option", { value: 2, children: "2 cm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("label", { htmlFor: id + "rows", children: [
          "Nombre de pautes",
          /* @__PURE__ */ jsx11("select", { id: id + "rows", value: rows, onChange: (e) => setRows(Number(e.target.value)), children: [4, 5, 6, 7].map((n) => /* @__PURE__ */ jsx11("option", { value: n, children: n }, n)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx11("button", { className: "action primary", onClick: printSheet, children: "Imprimeix / Desa com a PDF" }),
        /* @__PURE__ */ jsx11("a", { className: "action", href: "../referents-escriptura.html", target: "_blank", rel: "noopener noreferrer", children: "Obre els referents QS33DS" })
      ] }),
      /* @__PURE__ */ jsx11("p", { className: "hint", children: "A4 vertical, escala 100 %, sense cap\xE7aleres ni peus del navegador. La vista en pantalla s\u2019ajusta a l\u2019espai; el document impr\xE8s conserva les mesures." })
    ] }),
    /* @__PURE__ */ jsx11("div", { className: "writing-preview", children: /* @__PURE__ */ jsxs11("article", { className: "writing-sheet", style: { "--rule-height": height + "cm" }, children: [
      /* @__PURE__ */ jsx11("h2", { children: title || "PRACTIQUEM L\u2019ESCRIPTURA" }),
      /* @__PURE__ */ jsxs11("div", { className: "writing-meta", children: [
        /* @__PURE__ */ jsx11("span", { children: "NOM: _______________________" }),
        /* @__PURE__ */ jsx11("span", { children: "DATA: ______________" })
      ] }),
      Array.from({ length: rows }, (_, i) => /* @__PURE__ */ jsxs11("div", { className: "writing-row", children: [
        /* @__PURE__ */ jsx11("span", { children: model }),
        /* @__PURE__ */ jsx11("div", { className: "writing-rule" })
      ] }, i)),
      /* @__PURE__ */ jsxs11("p", { className: "writing-credit", children: [
        "QS33DS \xB7 PAUTA DE ",
        height.toLocaleString("ca"),
        " CM"
      ] })
    ] }) })
  ] });
}

// src/components/ToolContent.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var components = { timer: Timer, sequence: Sequence, groups: Groups, autonomy: Autonomy, observation: Observation, syllables: Syllables, words: Words, guidelines: Guidelines };
function ToolContent({ id }) {
  const Component = components[id];
  return /* @__PURE__ */ jsx12(Component, {});
}

// tests/workspace.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
for (const t of tools) {
  assert.equal(toolLaunch("?tool=" + t.id).tool, t.id);
  assert.equal(toolLaunch("?tool=" + t.id + "&embed=1").embedded, true);
  assert(renderToStaticMarkup(/* @__PURE__ */ jsx13(ToolContent, { id: t.id })).length > 100);
}
for (const invalid of ["?tool=javascript:alert(1)&embed=1", "?tool=../../files", "?embed=1", "?tool=", "?tool=unknown"]) assert.deepEqual(toolLaunch(invalid), { tool: null, embedded: false });
assert.equal(panelTools.length, tools.filter((t) => t.ready).length);
assert.equal(standaloneTool(DEFAULT_PANEL_TOOL), "eines-aula/?tool=timer");
assert.deepEqual(preferences({ quad: true, day: 4, tool: DEFAULT_PANEL_TOOL }), { quad: true, day: 4, tool: DEFAULT_PANEL_TOOL });
for (const day of [-1, 5, NaN, 1.5, "2"]) assert.equal(preferences({ day }, 3).day, 3);
for (const tool of ["https://evil.invalid/", "javascript:alert(1)", "../files/"]) assert.equal(preferences({ tool }, 0).tool, DEFAULT_PANEL_TOOL);
assert.equal(preferences(null, 2).day, 2);
console.log("PASS: eight shared module renders, direct and embedded launches, invalid tool rejection, safe preference fallback and standalone links.");
