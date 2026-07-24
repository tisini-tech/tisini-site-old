import { AxiosError } from "axios";
import React, { useState } from "react";

import { tisiniAxios } from "@/lib/api";
import { ArticleInterface } from "@/lib/types";

export default function useEditorArticles() {
  const [isLoading, setIsLoading] = useState(false);
  const [err] = useState("");
  const [data, setData] = useState<ArticleInterface[]>([]);

  const fetchArticles = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await tisiniAxios.get("/blogs/article_editor_pick/");
      //   const response = (await tisiniAxios.get("/blogs/article_editor_pick/"))
      //     .data as PaginatedResponse<CategoriesWithPostType>;

      setData(response.data);
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
