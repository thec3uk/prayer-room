import * as React from "react";

const BoxButton = ({
  onClickHandler,
  title,
}: {
  onClickHandler: (event: React.SyntheticEvent | string) => void;
  title: string;
}) => {
  return (
    <div className="bg-blue-400 left-0 rounded-tr rounded-br h-6 hover:h-auto hover:bg-blue-700 transition-colors duration-300 my-4 w-max">
      <button onClick={onClickHandler} className="text-2xl font-sans px-4 transform -translate-y-4 block text-gray-900">
        {title}
      </button>
    </div>
  );
};

export default BoxButton;
