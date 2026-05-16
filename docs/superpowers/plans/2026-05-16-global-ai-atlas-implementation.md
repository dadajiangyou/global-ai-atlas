# Global AI Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把当前只有 `demo` 文本的静态页，落地为一个高端科技品牌风格的“全球 AI 模型版图”单页展示站。

**Architecture:** 页面继续保持纯静态实现，所有结构与样式集中在 `index.html`，轻量动态增强集中在 `main.js`。测试使用 Node 内置 `node:test`，通过读取源码文本做结构与行为钩子校验，最后再用浏览器做桌面端和移动端人工验收。

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Node.js built-in test runner (`node --test`)

---

## File Structure

- Modify: `index.html`
  - 单文件承载整页结构、文案和样式
- Modify: `main.js`
  - 负责首屏轻动效、滚动显隐、品牌条 hover 增强
- Create: `tests/page-structure.test.mjs`
  - 校验页面结构、文案、品牌条和动效挂载点
- Create: `tests/main-js.test.mjs`
  - 校验 `main.js` 是否实现了约定的渐进增强逻辑

---

### Task 1: 实现 Atlas Prime 页面结构与视觉

**Files:**
- Modify: `index.html`
- Test: `tests/page-structure.test.mjs`

- [ ] **Step 1: 先写页面结构测试**

在 `tests/page-structure.test.mjs` 中写入下面的完整测试文件：

```javascript
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
```

- [ ] **Step 2: 运行测试，确认它先失败**

Run: `node --test tests/page-structure.test.mjs`  
Expected: FAIL，原因应为当前 `index.html` 只有 `demo`，缺少标题、分区、品牌名称和脚本挂载点。

- [ ] **Step 3: 写最小但完整的页面实现**

把 `index.html` 整个替换为下面这份完整文件：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>全球 AI 模型版图</title>
    <style>
      :root {
        --bg: #04111d;
        --panel: rgba(7, 25, 40, 0.78);
        --panel-strong: rgba(8, 31, 50, 0.94);
        --line: rgba(124, 205, 255, 0.14);
        --line-strong: rgba(124, 205, 255, 0.28);
        --text: #eef8ff;
        --muted: rgba(216, 235, 255, 0.7);
        --soft: rgba(216, 235, 255, 0.52);
        --cyan: #87ecff;
        --blue: #64a7ff;
        --gold: #ffcf84;
        --radius-xl: 32px;
        --radius-lg: 22px;
        --shadow: 0 24px 64px rgba(2, 12, 22, 0.38);
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        font-family: "Segoe UI Variable", "Segoe UI", system-ui, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at 15% 18%, rgba(45, 174, 255, 0.16), transparent 26%),
          radial-gradient(circle at 84% 12%, rgba(50, 229, 181, 0.16), transparent 28%),
          radial-gradient(circle at 50% 88%, rgba(255, 186, 88, 0.12), transparent 24%),
          linear-gradient(180deg, #03101b 0%, #07192a 46%, #0b2035 100%);
        min-height: 100vh;
      }

      body::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(rgba(118, 210, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(118, 210, 255, 0.05) 1px, transparent 1px);
        background-size: 38px 38px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25));
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .page-shell {
        width: min(1180px, calc(100% - 32px));
        margin: 24px auto 72px;
      }

      .hero,
      .overview,
      .league,
      .signal {
        position: relative;
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow);
        overflow: hidden;
      }

      .hero {
        padding: 28px;
        background:
          radial-gradient(circle at top right, rgba(84, 164, 255, 0.15), transparent 30%),
          linear-gradient(135deg, rgba(7, 24, 38, 0.92), rgba(9, 35, 56, 0.88));
      }

      .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(rgba(128, 213, 255, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(128, 213, 255, 0.06) 1px, transparent 1px);
        background-size: 34px 34px;
      }

      .topbar,
      .hero-grid,
      .section-head,
      .overview-grid,
      .league-grid,
      .signal-grid,
      .footer-note {
        position: relative;
        z-index: 1;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 32px;
      }

      .brand-lockup {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .brand-seal {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 36% 34%, rgba(168, 244, 255, 1), rgba(63, 145, 255, 0.58) 28%, rgba(7, 25, 41, 0.14) 52%),
          linear-gradient(135deg, rgba(16, 127, 201, 0.72), rgba(49, 226, 186, 0.32));
        box-shadow: 0 0 28px rgba(66, 150, 255, 0.26);
        position: relative;
      }

      .brand-seal::before,
      .brand-seal::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(202, 241, 255, 0.3);
      }

      .brand-seal::before {
        inset: 7px;
      }

      .brand-seal::after {
        inset: 14px 6px;
        transform: rotate(24deg);
      }

      .brand-copy strong {
        display: block;
        font-size: 0.94rem;
        letter-spacing: 0.12em;
      }

      .brand-copy span {
        color: var(--soft);
        font-size: 0.78rem;
      }

      .nav-links {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .nav-links a,
      .hero-actions a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.05);
        transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
      }

      .nav-links a:hover,
      .hero-actions a:hover {
        transform: translateY(-2px);
        border-color: var(--line-strong);
        background: rgba(135, 236, 255, 0.09);
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: 28px;
        align-items: center;
      }

      .eyebrow,
      .section-kicker {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid rgba(109, 215, 255, 0.24);
        background: rgba(109, 215, 255, 0.1);
        color: #9de9ff;
        font-size: 0.76rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero-copy h1 {
        font-size: clamp(2.5rem, 5vw, 4.6rem);
        line-height: 0.95;
        margin: 16px 0 14px;
        max-width: 640px;
      }

      .hero-copy p {
        max-width: 560px;
        margin: 0 0 18px;
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.7;
      }

      .hero-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 18px;
      }

      .hero-actions .primary {
        background: linear-gradient(135deg, rgba(85, 171, 255, 0.22), rgba(135, 236, 255, 0.18));
        border-color: rgba(135, 236, 255, 0.32);
      }

      .hero-quote {
        padding: 16px 18px;
        border-radius: var(--radius-lg);
        background: rgba(6, 20, 32, 0.6);
        border: 1px solid var(--line);
        color: var(--muted);
        max-width: 560px;
      }

      .hero-quote strong {
        display: block;
        color: var(--text);
        margin-bottom: 6px;
      }

      .hero-visual {
        display: grid;
        place-items: center;
        min-height: 430px;
      }

      .globe-stage {
        position: relative;
        width: min(100%, 420px);
        aspect-ratio: 1 / 1;
        display: grid;
        place-items: center;
      }

      .orbit {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(130, 214, 255, 0.22);
      }

      .orbit.one {
        width: 100%;
        height: 42%;
        transform: rotate(10deg);
      }

      .orbit.two {
        width: 82%;
        height: 82%;
      }

      .orbit.three {
        width: 84%;
        height: 84%;
        transform: rotate(62deg);
      }

      .globe-core {
        width: 76%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        position: relative;
        background:
          radial-gradient(circle at 34% 30%, rgba(176, 247, 255, 1), rgba(92, 159, 255, 0.54) 26%, rgba(4, 20, 34, 0.2) 54%),
          radial-gradient(circle at 58% 76%, rgba(69, 217, 178, 0.52), transparent 30%),
          linear-gradient(135deg, rgba(11, 57, 91, 0.95), rgba(7, 20, 39, 0.98));
        box-shadow:
          inset -28px -26px 50px rgba(0, 0, 0, 0.42),
          inset 0 0 42px rgba(150, 238, 255, 0.14),
          0 0 56px rgba(64, 148, 255, 0.24);
      }

      .globe-core::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background:
          linear-gradient(transparent 48%, rgba(160, 231, 255, 0.24) 49%, transparent 50%),
          linear-gradient(90deg, transparent 48%, rgba(160, 231, 255, 0.18) 49%, transparent 50%);
        background-size: 100% 42px, 42px 100%;
      }

      .globe-core::after {
        content: "";
        position: absolute;
        inset: 18px;
        border-radius: 50%;
        border: 1px solid rgba(191, 240, 255, 0.18);
      }

      .signal-node {
        position: absolute;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(6, 21, 34, 0.9);
        border: 1px solid var(--line);
        color: var(--text);
        min-width: 120px;
      }

      .signal-node strong {
        display: block;
        font-size: 0.82rem;
        margin-bottom: 4px;
      }

      .signal-node span {
        color: var(--soft);
        font-size: 0.74rem;
      }

      .signal-node.a { top: 10%; left: 0; }
      .signal-node.b { top: 18%; right: -4%; }
      .signal-node.c { bottom: 18%; left: 2%; }
      .signal-node.d { bottom: 8%; right: 8%; }

      .brand-band {
        margin-top: 24px;
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 12px;
      }

      .wordmark {
        min-height: 88px;
        border-radius: 18px;
        background: rgba(6, 21, 34, 0.74);
        border: 1px solid var(--line);
        display: grid;
        place-items: center;
        text-align: center;
        padding: 12px;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
      }

      .wordmark strong {
        display: block;
        font-size: 0.95rem;
        margin-bottom: 4px;
      }

      .wordmark span {
        color: var(--soft);
        font-size: 0.72rem;
      }

      .wordmark.is-active,
      .wordmark:hover {
        transform: translateY(-4px);
        border-color: var(--line-strong);
        box-shadow: 0 18px 38px rgba(3, 16, 28, 0.28);
      }

      .overview,
      .league,
      .signal {
        margin-top: 22px;
        padding: 28px;
      }

      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 18px;
        margin-bottom: 22px;
      }

      .section-head h2 {
        margin: 12px 0 6px;
        font-size: clamp(1.6rem, 3vw, 2.4rem);
      }

      .section-head p {
        max-width: 620px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .overview-grid,
      .league-grid,
      .signal-grid {
        display: grid;
        gap: 16px;
      }

      .overview-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .league-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .signal-grid {
        grid-template-columns: 1.2fr 1fr;
      }

      .panel-card {
        background: var(--panel-strong);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 22px;
      }

      .panel-card .label {
        display: inline-block;
        padding: 6px 10px;
        border-radius: 999px;
        color: var(--cyan);
        background: rgba(135, 236, 255, 0.08);
        border: 1px solid rgba(135, 236, 255, 0.18);
        font-size: 0.74rem;
        margin-bottom: 14px;
      }

      .panel-card h3 {
        margin: 0 0 10px;
        font-size: 1.24rem;
      }

      .panel-card p,
      .panel-card li {
        color: var(--muted);
        line-height: 1.7;
      }

      .panel-card ul {
        margin: 14px 0 0 18px;
        padding: 0;
      }

      .brand-card {
        min-height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .brand-badge {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(135, 236, 255, 0.2);
        background: rgba(135, 236, 255, 0.08);
        font-weight: 700;
        letter-spacing: 0.04em;
      }

      .brand-card footer {
        color: var(--soft);
        font-size: 0.78rem;
        border-top: 1px solid rgba(124, 205, 255, 0.08);
        padding-top: 12px;
      }

      .signal-highlight {
        display: grid;
        gap: 12px;
      }

      .signal-kicker {
        padding: 18px 20px;
        border-radius: 22px;
        background: linear-gradient(135deg, rgba(83, 165, 255, 0.18), rgba(135, 236, 255, 0.08));
        border: 1px solid rgba(135, 236, 255, 0.16);
      }

      .signal-kicker strong {
        display: block;
        font-size: 1.08rem;
        margin-bottom: 6px;
      }

      .footer-note {
        margin-top: 18px;
        color: var(--soft);
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      [data-reveal] {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 540ms ease, transform 540ms ease;
      }

      [data-reveal].is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (max-width: 960px) {
        .hero-grid,
        .overview-grid,
        .league-grid,
        .signal-grid,
        .brand-band {
          grid-template-columns: 1fr;
        }

        .hero-visual {
          min-height: 360px;
        }
      }

      @media (max-width: 640px) {
        .page-shell {
          width: min(100% - 20px, 100%);
          margin-top: 10px;
        }

        .hero,
        .overview,
        .league,
        .signal {
          padding: 20px;
          border-radius: 24px;
        }

        .topbar,
        .section-head,
        .footer-note {
          flex-direction: column;
          align-items: flex-start;
        }

        .signal-node {
          position: static;
          margin-top: 10px;
        }
      }
    </style>
  </head>
  <body>
    <main class="page-shell">
      <section class="hero" id="top">
        <div class="topbar">
          <div class="brand-lockup">
            <div class="brand-seal" aria-hidden="true"></div>
            <div class="brand-copy">
              <strong>WORLD MODEL ATLAS</strong>
              <span>全球 AI 模型版图观察</span>
            </div>
          </div>
          <nav class="nav-links" aria-label="页面导航">
            <a href="#overview">全球总述</a>
            <a href="#league">代表阵营</a>
            <a href="#signal">趋势观察</a>
          </nav>
        </div>

        <div class="hero-grid">
          <div class="hero-copy" data-reveal>
            <span class="eyebrow">Atlas Prime</span>
            <h1>全球 AI 模型版图</h1>
            <p>
              把北美、欧洲、亚洲的主流模型势力，组织成一个可读、可看、可截图的高端视觉首页。
              这里不是百科表格，而是一张兼具品牌气质和行业概览的全球模型地图。
            </p>
            <div class="hero-actions">
              <a class="primary" href="#league">查看代表阵营</a>
              <a href="#signal">阅读趋势判断</a>
            </div>
            <div class="hero-quote">
              <strong>一句话定位</strong>
              北美定义前沿推理高地，欧洲推动开源创新密度，亚洲正在重写效率曲线。
            </div>
          </div>

          <div class="hero-visual" data-reveal>
            <div class="globe-stage" data-orbit>
              <div class="orbit one" aria-hidden="true"></div>
              <div class="orbit two" aria-hidden="true"></div>
              <div class="orbit three" aria-hidden="true"></div>
              <div class="globe-core" aria-hidden="true"></div>
              <div class="signal-node a"><strong>OpenAI / Anthropic</strong><span>North America</span></div>
              <div class="signal-node b"><strong>Google / Meta</strong><span>Global Platform</span></div>
              <div class="signal-node c"><strong>Mistral</strong><span>Europe Open Source</span></div>
              <div class="signal-node d"><strong>DeepSeek</strong><span>Asia Efficiency Leap</span></div>
            </div>
          </div>
        </div>

        <div class="brand-band">
          <article class="wordmark" data-wordmark data-reveal><div><strong>OpenAI</strong><span>产品化与多模态势能</span></div></article>
          <article class="wordmark" data-wordmark data-reveal><div><strong>Anthropic</strong><span>安全取向与长文本推理</span></div></article>
          <article class="wordmark" data-wordmark data-reveal><div><strong>Google</strong><span>平台能力与模型生态</span></div></article>
          <article class="wordmark" data-wordmark data-reveal><div><strong>Meta</strong><span>开源传播与社区影响</span></div></article>
          <article class="wordmark" data-wordmark data-reveal><div><strong>Mistral</strong><span>欧洲创新与轻量部署</span></div></article>
          <article class="wordmark" data-wordmark data-reveal><div><strong>DeepSeek</strong><span>效率跃迁与工程速度</span></div></article>
        </div>
      </section>

      <section class="overview" id="overview">
        <div class="section-head" data-reveal>
          <div>
            <span class="section-kicker">Global Overview</span>
            <h2>全球模型格局，先看三种区域节奏</h2>
          </div>
          <p>这一段不做冗长科普，而是用三张区域卡片把竞争重点讲清楚，方便后续做博客拆解和截图引用。</p>
        </div>

        <div class="overview-grid">
          <article class="panel-card" data-reveal>
            <span class="label">North America</span>
            <h3>北美定义前沿推理高地</h3>
            <p>旗舰闭源模型仍然维持最强产品整合能力，从多模态交互到长链路推理，持续拉高行业天花板。</p>
          </article>
          <article class="panel-card" data-reveal>
            <span class="label">Europe</span>
            <h3>欧洲推动开源创新密度</h3>
            <p>更轻、更灵活、更强调开放协作，是欧洲模型阵营最明显的气质，也在改变部署和实验节奏。</p>
          </article>
          <article class="panel-card" data-reveal>
            <span class="label">Asia</span>
            <h3>亚洲正在重写效率曲线</h3>
            <p>工程化落地、成本敏感和迭代速度，让亚洲模型在效率优化和实际可用性上形成鲜明竞争力。</p>
          </article>
        </div>
      </section>

      <section class="league" id="league">
        <div class="section-head" data-reveal>
          <div>
            <span class="section-kicker">Model League</span>
            <h2>代表阵营，用最短的语句建立识别</h2>
          </div>
          <p>每个品牌只保留一句定位语，让页面保持高级与克制，不掉进参数罗列和百科式说明里。</p>
        </div>

        <div class="league-grid">
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">OA</div><h3>OpenAI</h3><p>把模型能力快速产品化，是它持续领跑的重要原因。</p></div><footer>North America</footer></article>
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">AN</div><h3>Anthropic</h3><p>在安全性与长上下文体验上，持续塑造高信任度形象。</p></div><footer>North America</footer></article>
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">GO</div><h3>Google</h3><p>强平台与强生态叠加，让模型布局具备体系化优势。</p></div><footer>Global Platform</footer></article>
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">ME</div><h3>Meta</h3><p>通过开放策略扩大模型扩散半径，持续影响开发者生态。</p></div><footer>Open Ecosystem</footer></article>
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">MS</div><h3>Mistral</h3><p>以高效率和研究气质代表欧洲开源创新的密度。</p></div><footer>Europe</footer></article>
          <article class="panel-card brand-card" data-reveal><div><div class="brand-badge">DS</div><h3>DeepSeek</h3><p>用工程优化与推理效率，重新定义高性能与低成本的平衡。</p></div><footer>Asia</footer></article>
        </div>
      </section>

      <section class="signal" id="signal">
        <div class="section-head" data-reveal>
          <div>
            <span class="section-kicker">Trend Signal</span>
            <h2>竞争正在从参数规模，迁移到系统能力</h2>
          </div>
          <p>这一块给页面加入观点密度，让它更像一个有判断力的技术首页，而不是单纯展示信息的海报。</p>
        </div>

        <div class="signal-grid">
          <div class="signal-highlight">
            <article class="signal-kicker" data-reveal>
              <strong>推理能力正在成为新一轮竞争核心</strong>
              <span>谁能把更稳定的深度推理交付给真实用户，谁就更接近下一阶段的主导权。</span>
            </article>
            <article class="signal-kicker" data-reveal>
              <strong>开源模型正在重塑区域创新节奏</strong>
              <span>轻量、快速、可部署，正在成为越来越多团队的第一优先级。</span>
            </article>
            <article class="signal-kicker" data-reveal>
              <strong>全球模型竞争已经进入系统协同阶段</strong>
              <span>模型本身不再是全部，工具链、产品体验和生态分发能力一起决定上限。</span>
            </article>
          </div>

          <article class="panel-card" data-reveal>
            <span class="label">Editorial Note</span>
            <h3>适合博客配图，也适合作为首页封面</h3>
            <p>这张页面既能独立展示，也能作为你后续写博客时的统一视觉母版。它的价值不只是“好看”，还在于具备足够清晰的叙事骨架。</p>
            <ul>
              <li>可以直接截图作为文章头图</li>
              <li>可以继续扩展成多页专题</li>
              <li>可以继续加更细的模型介绍</li>
            </ul>
          </article>
        </div>

        <div class="footer-note" data-reveal>
          <span>WORLD MODEL ATLAS / 2026 EDITION</span>
          <span>From model names to global narrative</span>
        </div>
      </section>
    </main>
    <script src="./main.js" defer></script>
  </body>
</html>
```

- [ ] **Step 4: 再跑一次结构测试，确认已经转绿**

Run: `node --test tests/page-structure.test.mjs`  
Expected: PASS，3 个测试全部通过。

- [ ] **Step 5: 提交这一轮结构与视觉实现**

```bash
git add index.html tests/page-structure.test.mjs
git commit -m "feat: build atlas prime landing page structure"
```

---

### Task 2: 为页面补齐渐进增强动效

**Files:**
- Modify: `main.js`
- Test: `tests/main-js.test.mjs`

- [ ] **Step 1: 先写 `main.js` 的行为测试**

在 `tests/main-js.test.mjs` 中写入下面的完整测试文件：

```javascript
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
```

- [ ] **Step 2: 运行测试，确认当前脚本先失败**

Run: `node --test tests/main-js.test.mjs`  
Expected: FAIL，原因应为当前 `main.js` 为空文件。

- [ ] **Step 3: 写最小但完整的渐进增强脚本**

把 `main.js` 整个替换为下面这份完整文件：

```javascript
const revealNodes = document.querySelectorAll("[data-reveal]");
const orbitStage = document.querySelector("[data-orbit]");
const wordmarks = document.querySelectorAll("[data-wordmark]");

function revealImmediately() {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealImmediately();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initOrbitMotion() {
  if (!orbitStage) {
    return;
  }

  orbitStage.style.setProperty("--pointer-x", "0px");
  orbitStage.style.setProperty("--pointer-y", "0px");

  orbitStage.addEventListener("pointermove", (event) => {
    const rect = orbitStage.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    orbitStage.style.setProperty("--pointer-x", `${offsetX * 0.04}px`);
    orbitStage.style.setProperty("--pointer-y", `${offsetY * 0.04}px`);
  });

  orbitStage.addEventListener("pointerleave", () => {
    orbitStage.style.setProperty("--pointer-x", "0px");
    orbitStage.style.setProperty("--pointer-y", "0px");
  });
}

function initWordmarkStates() {
  wordmarks.forEach((wordmark) => {
    wordmark.addEventListener("mouseenter", () => {
      wordmark.classList.add("is-active");
    });

    wordmark.addEventListener("mouseleave", () => {
      wordmark.classList.remove("is-active");
    });

    wordmark.addEventListener("focus", () => {
      wordmark.classList.add("is-active");
    }, true);

    wordmark.addEventListener("blur", () => {
      wordmark.classList.remove("is-active");
    }, true);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealObserver();
  initOrbitMotion();
  initWordmarkStates();
});
```

同时，把 `index.html` 里 `.globe-stage` 的样式块补上下面这 4 行，让脚本驱动的指针偏移真正生效：

```css
      .globe-stage {
        transform: translate(var(--pointer-x, 0px), var(--pointer-y, 0px));
        transition: transform 220ms ease-out;
      }
```

- [ ] **Step 4: 运行全部自动化测试**

Run: `node --test tests/page-structure.test.mjs tests/main-js.test.mjs`  
Expected: PASS，全部测试通过。

- [ ] **Step 5: 提交动效增强实现**

```bash
git add index.html main.js tests/main-js.test.mjs
git commit -m "feat: add atlas prime motion enhancements"
```

---

### Task 3: 做浏览器验收与响应式收尾

**Files:**
- Modify: `index.html`（仅在人工验收发现布局问题时）
- Modify: `main.js`（仅在人工验收发现交互问题时）

- [ ] **Step 1: 跑一次完整自动化测试，作为视觉验收前的基线**

Run: `node --test tests/page-structure.test.mjs tests/main-js.test.mjs`  
Expected: PASS，无失败项。

- [ ] **Step 2: 在浏览器里打开页面，检查桌面端效果**

使用 Browser 插件打开：`file:///D:/桌面/git-demo/index.html`

重点检查：
- Hero 首屏是否第一眼就有“全球 AI 模型版图”的品牌感
- 右侧地球徽标是否居中、节点是否没有互相遮挡
- 品牌识别带是否清晰、间距是否均匀
- 三个正文区块是否层次清晰，没有卡片高度失衡

- [ ] **Step 3: 切到移动端视口，检查响应式布局**

重点检查：
- 首屏两列是否成功折叠成单列
- 标题是否不会过大导致溢出
- 节点信息块在窄屏下是否不会压住地球
- 卡片在窄屏下是否有足够留白和点击空间

- [ ] **Step 4: 如发现问题，只做最小修正并重新验证**

允许的修正方向：
- 调整 `grid-template-columns`
- 缩小标题字号或节点位置
- 微调卡片内边距、行高、最小高度
- 调整 `pointermove` 幅度，避免动效过重

修正后再次运行：

Run: `node --test tests/page-structure.test.mjs tests/main-js.test.mjs`  
Expected: PASS，并且浏览器验收无明显视觉缺陷。

- [ ] **Step 5: 提交最终验收后的页面**

```bash
git add index.html main.js tests/page-structure.test.mjs tests/main-js.test.mjs
git commit -m "feat: finalize global ai atlas landing page"
```

---

## Self-Review

- Spec coverage:
  - Hero 主视觉、品牌识别带、全球总述、代表阵营、趋势观察都已映射到 Task 1 的结构实现。
  - 渐进增强动效和轻交互已映射到 Task 2。
  - 桌面端、移动端和最终可视验收已映射到 Task 3。
- Placeholder scan:
  - 计划中没有未完成占位标记或模糊步骤描述。
- Type consistency:
  - `data-reveal`、`data-wordmark`、`data-orbit`、`is-visible`、`is-active` 在测试、HTML 与 JS 中名称一致。
