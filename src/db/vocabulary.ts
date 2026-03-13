import type { RowDataPacket } from "mysql2";
import { pool } from "./connection";

export type VocabularyRow = {
  id: string;
  word: string;
  meaning: string | null;
  pronunciation: string | null;
};

/** 建表（库需已存在）。可单独执行一次初始化。 */
export async function createTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS vocabulary (
      id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
      word VARCHAR(255) NOT NULL,
      meaning TEXT,
      pronunciation VARCHAR(255),
      example TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(sql);
}

export type InsertVocabulary = {
  word: string;
  meaning?: string | null;
  pronunciation?: string | null;
  example?: string | null;
};

/** 插入一条词汇 */
export async function insertOne(row: InsertVocabulary): Promise<void> {
  await pool.query(
    "INSERT INTO vocabulary (word, meaning, pronunciation, example) VALUES (?, ?, ?, ?)",
    [row.word, row.meaning ?? null, row.pronunciation ?? null, row.example ?? null]
  );
}

/** 插入多条词汇 */
export async function insertMany(rows: InsertVocabulary[]): Promise<void> {
  if (rows.length === 0) return;
  const placeholders = rows.map(() => "(?, ?, ?, ?)").join(", ");
  const values = rows.flatMap((r) => [
    r.word,
    r.meaning ?? null,
    r.pronunciation ?? null,
    r.example ?? null,
  ]);
  await pool.query(
    `INSERT INTO vocabulary (word, meaning, pronunciation, example) VALUES ${placeholders}`,
    values
  );
}

/** 查询词汇列表，按创建时间倒序 */
export async function getList(): Promise<VocabularyRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, word, meaning, pronunciation FROM vocabulary ORDER BY created_at DESC"
  );
  return rows as VocabularyRow[];
}
