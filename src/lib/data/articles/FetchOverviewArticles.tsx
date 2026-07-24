import { tisiniAxios } from "@/lib/api";
// import { ArticleInterface } from "@/lib/types";

const FetchOverviewArticles = async () => {
  const res = await tisiniAxios.get("/blogs/article_overview/");

  return res.data;
};

export default FetchOverviewArticles;
