import useOpenStatus from "../hooks/useOpenStatus";

type OpenStatusProps = {
  closeTime: string;
  openTime: string;
};

function OpenStatus({ closeTime, openTime }: OpenStatusProps) {
  const { isOpen } = useOpenStatus(closeTime, openTime);

  return <img src={isOpen ? "open.svg" : "closed.svg"} />;
}

export default OpenStatus;
