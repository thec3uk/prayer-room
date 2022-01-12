import React, { useState, useEffect } from "react";

import Card from "../components/card";

const PrayerCard = ({ node }) => {
  const [hasPrayed, setHasPrayed] = useState(0);

  const cardClasses = node.data.type === "praise" ? "bg-blue-400" : "bg-blue-700";
  const buttonClasses = node.data.type === "praise" ? "bg-blue-700" : "bg-blue-400";

  useEffect(() => {
    const pData = JSON.parse(window.localStorage.getItem(node.data.type) as string);
    setHasPrayed(pData && pData[node.id] ? pData[node.id] : 0);
  });

  const onClick = () => {
    const newCount = Number(hasPrayed) + 1;
    setHasPrayed(newCount);
    const pData = JSON.parse(window.localStorage.getItem(node.data.type) as string);

    window.localStorage.setItem(node.data.type, JSON.stringify({ ...pData, [node.id]: newCount as unknown as string }));
  };
  return (
    <Card title={node.data.title} classes={cardClasses}>
      <div className="flex flex-col justify-start w-full space-y-2 font-sans">
        <div className="whitespace-pre-line md:h-20 md:overflow-y-scroll">{node.data.prayer}</div>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-row">{node.data.name}</div>
          <button
            className={`capitalize p-2 border text-gray-100 rounded hover:bg-blue-500 font-sans flex flex-row ${buttonClasses}`}
            onClick={onClick}>
            {node.data.type === "praise" ? (
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
