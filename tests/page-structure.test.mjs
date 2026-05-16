import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("renders the atlas prime title and main sections", () => {
  assert.match(html, /<title>全球 AI 模型版图<\/title>/);
  assert.match(html, /<section class="hero" id="top">/);
  assert.match(html, /<section class="overview" id="overview">/);
  assert.match(html, /<section class="league" id="league">/);
  assert.match(html, /<section class="signal" id="signal">/);
});

test("includes the confirmed brand lineup and narrative copy", () => {
  for (const name of ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "DeepSeek"]) {
    assert.match(html, new RegExp(name));
  }

  assert.match(html, /全球 AI 模型版图/);
  assert.match(html, /北美定义前沿推理高地/);
  assert.match(html, /欧洲推动开源创新密度/);
  assert.match(html, /亚洲正在重写效率曲线/);
});

test("exposes hooks for progressive enhancement", () => {
  assert.match(html, /data-reveal/);
  assert.match(html, /data-wordmark/);
  assert.match(html, /data-orbit/);
  assert.match(html, /<script src="\.\/main\.js" defer><\/script>/);
});

test("adds premium hero details and brand presentation blocks", () => {
  assert.match(html, /class="hero-stats"/);
  assert.match(html, /class="hero-surface"/);
  assert.match(html, /class="brand-ribbon"/);
  assert.match(html, /class="hero-spotlight"/);
});
