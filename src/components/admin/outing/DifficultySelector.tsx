import type { SetStringDispatch } from "../../../hooks/useOutingCreation";
import Button from "../../Button";
import Label from "../../Label";

function DifficultySelector({
  difficulty,
  setDifficulty,
}: {
  difficulty: string;
  setDifficulty: SetStringDispatch;
}) {
  const DifficultyOptions = ["EASY", "MEDIUM", "HARD"];

  return (
    <Label
      to="difficulty"
      text="Dificuldade da Trilha"
      className="text-main text-xl"
    >
      <div className="flex gap-4">
        {DifficultyOptions.map((option) => (
          <Button
            key={option}
            onClick={() => setDifficulty(option)}
            size="sm"
            variant={difficulty === option ? "contrast" : "default"}
          >
            {option}
          </Button>
        ))}
      </div>
    </Label>
  );
}

export { DifficultySelector };
