import { runSeed } from "@/db";
import { NextResponse } from "next/server";

/** 开发环境下可 GET /api/seed 插入示例词汇（表为空时） */
export async function GET() {
  try {
    const result = await runSeed();
    return NextResponse.json({
      ok: true,
      message:
        result.inserted > 0
          ? `已插入 ${result.inserted} 条示例词汇`
          : "表中已有数据，未插入",
      inserted: result.inserted,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "执行失败";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
