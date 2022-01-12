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
    <div className="py-2 space-y-8 overflow-y-scroll">
      {group
        .sort((a, b) => compare(a, b, inverseSort))
        .map(({ edges, fieldValue }) => {
          return (
            <div key={fieldValue} className="mx-4 rounded shadow md:bg-gray-50 md:p-4">
              <h3 className="mb-4 text-xl text-gray-900">{fieldValue}</h3>
              <div className="relative grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-3">
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
