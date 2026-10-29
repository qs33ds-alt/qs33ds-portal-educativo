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
import { useId, useState } from "react";

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
  const syllables2 = item.syllables.map((s) => {
    if (typeof s !== "string") throw Error("Cada s\xEDl\xB7laba ha de ser text.");
    const value = canonical(s);
    if (!value || value.length > 40 || !letters.test(value)) throw Error("Les s\xEDl\xB7labes han de contenir lletres.");
    return value;
  });
  if (syllables2.join("") !== word) throw Error(`Les s\xEDl\xB7labes de \xAB${word}\xBB no reconstrueixen la paraula. Revisa accents i separaci\xF3.`);
  return { word, syllables: syllables2 };
}
function parseVocabulary(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("El JSON no t\xE9 el format del banc de vocabulari.");
  const data = input;
  if (data.schema !== VOCABULARY_SCHEMA || data.language !== "ca" || !Array.isArray(data.words)) throw Error("Cal schema qs33ds.eines-vocabulary.v1, language ca i una llista words.");
  if (data.words.length < 1 || data.words.length > MAX_DOCUMENT_WORDS) throw Error(`El fitxer ha de contenir entre 1 i ${MAX_DOCUMENT_WORDS} paraules, incl\xF2s el banc inicial.`);
  const words2 = data.words.map((w, i) => {
    try {
      return validateWord(w);
    } catch (e) {
      throw Error(`Entrada ${i + 1}: ${e.message}`);
    }
  });
  const seen = /* @__PURE__ */ new Set();
  for (const w of words2) {
    const key = wordKey(w.word);
    if (seen.has(key)) throw Error(`La paraula \xAB${w.word}\xBB est\xE0 repetida dins del fitxer.`);
    seen.add(key);
  }
  return words2;
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
function vocabularyDocument(words2) {
  return { schema: VOCABULARY_SCHEMA, language: "ca", words: words2 };
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
import { jsx, jsxs } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next }) {
  const [answer, setAnswer] = useState(null), [revealed, setRevealed] = useState(false);
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx("span", { children: "ESCOLTA\u2019T I PICA DE MANS" }),
      /* @__PURE__ */ jsxs("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Digues la paraula i fes una picada per cada s\xEDl\xB7laba." }),
    /* @__PURE__ */ jsx("div", { className: "syllable-word", children: item.word.toLocaleUpperCase("ca") }),
    /* @__PURE__ */ jsx("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
    /* @__PURE__ */ jsx("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
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
      "Banc de ",
      total,
      " paraules en catal\xE0 amb separaci\xF3 expl\xEDcita. Sense puntuaci\xF3 ni dades d\u2019alumnat."
    ] })
  ] });
}
function Syllables() {
  const id = useId(), bank = useVocabulary();
  const [source, setSource] = useState("all"), [index, setIndex] = useState(0);
  const words2 = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
  const current = index % Math.max(1, words2.length);
  const item = words2[current];
  return /* @__PURE__ */ jsxs("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs("label", { className: "style-picker", htmlFor: id, children: [
      "Paraules de l\u2019activitat",
      /* @__PURE__ */ jsxs("select", { id, value: source, onChange: (e) => {
        setSource(e.target.value);
        setIndex(0);
      }, children: [
        /* @__PURE__ */ jsx("option", { value: "all", children: "Tot el banc compartit" }),
        /* @__PURE__ */ jsx("option", { value: "base", children: "Banc inicial" }),
        /* @__PURE__ */ jsx("option", { value: "custom", children: "Nom\xE9s personalitzades" })
      ] })
    ] }),
    item ? /* @__PURE__ */ jsx(SyllableQuestion, { item, index: current, total: words2.length, next: () => setIndex((i) => i + 1) }, source + ":" + index + ":" + item.word + ":" + item.syllables.join("|")) : /* @__PURE__ */ jsx("p", { role: "status", children: "Encara no hi ha paraules personalitzades. Afegeix-les o importa-les des del Banc de Paraules." })
  ] });
}

// src/modules/Words.tsx
import { useId as useId3, useState as useState3 } from "react";

// src/components/VocabularyEditor.tsx
import { useId as useId2, useRef, useState as useState2 } from "react";

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

// src/components/VocabularyEditor.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var example = vocabularyDocument([{ word: "motxilla", syllables: ["mot", "xi", "lla"] }]);
function VocabularyEditor() {
  const id = useId2(), bank = useVocabulary();
  const [word, setWord] = useState2(""), [parts, setParts] = useState2(""), [message, setMessage] = useState2(""), [error, setError] = useState2(""), [pending, setPending] = useState2(null);
  const [removed, setRemoved] = useState2(null);
  const [busy, setBusy] = useState2(false);
  const [jsonText, setJsonText] = useState2("");
  const file = useRef(null);
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
  return /* @__PURE__ */ jsxs2("details", { className: "vocabulary-editor", children: [
    /* @__PURE__ */ jsx2("summary", { children: "Amplia i conserva el banc de paraules" }),
    /* @__PURE__ */ jsx2("p", { children: "Les paraules afegides es comparteixen amb el laboratori de s\xEDl\xB7labes i es desen nom\xE9s en aquest navegador. Exporta una c\xF2pia per portar-les a un altre dispositiu." }),
    bank.warning && /* @__PURE__ */ jsx2("p", { role: "alert", children: bank.warning }),
    /* @__PURE__ */ jsxs2("form", { onSubmit: (e) => {
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
      /* @__PURE__ */ jsxs2("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs2("label", { htmlFor: id + "word", children: [
          "Paraula nova",
          /* @__PURE__ */ jsx2("input", { id: id + "word", maxLength: 40, value: word, onChange: (e) => setWord(e.target.value), placeholder: "motxilla", required: true })
        ] }),
        /* @__PURE__ */ jsxs2("label", { htmlFor: id + "parts", children: [
          "S\xEDl\xB7labes separades per guions",
          /* @__PURE__ */ jsx2("input", { id: id + "parts", maxLength: 100, value: parts, onChange: (e) => setParts(e.target.value), placeholder: "mot-xi-lla", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("button", { className: "action primary", disabled: !word.trim() || !parts.trim(), children: "Afegeix al banc" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx2("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa JSON" }),
      /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari.json", vocabularyDocument(bank.words)), children: "Exporta el banc JSON" }),
      /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari_model.json", example), children: "Descarrega el model JSON" })
    ] }),
    /* @__PURE__ */ jsx2("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer JSON de vocabulari", accept: ".json,application/json", onChange: (e) => {
      void readFile(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsxs2("details", { children: [
      /* @__PURE__ */ jsx2("summary", { children: "O enganxa el JSON directament" }),
      /* @__PURE__ */ jsx2("label", { htmlFor: id + "json", children: "JSON per importar" }),
      /* @__PURE__ */ jsx2("textarea", { id: id + "json", rows: 7, maxLength: 1e6, value: jsonText, onChange: (e) => setJsonText(e.target.value), placeholder: "Enganxa el document JSON complet..." }),
      /* @__PURE__ */ jsx2("button", { className: "action", disabled: busy || !jsonText.trim(), onClick: () => preview(jsonText), children: "Valida el JSON enganxat" })
    ] }),
    pending && /* @__PURE__ */ jsxs2("section", { className: "import-preview", "aria-label": "Revisi\xF3 de la importaci\xF3", children: [
      /* @__PURE__ */ jsxs2("strong", { children: [
        pending.length,
        " entrades validades"
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        pending.slice(0, 5).map((w) => `${w.word}: ${w.syllables.join(" \xB7 ")}`).join("; "),
        pending.length > 5 ? "\u2026" : ""
      ] }),
      /* @__PURE__ */ jsx2("p", { children: "La validaci\xF3 comprova el format i la reconstrucci\xF3 de cada paraula; revisa que la separaci\xF3 ling\xFC\xEDstica sigui correcta." }),
      /* @__PURE__ */ jsxs2("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx2("button", { className: "action primary", onClick: () => {
          setError("");
          try {
            const r = addVocabulary(pending);
            setMessage(`${r.added} paraules afegides; ${r.skipped} ja existien.`);
            setPending(null);
          } catch (e) {
            setError(e.message);
          }
        }, children: "Incorpora les paraules" }),
        /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la la importaci\xF3" })
      ] })
    ] }),
    message && /* @__PURE__ */ jsx2("p", { role: "status", children: message }),
    error && /* @__PURE__ */ jsx2("p", { role: "alert", children: error }),
    bank.custom.length > 0 && /* @__PURE__ */ jsxs2("details", { children: [
      /* @__PURE__ */ jsxs2("summary", { children: [
        "Paraules personalitzades (",
        bank.custom.length,
        "/500)"
      ] }),
      /* @__PURE__ */ jsx2("ul", { className: "custom-words", children: bank.custom.map((w) => /* @__PURE__ */ jsxs2("li", { children: [
        /* @__PURE__ */ jsxs2("span", { children: [
          w.word.toLocaleUpperCase("ca"),
          " \xB7 ",
          w.syllables.join(" \xB7 ")
        ] }),
        /* @__PURE__ */ jsx2("button", { className: "action", "aria-label": `Elimina ${w.word}`, onClick: () => {
          setRemoved(w);
          removeVocabulary(w.word);
          setMessage(`\xAB${w.word}\xBB eliminada del banc personalitzat.`);
        }, children: "Elimina" })
      ] }, w.word)) })
    ] }),
    removed && /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => {
      setError("");
      try {
        addVocabulary([removed]);
        setRemoved(null);
        setMessage("Paraula restaurada.");
      } catch (e) {
        setError(e.message);
      }
    }, children: "Desf\xE9s l\u2019\xFAltima eliminaci\xF3" }),
    /* @__PURE__ */ jsxs2("details", { children: [
      /* @__PURE__ */ jsx2("summary", { children: "Format compatible per generar paraules amb ChatGPT" }),
      /* @__PURE__ */ jsx2("p", { children: "Demana paraules en catal\xE0 amb aquest format, sense explicacions fora del JSON. Cada word ha de coincidir amb la uni\xF3 de les syllables. No hi incloguis dades d\u2019alumnat." }),
      /* @__PURE__ */ jsx2("pre", { children: JSON.stringify(example, null, 2) })
    ] })
  ] });
}

// src/modules/Words.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Words() {
  const { words: vocabulary2 } = useVocabulary();
  const id = useId3();
  const [query, setQuery] = useState3(""), [position, setPosition] = useState3("any");
  const filtered = vocabulary2.filter((w) => matchesWritten(w.word, query, position));
  return /* @__PURE__ */ jsxs3("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx3("div", { className: "tool-top", children: /* @__PURE__ */ jsx3("span", { children: "BANC COMPARTIT DE VOCABULARI" }) }),
    /* @__PURE__ */ jsx3("p", { className: "hint", children: "Cerca lletres o s\xEDl\xB7labes escrites. S\u2019ignoren els accents en la cerca; no \xE9s una classificaci\xF3 fon\xE8tica." }),
    /* @__PURE__ */ jsxs3("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "q", children: [
        "Lletra o s\xEDl\xB7laba",
        /* @__PURE__ */ jsx3("input", { id: id + "q", maxLength: 30, value: query, placeholder: "Ex.: ma, p, ca...", onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "pos", children: [
        "Posici\xF3",
        /* @__PURE__ */ jsxs3("select", { id: id + "pos", value: position, onChange: (e) => setPosition(e.target.value), children: [
          /* @__PURE__ */ jsx3("option", { value: "any", children: "Qualsevol" }),
          /* @__PURE__ */ jsx3("option", { value: "start", children: "Al principi" }),
          /* @__PURE__ */ jsx3("option", { value: "middle", children: "Al mig" }),
          /* @__PURE__ */ jsx3("option", { value: "end", children: "Al final" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("p", { role: "status", children: [
      filtered.length,
      " paraules"
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "word-bank", children: filtered.map((w) => /* @__PURE__ */ jsxs3("article", { children: [
      /* @__PURE__ */ jsx3("strong", { children: w.word.toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsx3("span", { children: w.syllables.join(" \xB7 ").toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsxs3("small", { children: [
        w.syllables.length,
        " ",
        w.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
      ] })
    ] }, w.word)) }),
    !filtered.length && /* @__PURE__ */ jsx3("p", { children: "Cap paraula del banc coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" }),
    /* @__PURE__ */ jsx3(VocabularyEditor, {})
  ] });
}

// src/modules/Guidelines.tsx
import { useId as useId4, useState as useState4 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Guidelines() {
  const id = useId4();
  const [height, setHeight] = useState4(2), [rows, setRows] = useState4(7), [model, setModel] = useState4(""), [title, setTitle] = useState4("PRACTIQUEM L\u2019ESCRIPTURA");
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
  return /* @__PURE__ */ jsxs4("div", { className: "tool-surface guidelines-tool", children: [
    /* @__PURE__ */ jsxs4("div", { className: "guidelines-controls", children: [
      /* @__PURE__ */ jsx4("div", { className: "tool-top", children: /* @__PURE__ */ jsx4("span", { children: "PAUTES A4 \xB7 MESURES EN CENT\xCDMETRES" }) }),
      /* @__PURE__ */ jsxs4("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs4("label", { htmlFor: id + "title", children: [
          "T\xEDtol",
          /* @__PURE__ */ jsx4("input", { id: id + "title", maxLength: 60, value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs4("label", { htmlFor: id + "model", children: [
          "Model (opcional)",
          /* @__PURE__ */ jsx4("input", { id: id + "model", maxLength: 40, value: model, onChange: (e) => setModel(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs4("label", { htmlFor: id + "height", children: [
          "Al\xE7ada entre les dues l\xEDnies",
          /* @__PURE__ */ jsxs4("select", { id: id + "height", value: height, onChange: (e) => setHeight(Number(e.target.value)), children: [
            /* @__PURE__ */ jsx4("option", { value: 1, children: "1 cm" }),
            /* @__PURE__ */ jsx4("option", { value: 1.5, children: "1,5 cm" }),
            /* @__PURE__ */ jsx4("option", { value: 2, children: "2 cm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("label", { htmlFor: id + "rows", children: [
          "Nombre de pautes",
          /* @__PURE__ */ jsx4("select", { id: id + "rows", value: rows, onChange: (e) => setRows(Number(e.target.value)), children: [4, 5, 6, 7].map((n) => /* @__PURE__ */ jsx4("option", { value: n, children: n }, n)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx4("button", { className: "action primary", onClick: printSheet, children: "Imprimeix / Desa com a PDF" }),
        /* @__PURE__ */ jsx4("a", { className: "action", href: "../referents-escriptura.html", target: "_blank", rel: "noopener noreferrer", children: "Obre els referents QS33DS" })
      ] }),
      /* @__PURE__ */ jsx4("p", { className: "hint", children: "A4 vertical, escala 100 %, sense cap\xE7aleres ni peus del navegador. La vista en pantalla s\u2019ajusta a l\u2019espai; el document impr\xE8s conserva les mesures." })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "writing-preview", children: /* @__PURE__ */ jsxs4("article", { className: "writing-sheet", style: { "--rule-height": height + "cm" }, children: [
      /* @__PURE__ */ jsx4("h2", { children: title || "PRACTIQUEM L\u2019ESCRIPTURA" }),
      /* @__PURE__ */ jsxs4("div", { className: "writing-meta", children: [
        /* @__PURE__ */ jsx4("span", { children: "NOM: _______________________" }),
        /* @__PURE__ */ jsx4("span", { children: "DATA: ______________" })
      ] }),
      Array.from({ length: rows }, (_, i) => /* @__PURE__ */ jsxs4("div", { className: "writing-row", children: [
        /* @__PURE__ */ jsx4("span", { children: model }),
        /* @__PURE__ */ jsx4("div", { className: "writing-rule" })
      ] }, i)),
      /* @__PURE__ */ jsxs4("p", { className: "writing-credit", children: [
        "QS33DS \xB7 PAUTA DE ",
        height.toLocaleString("ca"),
        " CM"
      ] })
    ] }) })
  ] });
}

// src/modules/Observation.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function Observation() {
  return /* @__PURE__ */ jsxs5("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx5("div", { className: "tool-top", children: /* @__PURE__ */ jsx5("span", { children: "OBSERVAPT \xB7 EINA QS33DS EXISTENT" }) }),
    /* @__PURE__ */ jsx5("p", { className: "hint", children: "Registre funcional complet. ObservaPT desa les dades en aquest navegador: fes servir \xE0lies i exporta els registres que vulguis conservar." }),
    /* @__PURE__ */ jsx5("a", { className: "action", href: "../observapt.html", target: "_blank", rel: "noopener noreferrer", children: "Obre ObservaPT en una pestanya" }),
    /* @__PURE__ */ jsx5("iframe", { className: "existing-tool", src: "../observapt.html", title: "ObservaPT \xB7 Registre d\u2019observaci\xF3 funcional" }),
    /* @__PURE__ */ jsx5("p", { className: "hint", children: "Si no es mostra la vista integrada, utilitza el bot\xF3 per obrir l\u2019eina." })
  ] });
}

// tests/language.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
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
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Syllables, {})).includes("CASA"));
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Words, {})).includes("PAPALLONA"));
var g = renderToStaticMarkup(/* @__PURE__ */ jsx6(Guidelines, {}));
assert(g.includes("--rule-height:2cm"));
assert.equal((g.match(/class="writing-rule"/g) || []).length, 7);
assert(renderToStaticMarkup(/* @__PURE__ */ jsx6(Observation, {})).includes("../observapt.html"));
console.log("PASS: 26 explicit syllabifications, shared bank, written-position filters, 7 print rules at 2cm, existing ObservaPT adapter.");
var { create, act } = await import("react-test-renderer");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var syllables;
await act(() => {
  syllables = create(/* @__PURE__ */ jsx6(Syllables, {}));
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
  words = create(/* @__PURE__ */ jsx6(Words, {}));
});
await act(() => words.root.findAllByType("input").find((x) => x.props.placeholder === "Ex.: ma, p, ca...").props.onChange({ target: { value: "ma" } }));
await act(() => words.root.findByType("select").props.onChange({ target: { value: "end" } }));
assert.deepEqual(words.root.findAllByType("article").map((a) => a.findByType("strong").children.join("")), ["MAMA", "POMA", "M\xC0"]);
await act(() => findButton(words, "Neteja els filtres").props.onClick());
assert.equal(words.root.findAllByType("article").length, 26);
await act(() => words.unmount());
var rules;
await act(() => {
  rules = create(/* @__PURE__ */ jsx6(Guidelines, {}));
});
await act(() => rules.root.findAllByType("select")[0].props.onChange({ target: { value: "1.5" } }));
await act(() => rules.root.findAllByType("select")[1].props.onChange({ target: { value: "4" } }));
assert.equal(rules.root.findAllByProps({ className: "writing-rule" }).length, 4);
assert.equal(rules.root.findByProps({ className: "writing-sheet" }).props.style["--rule-height"], "1.5cm");
await act(() => rules.unmount());
console.log("PASS: syllable feedback and next-word reset, word query/position/reset, print height and row controls.");
