import React from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const compare = (first, second, inverseSort) => {
  const firstDate = dayjs(first.fieldValue);
  const secondDate = dayjs(second.fieldValue);

  if (firstDate === secondDate) return 0;
  if (inverseSort) {
    if (firstDate > secondDate) return -1;
    if (firstDate < secondDate) return 1;
  } else {
    if (firstDate > secondDate) return 1;
    if (firstDate < secondDate) return -1;
  }
};

const GroupedList = ({ group, Component, inverseSort = false }) => {
  return (
    <div className="space-y-8 overflow-y-scroll py-2">
      {group
        .sort((a, b) => compare(a, b, inverseSort))
        .map(({ edges, fieldValue }) => {
          return (
            <div key={fieldValue} className="mx-4 md:bg-gray-50 rounded shadow md:p-4">
              <h3 className="text-gray-900 text-xl mb-4">{fieldValue}</h3>
              <div className="relative grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3">
                {edges.map(({ node }) => (
                  <Component key={node.id} node={node} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GroupedList;
