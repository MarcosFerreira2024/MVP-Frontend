import React from "react";
import Input from "../../Input";
import Label from "../../Label";
import type {
  SetNumberDispatch,
  SetStringDispatch,
} from "../../../hooks/useOutingCreation";

type EventProps = {
  maximumCapacityEvent: string;
  setMaximumCapacityEvent: SetStringDispatch;
  startDate: string;
  setStartDate: SetStringDispatch;
  endDate: string;
  setEndDate: SetStringDispatch;
  handleNumericChange: (
    setter: SetNumberDispatch | SetStringDispatch
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function EventStepContent({
  maximumCapacityEvent,
  setMaximumCapacityEvent,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleNumericChange,
}: EventProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-green-800 text-xl font-semibold mt-4">
        Detalhes do Evento
      </h2>

      <Label
        to="maxCapacityEvent"
        text="Capacidade Máxima"
        className="text-main text-xl"
      >
        <Input
          id="maxCapacityEvent"
          type="number"
          value={maximumCapacityEvent}
          placeholder="Ex: 50"
          onChange={handleNumericChange(setMaximumCapacityEvent)}
        />
      </Label>

      <div className="flex gap-4">
        <Label
          to="startDate"
          text="Data Inicial"
          className="text-main text-xl w-1/2"
        >
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Label>
        <Label
          to="endDate"
          text="Data Final"
          className="text-main text-xl w-1/2"
        >
          <Input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Label>
      </div>
    </div>
  );
}
