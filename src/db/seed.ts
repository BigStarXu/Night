import { getList, insertMany } from "./vocabulary";

const SAMPLE_WORDS = [
  { word: "hello", meaning: "你好", pronunciation: "/həˈloʊ/" },
  { word: "world", meaning: "世界", pronunciation: "/wɜːrld/" },
  { word: "learn", meaning: "学习", pronunciation: "/lɜːrn/" },
];

/** 若表为空则插入示例词汇（可被 API 或脚本调用） */
export async function runSeed(): Promise<{ inserted: number }> {
  const list = await getList();
  if (list.length > 0) {
    return { inserted: 0 };
  }
  await insertMany(SAMPLE_WORDS);
  return { inserted: SAMPLE_WORDS.length };
}
