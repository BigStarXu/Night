export default function PracticePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          练习
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          从词汇中选题进行填空、选择或听写练习。
        </p>
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            练习功能将在接入词汇数据后开放。先到「词汇」页添加单词吧。
          </p>
        </div>
      </main>
    </div>
  );
}
