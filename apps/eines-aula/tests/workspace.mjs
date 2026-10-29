// tests/workspace.tsx
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";

// src/catalog.ts
var tools = [
  { id: "timer", name: "Temporitzador Visual", category: "Gesti\xF3", description: "Fes visible el temps i facilita les transicions.", ready: true, index: "01" },
  { id: "sequence", name: "Ara i Despr\xE9s", category: "Suport", description: "Anticipa qu\xE8 fem ara i qu\xE8 vindr\xE0 despr\xE9s.", ready: true, index: "02" },
  { id: "groups", name: "Selector d'Alumnes", category: "Gesti\xF3", description: "Organitza torns, parelles i petits grups.", ready: true, index: "03" },
  { id: "autonomy", name: "Checklist d'Autonomia", category: "Suport", description: "Descompon rutines en passos accessibles.", ready: true, index: "04" },
  { id: "observation", name: "Registre d'Observaci\xF3", category: "Seguiment", description: "Registra evid\xE8ncies educatives amb privacitat.", ready: true, index: "05" },
  { id: "syllables", name: "Laboratori de S\xEDl\xB7labes", category: "Llenguatge", description: "Activitats de consci\xE8ncia sil\xB7l\xE0bica.", ready: true, index: "06" },
  { id: "words", name: "Banc de Paraules per Sons", category: "Llenguatge", description: "Cerca lletres i s\xEDl\xB7labes escrites en paraules.", ready: true, index: "07" },
  { id: "guidelines", name: "Generador de Pautes", category: "Materials", description: "Pautes d'escriptura i materials imprimibles.", ready: true, index: "08" }
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
  ["eines-aula/", "Eines d\u2019Aula", "Vuit temporitzadors, seq\xFC\xE8ncies i grups", "\u25F7"],
  ["files/", "FILES \xB7 La meva nube", "Documents privats i carpetes", "\u2601"],
  ["lecto-publisher.html", "LECTO Publisher \xB7 v1.3", "Quaderns de lectura i escriptura", "\u25A4"],
  ["pictogrames.html", "Pictogrames", "Comunicaci\xF3 i suport visual", "\u25C8"],
  ["lecto.html", "Lecto", "Lectura i flu\xEFdesa", "Aa"],
  ["observapt.html", "Observa PT", "Observaci\xF3 i seguiment", "\u25CE"],
  ["laboratori-nombres.html", "Laboratori de Nombres", "Numeraci\xF3 i c\xE0lcul", "123"],
  ["referents-escriptura.html", "Referents d\u2019escriptura", "Vocabulari i autonomia", "\u270E"],
  ["calendari.html", "Calendari escolar", "Reunions i organitzaci\xF3", "\u25A6"],
  ["mi-tablon.html", "Mi Tabl\xF3n", "Notes i llistes", "\u2611"],
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

// src/modules/Autonomy.tsx
import { useId, useState as useState4 } from "react";
import { Plus, RotateCcw as RotateCcw3, Trash2, Undo2 } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var defaults = ["Preparo el material", "Escolto les instruccions", "Faig l\u2019activitat", "Reviso la feina", "Recullo el material"];
function Autonomy() {
  const prefix = useId();
  const [title, setTitle] = useState4("LA MEVA RUTINA");
  const [steps, setSteps] = useState4(() => defaults.map((text, id) => ({ id, text, done: false })));
  const [draft, setDraft] = useState4("");
  const [serial, setSerial] = useState4(defaults.length);
  const [removed, setRemoved] = useState4(null);
  const completed = steps.filter((s) => s.done).length;
  function add() {
    const text = draft.trim();
    if (!text || steps.length >= 30) return;
    setSteps((s) => [...s, { id: serial, text, done: false }]);
    setSerial((s) => s + 1);
    setDraft("");
  }
  return /* @__PURE__ */ jsxs5("div", { className: "tool-surface autonomy-tool", children: [
    /* @__PURE__ */ jsxs5("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx5("span", { children: "AUTONOMIA PAS A PAS" }),
      /* @__PURE__ */ jsx5("span", { className: "micro-tag", children: "RUTINA VISUAL" })
    ] }),
    /* @__PURE__ */ jsx5("label", { className: "field-label", htmlFor: prefix + "title", children: "Nom de la rutina" }),
    /* @__PURE__ */ jsx5("input", { id: prefix + "title", maxLength: 80, value: title, onChange: (e) => setTitle(e.target.value) }),
    /* @__PURE__ */ jsxs5("div", { className: "routine-progress", children: [
      /* @__PURE__ */ jsx5("strong", { children: title || "LA MEVA RUTINA" }),
      /* @__PURE__ */ jsx5("p", { role: "status", children: steps.length && completed === steps.length ? "RUTINA COMPLETADA!" : `${completed} DE ${steps.length} PASSOS FETS` }),
      /* @__PURE__ */ jsx5("progress", { "aria-label": "Progr\xE9s de la rutina", value: completed, max: steps.length || 1 })
    ] }),
    /* @__PURE__ */ jsx5("ol", { className: "routine-steps", children: steps.map((step, index) => /* @__PURE__ */ jsxs5("li", { className: step.done ? "is-done" : "", children: [
      /* @__PURE__ */ jsx5("span", { className: "step-number", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxs5("label", { className: "step-check", children: [
        /* @__PURE__ */ jsx5("input", { type: "checkbox", checked: step.done, "aria-label": `Marca el pas ${index + 1} com a fet`, onChange: () => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, done: !x.done } : x)) }),
        /* @__PURE__ */ jsx5("span", { children: step.done ? "FET" : "PENDENT" })
      ] }),
      /* @__PURE__ */ jsx5("input", { className: "step-text", "aria-label": `Text del pas ${index + 1}`, maxLength: 120, value: step.text, onChange: (e) => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, text: e.target.value } : x)) }),
      /* @__PURE__ */ jsx5("button", { className: "icon-btn", "aria-label": `Elimina el pas ${index + 1}`, onClick: () => {
        setRemoved({ step, index });
        setSteps((s) => s.filter((x) => x.id !== step.id));
      }, children: /* @__PURE__ */ jsx5(Trash2, { size: 18 }) })
    ] }, step.id)) }),
    !steps.length && /* @__PURE__ */ jsx5("p", { className: "hint", children: "Afegeix el primer pas per preparar la teva rutina." }),
    removed && /* @__PURE__ */ jsxs5("button", { disabled: steps.length >= 30, className: "action", onClick: () => {
      setSteps((s) => {
        const a = [...s];
        a.splice(Math.min(removed.index, a.length), 0, removed.step);
        return a;
      });
      setRemoved(null);
    }, children: [
      /* @__PURE__ */ jsx5(Undo2, { size: 17 }),
      " Desf\xE9s l\u2019\xFAltima eliminaci\xF3"
    ] }),
    /* @__PURE__ */ jsxs5("form", { className: "routine-add", onSubmit: (e) => {
      e.preventDefault();
      add();
    }, children: [
      /* @__PURE__ */ jsx5("label", { className: "field-label", htmlFor: prefix + "new", children: "Nou pas (m\xE0xim 30)" }),
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx5("input", { id: prefix + "new", value: draft, maxLength: 120, placeholder: "Escriu un pas curt...", onChange: (e) => setDraft(e.target.value) }),
        /* @__PURE__ */ jsxs5("button", { className: "action primary", disabled: !draft.trim() || steps.length >= 30, children: [
          /* @__PURE__ */ jsx5(Plus, { size: 18 }),
          " Afegeix"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("button", { className: "action", disabled: !completed, onClick: () => {
      setSteps((s) => s.map((x) => ({ ...x, done: false })));
      setRemoved((r) => r ? { ...r, step: { ...r.step, done: false } } : null);
    }, children: [
      /* @__PURE__ */ jsx5(RotateCcw3, { size: 17 }),
      " Torna a comen\xE7ar"
    ] }),
    /* @__PURE__ */ jsx5("p", { className: "hint", children: "La rutina es mant\xE9 en minimitzar. Es reinicia en recarregar la p\xE0gina; no es desa cap dada personal." })
  ] });
}

// src/modules/Observation.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function Observation() {
  return /* @__PURE__ */ jsxs6("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx6("div", { className: "tool-top", children: /* @__PURE__ */ jsx6("span", { children: "OBSERVAPT \xB7 EINA QS33DS EXISTENT" }) }),
    /* @__PURE__ */ jsx6("p", { className: "hint", children: "Registre funcional complet. ObservaPT desa les dades en aquest navegador: fes servir \xE0lies i exporta els registres que vulguis conservar." }),
    /* @__PURE__ */ jsx6("a", { className: "action", href: "../observapt.html", target: "_blank", rel: "noopener noreferrer", children: "Obre ObservaPT en una pestanya" }),
    /* @__PURE__ */ jsx6("iframe", { className: "existing-tool", src: "../observapt.html", title: "ObservaPT \xB7 Registre d\u2019observaci\xF3 funcional" }),
    /* @__PURE__ */ jsx6("p", { className: "hint", children: "Si no es mostra la vista integrada, utilitza el bot\xF3 per obrir l\u2019eina." })
  ] });
}

// src/modules/Syllables.tsx
import { useId as useId2, useState as useState5 } from "react";

// src/data/vocabulary.ts
var vocabulary = [
  { word: "casa", syllables: ["ca", "sa"] },
  { word: "pilota", syllables: ["pi", "lo", "ta"] },
  { word: "taula", syllables: ["tau", "la"] },
  { word: "escola", syllables: ["es", "co", "la"] },
  { word: "mama", syllables: ["ma", "ma"] },
  { word: "papa", syllables: ["pa", "pa"] },
  { word: "pera", syllables: ["pe", "ra"] },
  { word: "poma", syllables: ["po", "ma"] },
  { word: "lluna", syllables: ["llu", "na"] },
  { word: "sabata", syllables: ["sa", "ba", "ta"] },
  { word: "m\xE0", syllables: ["m\xE0"] },
  { word: "mar", syllables: ["mar"] },
  { word: "sol", syllables: ["sol"] },
  { word: "gat", syllables: ["gat"] },
  { word: "gos", syllables: ["gos"] },
  { word: "tren", syllables: ["tren"] },
  { word: "flor", syllables: ["flor"] },
  { word: "platja", syllables: ["plat", "ja"] },
  { word: "aigua", syllables: ["ai", "gua"] },
  { word: "finestra", syllables: ["fi", "nes", "tra"] },
  { word: "cotxe", syllables: ["cot", "xe"] },
  { word: "llibre", syllables: ["lli", "bre"] },
  { word: "paper", syllables: ["pa", "per"] },
  { word: "caramel", syllables: ["ca", "ra", "mel"] },
  { word: "cadira", syllables: ["ca", "di", "ra"] },
  { word: "papallona", syllables: ["pa", "pa", "llo", "na"] }
];
function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("ca").trim();
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
function parseVocabularyText(text) {
  if (text.length > 1e6) throw Error("El fitxer supera el l\xEDmit d\u20191 MB.");
  let data;
  try {
    data = JSON.parse(text);
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

// src/modules/Syllables.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next }) {
  const [answer, setAnswer] = useState5(null), [revealed, setRevealed] = useState5(false);
  return /* @__PURE__ */ jsxs7("section", { children: [
    /* @__PURE__ */ jsxs7("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx7("span", { children: "ESCOLTA\u2019T I PICA DE MANS" }),
      /* @__PURE__ */ jsxs7("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx7("p", { children: "Digues la paraula i fes una picada per cada s\xEDl\xB7laba." }),
    /* @__PURE__ */ jsx7("div", { className: "syllable-word", children: item.word.toLocaleUpperCase("ca") }),
    /* @__PURE__ */ jsx7("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
    /* @__PURE__ */ jsx7("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx7("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
      setAnswer(n);
      setRevealed(true);
    }, children: n }, n)) }),
    /* @__PURE__ */ jsx7("p", { className: "syllable-feedback", role: "status", children: answer === null ? "Tria una resposta." : answer === item.syllables.length ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. MIRA ELS COPS DE VEU." }),
    revealed && /* @__PURE__ */ jsx7("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx7("span", { children: s.toLocaleUpperCase("ca") }, i)) }),
    /* @__PURE__ */ jsxs7("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx7("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx7("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] }),
    /* @__PURE__ */ jsxs7("p", { className: "hint", children: [
      "Banc de ",
      total,
      " paraules en catal\xE0 amb separaci\xF3 expl\xEDcita. Sense puntuaci\xF3 ni dades d\u2019alumnat."
    ] })
  ] });
}
function Syllables() {
  const id = useId2(), bank = useVocabulary();
  const [source, setSource] = useState5("all"), [index, setIndex] = useState5(0);
  const words = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
  const current = index % Math.max(1, words.length);
  const item = words[current];
  return /* @__PURE__ */ jsxs7("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs7("label", { className: "style-picker", htmlFor: id, children: [
      "Paraules de l\u2019activitat",
      /* @__PURE__ */ jsxs7("select", { id, value: source, onChange: (e) => {
        setSource(e.target.value);
        setIndex(0);
      }, children: [
        /* @__PURE__ */ jsx7("option", { value: "all", children: "Tot el banc compartit" }),
        /* @__PURE__ */ jsx7("option", { value: "base", children: "Banc inicial" }),
        /* @__PURE__ */ jsx7("option", { value: "custom", children: "Nom\xE9s personalitzades" })
      ] })
    ] }),
    item ? /* @__PURE__ */ jsx7(SyllableQuestion, { item, index: current, total: words.length, next: () => setIndex((i) => i + 1) }, source + ":" + index + ":" + item.word + ":" + item.syllables.join("|")) : /* @__PURE__ */ jsx7("p", { role: "status", children: "Encara no hi ha paraules personalitzades. Afegeix-les o importa-les des del Banc de Paraules." })
  ] });
}

// src/modules/Words.tsx
import { useId as useId4, useState as useState7 } from "react";

// src/components/VocabularyEditor.tsx
import { useId as useId3, useRef as useRef2, useState as useState6 } from "react";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function download(name, value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
var example = vocabularyDocument([{ word: "motxilla", syllables: ["mot", "xi", "lla"] }]);
function VocabularyEditor() {
  const id = useId3(), bank = useVocabulary();
  const [word, setWord] = useState6(""), [parts, setParts] = useState6(""), [message, setMessage] = useState6(""), [error, setError] = useState6(""), [pending, setPending] = useState6(null);
  const [removed, setRemoved] = useState6(null);
  const [busy, setBusy] = useState6(false);
  const [jsonText, setJsonText] = useState6("");
  const file = useRef2(null);
  function preview(text) {
    setError("");
    setMessage("");
    setPending(null);
    try {
      setPending(parseVocabularyText(text));
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
  return /* @__PURE__ */ jsxs8("details", { className: "vocabulary-editor", children: [
    /* @__PURE__ */ jsx8("summary", { children: "Amplia i conserva el banc de paraules" }),
    /* @__PURE__ */ jsx8("p", { children: "Les paraules afegides es comparteixen amb el laboratori de s\xEDl\xB7labes i es desen nom\xE9s en aquest navegador. Exporta una c\xF2pia per portar-les a un altre dispositiu." }),
    bank.warning && /* @__PURE__ */ jsx8("p", { role: "alert", children: bank.warning }),
    /* @__PURE__ */ jsxs8("form", { onSubmit: (e) => {
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
      /* @__PURE__ */ jsxs8("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs8("label", { htmlFor: id + "word", children: [
          "Paraula nova",
          /* @__PURE__ */ jsx8("input", { id: id + "word", maxLength: 40, value: word, onChange: (e) => setWord(e.target.value), placeholder: "motxilla", required: true })
        ] }),
        /* @__PURE__ */ jsxs8("label", { htmlFor: id + "parts", children: [
          "S\xEDl\xB7labes separades per guions",
          /* @__PURE__ */ jsx8("input", { id: id + "parts", maxLength: 100, value: parts, onChange: (e) => setParts(e.target.value), placeholder: "mot-xi-lla", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx8("button", { className: "action primary", disabled: !word.trim() || !parts.trim(), children: "Afegeix al banc" })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx8("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa JSON" }),
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => download("QS33DS_vocabulari.json", vocabularyDocument(bank.words)), children: "Exporta el banc JSON" }),
      /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => download("QS33DS_vocabulari_model.json", example), children: "Descarrega el model JSON" })
    ] }),
    /* @__PURE__ */ jsx8("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer JSON de vocabulari", accept: ".json,application/json", onChange: (e) => {
      void readFile(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsxs8("details", { children: [
      /* @__PURE__ */ jsx8("summary", { children: "O enganxa el JSON directament" }),
      /* @__PURE__ */ jsx8("label", { htmlFor: id + "json", children: "JSON per importar" }),
      /* @__PURE__ */ jsx8("textarea", { id: id + "json", rows: 7, maxLength: 1e6, value: jsonText, onChange: (e) => setJsonText(e.target.value), placeholder: "Enganxa el document JSON complet..." }),
      /* @__PURE__ */ jsx8("button", { className: "action", disabled: busy || !jsonText.trim(), onClick: () => preview(jsonText), children: "Valida el JSON enganxat" })
    ] }),
    pending && /* @__PURE__ */ jsxs8("section", { className: "import-preview", "aria-label": "Revisi\xF3 de la importaci\xF3", children: [
      /* @__PURE__ */ jsxs8("strong", { children: [
        pending.length,
        " entrades validades"
      ] }),
      /* @__PURE__ */ jsxs8("p", { children: [
        pending.slice(0, 5).map((w) => `${w.word}: ${w.syllables.join(" \xB7 ")}`).join("; "),
        pending.length > 5 ? "\u2026" : ""
      ] }),
      /* @__PURE__ */ jsx8("p", { children: "La validaci\xF3 comprova el format i la reconstrucci\xF3 de cada paraula; revisa que la separaci\xF3 ling\xFC\xEDstica sigui correcta." }),
      /* @__PURE__ */ jsxs8("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx8("button", { className: "action primary", onClick: () => {
          setError("");
          try {
            const r = addVocabulary(pending);
            setMessage(`${r.added} paraules afegides; ${r.skipped} ja existien.`);
            setPending(null);
          } catch (e) {
            setError(e.message);
          }
        }, children: "Incorpora les paraules" }),
        /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la la importaci\xF3" })
      ] })
    ] }),
    message && /* @__PURE__ */ jsx8("p", { role: "status", children: message }),
    error && /* @__PURE__ */ jsx8("p", { role: "alert", children: error }),
    bank.custom.length > 0 && /* @__PURE__ */ jsxs8("details", { children: [
      /* @__PURE__ */ jsxs8("summary", { children: [
        "Paraules personalitzades (",
        bank.custom.length,
        "/500)"
      ] }),
      /* @__PURE__ */ jsx8("ul", { className: "custom-words", children: bank.custom.map((w) => /* @__PURE__ */ jsxs8("li", { children: [
        /* @__PURE__ */ jsxs8("span", { children: [
          w.word.toLocaleUpperCase("ca"),
          " \xB7 ",
          w.syllables.join(" \xB7 ")
        ] }),
        /* @__PURE__ */ jsx8("button", { className: "action", "aria-label": `Elimina ${w.word}`, onClick: () => {
          setRemoved(w);
          removeVocabulary(w.word);
          setMessage(`\xAB${w.word}\xBB eliminada del banc personalitzat.`);
        }, children: "Elimina" })
      ] }, w.word)) })
    ] }),
    removed && /* @__PURE__ */ jsx8("button", { className: "action", onClick: () => {
      setError("");
      try {
        addVocabulary([removed]);
        setRemoved(null);
        setMessage("Paraula restaurada.");
      } catch (e) {
        setError(e.message);
      }
    }, children: "Desf\xE9s l\u2019\xFAltima eliminaci\xF3" }),
    /* @__PURE__ */ jsxs8("details", { children: [
      /* @__PURE__ */ jsx8("summary", { children: "Format compatible per generar paraules amb ChatGPT" }),
      /* @__PURE__ */ jsx8("p", { children: "Demana paraules en catal\xE0 amb aquest format, sense explicacions fora del JSON. Cada word ha de coincidir amb la uni\xF3 de les syllables. No hi incloguis dades d\u2019alumnat." }),
      /* @__PURE__ */ jsx8("pre", { children: JSON.stringify(example, null, 2) })
    ] })
  ] });
}

// src/modules/Words.tsx
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
function Words() {
  const { words: vocabulary2 } = useVocabulary();
  const id = useId4();
  const [query, setQuery] = useState7(""), [position, setPosition] = useState7("any");
  const filtered = vocabulary2.filter((w) => matchesWritten(w.word, query, position));
  return /* @__PURE__ */ jsxs9("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx9("div", { className: "tool-top", children: /* @__PURE__ */ jsx9("span", { children: "BANC COMPARTIT DE VOCABULARI" }) }),
    /* @__PURE__ */ jsx9("p", { className: "hint", children: "Cerca lletres o s\xEDl\xB7labes escrites. S\u2019ignoren els accents en la cerca; no \xE9s una classificaci\xF3 fon\xE8tica." }),
    /* @__PURE__ */ jsxs9("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs9("label", { htmlFor: id + "q", children: [
        "Lletra o s\xEDl\xB7laba",
        /* @__PURE__ */ jsx9("input", { id: id + "q", maxLength: 30, value: query, placeholder: "Ex.: ma, p, ca...", onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs9("label", { htmlFor: id + "pos", children: [
        "Posici\xF3",
        /* @__PURE__ */ jsxs9("select", { id: id + "pos", value: position, onChange: (e) => setPosition(e.target.value), children: [
          /* @__PURE__ */ jsx9("option", { value: "any", children: "Qualsevol" }),
          /* @__PURE__ */ jsx9("option", { value: "start", children: "Al principi" }),
          /* @__PURE__ */ jsx9("option", { value: "middle", children: "Al mig" }),
          /* @__PURE__ */ jsx9("option", { value: "end", children: "Al final" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs9("p", { role: "status", children: [
      filtered.length,
      " paraules"
    ] }),
    /* @__PURE__ */ jsx9("div", { className: "word-bank", children: filtered.map((w) => /* @__PURE__ */ jsxs9("article", { children: [
      /* @__PURE__ */ jsx9("strong", { children: w.word.toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsx9("span", { children: w.syllables.join(" \xB7 ").toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsxs9("small", { children: [
        w.syllables.length,
        " ",
        w.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
      ] })
    ] }, w.word)) }),
    !filtered.length && /* @__PURE__ */ jsx9("p", { children: "Cap paraula del banc coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx9("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" }),
    /* @__PURE__ */ jsx9(VocabularyEditor, {})
  ] });
}

// src/modules/Guidelines.tsx
import { useId as useId5, useState as useState8 } from "react";
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
function Guidelines() {
  const id = useId5();
  const [height, setHeight] = useState8(2), [rows, setRows] = useState8(7), [model, setModel] = useState8(""), [title, setTitle] = useState8("PRACTIQUEM L\u2019ESCRIPTURA");
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
  return /* @__PURE__ */ jsxs10("div", { className: "tool-surface guidelines-tool", children: [
    /* @__PURE__ */ jsxs10("div", { className: "guidelines-controls", children: [
      /* @__PURE__ */ jsx10("div", { className: "tool-top", children: /* @__PURE__ */ jsx10("span", { children: "PAUTES A4 \xB7 MESURES EN CENT\xCDMETRES" }) }),
      /* @__PURE__ */ jsxs10("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs10("label", { htmlFor: id + "title", children: [
          "T\xEDtol",
          /* @__PURE__ */ jsx10("input", { id: id + "title", maxLength: 60, value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs10("label", { htmlFor: id + "model", children: [
          "Model (opcional)",
          /* @__PURE__ */ jsx10("input", { id: id + "model", maxLength: 40, value: model, onChange: (e) => setModel(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs10("label", { htmlFor: id + "height", children: [
          "Al\xE7ada entre les dues l\xEDnies",
          /* @__PURE__ */ jsxs10("select", { id: id + "height", value: height, onChange: (e) => setHeight(Number(e.target.value)), children: [
            /* @__PURE__ */ jsx10("option", { value: 1, children: "1 cm" }),
            /* @__PURE__ */ jsx10("option", { value: 1.5, children: "1,5 cm" }),
            /* @__PURE__ */ jsx10("option", { value: 2, children: "2 cm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs10("label", { htmlFor: id + "rows", children: [
          "Nombre de pautes",
          /* @__PURE__ */ jsx10("select", { id: id + "rows", value: rows, onChange: (e) => setRows(Number(e.target.value)), children: [4, 5, 6, 7].map((n) => /* @__PURE__ */ jsx10("option", { value: n, children: n }, n)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs10("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx10("button", { className: "action primary", onClick: printSheet, children: "Imprimeix / Desa com a PDF" }),
        /* @__PURE__ */ jsx10("a", { className: "action", href: "../referents-escriptura.html", target: "_blank", rel: "noopener noreferrer", children: "Obre els referents QS33DS" })
      ] }),
      /* @__PURE__ */ jsx10("p", { className: "hint", children: "A4 vertical, escala 100 %, sense cap\xE7aleres ni peus del navegador. La vista en pantalla s\u2019ajusta a l\u2019espai; el document impr\xE8s conserva les mesures." })
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "writing-preview", children: /* @__PURE__ */ jsxs10("article", { className: "writing-sheet", style: { "--rule-height": height + "cm" }, children: [
      /* @__PURE__ */ jsx10("h2", { children: title || "PRACTIQUEM L\u2019ESCRIPTURA" }),
      /* @__PURE__ */ jsxs10("div", { className: "writing-meta", children: [
        /* @__PURE__ */ jsx10("span", { children: "NOM: _______________________" }),
        /* @__PURE__ */ jsx10("span", { children: "DATA: ______________" })
      ] }),
      Array.from({ length: rows }, (_, i) => /* @__PURE__ */ jsxs10("div", { className: "writing-row", children: [
        /* @__PURE__ */ jsx10("span", { children: model }),
        /* @__PURE__ */ jsx10("div", { className: "writing-rule" })
      ] }, i)),
      /* @__PURE__ */ jsxs10("p", { className: "writing-credit", children: [
        "QS33DS \xB7 PAUTA DE ",
        height.toLocaleString("ca"),
        " CM"
      ] })
    ] }) })
  ] });
}

// src/components/ToolContent.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var components = { timer: Timer, sequence: Sequence, groups: Groups, autonomy: Autonomy, observation: Observation, syllables: Syllables, words: Words, guidelines: Guidelines };
function ToolContent({ id }) {
  const Component = components[id];
  return /* @__PURE__ */ jsx11(Component, {});
}

// tests/workspace.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
for (const t of tools) {
  assert.equal(toolLaunch("?tool=" + t.id).tool, t.id);
  assert.equal(toolLaunch("?tool=" + t.id + "&embed=1").embedded, true);
  assert(renderToStaticMarkup(/* @__PURE__ */ jsx12(ToolContent, { id: t.id })).length > 100);
}
for (const invalid of ["?tool=javascript:alert(1)&embed=1", "?tool=../../files", "?embed=1", "?tool=", "?tool=unknown"]) assert.deepEqual(toolLaunch(invalid), { tool: null, embedded: false });
assert.equal(panelTools.length, tools.filter((t) => t.ready).length);
assert.equal(standaloneTool(DEFAULT_PANEL_TOOL), "eines-aula/?tool=timer");
assert.deepEqual(preferences({ quad: true, day: 4, tool: DEFAULT_PANEL_TOOL }), { quad: true, day: 4, tool: DEFAULT_PANEL_TOOL });
for (const day of [-1, 5, NaN, 1.5, "2"]) assert.equal(preferences({ day }, 3).day, 3);
for (const tool of ["https://evil.invalid/", "javascript:alert(1)", "../files/"]) assert.equal(preferences({ tool }, 0).tool, DEFAULT_PANEL_TOOL);
assert.equal(preferences(null, 2).day, 2);
console.log("PASS: eight shared module renders, direct and embedded launches, invalid tool rejection, safe preference fallback and standalone links.");
