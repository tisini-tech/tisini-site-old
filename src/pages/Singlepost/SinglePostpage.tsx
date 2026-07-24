import { ArticleInterface } from "@/lib/types";
import HtmlDecoder from "@/components/HtmlDecode";
import Loader from "@/components/Loader/Loader";
import React from "react";
import { tisiniAxios } from "@/lib/api";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.css";
import MaxWidthWrapper from "@/components/max-width-wrapper";

// const _defaultImage ='https://picsum.photos/500/500'
export default function SinglePostpage() {
  const slug = useParams<{ slug: string }>().slug as string;
  const [post, setPost] = React.useState<ArticleInterface | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = (await tisiniAxios(`/blogs/articles/${slug}`))
        .data as ArticleInterface;
      setPost(res);
    } catch (error) {
      //   console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(post)

  React.useEffect(() => {
    Promise.allSettled([fetchPost()]).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="min-h-[50vh]">
      {loading && <Loader isLoading={loading} />}

      {post && (
        <Helmet>
          <title>{post?.article_title}</title>
          <meta property="og:title" content={post?.article_title?? ""} />
          <meta property="og:description" content={post?.excerpt?? ""} />
          <meta property="og:image" content={post?.featured_image_url?? ""} />
          <meta property="og:url" content={`${window.location.origin}/articles/${post.slug}`} />
          <meta property="og:site_name" content="Tisini" />
        </Helmet>
      )}

      <MaxWidthWrapper className=" py-2 flex flex-col gap-2 px-2 max-w-6xl">
        <img
          src={post?.featured_image_url ?? ""}
          alt="logo"
          className="rounded max-h-96 mx-auto"
        />
        <div className="text-left">
          <h1
            className="text-2xl font-bold
           mx-auto text-gray-800
          "
          >
            {post?.article_title}
          </h1>
        </div>
        <div>
          <div className="flex items-center gap-4 py-2 border-b px-2 my-1">
            <span className="text-primary truncate text-lg">
              <strong>Author:</strong> {post?.author.first_name}{" "}
              {post?.author.last_name}
            </span>
            <span className="text-primary text-lg truncate">
              {new Date(post?.publish ?? "").toDateString()}
            </span>
          </div>
          <div className="text-xl">
            {HtmlDecoder({ html: post?.article_body ?? "", exerpt: false })}
          </div>
        </div>

        {post && post?.recommended_articles.length > 0 && (
          <div className="space-y-4">
            <div className="mt-5">
              <h3 className="text-2xl md:text-4xl font-bold underline">
                Related articles
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
              {post?.recommended_articles.map((article) => (
                <div key={article.id} className="">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="w-full space-y-2"
                  >
                    <img
                      // src={`https://system.tisini.co.ke/${article.thumbnail}`}
                      src={article.featured_image_url}
                      alt={article.excerpt}
                      className="w-full h-32 object-cover hover:scale-110 transition"
                    />

                    <h3 className="text-gray-600 text-xs font-semibold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
                      {article.article_title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
}
