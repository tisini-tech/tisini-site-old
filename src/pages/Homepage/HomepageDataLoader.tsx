import { ArticleInterface } from "@/lib/types";
import { LoaderFunctionArgs } from "react-router-dom";
import {tisiniAxios} from "@/lib/api";

export default async function HomepageDataLoader({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params:_,
}: LoaderFunctionArgs) {
  try {
    const response: ArticleInterface[] = await (
      await tisiniAxios.get("/blogs/articles/")
    ).data;
    return response;
  } catch (err) {
    // console.log(err);
    return err;
  }
}
