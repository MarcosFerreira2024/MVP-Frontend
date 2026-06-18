import React from "react";
import SectionTitle from "../SectionTitle";

type SectionProps = {
  title: string;
  description: string;
  isOnLightBg: boolean;
  children: React.ReactNode;
};

function Section({ title, description, isOnLightBg, children }: SectionProps) {
  const bgColor = isOnLightBg ? "#F3F4F6" : "#032E15";

  return (
    <section
      style={{ backgroundColor: bgColor }}
      id={title.toLowerCase()}
      className="relative"
    >
      <div className="max-w-[1440px] mx-auto justify-center py-10 flex flex-col gap-10 px-4 md:px-0">
        <SectionTitle
          title={title}
          description={description}
          isOnLightBg={isOnLightBg}
        />
        {children}
      </div>
    </section>
  );
}

export default Section;
