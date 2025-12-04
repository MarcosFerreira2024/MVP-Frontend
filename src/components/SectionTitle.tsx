import React from "react";

type SectionTitleProps = {
  title: string;
  description: string;
  isOnLightBg?: boolean;
  children?: React.ReactNode;
};

function SectionTitle({
  title,
  description,
  isOnLightBg = true,
  children,
}: SectionTitleProps) {
  return (
    <div className="font-semibold font-segoe px-4 xl:px-0 ">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 justify-between max-w-fit w-full">
          <h2
            className={`text-4xl ${
              isOnLightBg ? "text-green-900" : "text-gray-100"
            }`}
          >
            {title}:
          </h2>
          {children}
        </div>

        <p
          className={`text-sm ${
            isOnLightBg ? "text-gray-500" : "text-gray-300"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default SectionTitle;
