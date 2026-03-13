import Link from "next/link";

export default function PracticePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-100 dark:bg-zinc-900">
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          练习
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          选择一种方式开始练习。
        </p>

        <ul className="mt-8 space-y-4">
          <li>
            <Link
              href="/practice/sentence"
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600"
            >
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  句子填空
                </span>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  根据英语句子与提示，在横线处填写正确单词
                </p>
              </div>
              <span className="text-zinc-400 dark:text-zinc-500">→</span>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
