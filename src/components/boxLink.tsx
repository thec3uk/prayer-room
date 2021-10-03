import * as React from "react";
import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const BoxLink = ({ to, title, alignment }) => {
  return (
    <>
      {alignment === "right" ? (
        <div className="bg-blue-400 right-0 ml-auto mr-0 rounded-tl rounded-bl h-6 hover:h-auto hover:bg-blue-700 transition-colors duration-300 my-4 w-max">
          <AniLink
            swipe
            top="entry"
            direction="left"
            entryOffset={80}
            to={to}
            className="text-2xl font-sans px-4 transform -translate-y-4 block text-gray-900">
            {title}
          </AniLink>
        </div>
      ) : (
        <div className="bg-blue-400 left-0 rounded-tr rounded-br h-6 hover:h-auto hover:bg-blue-700 transition-colors duration-300 my-4 w-max">
          <AniLink
            swipe
            top="entry"
            direction="left"
            entryOffset={80}
            to={to}
            className="text-2xl font-sans px-4 transform -translate-y-4 block text-gray-900">
            {title}
          </AniLink>
        </div>
      )}
    </>
  );
};

export default BoxLink;
