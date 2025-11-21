import React, { useState } from "react";
import Stepper from "@/components/CustomStepper/CustomStepper"; 

const StepperTestPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Step 4" },
    { label: "Complete" },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Stepper Component Test Page</h1>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Basic Stepper</h2>
        <Stepper 
          steps={steps} 
          activeStep={activeStep} 
          onStepClick={handleStepClick} 
        />
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <p className="mb-4">Current step: {steps[activeStep].label}</p>
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={activeStep === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Stepper with Fewer Steps</h2>
        <Stepper 
          steps={steps.slice(0, 3)} 
          activeStep={Math.min(activeStep, 2)} 
          onStepClick={(index) => setActiveStep(index)} 
        />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Stepper Without Click Handler</h2>
        <Stepper 
          steps={steps} 
          activeStep={activeStep} 
        />
        <p className="mt-2 text-sm text-gray-500">
          This stepper doesn't respond to clicks (no onStepClick provided)
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Stepper with Long Labels</h2>
        <Stepper 
          steps={[
            { label: "Initial Setup" },
            { label: "Configuration Options" },
            { label: "Final Review" },
            { label: "Confirmation" },
          ]} 
          activeStep={activeStep % 4} 
          onStepClick={(index) => setActiveStep(index)} 
        />
      </div>
    </div>
  );
};

export default StepperTestPage;