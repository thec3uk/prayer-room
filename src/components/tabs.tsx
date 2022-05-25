import React from "react";
import { navigate } from "gatsby-link";

import Layout from "../components/layout";
import BoxButton from "../components/boxButton";
import PrayerPraiseToggle from "../components/prayerPraise";
import BoxLink from "../components/boxLink";

const tabs = [
  {
    name: "Prayer",
    isPraise: false,
    className: { select: "focus:ring-blue-500 focus:border-blue-500", tab: "border-blue-500 text-blue-600" },
  },
  {
    name: "Praise",
    isPraise: true,
    className: { select: "focus:ring-yellow-500 focus:border-yellow-500", tab: "border-yellow-500 text-yellow-600" },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrayerPraiseTabs({ isPraise, setIsPraise }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className={`block w-full ${
            tabs.find((tab) => tab.isPraise === isPraise).className.select
          } border-gray-300 rounded-md`}
          defaultValue={tabs.find((tab) => tab.isPraise === isPraise).name}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.isPraise === isPraise
                    ? tab.className.tab
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-lg"
                )}
                onClick={() => setIsPraise(!isPraise)}
                aria-current={tab.isPraise === isPraise ? "page" : undefined}>
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
