import React, { useState } from "react";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import Card from "../components/card";

dayjs.extend(advancedFormat);

const PrayerCard = ({ node }) => {
  const [hasPrayed, setHasPrayed] = useState(0);

  const cardClasses = node.human_fields.Type === "praise" ? "bg-blue-400" : "bg-blue-700";
  const buttonClasses = node.human_fields.Type === "praise" ? "bg-blue-700" : "bg-blue-400";
  return (
    <Card title={node.human_fields.Title} classes={cardClasses}>
      <div className="flex flex-col justify-start space-y-2 w-full font-sans">
        <div className="whitespace-pre-line md:h-20 md:overflow-y-scroll">{node.human_fields.Prayer}</div>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-row">{node.human_fields.Name}</div>
          <button
            className={`capitalize p-2 border text-gray-100 rounded hover:bg-blue-500 font-sans flex flex-row ${buttonClasses}`}
            onClick={() => setHasPrayed(hasPrayed + 1)}>
            {node.human_fields.Type === "praise" ? (
              <span role="img" aria-label="party popper" className="pr-2">
                🎉
              </span>
            ) : (
              <span role="img" aria-label="folded hands" className="pr-2">
                🙏
              </span>
            )}{" "}
            {hasPrayed}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PrayerCard;
