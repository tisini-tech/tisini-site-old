/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React from "react";
import { ToastContainer } from "react-toastify";

import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import useCategoryArticles from "@/hooks/useCategoryArticles";
import HomePageLoadingComponent from "./HomePageLoadingComponent";
import CategoryArticle from "@/components/articles/CategoryArticle";

export default function Homepage() {
  const d1 = useCategoryArticles();

  return (
    <main className="">
      <MainHeader />
      <ToastContainer />
      <CategoryArticle posts={d1.data} />
      {d1.isLoading && <HomePageLoadingComponent />}
      {/* {articlesLength > 0 ? (
        <div className="">

          <HomeBannerArticles
            featured_article={featuredArticle}
            headline_articles={random4Articles}
            spotlight_articles={random4Articles}
          />
        </div>
      ) : (
        <HomePageLoadingComponent />
      )} */}
      <MainFooter />
    </main>
  );
}
