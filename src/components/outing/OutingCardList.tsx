import React from "react";
import { OutingCard, type OutingCardProps } from "./OutingCard";

function OutingCardList({ data }: { data: OutingCardProps[] }) {
  return (
    <>
      {data.map((item) => (
        <OutingCard {...item} />
      ))}
    </>
  );
}

export default OutingCardList;
