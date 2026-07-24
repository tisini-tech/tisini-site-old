import { ArticleInterface } from "@/lib/types";
import React from "react";
import HomeFeaturedArticle from "./HomeFeaturedArticle";
import HomeHeadlineArticles from "./HomeHeadlineArticles";
import HomeSpotlightArticles from "./HomeSpotlightArticles";
import MaxWidthWrapper from "@/components/max-width-wrapper";

type Props = {
  featured_article: ArticleInterface;
  spotlight_articles: ArticleInterface[];
  headline_articles: ArticleInterface[];
};
export default function HomeBannerArticles({
  featured_article,
  headline_articles,
  spotlight_articles,
}: Props) {
  return (
    <div
      // onClick={() => navigate(`/articles/${article.slug}/single-read`)}
      className=""
    >
      <div className=" bg-neutral-100 p-4">
        <MaxWidthWrapper className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* Col 1 */}
          <HomeFeaturedArticle article={featured_article} />
          {/* Col px-42 */}
          <HomeHeadlineArticles articles={headline_articles} />
        </MaxWidthWrapper>
      </div>
      {/* Col 3 */}
      <HomeSpotlightArticles articles={spotlight_articles} />
    </div>
  );
}
