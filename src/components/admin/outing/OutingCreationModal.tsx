import { StepControllers } from "./StepControllers";
import { Step3Content } from "./Step3Content";
import { Step1Content } from "./Step1Content";
import { Step2Content } from "./Step2Content";
import { useOutingCreation } from "../../../hooks/useOutingCreation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
function OutingCreationModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const {
    maxStep,
    currentStep,
    canGoBack,
    canGoForward,
    increaseStep,
    decreaseStep,
    step1Props,
    step2Props,
    step3Props,
  } = useOutingCreation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className=" 
        max-w-[800px] 
        absolute top-1/2 
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2 
         w-full bg-gray-50 border border-green-900 rounded-2xl main-shadow p-6"
          >
            <div className=" h-full w-full  relative flex flex-col justify-between">
              <div className=" flex flex-col  min-h-[800px] h-full items-center ">
                <X
                  className="w-4 h-4 absolute top-0 right-0 text-green-900"
                  onClick={closeModal}
                />
                <h1 className="text-green-900 text-2xl mb-4 font-bold">
                  Crie um Passeio:
                </h1>

                <div className="flex gap-4 mb-8">
                  {Array.from({ length: maxStep }).map((_, index) => {
                    const isActive = currentStep > index;
                    return (
                      <div
                        key={index}
                        className={`${
                          isActive ? "bg-green-900" : "bg-gray-400/40"
                        } w-6 h-6 rounded-full`}
                      />
                    );
                  })}
                </div>

                {currentStep === 1 && <Step1Content {...step1Props} />}
                {currentStep === 2 && <Step2Content {...step2Props} />}
                {currentStep === 3 && <Step3Content {...step3Props} />}
              </div>

              <StepControllers
                decreaseStep={decreaseStep}
                increaseStep={increaseStep}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export { OutingCreationModal };
