import { stripHtmlTags } from "@/lib/services";
import { ArticleInterface } from "@/lib/types";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  article: ArticleInterface;
};

function HomeFeaturedArticle({ article }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-64 md:h-96">
        <img
          src={
            article?.featured_image_url
              ? article?.featured_image_url
              : "https://via.placeholder.com/150"
          }
          alt="hero"
          className=" inset-0 object-cover w-full h-full rounded bg-white border-2 border-primary-lighter"
        />
      </div>
      <div className="px-4 py-2">
        <NavLink
          to={`/articles/${article.slug}/single-read`}
          className="text-2xl font-bold text-primary"
        >
          {/* Sergio Rico was trampled by a horse. This is the incredible
            story of how he cheated death Sergio Rico was trampled by a
            horse. This is the incredible story of how he cheated death */}
          {stripHtmlTags(article?.article_title)}
        </NavLink>
        <p className="text-lg font-semibold ">
          {/* After winning Ligue 1, Sergio Rico travelled to El Rocio for a
            religious festival – where a tragic accident left him fighting
            for his life */}
          {stripHtmlTags(article?.excerpt ? article?.excerpt : "")}
        </p>
        <div className="flex items-center gap-2 py-2 text-xl">
          <div>
            {article?.author.first_name + " " + article?.author.last_name}
          </div>
          <div className="flex items-center relative">
            <FontAwesomeIcon icon={faMessage} />
            <span className="text-sm font-bold text-primary absolute top-1 -right-5 border rounded-full w-5 h-5 flex items-center justify-center">
              {/* 2 */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeaturedArticle;
