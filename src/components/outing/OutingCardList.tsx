import { OutingCard, type OutingCardProps } from "./OutingCard";

type OutingCardListProps = {
  data: OutingCardProps[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function OutingCardList({ data, onEdit, onDelete }: OutingCardListProps) {
  return (
    <>
      {data.map((item) => (
        <OutingCard key={item.id} {...item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
}

export default OutingCardList;
