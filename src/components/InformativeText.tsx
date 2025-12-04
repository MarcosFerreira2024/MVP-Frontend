import React from "react";

type InformativeTextProps = {
  icon: string | React.ReactNode;
  text: string;
};

function InformativeText({ icon, text }: InformativeTextProps) {
  return (
    <div className="flex gap-2 w-fit  items-center">
      {typeof icon === "string" ? <img src={icon} /> : icon}

      <span className="text-gray-300 font-segoe font-semibold text-sm">
        {text}
      </span>
    </div>
  );
}

export default InformativeText;
