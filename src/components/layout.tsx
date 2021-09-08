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
  isHome = false,
}: {
  seoTitle: string;
  title: string;
  showsubTitle: boolean;
  children: React.FC;
  isHome: boolean;
}) => {
  return (
    <>
      <SEO title={seoTitle} />
      <div className="absolute insert-0 min-h-screen font-serif flex flex-col justify-start items-start pt-28 bg-gray-50">
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
        <div className="my-auto">{children}</div>
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
