# Global AI Atlas

一个以“全球 AI 模型版图”为主题的单页展示项目。  
页面采用深海蓝全球数据风，围绕 `OpenAI`、`Anthropic`、`Google`、`Meta`、`Mistral`、`DeepSeek` 等代表阵营，构建一个兼具品牌感、行业观察感和可视化表达的首页。

## 项目亮点

- 高端科技官网风格的单页视觉：首页重点突出“全球 AI 模型版图”主题，而不是普通信息罗列。
- 全球数据叙事：通过地球主视觉、轨道元素、区域节点和趋势文案建立“全球模型生态”表达。
- 品牌识别与统一风格结合：页面同时保留模型阵营名称识别度和统一视觉语言。
- 轻量动效增强：包含内容入场显现、品牌条聚焦、地球区域轻微跟随等效果。
- 纯静态实现：不依赖框架，结构清晰，适合学习、二次改造和博客配图。

## 技术栈

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Node.js` 内置测试运行器 `node --test`

## 项目结构

```text
git-demo/
├─ index.html
├─ main.js
├─ README.md
├─ tests/
│  ├─ page-structure.test.mjs
│  └─ main-js.test.mjs
└─ docs/
   └─ superpowers/
      ├─ specs/
      │  └─ 2026-05-16-global-ai-atlas-design.md
      └─ plans/
         └─ 2026-05-16-global-ai-atlas-implementation.md
```

### 主要文件说明

- `index.html`
  页面主体结构、视觉样式、文案内容都集中在这里。

- `main.js`
  页面轻量交互逻辑，包括：
  内容区块滚动显现、地球主视觉轻微指针联动、品牌条激活态与自动聚焦节奏。

- `tests/page-structure.test.mjs`
  检查页面标题、主要区块、品牌名称和交互挂载点是否存在。

- `tests/main-js.test.mjs`
  检查 `main.js` 中的渐进增强逻辑是否落地。

- `docs/superpowers/specs/...`
  设计说明文档，记录页面风格、结构和内容策略。

- `docs/superpowers/plans/...`
  实现计划文档，记录页面从结构到动效的落地步骤。

## 本地运行

这个项目是纯静态页面，最简单的方式有两种。

### 方式 1：直接打开

直接用浏览器打开：

```text
index.html
```

### 方式 2：使用本地静态服务

如果你希望更接近实际访问环境，可以在项目目录启动一个静态服务器。  
例如你本机装了 Node 环境后，可使用任意你熟悉的静态服务工具。

## 测试方法

在项目根目录运行：

```bash
node --test tests/page-structure.test.mjs tests/main-js.test.mjs
```

当前实现包含两类测试：

- 页面结构测试
- 脚本行为测试

## 页面内容结构

当前页面主要由 4 个部分组成：

1. `Hero 首屏`
   突出全球 AI 模型版图主题、品牌气质和地球主视觉。

2. `Global Overview`
   用三张区域卡片概括北美、欧洲、亚洲的模型生态特征。

3. `Model League`
   展示主要模型阵营和一句话定位。

4. `Trend Signal`
   用简短判断表达当前全球模型竞争趋势。

## 设计与实现文档

- 设计说明：
  [docs/superpowers/specs/2026-05-16-global-ai-atlas-design.md](docs/superpowers/specs/2026-05-16-global-ai-atlas-design.md)

- 实现计划：
  [docs/superpowers/plans/2026-05-16-global-ai-atlas-implementation.md](docs/superpowers/plans/2026-05-16-global-ai-atlas-implementation.md)

## 适用场景

这个项目适合：

- 前端静态展示练习
- 技术博客首页配图或专题封面
- 全球大模型生态主题的视觉化表达
- 继续扩展成多页专题站点

## 后续可扩展方向

- 接入更精细的品牌 Logo 或 SVG 标识
- 将区域节点扩展为可点击详情卡
- 加入真实模型发布时间线
- 增加更多交互层，如悬浮信息面板或视差滚动
- 扩展为“全球 AI 模型版图”系列专题页面

## 说明

当前版本优先强调：

- 页面气质
- 结构表达
- 可直接运行
- 可继续扩展

如果你要把它继续打磨成更完整的开源项目，下一步最值得补的是：

- 项目预览截图
- 更正式的本地开发命令
- 部署地址
- 更新日志
