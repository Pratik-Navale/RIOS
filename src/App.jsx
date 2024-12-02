import { useState } from "react"
import Navbar from "./components/Navbar"
import StepIndicator from "./components/StepIndicator"
import BasicInfoForm from "./components/BasicInfoForm"
import FloorConfigForm from "./components/FloorConfigForm"
import WardConfigForm from "./components/WardConfigForm"
import Summary from "./components/Summary"

const STEPS = [
  "Basic Information",
  "Floor Configuration",
  "Ward Configuration",
  "Summary"
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [basicInfo, setBasicInfo] = useState({
    hospitalName: "",
    email: "",
    addressLine: "",
    city: "",
    pinCode: "",
    state: "",
    numberOfFloors: 1,
    phone: "",
    password: ""
  })
  const [floorConfigs, setFloorConfigs] = useState([])
  const [wardConfigs, setWardConfigs] = useState([])

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    console.log("Final Configuration:", {
      basicInfo,
      floorConfigs,
      wardConfigs
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            data={basicInfo}
            onUpdate={setBasicInfo}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <FloorConfigForm
            numberOfFloors={basicInfo.numberOfFloors}
            floorConfigs={floorConfigs}
            onUpdate={setFloorConfigs}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <WardConfigForm
            floorConfigs={floorConfigs}
            wardConfigs={wardConfigs}
            onUpdate={setWardConfigs}
            onSubmit={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <Summary
            config={{
              basicInfo,
              floorConfigs,
              wardConfigs
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} steps={STEPS} />
        {renderStep()}
      </main>
    </div>
  )
}

export default App
