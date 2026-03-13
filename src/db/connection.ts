import mysql from "mysql2/promise";

const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined };

function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("缺少环境变量 DATABASE_URL");
  }
  return mysql.createPool(url);
}

/** 全局单例连接池，供所有 db 模块使用 */
export const pool = globalForDb.pool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;
