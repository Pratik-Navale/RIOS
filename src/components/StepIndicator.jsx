export default function StepIndicator({ currentStep, steps }) {
    return (
        <div className="mb-8">
            <div className="flex justify-center items-center space-x-4">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-1 w-12 mx-2 ${index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-2">
                <span className="text-gray-600 font-medium">
                    {steps[currentStep - 1]}
                </span>
            </div>
        </div>
    )
}
