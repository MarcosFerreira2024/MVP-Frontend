import type { LucideIcon } from "lucide-react";

function MoreInfo({
  value,
  dangerous,
  type,
  icon: Icon,
}: {
  description: string;
  value: string;
  dangerous?: boolean;
  type?: "easy" | "medium" | "hard" | "duration" | "success" | "error";
  icon?: LucideIcon;
}) {
  const getColorClass = (
    type?: "easy" | "medium" | "hard" | "duration" | "success" | "error"
  ) => {
    switch (type) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      case "duration":
        return "text-orange-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-green-900";
    }
  };

  const colorClass = dangerous ? "text-red-500" : getColorClass(type);

  return (
    <li className="flex flex-col  min-w-[100px]  font-segoe capitalize  font-semibold">
      <h1 className={`${colorClass} text-base flex items-center gap-1.5`}>
        {Icon && <Icon className="w-5 h-5 " />}
        {value}
      </h1>
    </li>
  );
}

export default MoreInfo;
