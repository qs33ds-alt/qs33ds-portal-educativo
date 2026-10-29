// tests/state.tsx
import assert from "node:assert/strict";
import { create, act } from "react-test-renderer";

// src/components/useWindows.ts
import { useState } from "react";
function constrain(x, y, width, height) {
  const windowWidth = Math.min(740, Math.max(0, width - 24));
  const margin = Math.min(12, Math.max(0, width - windowWidth));
  return { x: Math.max(margin, Math.min(x, Math.max(margin, width - windowWidth - margin))), y: Math.max(0, Math.min(y, Math.max(0, height - 80))) };
}
function useWindows() {
  const [items, setItems] = useState([]);
  function focus(id) {
    setItems((a) => a.map((w) => w.id === id ? { ...w, z: Math.max(0, ...a.map((v) => v.z)) + 1 } : w));
  }
  return {
    items,
    open: (id) => setItems((a) => a.some((w) => w.id === id) ? a.map((w) => w.id === id ? { ...w, minimized: false, z: Math.max(0, ...a.map((v) => v.z)) + 1 } : w) : [...a, { id, minimized: false, ...constrain(40 + a.length * 28, 90 + a.length * 24, window.innerWidth, window.innerHeight), z: Math.max(0, ...a.map((v) => v.z)) + 1 }]),
    focus,
    minimize: (id) => setItems((a) => a.map((w) => w.id === id ? { ...w, minimized: true } : w)),
    move: (id, x, y) => setItems((a) => a.map((w) => w.id === id ? { ...w, ...constrain(x, y, window.innerWidth, window.innerHeight) } : w))
  };
}

// src/modules/Timer.tsx
import { useEffect, useRef, useState as useState2 } from "react";

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
  const [total, setTotal] = useState2(300), [remaining, setRemaining] = useState2(300), [running, setRunning] = useState2(false);
  const [style, setStyle] = useState2("circular");
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

// tests/state.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.window = { innerWidth: 1280, innerHeight: 900, setInterval, clearInterval };
var manager;
function Harness() {
  manager = useWindows();
  return null;
}
var root;
await act(() => {
  root = create(/* @__PURE__ */ jsx3(Harness, {}));
});
await act(() => manager.open("timer"));
await act(() => manager.open("sequence"));
assert.equal(manager.items.length, 2);
await act(() => manager.minimize("timer"));
assert(manager.items[0].minimized);
await act(() => manager.open("timer"));
assert.equal(manager.items.length, 2);
assert(!manager.items[0].minimized);
assert(manager.items[0].z > manager.items[1].z);
await act(() => manager.move("timer", -30, 3e3));
assert.equal(manager.items[0].x, 12);
assert.equal(manager.items[0].y, 820);
await act(() => root.unmount());
var t;
await act(() => {
  t = create(/* @__PURE__ */ jsx3(Timer, {}));
});
var button = (name) => t.root.findAllByType("button").find((b) => b.children.filter((c) => typeof c === "string" || typeof c === "number").join("").trim() === name);
await act(() => button("1 min").props.onClick());
await act(() => button("Inicia").props.onClick());
await act(async () => {
  await new Promise((r) => setTimeout(r, 1250));
});
assert.equal(t.root.findByType("output").children.join(""), "00:59");
await act(() => button("Pausa").props.onClick());
var paused = t.root.findByType("output").children.join("");
await act(async () => {
  await new Promise((r) => setTimeout(r, 1100));
});
assert.equal(t.root.findByType("output").children.join(""), paused);
await act(() => button("Reinicia").props.onClick());
assert.equal(t.root.findByType("output").children.join(""), "01:00");
await act(() => t.unmount());
console.log("PASS: window open/minimize/restore/dedup/focus/clamp; timer start/tick/pause/reset.");
