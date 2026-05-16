import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const script = readFileSync(new URL("../main.js", import.meta.url), "utf8");

test("uses intersection observer to reveal content blocks", () => {
  assert.match(script, /new IntersectionObserver/);
  assert.match(script, /\[data-reveal\]/);
  assert.match(script, /is-visible/);
});

test("adds pointer-driven orbit motion hooks", () => {
  assert.match(script, /data-orbit/);
  assert.match(script, /--pointer-x/);
  assert.match(script, /--pointer-y/);
});

test("enhances the wordmark strip with active states", () => {
  assert.match(script, /data-wordmark/);
  assert.match(script, /is-active/);
  assert.match(script, /focus/);
});

test("cycles the wordmark spotlight when motion is allowed", () => {
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /matchMedia/);
  assert.match(script, /setInterval/);
});
