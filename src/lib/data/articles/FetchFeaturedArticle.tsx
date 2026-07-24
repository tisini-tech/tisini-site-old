import { tisiniAxios } from "@/lib/api";

const FetchFeaturedArticle = async () => {
  const res = await tisiniAxios.get("/blogs/article_featured/");

  return res.data[0];
};

export default FetchFeaturedArticle;
