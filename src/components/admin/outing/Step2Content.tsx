import React from "react";
import Input from "../../Input";
import Label from "../../Label";

import { EventStepContent } from "./EventStepContent";
import { TrailStepContent } from "./TrailStepContent";
import { ParkStepContent } from "./ParkStepContent";

type DataItem = { id: number; name: string };
type SetStringDispatch = React.Dispatch<React.SetStateAction<string>>;
type SetNumberDispatch = React.Dispatch<React.SetStateAction<number | string>>;

type Step2ContentProps = {
  category: DataItem;
  latitude: string;
  setLatitude: SetStringDispatch;
  longitude: string;
  setLongitude: SetStringDispatch;

  maximumCapacityEvent: string;
  setMaximumCapacityEvent: SetStringDispatch;
  startDate: string;
  setStartDate: SetStringDispatch;
  endDate: string;
  setEndDate: SetStringDispatch;

  difficulty: string;
  setDifficulty: SetStringDispatch;
  duration: number | string;
  setDuration: SetNumberDispatch;
  distance: number | string;
  setDistance: SetNumberDispatch;
  roundTrip: boolean;
  setRoundTrip: React.Dispatch<React.SetStateAction<boolean>>;

  biodiversity: string;
  setBiodiversity: SetStringDispatch;
  maximumCapacityPark: string;
  setMaximumCapacityPark: SetStringDispatch;
};

function Step2Content(props: Step2ContentProps) {
  const { category, latitude, setLatitude, longitude, setLongitude } = props;
  const categoryName = category.name;

  const handleNumericChange =
    (setter: SetNumberDispatch | SetStringDispatch) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9.]/g, "");
      setter(value);
    };

  let specificContent;

  if (categoryName === "Evento") {
    specificContent = (
      <EventStepContent {...props} handleNumericChange={handleNumericChange} />
    );
  } else if (categoryName === "Trilha") {
    specificContent = (
      <TrailStepContent {...props} handleNumericChange={handleNumericChange} />
    );
  } else if (categoryName === "Parque") {
    specificContent = (
      <ParkStepContent {...props} handleNumericChange={handleNumericChange} />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Seção Específica (Roteada) */}
      {specificContent}

      <div className="flex gap-4">
        <Label
          to="latitude"
          text="Latitude"
          className="text-main text-xl w-1/2"
        >
          <Input
            id="latitude"
            type="text"
            value={latitude}
            placeholder="Ex: -22.425"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Label>
        <Label
          to="longitude"
          text="Longitude"
          className="text-main text-xl w-1/2"
        >
          <Input
            id="longitude"
            type="text"
            value={longitude}
            placeholder="Ex: -42.975"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Label>
      </div>
    </div>
  );
}
export { Step2Content };
