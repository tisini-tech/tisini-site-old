import { tisiniAxios } from "@/lib/api";
import { ArticleInterface } from "@/lib/types";
import { AxiosError } from "axios";
import React, { useState } from "react";

export default function useFeaturedArticle() {
  const [isLoading, setIsLoading] = useState(false);
  const [err] = useState("");
  const [data, setData] = React.useState<ArticleInterface | null>(null);

  const fetchArticles = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = (await tisiniAxios.get("/blogs/article_featured/")).data;

      setData(response[0]);
    } catch (err) {
      // console.log(err);
      if (err instanceof AxiosError) {
        //
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = async () => {
    await fetchArticles();
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  return {
    data,
    isLoading,
    err,
    refreshData,
  };
}
