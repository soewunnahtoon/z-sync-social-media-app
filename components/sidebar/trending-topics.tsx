import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatNumber } from "@/lib/utils/format-number";
import { unstable_cache } from "next/cache";

const TrendingTopics = async () => {
  const getTrendingTopics = unstable_cache(
    async () => {
      const result = await prisma.$queryRaw<
        { hashtag: string; count: bigint }[]
      >`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

      return result.map((row) => ({
        hashtag: row.hashtag,
        count: Number(row.count),
      }));
    },
    ["trending_topics"],
    {
      revalidate: 3 * 60 * 60,
    }
  );

  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-4 rounded-2xl bg-card px-4 py-2 shadow-xl">
      <div className="text-lg lg:text-xl font-bold">Trending Topics</div>

      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>

            <p className="text-xs text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingTopics;
