// import { Link } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { useQuery } from "@tanstack/react-query";

// import FeaturedSection from "./FeaturedSection";
// import MainFooter from "@/components/MainFooter";
// import MainHeader from "@/components/MainHeader";
// import CategoryGrid from "@/components/articles/CategoryGrid";
// import SocialsWidget from "@/components/articles/SocialCategory";
// import CategoryColumn from "@/components/articles/CategoryColumn";
// import HomePageLoadingComponent from "../Homepage/HomePageLoadingComponent";
// import FetchOverviewArticles from "@/lib/data/articles/FetchOverviewArticles";
// import {
//   CategoryArticle,
//   OverviewArticles,
// } from "@/lib/types";
// import BaseErrorPage from "@/components/errors/BaseErrorPage";
// import quizImage from "@/assets/img/quiz.jpeg";

// export const BlogPage = () => {
//   const { data, isLoading, isError } = useQuery<OverviewArticles, Error>(
//     ["overview articles"],
//     FetchOverviewArticles
//   );

//   const footballCategory = data?.category_articles.filter(
//     (category) => category.category === "Football"
//   )[0];

//   const rugbyCategory = data?.category_articles.filter(
//     (category) => category.category === "Rugby"
//   )[0];

//   const matchRecaps = data?.category_articles.filter(
//     (category) => category.category === "Match Recap"
//   )[0];

//   const statsRecap = data?.category_articles.filter(
//     (category) => category.category === "Stats Recap"
//   )[0];

//   const features = data?.category_articles.filter(
//     (category) => category.category === "Features"
//   )[0];

//   if (isLoading) {
//     return <HomePageLoadingComponent />;
//   }

//   if (isError) {
//     return <BaseErrorPage />;
//   }

//   if (!data) {
//     return <div>No Data found!</div>;
//   }

//   const featuredArticle =
//     data.featured_article ?? data.recent_articles[0] ?? null;
//   const sidebarArticles = data.featured_article
//     ? data.recent_articles
//     : data.recent_articles.slice(1);

//   return (
//     <main className="container mx-auto">
//       <MainHeader />
//       <ToastContainer />

//       {/* Hero Section */}
//       {featuredArticle && (
//         <FeaturedSection
//           article={featuredArticle}
//           recentPosts={sidebarArticles}
//         />
//       )}

//       <Link
//         className="w-4/5 mx-auto mt-6 hidden md:flex cursor-pointer"
//         to={"/quiz/GN88FDHhWw7n"}
//       >
//         <img src={quizImage} alt="" />
//       </Link>

//       {/* Articles Section with adverts */}
//       <section className="p-7 bg-gray-100">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-[4] w-full">
//             <CategoryGrid
//               categoryArticles={footballCategory as CategoryArticle}
//             />
//           </div>

//           <div className="flex-[4] w-full">
//             <CategoryColumn
//               categoryArticles={rugbyCategory as CategoryArticle}
//             />
//           </div>

//           <div className="flex-[3]">
//             <SocialsWidget />
//           </div>
//         </div>
//       </section>

//       <Link className="w-4/5 mx-auto mt-6 hidden md:flex" to={"/tanobora"}>
//         <img src="https://i.postimg.cc/GhzxYdYq/tanobora.jpg" alt="" />
//       </Link>

//       {/* Second Articles Section */}
//       <section className="p-7 ">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 w-full">
//             <CategoryColumn categoryArticles={matchRecaps as CategoryArticle} />
//           </div>

//           <div className="flex-1 w-full">
//             <CategoryGrid categoryArticles={features as CategoryArticle} />
//           </div>

//           <div className="flex-1 w-full">
//             <CategoryColumn categoryArticles={statsRecap as CategoryArticle} />
//           </div>
//         </div>
//       </section>

//       <MainFooter />
//     </main>
//   );
// };

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePageLoadingComponent from "../Homepage/HomePageLoadingComponent";

export const BlogPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/scores/football");
  }, [navigate]);

  return <HomePageLoadingComponent />;
};
