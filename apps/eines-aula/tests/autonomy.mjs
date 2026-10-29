// tests/autonomy.tsx
import assert from "node:assert/strict";
import { create, act } from "react-test-renderer";

// src/modules/Autonomy.tsx
import { useId, useState } from "react";
import { Plus, RotateCcw, Trash2, Undo2 } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var defaults = ["Preparo el material", "Escolto les instruccions", "Faig l\u2019activitat", "Reviso la feina", "Recullo el material"];
function Autonomy() {
  const prefix = useId();
  const [title, setTitle] = useState("LA MEVA RUTINA");
  const [steps, setSteps] = useState(() => defaults.map((text, id) => ({ id, text, done: false })));
  const [draft2, setDraft] = useState("");
  const [serial, setSerial] = useState(defaults.length);
  const [removed, setRemoved] = useState(null);
  const completed = steps.filter((s) => s.done).length;
  function add() {
    const text = draft2.trim();
    if (!text || steps.length >= 30) return;
    setSteps((s) => [...s, { id: serial, text, done: false }]);
    setSerial((s) => s + 1);
    setDraft("");
  }
  return /* @__PURE__ */ jsxs("div", { className: "tool-surface autonomy-tool", children: [
    /* @__PURE__ */ jsxs("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx("span", { children: "AUTONOMIA PAS A PAS" }),
      /* @__PURE__ */ jsx("span", { className: "micro-tag", children: "RUTINA VISUAL" })
    ] }),
    /* @__PURE__ */ jsx("label", { className: "field-label", htmlFor: prefix + "title", children: "Nom de la rutina" }),
    /* @__PURE__ */ jsx("input", { id: prefix + "title", maxLength: 80, value: title, onChange: (e) => setTitle(e.target.value) }),
    /* @__PURE__ */ jsxs("div", { className: "routine-progress", children: [
      /* @__PURE__ */ jsx("strong", { children: title || "LA MEVA RUTINA" }),
      /* @__PURE__ */ jsx("p", { role: "status", children: steps.length && completed === steps.length ? "RUTINA COMPLETADA!" : `${completed} DE ${steps.length} PASSOS FETS` }),
      /* @__PURE__ */ jsx("progress", { "aria-label": "Progr\xE9s de la rutina", value: completed, max: steps.length || 1 })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "routine-steps", children: steps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: step.done ? "is-done" : "", children: [
      /* @__PURE__ */ jsx("span", { className: "step-number", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxs("label", { className: "step-check", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: step.done, "aria-label": `Marca el pas ${index + 1} com a fet`, onChange: () => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, done: !x.done } : x)) }),
        /* @__PURE__ */ jsx("span", { children: step.done ? "FET" : "PENDENT" })
      ] }),
      /* @__PURE__ */ jsx("input", { className: "step-text", "aria-label": `Text del pas ${index + 1}`, maxLength: 120, value: step.text, onChange: (e) => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, text: e.target.value } : x)) }),
      /* @__PURE__ */ jsx("button", { className: "icon-btn", "aria-label": `Elimina el pas ${index + 1}`, onClick: () => {
        setRemoved({ step, index });
        setSteps((s) => s.filter((x) => x.id !== step.id));
      }, children: /* @__PURE__ */ jsx(Trash2, { size: 18 }) })
    ] }, step.id)) }),
    !steps.length && /* @__PURE__ */ jsx("p", { className: "hint", children: "Afegeix el primer pas per preparar la teva rutina." }),
    removed && /* @__PURE__ */ jsxs("button", { disabled: steps.length >= 30, className: "action", onClick: () => {
      setSteps((s) => {
        const a = [...s];
        a.splice(Math.min(removed.index, a.length), 0, removed.step);
        return a;
      });
      setRemoved(null);
    }, children: [
      /* @__PURE__ */ jsx(Undo2, { size: 17 }),
      " Desf\xE9s l\u2019\xFAltima eliminaci\xF3"
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "routine-add", onSubmit: (e) => {
      e.preventDefault();
      add();
    }, children: [
      /* @__PURE__ */ jsx("label", { className: "field-label", htmlFor: prefix + "new", children: "Nou pas (m\xE0xim 30)" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("input", { id: prefix + "new", value: draft2, maxLength: 120, placeholder: "Escriu un pas curt...", onChange: (e) => setDraft(e.target.value) }),
        /* @__PURE__ */ jsxs("button", { className: "action primary", disabled: !draft2.trim() || steps.length >= 30, children: [
          /* @__PURE__ */ jsx(Plus, { size: 18 }),
          " Afegeix"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "action", disabled: !completed, onClick: () => {
      setSteps((s) => s.map((x) => ({ ...x, done: false })));
      setRemoved((r) => r ? { ...r, step: { ...r.step, done: false } } : null);
    }, children: [
      /* @__PURE__ */ jsx(RotateCcw, { size: 17 }),
      " Torna a comen\xE7ar"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "hint", children: "La rutina es mant\xE9 en minimitzar. Es reinicia en recarregar la p\xE0gina; no es desa cap dada personal." })
  ] });
}

// tests/autonomy.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var view;
await act(() => {
  view = create(/* @__PURE__ */ jsx2(Autonomy, {}));
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
