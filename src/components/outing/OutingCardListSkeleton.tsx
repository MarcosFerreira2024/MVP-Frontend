import OutingCardSkeleton from "./OutingCardSkeleton";

const SKELETON_COUNT = 12;

function OutingCardListSkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <OutingCardSkeleton key={index} />
      ))}
    </>
  );
}

export default OutingCardListSkeleton;
