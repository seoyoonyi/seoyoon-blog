"use server";

import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  "use server";

  if (!process.env.POSTGRES_URL) {
    console.warn("POSTGRES_URL 환경 변수가 설정되지 않았습니다.");
    return [];
  }

  const sql = neon(`${process.env.DATABASE_URL}`);
  noStore();

  try {
    const rows = await sql`
      SELECT slug, count
      FROM views
    `;
    return rows.map((row) => ({
      slug: row.slug,
      count: row.count,
    }));
  } catch (error) {
    console.error("getViewsCount 함수에서 오류 발생:", error);
    return [];
  }
}

export const incrementView = async (slug: string) => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL 환경 변수가 설정되지 않았습니다.");
    throw new Error("DATABASE_URL이 누락되었습니다.");
  }

  if (!slug || typeof slug !== "string") {
    console.warn("유효하지 않은 slug 값입니다.");
    return;
  }

  const sql = neon(`${process.env.DATABASE_URL}`);
  noStore();

  try {
    await sql`
      INSERT INTO views (slug, count)
      VALUES (${slug}, 1)
      ON CONFLICT (slug) DO UPDATE SET count = views.count + 1 
    `;
  } catch (error) {
    console.error(`incrementView 함수에서 slug(${slug}) 업데이트 실패:`, error);
  }
};
