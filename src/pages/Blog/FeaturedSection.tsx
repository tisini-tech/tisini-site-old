import { Link } from "react-router-dom";
import { MdFlashOn } from "react-icons/md";
import { ArticleInterface } from "@/lib/types";
import { formatDate } from "@/lib/data/formatDate";

type FeaturedProps = {
  article: ArticleInterface;
  recentPosts: ArticleInterface[];
};

const FeaturedSection = ({ article, recentPosts }: FeaturedProps) => {
  return (
    <section className="flex md:flex-row flex-col md:h-[70vh] mt-7 mx-7 mb-0 pb-7 gap-2">
      {/* Left side */}
      <FeaturedArticle article={article as ArticleInterface} />

      {/* Right side */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <div className="relative flex-1 flex md:flex-row flex-col gap-2">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article article={recentPosts[0]} />
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article article={recentPosts[1]} />
          </div>
        </div>

        <div className="relative flex-1 flex md:flex-row flex-col gap-2">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article article={recentPosts[2]} />
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article article={recentPosts[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedArticle = ({ article }: { article: ArticleInterface }) => {
  return (
    <div className="flex-1 flex flex-col gap-2 overflow-hidden">
      <Link
        to={`/articles/${article.slug}`}
        className="relative flex-1 flex gap-2"
      >
        <img
          src={article?.featured_image_url ?? ""}
          alt={article.excerpt}
          className="w-full h-full object-cover hover:scale-110 transition"
        />

        <div className="absolute top-5 right-5 flex items-center justify-center bg-primary text-white font-medium py-1 px-2 transition-all hover:bg-black-lighter cursor-pointer">
          <MdFlashOn className="" />
        </div>

        <div className="absolute w-full bottom-0 left-0 flex flex-col bg-black-lighter/40 pt-1">
          <ul className="hidden md:flex items-center gap-3 text-white text-sm font-semibold ml-4 hover:text-primary cursor-pointer">
            <li>
              {article?.author.first_name} {article?.author.last_name}
            </li>
            <li>{formatDate(article?.publish)}</li>
          </ul>

          <h3 className="px-4 py-2 text-white text-base font-extrabold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
            {article?.article_title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const Article = ({ article }: { article?: ArticleInterface }) => {
  if (!article) return null;

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="relative flex-1 flex gap-2"
    >
      <img
        src={article?.featured_image_url ?? ""}
        alt={article.excerpt}
        className="w-full object-cover hover:scale-110 transition"
      />

      <div className="absolute bottom-0 left-0 md:h-20 flex flex-col bg-black-lighter/40 pt-1">
        <ul className="hidden md:flex items-center gap-3 text-white text-xs font-semibold ml-4 hover:text-primary cursor-pointer">
          <li>
            {article?.author.first_name} {article?.author.last_name}
          </li>
          <li>{formatDate(article?.publish)}</li>
        </ul>

        <h3 className="px-4 py-2 text-white text-xs font-extrabold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
          {article?.article_title}
        </h3>
      </div>
    </Link>
  );
};

export default FeaturedSection;
