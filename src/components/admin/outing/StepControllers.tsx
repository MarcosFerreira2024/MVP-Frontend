import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../Button";

type StepControllersProps = {
  decreaseStep: () => void;
  increaseStep: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
};
function StepControllers({
  decreaseStep,
  increaseStep,
  canGoBack,
  canGoForward,
}: StepControllersProps) {
  return (
    <div className="flex absolute right-0 bottom-0 gap-2">
      {canGoBack && (
        <Button
          size="icon"
          iconPosition="start"
          icon={<ChevronLeft size={16} />}
          onClick={decreaseStep}
        ></Button>
      )}

      {canGoForward && (
        <Button
          size="icon"
          icon={<ChevronRight size={16} />}
          onClick={increaseStep}
        ></Button>
      )}

      {!canGoForward && (
        <Button
          size="sm"
          iconPosition="end"
          icon={<ChevronRight size={16} />}
          onClick={increaseStep}
        >
          Enviar
        </Button>
      )}
    </div>
  );
}

export { StepControllers };
