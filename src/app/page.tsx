import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <main className="mx-auto max-w-4xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Night
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            make study easier
          </p>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2">
          <Link
            href="/vocabulary"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              词汇
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              管理你的生词本，按单元或标签分类。
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-emerald-600 dark:text-emerald-400">
              进入词汇 →
            </span>
          </Link>
          <Link
            href="/practice"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              练习
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              选词填空、听写、选择题，巩固记忆。
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-amber-600 dark:text-amber-400">
              开始练习 →
            </span>
          </Link>
        </section>

        <section className="hidden mt-16 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            技术栈
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="rounded-full bg-white px-3 py-1 dark:bg-zinc-800">
              Next.js
            </li>
            <li className="rounded-full bg-white px-3 py-1 dark:bg-zinc-800">
              TailwindCSS
            </li>
            <li className="rounded-full bg-white px-3 py-1 dark:bg-zinc-800">
              MySQL
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
