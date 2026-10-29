// tests/vocabulary-import.tsx
import assert from "node:assert/strict";
import { create, act } from "react-test-renderer";

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
import { useSyncExternalStore } from "react";
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

// src/modules/Words.tsx
import { useId as useId2, useState as useState2 } from "react";

// src/components/VocabularyEditor.tsx
import { useId, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const id = useId(), bank = useVocabulary();
  const [word, setWord] = useState(""), [parts, setParts] = useState(""), [message, setMessage] = useState(""), [error, setError] = useState(""), [pending, setPending] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [busy, setBusy] = useState(false);
  const [jsonText, setJsonText] = useState("");
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
  return /* @__PURE__ */ jsxs("details", { className: "vocabulary-editor", children: [
    /* @__PURE__ */ jsx("summary", { children: "Amplia i conserva el banc de paraules" }),
    /* @__PURE__ */ jsx("p", { children: "Les paraules afegides es comparteixen amb el laboratori de s\xEDl\xB7labes i es desen nom\xE9s en aquest navegador. Exporta una c\xF2pia per portar-les a un altre dispositiu." }),
    bank.warning && /* @__PURE__ */ jsx("p", { role: "alert", children: bank.warning }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
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
      /* @__PURE__ */ jsxs("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: id + "word", children: [
          "Paraula nova",
          /* @__PURE__ */ jsx("input", { id: id + "word", maxLength: 40, value: word, onChange: (e) => setWord(e.target.value), placeholder: "motxilla", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { htmlFor: id + "parts", children: [
          "S\xEDl\xB7labes separades per guions",
          /* @__PURE__ */ jsx("input", { id: id + "parts", maxLength: 100, value: parts, onChange: (e) => setParts(e.target.value), placeholder: "mot-xi-lla", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "action primary", disabled: !word.trim() || !parts.trim(), children: "Afegeix al banc" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa JSON" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => download("QS33DS_vocabulari.json", vocabularyDocument(bank.words)), children: "Exporta el banc JSON" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => download("QS33DS_vocabulari_model.json", example), children: "Descarrega el model JSON" })
    ] }),
    /* @__PURE__ */ jsx("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer JSON de vocabulari", accept: ".json,application/json", onChange: (e) => {
      void readFile(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { children: "O enganxa el JSON directament" }),
      /* @__PURE__ */ jsx("label", { htmlFor: id + "json", children: "JSON per importar" }),
      /* @__PURE__ */ jsx("textarea", { id: id + "json", rows: 7, maxLength: 1e6, value: jsonText, onChange: (e) => setJsonText(e.target.value), placeholder: "Enganxa el document JSON complet..." }),
      /* @__PURE__ */ jsx("button", { className: "action", disabled: busy || !jsonText.trim(), onClick: () => preview(jsonText), children: "Valida el JSON enganxat" })
    ] }),
    pending && /* @__PURE__ */ jsxs("section", { className: "import-preview", "aria-label": "Revisi\xF3 de la importaci\xF3", children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        pending.length,
        " entrades validades"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        pending.slice(0, 5).map((w) => `${w.word}: ${w.syllables.join(" \xB7 ")}`).join("; "),
        pending.length > 5 ? "\u2026" : ""
      ] }),
      /* @__PURE__ */ jsx("p", { children: "La validaci\xF3 comprova el format i la reconstrucci\xF3 de cada paraula; revisa que la separaci\xF3 ling\xFC\xEDstica sigui correcta." }),
      /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx("button", { className: "action primary", onClick: () => {
          setError("");
          try {
            const r = addVocabulary(pending);
            setMessage(`${r.added} paraules afegides; ${r.skipped} ja existien.`);
            setPending(null);
          } catch (e) {
            setError(e.message);
          }
        }, children: "Incorpora les paraules" }),
        /* @__PURE__ */ jsx("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la la importaci\xF3" })
      ] })
    ] }),
    message && /* @__PURE__ */ jsx("p", { role: "status", children: message }),
    error && /* @__PURE__ */ jsx("p", { role: "alert", children: error }),
    bank.custom.length > 0 && /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsxs("summary", { children: [
        "Paraules personalitzades (",
        bank.custom.length,
        "/500)"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "custom-words", children: bank.custom.map((w) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          w.word.toLocaleUpperCase("ca"),
          " \xB7 ",
          w.syllables.join(" \xB7 ")
        ] }),
        /* @__PURE__ */ jsx("button", { className: "action", "aria-label": `Elimina ${w.word}`, onClick: () => {
          setRemoved(w);
          removeVocabulary(w.word);
          setMessage(`\xAB${w.word}\xBB eliminada del banc personalitzat.`);
        }, children: "Elimina" })
      ] }, w.word)) })
    ] }),
    removed && /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
      setError("");
      try {
        addVocabulary([removed]);
        setRemoved(null);
        setMessage("Paraula restaurada.");
      } catch (e) {
        setError(e.message);
      }
    }, children: "Desf\xE9s l\u2019\xFAltima eliminaci\xF3" }),
    /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { children: "Format compatible per generar paraules amb ChatGPT" }),
      /* @__PURE__ */ jsx("p", { children: "Demana paraules en catal\xE0 amb aquest format, sense explicacions fora del JSON. Cada word ha de coincidir amb la uni\xF3 de les syllables. No hi incloguis dades d\u2019alumnat." }),
      /* @__PURE__ */ jsx("pre", { children: JSON.stringify(example, null, 2) })
    ] })
  ] });
}

// src/modules/Words.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Words() {
  const { words: vocabulary2 } = useVocabulary();
  const id = useId2();
  const [query, setQuery] = useState2(""), [position, setPosition] = useState2("any");
  const filtered = vocabulary2.filter((w) => matchesWritten(w.word, query, position));
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
    !filtered.length && /* @__PURE__ */ jsx2("p", { children: "Cap paraula del banc coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" }),
    /* @__PURE__ */ jsx2(VocabularyEditor, {})
  ] });
}

// src/modules/Syllables.tsx
import { useId as useId3, useState as useState3 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next }) {
  const [answer, setAnswer] = useState3(null), [revealed, setRevealed] = useState3(false);
  return /* @__PURE__ */ jsxs3("section", { children: [
    /* @__PURE__ */ jsxs3("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx3("span", { children: "ESCOLTA\u2019T I PICA DE MANS" }),
      /* @__PURE__ */ jsxs3("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { children: "Digues la paraula i fes una picada per cada s\xEDl\xB7laba." }),
    /* @__PURE__ */ jsx3("div", { className: "syllable-word", children: item.word.toLocaleUpperCase("ca") }),
    /* @__PURE__ */ jsx3("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
    /* @__PURE__ */ jsx3("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx3("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
      setAnswer(n);
      setRevealed(true);
    }, children: n }, n)) }),
    /* @__PURE__ */ jsx3("p", { className: "syllable-feedback", role: "status", children: answer === null ? "Tria una resposta." : answer === item.syllables.length ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. MIRA ELS COPS DE VEU." }),
    revealed && /* @__PURE__ */ jsx3("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx3("span", { children: s.toLocaleUpperCase("ca") }, i)) }),
    /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] }),
    /* @__PURE__ */ jsxs3("p", { className: "hint", children: [
      "Banc de ",
      total,
      " paraules en catal\xE0 amb separaci\xF3 expl\xEDcita. Sense puntuaci\xF3 ni dades d\u2019alumnat."
    ] })
  ] });
}
function Syllables() {
  const id = useId3(), bank = useVocabulary();
  const [source, setSource] = useState3("all"), [index, setIndex] = useState3(0);
  const words = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
  const current = index % Math.max(1, words.length);
  const item = words[current];
  return /* @__PURE__ */ jsxs3("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs3("label", { className: "style-picker", htmlFor: id, children: [
      "Paraules de l\u2019activitat",
      /* @__PURE__ */ jsxs3("select", { id, value: source, onChange: (e) => {
        setSource(e.target.value);
        setIndex(0);
      }, children: [
        /* @__PURE__ */ jsx3("option", { value: "all", children: "Tot el banc compartit" }),
        /* @__PURE__ */ jsx3("option", { value: "base", children: "Banc inicial" }),
        /* @__PURE__ */ jsx3("option", { value: "custom", children: "Nom\xE9s personalitzades" })
      ] })
    ] }),
    item ? /* @__PURE__ */ jsx3(SyllableQuestion, { item, index: current, total: words.length, next: () => setIndex((i) => i + 1) }, source + ":" + index + ":" + item.word + ":" + item.syllables.join("|")) : /* @__PURE__ */ jsx3("p", { role: "status", children: "Encara no hi ha paraules personalitzades. Afegeix-les o importa-les des del Banc de Paraules." })
  ] });
}

// tests/vocabulary-import.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var memory = /* @__PURE__ */ new Map();
globalThis.localStorage = { getItem: (k) => memory.get(k) || null, setItem: (k, v) => memory.set(k, v), removeItem: (k) => memory.delete(k) };
var bag = { word: "motxilla", syllables: ["mot", "xi", "lla"] };
assert.deepEqual(validateWord({ word: "  MOTXILLA ", syllables: ["MOT", "XI", "LLA"] }), bag);
assert.throws(() => parseVocabularyText("{bad"), /JSON/);
assert.throws(() => parseVocabularyText("x".repeat(1000001)), /MB/);
for (const bad of [null, [], {}, vocabularyDocument([]), { ...vocabularyDocument([bag]), language: "es" }, vocabularyDocument([{ word: "casa", syllables: ["ca", "zza"] }]), vocabularyDocument([bag, bag]), vocabularyDocument([{ word: "<img>", syllables: ["<img>"] }]), vocabularyDocument([{ word: "abc", syllables: [2] }]), vocabularyDocument([{ word: "x", syllables: Array(9).fill("x") }])]) assert.throws(() => parseVocabulary(bad));
var many = Array.from({ length: 500 }, (_, i) => {
  const word = "xx" + String.fromCharCode(97 + Math.floor(i / 26)) + String.fromCharCode(97 + i % 26);
  return { word, syllables: [word] };
});
assert.equal(parseVocabulary(vocabularyDocument([...vocabulary, ...many])).length, 526);
assert.equal(mergeVocabulary(vocabulary, [], [vocabulary[0]]).added, 0);
assert.throws(() => mergeVocabulary(vocabulary, [], [{ word: "casa", syllables: ["cas", "a"] }]), /diferent/);
assert.throws(() => mergeVocabulary([], Array.from({ length: 500 }, (_, i) => ({ word: "w" + i, syllables: ["x"] })), [bag]), /500/);
var tree;
await act(() => {
  tree = create(/* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4(Words, {}),
    /* @__PURE__ */ jsx4(Syllables, {})
  ] }));
});
assert.equal(getVocabularySnapshot().words.length, 26);
await act(() => addVocabulary(parseVocabulary(vocabularyDocument([bag]))));
assert.equal(getVocabularySnapshot().words.length, 27);
assert.equal(JSON.parse(memory.get(VOCABULARY_KEY)).words[0].word, "motxilla");
assert.equal(tree.root.findAllByType("article").length, 27);
var lab = () => tree.root.findByType(Syllables);
await act(() => lab().findByType("select").props.onChange({ target: { value: "custom" } }));
assert.equal(lab().findByProps({ className: "syllable-word" }).children.join(""), "MOTXILLA");
var button = (root, name) => root.findAllByType("button").find((b) => b.children.filter((x) => typeof x === "string" || typeof x === "number").join("").trim() === name);
await act(() => button(lab(), "3").props.onClick());
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "MOLT B\xC9!");
await act(() => button(lab(), "Paraula seg\xFCent \u2192").props.onClick());
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "Tria una resposta.");
var previous = getVocabularySnapshot();
assert.throws(() => addVocabulary([{ word: "nou", syllables: ["nou"] }, { word: "casa", syllables: ["cas", "a"] }]), /diferent/);
assert.strictEqual(getVocabularySnapshot(), previous);
await act(() => removeVocabulary("motxilla"));
assert.equal(getVocabularySnapshot().words.length, 26);
assert.equal(memory.has(VOCABULARY_KEY), false);
assert(lab().findByProps({ role: "status" }).children.join("").includes("Encara no"));
await act(() => addVocabulary([bag]));
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "Tria una resposta.");
await act(() => {
  tree.unmount();
});
removeVocabulary("motxilla");
globalThis.localStorage.setItem = () => {
  throw Error("blocked");
};
addVocabulary([bag]);
assert.equal(getVocabularySnapshot().custom.length, 1);
assert(getVocabularySnapshot().warning.includes("no permet desar"));
console.log("PASS: strict schema, size/entry/duplicate/conflict checks, atomic import, shared live UI, persistence, removal, question reset and blocked-storage fallback.");
