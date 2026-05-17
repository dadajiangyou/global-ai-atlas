# Global AI Atlas

![version](https://img.shields.io/badge/version-v1.0.0-blue)
![stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)
![tests](https://img.shields.io/badge/tests-node--test-green)
![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey)

一个以“全球 AI 模型版图”为主题的单页展示项目。页面采用深海蓝全球数据风，围绕 OpenAI、Anthropic、Google、Meta、Mistral、DeepSeek 等代表阵营，构建兼具品牌感、行业观察感和可视化表达的首页。

## 项目概述

Global AI Atlas 是一个纯静态前端项目，用一张高完成度的视觉首页表达全球 AI 模型生态。它不是参数列表或资料汇总页，而是面向技术博客、专题封面、演示首页和行业观察内容的“视觉母版”。

项目当前版本为 `v1.0.0`，重点完成页面结构、视觉叙事、品牌阵营展示、滚动显现动画和轻量交互增强。

## 功能特性

- 全球 AI 模型版图主题首页，适合技术文章、专题页和展示型项目。
- 深海蓝数据可视化风格，包含地球主视觉、轨道、节点和品牌条。
- 覆盖 OpenAI、Anthropic、Google、Meta、Mistral、DeepSeek 六个代表阵营。
- 内容结构包含 Hero、Global Overview、Model League、Trend Signal 四个核心区块。
- 使用原生 JavaScript 提供滚动显现、轨道指针联动、品牌焦点状态和自动高亮。
- 无构建依赖，可直接打开 `index.html` 运行。
- 内置 Node.js 测试，覆盖页面结构和交互脚本关键挂载点。

## 目录简介

```text
global-ai-atlas/
├── index.html                                      # 页面结构、样式和核心文案
├── main.js                                         # 渐进增强交互脚本
├── README.md                                       # 项目说明文档
├── CHANGELOG.md                                    # 版本更新记录
├── package.json                                    # 项目元数据和本地脚本
├── .gitignore                                      # 本地临时文件忽略规则
├── tests/
│   ├── page-structure.test.mjs                     # 页面结构测试
│   └── main-js.test.mjs                            # 交互脚本测试
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-05-16-global-ai-atlas-design.md
        └── plans/
            └── 2026-05-16-global-ai-atlas-implementation.md
```

## 快速运行

### 方式一：直接打开

用浏览器直接打开项目根目录下的文件：

```text
index.html
```

这是最快的预览方式，适合查看最终页面效果。

### 方式二：本地静态服务

如果希望用更接近线上环境的方式访问页面，可以运行：

```bash
npm start
```

默认访问地址：

```text
http://localhost:4173
```

## 测试

```bash
npm test
```

测试覆盖两类内容：

- `tests/page-structure.test.mjs`：验证标题、主要区块、品牌阵营和页面挂载点。
- `tests/main-js.test.mjs`：验证滚动显现、轨道联动、品牌状态和动效降级逻辑。

## 技术栈

| 模块 | 技术 |
| --- | --- |
| 页面结构 | HTML5 |
| 视觉样式 | CSS3、响应式布局、渐变、轨道和面板视觉 |
| 交互增强 | Vanilla JavaScript |
| 测试 | Node.js `node --test` |
| 运行方式 | 纯静态页面，无打包依赖 |

## 页面结构

1. **Hero**
   突出“全球 AI 模型版图”的第一视觉印象，包含地球主视觉、品牌入口、统计信息和一句话定位。

2. **Global Overview**
   用北美、欧洲、亚洲三个区域卡片概括全球模型生态的主要节奏。

3. **Model League**
   展示主要模型阵营和一句话定位，让品牌识别和统一视觉语言保持平衡。

4. **Trend Signal**
   用更强观点密度表达模型竞争正在从参数规模迁移到系统能力、开源效率和生态协同。

## 设计与实现文档

- [设计说明](docs/superpowers/specs/2026-05-16-global-ai-atlas-design.md)
- [实现计划](docs/superpowers/plans/2026-05-16-global-ai-atlas-implementation.md)

## 适用场景

- 技术博客首页配图或专题头图。
- AI 模型生态主题的可视化表达。
- 前端静态展示项目练习。
- 后续扩展为多页面 AI 模型观察站点的基础模板。

## 版本

当前版本：`v1.0.0`

详见 [CHANGELOG.md](CHANGELOG.md)。

## 仓库信息

- 仓库名称：`global-ai-atlas`
- 默认分支：`master`
- 可见性：Public
- 许可状态：当前未声明开源许可证
