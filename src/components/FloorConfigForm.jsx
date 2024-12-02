export default function FloorConfigForm({
    numberOfFloors,
    floorConfigs,
    onUpdate,
    onNext,
    onBack
}) {
    const handleSubmit = e => {
        e.preventDefault()
        onNext()
    }

    const handleWardsChange = (floorNumber, value) => {
        const newConfigs = [...floorConfigs]
        const index = newConfigs.findIndex(c => c.floorNumber === floorNumber)
        if (index >= 0) {
            newConfigs[index] = {
                ...newConfigs[index],
                wardsPerFloor: parseInt(value) || 0
            }
        } else {
            newConfigs.push({
                floorNumber,
                wardsPerFloor: parseInt(value) || 0
            })
        }
        onUpdate(newConfigs)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-6">
                {Array.from({ length: numberOfFloors }, (_, i) => i + 1).map(floor => (
                    <div key={floor}>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Wards on Floor {floor}
                        </label>
                        <input
                            type="number"
                            value={
                                floorConfigs.find(c => c.floorNumber === floor)
                                    ?.wardsPerFloor || ""
                            }
                            onChange={e => handleWardsChange(floor, e.target.value)}
                            required
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </form>
    )
}
