import MoreInfo from "./MoreInfo";
import type { OutingResponse } from "../../hooks/useOuting";
import {
  Clock,
  Footprints,
  Gauge,
  type LucideIcon,
  TrendingUp,
} from "lucide-react";

function MoreInfoList({ data }: { data: OutingResponse }) {
  const moreInfoItems: {
    value: string;
    description: string;
    dangerous?: boolean;
    type?: "easy" | "medium" | "hard" | "duration" | "success" | "error";
    icon?: LucideIcon;
  }[] = [];

  if (data.category.name === "Trail" && data.trail) {
    moreInfoItems.push(
      {
        value: data.trail.difficulty.toLocaleLowerCase(),
        description: "Dificuldade",
        type: data.trail.difficulty.toLocaleLowerCase() as
          | "easy"
          | "medium"
          | "hard",
        icon: Gauge,
      },
      {
        value: `${data.trail.duration / 60} h`,
        description: "Duração",
        type: "duration",
        icon: Clock,
      },
      {
        value: `${data.trail.distance} km`,
        description: "Distância",
        icon: Footprints,
      },
      {
        value: `${data.trail.roundTrip}` ? "sim" : "não",
        description: "Ida e Volta",
        icon: TrendingUp,
      }
    );
  }

  return (
    <>
      {moreInfoItems.length > 0 && (
        <ul className="flex flex-wrap max-w-[250px]  gap-2 ">
          {" "}
          {moreInfoItems.map((item, index) => (
            <MoreInfo
              key={index}
              description={item.description}
              value={item.value}
              dangerous={item.dangerous}
              type={item.type}
              icon={item.icon}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default MoreInfoList;
