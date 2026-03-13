import { getList } from "@/db";

export default async function VocabularyPage() {
  let list: Awaited<ReturnType<typeof getList>> = [];
  let error: string | null = null;

  try {
    list = await getList();
  } catch (e) {
    error = e instanceof Error ? e.message : "连接数据库失败";
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          词汇
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          生词本列表，数据来自 MySQL（mysql2）。
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            {error}。请检查 .env.local 中的 DATABASE_URL，并确认已建库建表（见
            README）。
          </div>
        )}

        {!error && list.length === 0 && (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              暂无词汇。可{" "}
              <a
                href="/api/seed"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                点此插入示例数据
              </a>{" "}
              （hello / world / learn），或直接在 MySQL 中往{" "}
              <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">
                vocabulary
              </code>{" "}
              表添加数据。
            </p>
          </div>
        )}

        {!error && list.length > 0 && (
          <ul className="mt-8 space-y-3">
            {list.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {item.word}
                </span>
                {item.pronunciation && (
                  <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                    {item.pronunciation}
                  </span>
                )}
                {item.meaning && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.meaning}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
