import { useState } from "react";
import Step from "./Step";

export default function Instructions({ onChange }) {
    const [steps, setSteps] = useState([{ description: '', image: null }]); // Initialize with one step

    const updateStep = (index, newStep) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = newStep;
        setSteps(updatedSteps);
    };

    const addStep = () => {
        if (steps.length < 100) { // Limit to 100 steps
            setSteps([...steps, { description: '', image: null }]);
        }
    };

    const removeStep = (index) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    };

    const handleSubmit = () => {
        console.log('Submitting instructions:', steps);
        
    };

    return (
        <div className="flex flex-col justify-around w-2/3 mx-auto mt-20">
            <h2 className="text-2xl text-center">Instructions</h2>
            {steps.map((step, index) => (
                <Step 
                    key={index} 
                    index={index} 
                    step={step} 
                    updateStep={updateStep} 
                    removeStep={removeStep} 
                />
            ))}
            <button
                className="flex items-center w-1/4 mx-auto justify-center gap-2 border border-primary px-4 py-2 rounded-2xl text-lg mt-10"
                onClick={addStep} disabled={steps.length >= 100}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Step
            </button>
            {/* <button onClick={handleSubmit}>Submit Instructions</button> */}
        </div>
    );
}