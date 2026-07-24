import { ArticleInterface } from "@/lib/types";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  articles: ArticleInterface[];
};
function HomeHeadlineArticles({ articles }: Props) {
  return (
    <div className="p-2 bg-white rounded">
      <div className="flex justify-between text-xl">
        <h1 className="font-bold text-primary">Headlines</h1>
        <button className="font-semibold text-primary">See all</button>
      </div>
      <ul className="flex flex-col gap-4 ml-2 px-2">
        {articles.map((_, i) => (
          <li key={i * 10} className="list border p-4 rounded">
            {/* PSG give Mbappe deadline for decision on future in
              three-page letter */}
            <NavLink
              to={`/articles/${_.slug}/single-read`}
              className="text-lg font-semibold text-primary hover:text-blue-600 hover:underline"
            >
              {_.article_title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeHeadlineArticles;
