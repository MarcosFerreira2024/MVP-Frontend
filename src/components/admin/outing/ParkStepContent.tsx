import React from "react";
import Input from "../../Input";
import Label from "../../Label";
import type {
  SetNumberDispatch,
  SetStringDispatch,
} from "../../../hooks/useOutingCreation";

type ParkProps = {
  biodiversity: string;
  setBiodiversity: SetStringDispatch;
  maximumCapacityPark: string;
  setMaximumCapacityPark: SetStringDispatch;
  handleNumericChange: (
    setter: SetNumberDispatch | SetStringDispatch
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ParkStepContent({
  biodiversity,
  setBiodiversity,
  maximumCapacityPark,
  setMaximumCapacityPark,
  handleNumericChange,
}: ParkProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-green-800 text-xl font-semibold mt-4">
        Detalhes do Parque
      </h2>

      <Label
        to="biodiversity"
        text="Nível de Biodiversidade"
        className="text-main text-xl"
      >
        <Input
          id="biodiversity"
          type="text"
          value={biodiversity}
          placeholder="Ex: Alto, Médio"
          onChange={(e) => setBiodiversity(e.target.value)}
        />
      </Label>
      <Label
        to="maxCapacityPark"
        text="Capacidade Máxima"
        className="text-main text-xl"
      >
        <Input
          id="maxCapacityPark"
          type="number"
          value={maximumCapacityPark}
          placeholder="Ex: 100"
          onChange={handleNumericChange(setMaximumCapacityPark)}
        />
      </Label>
    </div>
  );
}
