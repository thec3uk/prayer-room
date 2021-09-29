import React from "react";

const GroupedList = ({ group, Component }) => {
  return (
    <div className="space-y-8 overflow-y-scroll">
      {group.map(({ edges, fieldValue }) => {
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
