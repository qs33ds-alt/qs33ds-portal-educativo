// tests/autonomy.tsx
import assert from "node:assert/strict";
import { create, act } from "react-test-renderer";

// src/modules/Autonomy.tsx
import { useId as useId2, useState as useState3 } from "react";

// src/hooks/useLocalDocument.ts
import { useCallback, useEffect, useState } from "react";
function useLocalDocument(key, initial, parse, encode) {
  const [loaded] = useState(() => {
    try {
      if (typeof localStorage === "undefined") return { value: initial, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
      const raw = localStorage.getItem(key);
      return raw ? { value: parse(JSON.parse(raw)), status: "C\xF2pia local recuperada." } : { value: initial, status: "Es desar\xE0 nom\xE9s en aquest navegador." };
    } catch {
      return { value: initial, status: "No s\u2019ha pogut recuperar la c\xF2pia local. No s\u2019ha sobreescrit; pots importar una c\xF2pia JSON." };
    }
  });
  const [value, setValue] = useState(loaded.value), [dirty, setDirty] = useState(false), [status, setStatus] = useState(loaded.status);
  const update = useCallback((next) => {
    setDirty(true);
    setValue(next);
  }, []);
  useEffect(() => {
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
import { useId, useRef, useState as useState2 } from "react";

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
import { jsx, jsxs } from "react/jsx-runtime";
function DocumentBackup({ value, onRestore, parse, encode, filename, status }) {
  const id = useId(), file = useRef(null);
  const [source, setSource] = useState2(""), [pending, setPending] = useState2(null), [undo, setUndo] = useState2(null), [error, setError] = useState2(""), [message, setMessage] = useState2(""), [busy, setBusy] = useState2(false);
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
  return /* @__PURE__ */ jsxs("details", { className: "document-backup", children: [
    /* @__PURE__ */ jsx("summary", { children: "Desa i recupera una c\xF2pia" }),
    /* @__PURE__ */ jsxs("p", { className: "hint", children: [
      status,
      " Per utilitzar-la en un altre dispositiu, exporta el JSON i importa\u2019l all\xE0. No s\u2019envia cap dada al servidor."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => downloadJson(filename, encode(value)), children: "Exporta c\xF2pia JSON" }),
      /* @__PURE__ */ jsx("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa c\xF2pia JSON" })
    ] }),
    /* @__PURE__ */ jsx("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer de c\xF2pia JSON", accept: ".json,application/json", onChange: (e) => {
      void read(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsx("label", { htmlFor: id, children: "O enganxa una c\xF2pia JSON" }),
    /* @__PURE__ */ jsx("textarea", { id, rows: 5, maxLength: 1e6, value: source, onChange: (e) => setSource(e.target.value) }),
    /* @__PURE__ */ jsx("button", { className: "action", disabled: busy || !source.trim(), onClick: () => preview(source), children: "Revisa la c\xF2pia" }),
    pending && /* @__PURE__ */ jsxs("section", { className: "import-preview", "aria-label": "Vista pr\xE8via de la c\xF2pia", children: [
      /* @__PURE__ */ jsx("strong", { children: "C\xF2pia validada" }),
      /* @__PURE__ */ jsx("pre", { children: JSON.stringify(encode(pending.value), null, 2) }),
      /* @__PURE__ */ jsx("p", { children: "Substituir\xE0 el contingut i el progr\xE9s actuals d\u2019aquesta eina. Podr\xE0s desfer la importaci\xF3." }),
      /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx("button", { className: "action primary", onClick: () => {
          setUndo({ value });
          onRestore(pending.value);
          setPending(null);
          setMessage("C\xF2pia recuperada.");
        }, children: "Recupera aquesta c\xF2pia" }),
        /* @__PURE__ */ jsx("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la" })
      ] })
    ] }),
    undo && /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
      onRestore(undo.value);
      setUndo(null);
      setMessage("Importaci\xF3 desfeta.");
    }, children: "Desf\xE9s la importaci\xF3" }),
    error && /* @__PURE__ */ jsx("p", { role: "alert", children: error }),
    message && /* @__PURE__ */ jsx("p", { role: "status", children: message })
  ] });
}

// src/data/classroomDocuments.ts
var initialRoutine = { title: "LA MEVA RUTINA", steps: ["Preparo el material", "Escolto les instruccions", "Faig l\u2019activitat", "Reviso la feina", "Recullo el material"].map((text2) => ({ text: text2, done: false })) };
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

// src/modules/Autonomy.tsx
import { Plus, RotateCcw, Trash2, Undo2 } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Autonomy() {
  const prefix = useId2();
  const local = useLocalDocument("qs33ds_eines_autonomy_v1", initialRoutine, parseRoutine, routineDocument);
  const { title, steps } = local.value;
  const setTitle = (title2) => local.setValue((s) => ({ ...s, title: title2 }));
  const setSteps = (next) => local.setValue((s) => ({ ...s, steps: typeof next === "function" ? next(s.steps) : next }));
  const [draft2, setDraft] = useState3("");
  const [removed, setRemoved] = useState3(null);
  const completed = steps.filter((s) => s.done).length;
  function add() {
    const text2 = draft2.trim();
    if (!text2 || steps.length >= 30) return;
    setSteps((s) => [...s, { text: text2, done: false }]);
    setDraft("");
  }
  return /* @__PURE__ */ jsxs2("div", { className: "tool-surface autonomy-tool", children: [
    /* @__PURE__ */ jsxs2("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx2("span", { children: "AUTONOMIA PAS A PAS" }),
      /* @__PURE__ */ jsx2("span", { className: "micro-tag", children: "RUTINA VISUAL" })
    ] }),
    /* @__PURE__ */ jsx2("label", { className: "field-label", htmlFor: prefix + "title", children: "Nom de la rutina" }),
    /* @__PURE__ */ jsx2("input", { id: prefix + "title", maxLength: 80, value: title, onChange: (e) => setTitle(e.target.value) }),
    /* @__PURE__ */ jsxs2("div", { className: "routine-progress", children: [
      /* @__PURE__ */ jsx2("strong", { children: title || "LA MEVA RUTINA" }),
      /* @__PURE__ */ jsx2("p", { role: "status", children: steps.length && completed === steps.length ? "RUTINA COMPLETADA!" : `${completed} DE ${steps.length} PASSOS FETS` }),
      /* @__PURE__ */ jsx2("progress", { "aria-label": "Progr\xE9s de la rutina", value: completed, max: steps.length || 1 })
    ] }),
    /* @__PURE__ */ jsx2("ol", { className: "routine-steps", children: steps.map((step, index) => /* @__PURE__ */ jsxs2("li", { className: step.done ? "is-done" : "", children: [
      /* @__PURE__ */ jsx2("span", { className: "step-number", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxs2("label", { className: "step-check", children: [
        /* @__PURE__ */ jsx2("input", { type: "checkbox", checked: step.done, "aria-label": `Marca el pas ${index + 1} com a fet`, onChange: () => setSteps((s) => s.map((x, i) => i === index ? { ...x, done: !x.done } : x)) }),
        /* @__PURE__ */ jsx2("span", { children: step.done ? "FET" : "PENDENT" })
      ] }),
      /* @__PURE__ */ jsx2("input", { className: "step-text", "aria-label": `Text del pas ${index + 1}`, maxLength: 120, value: step.text, onChange: (e) => setSteps((s) => s.map((x, i) => i === index ? { ...x, text: e.target.value } : x)) }),
      /* @__PURE__ */ jsx2("button", { className: "icon-btn", "aria-label": `Elimina el pas ${index + 1}`, onClick: () => {
        setRemoved({ step, index });
        setSteps((s) => s.filter((_, i) => i !== index));
      }, children: /* @__PURE__ */ jsx2(Trash2, { size: 18 }) })
    ] }, index)) }),
    !steps.length && /* @__PURE__ */ jsx2("p", { className: "hint", children: "Afegeix el primer pas per preparar la teva rutina." }),
    removed && /* @__PURE__ */ jsxs2("button", { disabled: steps.length >= 30, className: "action", onClick: () => {
      setSteps((s) => {
        const a = [...s];
        a.splice(Math.min(removed.index, a.length), 0, removed.step);
        return a;
      });
      setRemoved(null);
    }, children: [
      /* @__PURE__ */ jsx2(Undo2, { size: 17 }),
      " Desf\xE9s l\u2019\xFAltima eliminaci\xF3"
    ] }),
    /* @__PURE__ */ jsxs2("form", { className: "routine-add", onSubmit: (e) => {
      e.preventDefault();
      add();
    }, children: [
      /* @__PURE__ */ jsx2("label", { className: "field-label", htmlFor: prefix + "new", children: "Nou pas (m\xE0xim 30)" }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("input", { id: prefix + "new", value: draft2, maxLength: 120, placeholder: "Escriu un pas curt...", onChange: (e) => setDraft(e.target.value) }),
        /* @__PURE__ */ jsxs2("button", { className: "action primary", disabled: !draft2.trim() || steps.length >= 30, children: [
          /* @__PURE__ */ jsx2(Plus, { size: 18 }),
          " Afegeix"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("button", { className: "action", disabled: !completed, onClick: () => {
      setSteps((s) => s.map((x) => ({ ...x, done: false })));
      setRemoved((r) => r ? { ...r, step: { ...r.step, done: false } } : null);
    }, children: [
      /* @__PURE__ */ jsx2(RotateCcw, { size: 17 }),
      " Torna a comen\xE7ar"
    ] }),
    /* @__PURE__ */ jsx2("p", { className: "hint", children: "La rutina i els passos marcats es conserven en aquest navegador. Fes servir textos d\u2019activitats, sense dades personals." }),
    /* @__PURE__ */ jsx2(DocumentBackup, { value: local.value, onRestore: (value) => {
      local.setValue(value);
      setRemoved(null);
      setDraft("");
    }, parse: parseRoutine, encode: routineDocument, filename: "QS33DS_rutina.json", status: local.status })
  ] });
}

// tests/autonomy.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var view;
await act(() => {
  view = create(/* @__PURE__ */ jsx3(Autonomy, {}));
});
var checks = () => view.root.findAllByType("input").filter((x) => x.props.type === "checkbox");
var button = (name) => view.root.findAllByType("button").find((b) => b.children.filter((c) => typeof c === "string").join("").trim() === name);
assert.equal(checks().length, 5);
await act(() => checks()[0].props.onChange());
assert.equal(view.root.findByType("progress").props.value, 1);
await act(() => view.root.findAllByType("input").find((x) => x.props["aria-label"] === "Text del pas 1").props.onChange({ target: { value: "PAS EDITAT" } }));
var draft = () => view.root.findAllByType("input").find((x) => x.props.placeholder === "Escriu un pas curt...");
await act(() => draft().props.onChange({ target: { value: "   " } }));
assert(button("Afegeix").props.disabled);
await act(() => draft().props.onChange({ target: { value: "Nou pas" } }));
await act(() => view.root.findByType("form").props.onSubmit({ preventDefault() {
} }));
assert.equal(checks().length, 6);
await act(() => view.root.findAllByType("button").find((x) => x.props["aria-label"] === "Elimina el pas 1").props.onClick());
assert.equal(checks().length, 5);
await act(() => button("Desf\xE9s l\u2019\xFAltima eliminaci\xF3").props.onClick());
assert.equal(checks().length, 6);
assert(checks()[0].props.checked);
assert.equal(view.root.findAllByType("input").find((x) => x.props["aria-label"] === "Text del pas 1").props.value, "PAS EDITAT");
await act(() => button("Torna a comen\xE7ar").props.onClick());
assert(checks().every((c) => !c.props.checked));
for (let i = 0; i < 24; i++) {
  await act(() => draft().props.onChange({ target: { value: "Pas " + i } }));
  await act(() => view.root.findByType("form").props.onSubmit({ preventDefault() {
  } }));
}
assert.equal(checks().length, 30);
assert(button("Afegeix").props.disabled);
await act(() => view.root.findAllByType("button").find((x) => x.props["aria-label"] === "Elimina el pas 1").props.onClick());
await act(() => draft().props.onChange({ target: { value: "Nou" } }));
await act(() => view.root.findByType("form").props.onSubmit({ preventDefault() {
} }));
assert.equal(checks().length, 30);
assert(button("Desf\xE9s l\u2019\xFAltima eliminaci\xF3").props.disabled);
await act(() => view.unmount());
console.log("PASS: autonomy edit/check/progress, blank rejection, add, remove/undo retaining text and state, reset, 30-step limit.");
