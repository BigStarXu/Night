import Link from "next/link";
import { getListWithExamples } from "@/db";
import { SentencePractice } from "@/components/SentencePractice";

export default async function SentencePracticePage() {
  let list: Awaited<ReturnType<typeof getListWithExamples>> = [];
  let error: string | null = null;

  try {
    list = await getListWithExamples();
  } catch (e) {
    error = e instanceof Error ? e.message : "连接数据库失败";
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-100 dark:bg-zinc-900">
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/practice"
          className="mb-6 inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
        >
          ← 返回练习
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          句子填空
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          看英语句子，在下方只填横线处的那一个单词即可。
        </p>

        {error && (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {error}。请检查 .env.local 中的 DATABASE_URL，并确认已建库建表。
          </div>
        )}

        {!error && (
          <div className="mt-8">
            <SentencePractice list={list} />
          </div>
        )}
      </main>
    </div>
  );
}
