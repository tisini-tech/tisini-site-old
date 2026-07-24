import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, LucideMenu, Search, User, Wallet } from "lucide-react";

import React from "react";
// import SponsoredHeaderArticles from "./SponsoredHeaderArticles";
import { logoutUser } from "@/store/slices/auth.slice";
import MaxWidthWrapper from "./max-width-wrapper";
import { cn } from "@/lib/cn";
import logo from "@/assets/img/tisini-logo.png";
import { createNavLinks } from "@/lib/main-header-link-creator";

export default function MainHeader() {
  // const ppic = "https://avatar.iran.liara.run/public";

  const authLinks = {
    authenticated: [],
    unauthenticated: [
      {
        title: "Sign in",
        href: "/auth/login",
      },
      // {
      //   title: "Sign up",
      //   href: "/auth/register",
      // },
    ],
  };

  const generalLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Live scores",
      href: "/scores/football",
    },
    {
      title: "Tano Bora",
      href: "/tanobora",
    },
    {
      title: "Quiz",
      href: "/quiz",
    },
  ];

  const { auth } = useAppSelector((state) => state.persist);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const ppic =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";
  // type
  const navs = createNavLinks([
    {
      name: "Profile",
      Icon: User,
      href: "/auth/profile",
      type: "link",
    },
    {
      name: "Wallet",
      Icon: Wallet,
      type: "link",
      href: "/wallet",
    },
    {
      name: "Logout",
      Icon: LogOut,
      type: "button",
      cb: () => {
        dispatch(logoutUser());
      },
    },
  ]);
  return (
    <div className="border-b p-4 text-2xl sticky top-0 bg-white z-[500]">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <Link to={"/"} className="h-12">
              <img src={logo} alt="" className="h-full" />
            </Link>
            {/* <Link
              to="/"
              className="text-3xl font-extrabold text-primary ml-2 uppercase"
            >
              Tisini
            </Link> */}
          </div>
          <div className="hidden md:flex gap-4 items-center font-bold">
            {generalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-xl text-primary hover:text-primary-light transition duration-300 ease-in-out"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4  w-full">
                <div className="flex items-center">
                  <NavLink
                    to={"/auth/profile"}
                    className="text-blue-500 hover:underline"
                  ></NavLink>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="text-gray-400 cursor-not-allowed" />

                    {/* <BookmarkIcon /> */}
                  </div>
                  <div className="">
                    <Menu>
                      <MenuButton className={" flex "}>
                        <img
                          src={ppic}
                          alt=""
                          className="h-8 w-8  rounded-full border-2 border-double"
                        />
                      </MenuButton>
                      <MenuItems
                        anchor="bottom"
                        className={
                          "p-2 z-[282828282828] bg-white my-2 rounded border w-36 right-10 flex flex-col gap-2"
                        }
                      >
                        {navs.map(
                          ({ Icon, name, id, type: linkType, href, cb }) => (
                            <MenuItem as={"div"} key={id} className={"w-full"}>
                              {linkType == "link" ? (
                                <Link
                                  to={href}
                                  className="flex items-center gap-2 w-full"
                                >
                                  <Icon size={16} />{" "}
                                  {typeof name === "function" ? name() : name}
                                </Link>
                              ) : (
                                <button
                                  onClick={cb}
                                  className="flex items-center gap-2 w-full"
                                >
                                  <Icon size={16} />{" "}
                                  {typeof name === "function" ? name() : name}
                                </button>
                              )}
                            </MenuItem>
                          ),
                        )}
                      </MenuItems>
                    </Menu>
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* <Link
                  to="/auth/login"
                  className="text-primary text-md border px-4 md:px-6 py-2 rounded-md"
                >
                  Sign in
                </Link> */}
                <Link
                  to="/auth/login"
                  className="text-md px-4 md:px-6 bg-primary hover:bg-primary text-light  py-2 rounded-md"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2 flex-row-reverse">
            <div>
              <Menu className=" h-fit" as="div">
                <Menu>
                  <MenuButton className={"flex"}>
                    <LucideMenu className="h-8 w-8" />
                  </MenuButton>
                  <MenuItems
                    className={`absolute right-0 top-16  bg-white border border-gray-200 rounded-md shadow-lg z-10 h-fit  flex flex-col w-full`}
                  >
                    {generalLinks.map((link) => (
                      <MenuItem key={link.href}>
                        {({ active }) => (
                          <Link
                            className={cn(
                              "text-center",
                              active ? "bg-gray-200" : "",
                              "text-lg font-semibold text-primary hover:text-primary-lighter transition duration-300 ease-in-out py-2",
                            )}
                            to={link.href}
                          >
                            {link.title}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                    <hr className="my-2" />
                    {auth.isAuthenticated ? (
                      // <div className="flex flex-col">
                      //   <div className="flex items-center gap-4 flex-col-reverse ">
                      //     <button
                      //       onClick={() => {
                      //         dispatch(logoutUser());
                      //       }}
                      //       className="text-md px-4 text-center bg-red-400 hover:bg-red-500 text-light py-2 rounded-md w-full"
                      //     >
                      //       Logout
                      //     </button>

                      //     {/* Username */}
                      //     <div className="flex items-center">
                      //       <NavLink to={"/auth/profile"}>
                      //         {auth.user!.nickname}
                      //       </NavLink>
                      //       {/* <img
                      //         className="w-8 h-8 rounded-full"
                      //         src={defaultAvatar}
                      //         alt="avatar"
                      //       /> */}
                      //     </div>
                      //   </div>
                      // </div>
                      <></>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {authLinks.unauthenticated.map((link) => (
                          <MenuItem key={link.href}>
                            {({ focus }) => (
                              <Link
                                className={cn(
                                  "w-full border text-center rounded",
                                  focus ? "bg-gray-100" : "",
                                  "text-lg font-semibold  transition duration-300 ease-in-out py-2",

                                  link.href === "/auth/login"
                                    ? "bg-primary text-light"
                                    : "",
                                )}
                                to={link.href}
                              >
                                {link.title}
                              </Link>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </MenuItems>
                </Menu>
              </Menu>
            </div>
            {auth.isAuthenticated && (
              <div>
                <Menu className="md:hidden h-fit " as="div">
                  <MenuButton className={" flex "}>
                    <img
                      src={ppic}
                      alt=""
                      className="h-8 w-8  rounded-full border-2 border-double"
                    />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className={
                      "p-2 z-[282828282828] bg-white my-2 rounded border w-36 right-10 flex flex-col gap-2"
                    }
                  >
                    {navs.map(
                      ({ Icon, name, id, type: linkType, href, cb }) => (
                        <MenuItem as={"div"} key={id} className={"w-full"}>
                          {linkType == "link" ? (
                            <Link
                              to={href}
                              className="flex items-center gap-2 w-full"
                            >
                              <Icon size={16} />{" "}
                              {typeof name === "function" ? name() : name}
                            </Link>
                          ) : (
                            <button
                              onClick={cb}
                              className="flex items-center gap-2 w-full"
                            >
                              <Icon size={16} />{" "}
                              {typeof name === "function" ? name() : name}
                            </button>
                          )}
                        </MenuItem>
                      ),
                    )}
                  </MenuItems>
                </Menu>
              </div>
            )}{" "}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
