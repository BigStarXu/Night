# Night · 语言学习

基于 **Next.js**、**TailwindCSS**、**MySQL** 的语言学习项目，支持词汇管理与练习。

## 技术栈

- **Next.js** — React 全栈框架（App Router）
- **TailwindCSS** — 样式
- **MySQL** — 数据库
- **mysql2** — Node.js 驱动（连接 MySQL）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 MySQL

本地数据库：**localhost:3306**，库名 **night**。  
复制 `.env.local.example` 为 `.env.local`，把 `你的密码` 改成实际密码。

### 3. 建库与建表

在 MySQL 中执行（先建库再建表）：

```sql
-- 1. 建库
CREATE DATABASE IF NOT EXISTS night DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. 使用该库
USE night;

-- 3. 建表
CREATE TABLE IF NOT EXISTS vocabulary (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  word VARCHAR(255) NOT NULL,
  meaning TEXT,
  pronunciation VARCHAR(255),
  example TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. 运行开发服务器

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。  
词汇页无数据时，可访问 [http://localhost:3000/api/seed](http://localhost:3000/api/seed) 插入示例词汇。

## 项目结构

- `src/app/` — 页面与布局（首页、词汇、练习）、API（如 `/api/seed`）
- `src/components/` — 公共组件（如导航）
- `src/db/` — 数据库统一管理：
  - `connection.ts` — mysql2 连接池
  - `vocabulary.ts` — 词汇表：`createTable`、`insertOne`、`insertMany`、`getList`
  - `seed.ts` — 示例数据（表为空时插入）
  - `index.ts` — 统一导出

## 脚本

- `npm run dev` — 开发
- `npm run build` — 构建
- `npm run start` — 生产运行
- `npm run lint` — ESLint
