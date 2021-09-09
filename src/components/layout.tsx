import * as React from "react";
import "./layout.css";
import SEO from "./SEO";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import { ChevronLeftIcon } from "@heroicons/react/solid";

const Layout: React.FC<PageProps> = ({
  seoTitle = "Tim Creamer Prayer Room",
  title,
  showsubTitle,
  children,
  menu,
  isHome = false,
}: {
  seoTitle: string;
  title: string;
  showsubTitle: boolean;
  children: React.FC;
  menu: React.FC;
  isHome: boolean;
}) => {
  return (
    <>
      <SEO title={seoTitle} />
      <div className="font-serif absolute insert-0 bg-gray-50 w-screen flex flex-row ">
        <div className="min-h-screen flex flex-col justify-start items-start pt-28 w-screen md:min-w-min md:w-1/5 md:border-r md:shadow">
          <div className="mx-4">
            <h1 className="text-6xl mb-6 text-gray-900">{title}</h1>
            {showsubTitle && (
              <AniLink
                swipe
                top="entry"
                direction="left"
                entryOffset={80}
                to={"/about"}
                className="text-xl underline uppercase font-sans text-gray-900">
                The Tim Creamer Prayer Room
              </AniLink>
            )}
          </div>
          <div className="block md:hidden">{children}</div>
          <div className="my-auto">{menu}</div>
          <p className="font-sans m-4 text-sm">
            If you have any issues using this site then please contact{" "}
            <a href="mailto:prayer@thec3.uk" className="select-all underline text-blue-700">
              prayer@thec3.uk
            </a>
          </p>
        </div>
        <div className="hidden md:block md:w-4/5">{children}</div>
      </div>
      {!isHome && (
        <AniLink
          swipe
          top="entry"
          direction="right"
          entryOffset={80}
          to={"/"}
          className="fixed top-0 shadow border bg-gray-50">
          <ChevronLeftIcon className="h-12 w-12 text-gray-900" />
        </AniLink>
      )}
    </>
  );
};

export default Layout;
