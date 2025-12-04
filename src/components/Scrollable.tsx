import React from "react";

type ScrollableProps = {
  height: number | string;
  width?: number | string;
  children: React.ReactNode;
  className?: string;
};

function Scrollable({ height, children, width, className }: ScrollableProps) {
  return (
    <div
      style={{ maxHeight: height, maxWidth: width ?? "100%" }}
      className={` ${className} overflow-y-auto`}
    >
      {children}
    </div>
  );
}

export default Scrollable;
