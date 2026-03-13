"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { VocabularyRowWithExample } from "@/db";

const BLANK = "_____";

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase();
}

function buildSentenceWithBlank(example: string, word: string): string {
  const regex = new RegExp(
    `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "i"
  );
  return example.replace(regex, BLANK);
}

/** 若例句中未找到单词（如标点紧贴等），用简单替换再试一次 */
function getSentenceParts(example: string, word: string): { before: string; after: string; full: string } {
  const withBlank = buildSentenceWithBlank(example, word);
  const parts = withBlank.split(BLANK);
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";
  return { before, after, full: example };
}

type Props = { list: VocabularyRowWithExample[] };

export function SentencePractice({ list }: Props) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  const practiceList = useMemo(() => {
    return list.filter((item) => item.example?.trim() || item.meaning?.trim());
  }, [list]);

  if (practiceList.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="text-zinc-600 dark:text-zinc-400">
          暂无词汇。请先在
          <Link
            href="/vocabulary"
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            词汇页
          </Link>
          添加单词，并为单词填写英语例句或释义。
        </p>
      </div>
    );
  }

  const item = practiceList[index];
  const example = item.example?.trim() || "";
  const { before, after, full } = example
    ? getSentenceParts(example, item.word)
    : { before: "", after: "", full: "" };
  const hasBlank = Boolean(example && before !== full);
  const hint = item.meaning || item.pronunciation;

  const handleSubmit = () => {
    if (result !== null) return;
    const correct = normalizeAnswer(input) === normalizeAnswer(item.word);
    setResult(correct);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % practiceList.length);
    setInput("");
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          第 {index + 1} / {practiceList.length} 题
        </span>
      </div>

      <div className="min-h-[4rem] rounded-xl bg-zinc-50/80 px-5 py-4 dark:bg-zinc-800/50">
        <p className="text-xl leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          {hasBlank ? (
            <>
              {before}
              <span className="mx-1 inline-block min-w-[7rem] border-b-2 border-zinc-400 align-baseline dark:border-zinc-500">
                {result !== null ? (
                  <span
                    className={
                      result
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }
                  >
                    {item.word}
                  </span>
                ) : (
                  "\u00A0"
                )}
              </span>
              {after}
            </>
          ) : example ? (
            <>
              {full}
              <span className="ml-2 text-base text-zinc-500 dark:text-zinc-400">
                （请在下方填写缺失的单词）
              </span>
            </>
          ) : (
            <>
              <span className="text-zinc-600 dark:text-zinc-400">根据释义写出单词：</span>
              <span className="ml-2 font-medium text-zinc-800 dark:text-zinc-200">{hint}</span>
            </>
          )}
        </p>
      </div>

      {hint && (hasBlank || example) && (
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          提示：{hint}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {result === null ? (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="只填横线处的单词"
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-lg text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500 dark:focus:bg-zinc-800"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="shrink-0 rounded-xl bg-emerald-600 px-6 py-3 text-base font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            >
              提交
            </button>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={
                result
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }
            >
              {result ? "正确" : "错误，答案：" + item.word}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-zinc-200 px-6 py-3 text-base font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            >
              下一题
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
