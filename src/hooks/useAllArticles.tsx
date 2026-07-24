import { tisiniAxios } from "@/lib/api";
import { ArticleInterface, PaginatedResponse } from "@/lib/types";
import { AxiosError } from "axios";
import React, { useState } from "react";

export default function useAllArticles() {
  const [isLoading, setIsLoading] = useState(false);
  const [err] = useState("");
  const [data, setData] = useState<ArticleInterface[]>([]);

  const fetchArticles = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = (await tisiniAxios.get("/blogs/articles/"))
        .data as PaginatedResponse<ArticleInterface>;

      setData(response.results);
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
