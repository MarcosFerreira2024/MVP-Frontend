import React from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import { DifficultySelector } from "./DifficultySelector";

type SetStringDispatch = React.Dispatch<React.SetStateAction<string>>;
type SetNumberDispatch = React.Dispatch<React.SetStateAction<number | string>>;

type TrailProps = {
  difficulty: string;
  setDifficulty: SetStringDispatch;
  duration: number | string;
  setDuration: SetNumberDispatch;
  distance: number | string;
  setDistance: SetNumberDispatch;
  roundTrip: boolean;
  setRoundTrip: React.Dispatch<React.SetStateAction<boolean>>;
  handleNumericChange: (
    setter: SetNumberDispatch | SetStringDispatch
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TrailStepContent({
  difficulty,
  setDifficulty,
  duration,
  setDuration,
  distance,
  setDistance,
  roundTrip,
  setRoundTrip,
  handleNumericChange,
}: TrailProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-green-800 text-xl font-semibold mt-4">
        Detalhes da Trilha
      </h2>

      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="grid grid-cols-3 gap-4">
        <Label to="duration" text="Duração (min)" className="text-main text-xl">
          <Input
            id="duration"
            type="number"
            value={duration}
            placeholder="Ex: 120"
            onChange={handleNumericChange(setDuration)}
          />
        </Label>
        <Label
          to="distance"
          text="Distância (km)"
          className="text-main text-xl"
        >
          <Input
            id="distance"
            type="text"
            value={distance}
            placeholder="Ex: 5.5"
            onChange={handleNumericChange(setDistance)}
          />
        </Label>
        <Label
          to="roundTrip"
          text="Ida e Volta"
          className="text-main text-xl self-end"
        >
          <Button
            onClick={() => setRoundTrip(!roundTrip)}
            variant={roundTrip ? "contrast" : "default"}
            className="h-10"
          >
            {roundTrip ? "Sim" : "Não"}
          </Button>
        </Label>
      </div>
    </div>
  );
}
