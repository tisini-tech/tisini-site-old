import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";

import { formatDate } from "@/lib/data/formatDate";
import { CategoriesWithPostType } from "@/lib/types";
import BaseErrorPage from "@/components/errors/BaseErrorPage";
import HomePageLoadingComponent from "../Homepage/HomePageLoadingComponent";
import FetchCategoryArticles from "@/lib/data/articles/FetchCategoryArticles";

const BlogCategory = () => {
  const { category } = useParams();

  const { data, isLoading, isError } = useQuery<CategoriesWithPostType[]>(
    ["Category Articles"],
    FetchCategoryArticles
  );

  if (isLoading) {
    return <HomePageLoadingComponent />;
  }

  if (!data) {
    return <div>No Data found!</div>;
  }

  if (isError) {
    return <BaseErrorPage />;
  }

  const categoryData = data.filter(
    (item) => item.article_category === category
  );

  const articles = categoryData[0].articles;

  return (
    <main className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold underline">
          {categoryData[0].article_category}
        </h1>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-3">
        {articles.map((article) => (
          <NavLink
            to={`/articles/${article.slug}`}
            key={article.article_title}
            className="text-lg border p-2 bg-white font-semibold text-primary  max-w-[32rem] w-full"
          >
            <div className="h-80">
              <img
                src={article.featured_image_url ?? ""}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h1 className="font-semibold">{article.article_title}</h1>
            </div>
            <div className="flex text-black justify-end text-sm italic">
              <span>{formatDate(article.publish)}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  );
};

export default BlogCategory;
