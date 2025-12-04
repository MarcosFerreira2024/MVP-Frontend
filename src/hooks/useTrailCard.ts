function useTrailCard(side: "left" | "right") {
  const isLeftSide = side === "left";

  const rotationValue = isLeftSide ? -8 : 8;

  const boltPosition = isLeftSide ? { right: "4px" } : { left: "4px" };

  const origin = isLeftSide ? "top right" : "top left";
  return {
    rotationValue,
    boltPosition,
    origin,
  };
}

export default useTrailCard;
