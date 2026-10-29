// tests/language.tsx
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";

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

// src/modules/Syllables.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Syllables() {
  const [index, setIndex] = useState(0), [answer, setAnswer] = useState(null), [revealed, setRevealed] = useState(false);
  const item = vocabulary[index];
  function next() {
    setIndex((i) => (i + 1) % vocabulary.length);
    setAnswer(null);
    setRevealed(false);
  }
  return /* @__PURE__ */ jsxs("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx("span", { children: "ESCOLTA\u2019T I PICA DE MANS" }),
      /* @__PURE__ */ jsxs("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        vocabulary.length
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Digues la paraula i fes una picada per cada s\xEDl\xB7laba." }),
    /* @__PURE__ */ jsx("div", { className: "syllable-word", children: item.word.toLocaleUpperCase("ca") }),
    /* @__PURE__ */ jsx("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
    /* @__PURE__ */ jsx("div", { className: "timer-actions", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsx("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
      setAnswer(n);
      setRevealed(true);
    }, children: n }, n)) }),
    /* @__PURE__ */ jsx("p", { className: "syllable-feedback", role: "status", children: answer === null ? "Tria una resposta." : answer === item.syllables.length ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. MIRA ELS COPS DE VEU." }),
    revealed && /* @__PURE__ */ jsx("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx("span", { children: s.toLocaleUpperCase("ca") }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "hint", children: [
      "Banc inicial de ",
      vocabulary.length,
      " paraules en catal\xE0 amb separaci\xF3 expl\xEDcita. Sense puntuaci\xF3 ni dades d\u2019alumnat."
    ] })
  ] });
}

// src/modules/Words.tsx
import { useId, useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Words() {
  const id = useId();
  const [query, setQuery] = useState2(""), [position, setPosition] = useState2("any");
  const filtered = vocabulary.filter((w) => matchesWritten(w.word, query, position));
  return /* @__PURE__ */ jsxs2("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx2("div", { className: "tool-top", children: /* @__PURE__ */ jsx2("span", { children: "BANC COMPARTIT DE VOCABULARI" }) }),
    /* @__PURE__ */ jsx2("p", { className: "hint", children: "Cerca lletres o s\xEDl\xB7labes escrites. S\u2019ignoren els accents en la cerca; no \xE9s una classificaci\xF3 fon\xE8tica." }),
    /* @__PURE__ */ jsxs2("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs2("label", { htmlFor: id + "q", children: [
        "Lletra o s\xEDl\xB7laba",
        /* @__PURE__ */ jsx2("input", { id: id + "q", maxLength: 30, value: query, placeholder: "Ex.: ma, p, ca...", onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs2("label", { htmlFor: id + "pos", children: [
        "Posici\xF3",
        /* @__PURE__ */ jsxs2("select", { id: id + "pos", value: position, onChange: (e) => setPosition(e.target.value), children: [
          /* @__PURE__ */ jsx2("option", { value: "any", children: "Qualsevol" }),
          /* @__PURE__ */ jsx2("option", { value: "start", children: "Al principi" }),
          /* @__PURE__ */ jsx2("option", { value: "middle", children: "Al mig" }),
          /* @__PURE__ */ jsx2("option", { value: "end", children: "Al final" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("p", { role: "status", children: [
      filtered.length,
      " paraules"
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "word-bank", children: filtered.map((w) => /* @__PURE__ */ jsxs2("article", { children: [
      /* @__PURE__ */ jsx2("strong", { children: w.word.toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsx2("span", { children: w.syllables.join(" \xB7 ").toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsxs2("small", { children: [
        w.syllables.length,
        " ",
        w.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
      ] })
    ] }, w.word)) }),
    !filtered.length && /* @__PURE__ */ jsx2("p", { children: "Cap paraula del banc inicial coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" })
  ] });
}

// src/modules/Guidelines.tsx
import { useId as useId2, useState as useState3 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Guidelines() {
  const id = useId2();
  const [height, setHeight] = useState3(2), [rows, setRows] = useState3(7), [model, setModel] = useState3(""), [title, setTitle] = useState3("PRACTIQUEM L\u2019ESCRIPTURA");
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
  return /* @__PURE__ */ jsxs3("div", { className: "tool-surface guidelines-tool", children: [
    /* @__PURE__ */ jsxs3("div", { className: "guidelines-controls", children: [
      /* @__PURE__ */ jsx3("div", { className: "tool-top", children: /* @__PURE__ */ jsx3("span", { children: "PAUTES A4 \xB7 MESURES EN CENT\xCDMETRES" }) }),
      /* @__PURE__ */ jsxs3("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs3("label", { htmlFor: id + "title", children: [
          "T\xEDtol",
          /* @__PURE__ */ jsx3("input", { id: id + "title", maxLength: 60, value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs3("label", { htmlFor: id + "model", children: [
          "Model (opcional)",
          /* @__PURE__ */ jsx3("input", { id: id + "model", maxLength: 40, value: model, onChange: (e) => setModel(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs3("label", { htmlFor: id + "height", children: [
          "Al\xE7ada entre les dues l\xEDnies",
          /* @__PURE__ */ jsxs3("select", { id: id + "height", value: height, onChange: (e) => setHeight(Number(e.target.value)), children: [
            /* @__PURE__ */ jsx3("option", { value: 1, children: "1 cm" }),
            /* @__PURE__ */ jsx3("option", { value: 1.5, children: "1,5 cm" }),
            /* @__PURE__ */ jsx3("option", { value: 2, children: "2 cm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("label", { htmlFor: id + "rows", children: [
          "Nombre de pautes",
          /* @__PURE__ */ jsx3("select", { id: id + "rows", value: rows, onChange: (e) => setRows(Number(e.target.value)), children: [4, 5, 6, 7].map((n) => /* @__PURE__ */ jsx3("option", { value: n, children: n }, n)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: printSheet, children: "Imprimeix / Desa com a PDF" }),
        /* @__PURE__ */ jsx3("a", { className: "action", href: "../referents-escriptura.html", target: "_blank", rel: "noopener noreferrer", children: "Obre els referents QS33DS" })
      ] }),
      /* @__PURE__ */ jsx3("p", { className: "hint", children: "A4 vertical, escala 100 %, sense cap\xE7aleres ni peus del navegador. La vista en pantalla s\u2019ajusta a l\u2019espai; el document impr\xE8s conserva les mesures." })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "writing-preview", children: /* @__PURE__ */ jsxs3("article", { className: "writing-sheet", style: { "--rule-height": height + "cm" }, children: [
      /* @__PURE__ */ jsx3("h2", { children: title || "PRACTIQUEM L\u2019ESCRIPTURA" }),
      /* @__PURE__ */ jsxs3("div", { className: "writing-meta", children: [
        /* @__PURE__ */ jsx3("span", { children: "NOM: _______________________" }),
        /* @__PURE__ */ jsx3("span", { children: "DATA: ______________" })
      ] }),
      Array.from({ length: rows }, (_, i) => /* @__PURE__ */ jsxs3("div", { className: "writing-row", children: [
        /* @__PURE__ */ jsx3("span", { children: model }),
        /* @__PURE__ */ jsx3("div", { className: "writing-rule" })
      ] }, i)),
      /* @__PURE__ */ jsxs3("p", { className: "writing-credit", children: [
        "QS33DS \xB7 PAUTA DE ",
        height.toLocaleString("ca"),
        " CM"
      ] })
    ] }) })
  ] });
}

// src/modules/Observation.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Observation() {
  return /* @__PURE__ */ jsxs4("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx4("div", { className: "tool-top", children: /* @__PURE__ */ jsx4("span", { children: "OBSERVAPT \xB7 EINA QS33DS EXISTENT" }) }),
    /* @__PURE__ */ jsx4("p", { className: "hint", children: "Registre funcional complet. ObservaPT desa les dades en aquest navegador: fes servir \xE0lies i exporta els registres que vulguis conservar." }),
    /* @__PURE__ */ jsx4("a", { className: "action", href: "../observapt.html", target: "_blank", rel: "noopener noreferrer", children: "Obre ObservaPT en una pestanya" }),
    /* @__PURE__ */ jsx4("iframe", { className: "existing-tool", src: "../observapt.html", title: "ObservaPT \xB7 Registre d\u2019observaci\xF3 funcional" }),
    /* @__PURE__ */ jsx4("p", { className: "hint", children: "Si no es mostra la vista integrada, utilitza el bot\xF3 per obrir l\u2019eina." })
  ] });
}

// tests/language.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
assert.equal(new Set(vocabulary.map((w) => w.word)).size, vocabulary.length);
for (const w of vocabulary) {
  assert.equal(w.syllables.join(""), w.word);
  assert(w.syllables.length >= 1 && w.syllables.length <= 4);
}
assert(matchesWritten("m\xE0", "ma", "start"));
assert(matchesWritten("poma", "ma", "end"));
assert(matchesWritten("caramel", "ra", "middle"));
assert(!matchesWritten("mama", "ma", "middle"));
assert(!matchesWritten("mar", "ma", "end"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Syllables, {})).includes("CASA"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Words, {})).includes("PAPALLONA"));
var g = renderToStaticMarkup(/* @__PURE__ */ jsx5(Guidelines, {}));
assert(g.includes("--rule-height:2cm"));
assert.equal((g.match(/class="writing-rule"/g) || []).length, 7);
assert(renderToStaticMarkup(/* @__PURE__ */ jsx5(Observation, {})).includes("../observapt.html"));
console.log("PASS: 26 explicit syllabifications, shared bank, written-position filters, 7 print rules at 2cm, existing ObservaPT adapter.");
var { create, act } = await import("react-test-renderer");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var syllables;
await act(() => {
  syllables = create(/* @__PURE__ */ jsx5(Syllables, {}));
});
var findButton = (view, name) => view.root.findAllByType("button").find((b) => b.children.filter((c) => typeof c === "string" || typeof c === "number").join("").trim() === name);
await act(() => findButton(syllables, "1").props.onClick());
assert(syllables.root.findByProps({ role: "status" }).children.join("").includes("TORNA"));
await act(() => findButton(syllables, "2").props.onClick());
assert(syllables.root.findByProps({ role: "status" }).children.join("").includes("MOLT B\xC9"));
await act(() => findButton(syllables, "Paraula seg\xFCent \u2192").props.onClick());
assert.equal(syllables.root.findByProps({ className: "syllable-word" }).children.join(""), "PILOTA");
assert.equal(syllables.root.findAllByProps({ className: "syllable-parts" }).length, 0);
await act(() => syllables.unmount());
var words;
await act(() => {
  words = create(/* @__PURE__ */ jsx5(Words, {}));
});
await act(() => words.root.findByType("input").props.onChange({ target: { value: "ma" } }));
await act(() => words.root.findByType("select").props.onChange({ target: { value: "end" } }));
assert.deepEqual(words.root.findAllByType("article").map((a) => a.findByType("strong").children.join("")), ["MAMA", "POMA", "M\xC0"]);
await act(() => findButton(words, "Neteja els filtres").props.onClick());
assert.equal(words.root.findAllByType("article").length, 26);
await act(() => words.unmount());
var rules;
await act(() => {
  rules = create(/* @__PURE__ */ jsx5(Guidelines, {}));
});
await act(() => rules.root.findAllByType("select")[0].props.onChange({ target: { value: "1.5" } }));
await act(() => rules.root.findAllByType("select")[1].props.onChange({ target: { value: "4" } }));
assert.equal(rules.root.findAllByProps({ className: "writing-rule" }).length, 4);
assert.equal(rules.root.findByProps({ className: "writing-sheet" }).props.style["--rule-height"], "1.5cm");
await act(() => rules.unmount());
console.log("PASS: syllable feedback and next-word reset, word query/position/reset, print height and row controls.");
