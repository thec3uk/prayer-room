import React from "react";

const Card = ({ children, title, subtitle }) => {
  return (
    <div className="text-gray-50 shadow bg-blue-700 p-4 rounded flex flex-col">
      <h3 className=" text-xl font-sans capitalize">{title}</h3>
      {subtitle && <h4 className="text-base font-sans font-light">{subtitle}</h4>}
      <div className="flex flex-row justify-between mt-4">{children}</div>
    </div>
  );
};

export default Card;
