import React, { useState } from "react";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import Card from "../components/card";

dayjs.extend(advancedFormat);

const PrayerCard = ({ node }) => {
  const [hasPrayed, setHasPrayed] = useState(0);
  return (
    <Card title={node.human_fields.Title}>
      <div className="flex flex-col justify-start space-y-2 w-full font-sans">
        <div className="whitespace-pre-line">{node.human_fields.Prayer}</div>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-row">{node.human_fields.Name}</div>
          <button
            className="capitalize p-2 border bg-blue-400 text-gray-100 rounded hover:bg-blue-500 font-sans flex flex-row"
            onClick={() => setHasPrayed(hasPrayed + 1)}>
            <span role="img" aria-label="folded hands" className="pr-2">
              🙏
            </span>{" "}
            {hasPrayed}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PrayerCard;
