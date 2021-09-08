import * as React from "react";
import "./layout.css";
import SEO from "./SEO";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import { ChevronLeftIcon } from "@heroicons/react/solid";

import { useLayoutContext, LayoutContextProvider } from "../context/layout";

const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const { layout } = useLayoutContext();
  return (
    <>
      <SEO title={layout?.seoTitle} />
      <div className="absolute insert-0 h-screen font-serif flex flex-col justify-between items-start pt-28 pb-32 bg-gray-50">
        <div className="mx-4">
          <h1 className="text-6xl mb-6">{layout?.title}</h1>
          {layout?.showsubTitle && (
            <AniLink
              swipe
              top="entry"
              direction="left"
              entryOffset={80}
              to={"/about"}
              className="text-xl underline uppercase font-sans">
              The Tim Creamer Prayer Room
            </AniLink>
          )}
        </div>
        {children}
      </div>
      {!layout?.isHome && (
        <AniLink
          swipe
          top="entry"
          direction="right"
          entryOffset={80}
          to={"/"}
          className="fixed bottom-0 shadow border bg-gray-50 z-50">
          <ChevronLeftIcon className="h-12 w-12 text-gray-900" />
        </AniLink>
      )}
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </LayoutContextProvider>
  );
};

export default Layout;
