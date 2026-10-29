// tests/preferences.ts
import assert from "node:assert/strict";

// src/utils/preferences.ts
function readTheme() {
  try {
    return localStorage.getItem("eines-appearance-v2") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}
function saveTheme(theme) {
  try {
    localStorage.setItem("eines-appearance-v2", theme);
  } catch {
  }
}
function searchText(value) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("ca").trim();
}

// tests/preferences.ts
var stored = null;
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => stored, setItem: (_key, value) => stored = value } });
assert.equal(readTheme(), "light");
saveTheme("dark");
assert.equal(readTheme(), "dark");
saveTheme("light");
assert.equal(readTheme(), "light");
stored = "invalid";
assert.equal(readTheme(), "light");
Object.defineProperty(globalThis, "localStorage", { configurable: true, get() {
  throw new Error("blocked");
} });
assert.equal(readTheme(), "light");
assert.doesNotThrow(() => saveTheme("dark"));
assert.equal(searchText("  Separaci\xF3 SIL\xB7L\xC0BICA  "), "separacio sil\xB7labica");
assert.equal(searchText("GESTI\xD3"), "gestio");
assert.equal(searchText("autonom\xEDa"), "autonomia");
assert.equal(searchText("separacio"), searchText("separaci\xF3"));
console.log("PASS: light default, explicit theme choice, blocked storage and accent-insensitive Catalan search.");
