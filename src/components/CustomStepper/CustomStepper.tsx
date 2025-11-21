import React from "react";

type Step = {
  label: string;
};

type StepperProps = {
  steps: Step[];
  activeStep: number;
  onStepClick?: (index: number) => void;
};

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <div className="flex justify-between items-center w-full px-4">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        return (
          <div
            key={index}
            className="flex-1 text-center cursor-pointer"
            onClick={() => onStepClick?.(index)}
          >
            <div
              className={`h-1 rounded-full m-1 ${
                isActive ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>

            <div
              className={`text-sm ${
                isActive ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
