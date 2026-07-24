import MaxWidthWrapper from "@/components/max-width-wrapper";
import { stripHtmlTags } from "@/lib/services";
import { ArticleInterface } from "@/lib/types";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
export type Props = {
  articles: ArticleInterface[];
};
function HomeSpotlightArticles({ articles }: Props) {
  return (
    <div className="bg-white py-8">
      <MaxWidthWrapper className="flex flex-col gap-2 col-span-2">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border-b grid grix-cols-1 md:grid-cols-[2fr_1fr] gap-2 p-2 col-span-2"
          >
            <div className="relative ">
              <div>
                <Link
                  to={`/articles/${article.slug}/single-read`}
                  className=" font-semibold font-roboto text-primary hover:text-blue-600 hover:underline text-2xl"
                >
                  {/* How Guler fits in to Real Madrids team - and their
              youth-first transfer policy Guillermo Rai68 How Guler fits
              in to Real Madrids team - and their youth-first transfer
            policy */}
                  {article.article_title}
                </Link>
              </div>
              <p className="text-lg font-semibold ">
                {/* After winning Ligue 1, Sergio Rico travelled to El Rocio for a
            religious festival – where a tragic accident left him fighting
            for his life */}
                {stripHtmlTags(article?.excerpt ? article?.excerpt : "")}
              </p>
              <div className="flex items-center gap-2 text-xl">
                <div>
                  {article.author.first_name + " " + article.author.last_name}
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faMessage} />
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="max-h-96">
              <img
                src={article.featured_image_url!}
                alt="hero"
                className="inset-0 object-cover border h-full w-full rounded-md bg-gray-100"
              />
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  );
}

export default HomeSpotlightArticles;
