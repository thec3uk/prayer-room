import * as React from "react";

const BoxButton = ({
  onClickHandler,
  title,
  className = "",
  alignment = "left",
}: {
  onClickHandler: (event: React.SyntheticEvent | string) => void;
  title: string;
  className?: string;
  alignment: "left" | "right";
}) => {
  const buttonClasses = "text-2xl font-sans px-4 transform -translate-y-4 block text-gray-900";
  const wrapperClasses = "bg-blue-400 h-6 hover:h-auto hover:bg-blue-700 transition-colors duration-300 my-4 w-max";
  return (
    <>
      {alignment === "right" ? (
        <div className={`right-0 ml-auto mr-0 rounded-tl rounded-bl ${wrapperClasses}`}>
          <button onClick={onClickHandler} className={buttonClasses}>
            {title}
          </button>
        </div>
      ) : (
        <div className={`left-0 rounded-tr rounded-br ${wrapperClasses}`}>
          <button onClick={onClickHandler} className={buttonClasses}>
            {title}
          </button>
        </div>
      )}
    </>
  );
};

export default BoxButton;
