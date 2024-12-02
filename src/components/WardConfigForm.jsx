export default function WardConfigForm({
    floorConfigs,
    wardConfigs,
    onUpdate,
    onSubmit,
    onBack
}) {
    const handleSubmit = e => {
        e.preventDefault()
        onSubmit()
    }

    const handleBedsChange = (floorNumber, wardNumber, value) => {
        const newConfigs = [...wardConfigs]
        const index = newConfigs.findIndex(
            c => c.floorNumber === floorNumber && c.wardNumber === wardNumber
        )
        if (index >= 0) {
            newConfigs[index] = {
                ...newConfigs[index],
                bedsPerWard: parseInt(value) || 0
            }
        } else {
            newConfigs.push({
                floorNumber,
                wardNumber,
                bedsPerWard: parseInt(value) || 0
            })
        }
        onUpdate(newConfigs)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-8">
                {floorConfigs.map(floorConfig => (
                    <div key={floorConfig.floorNumber} className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            Floor {floorConfig.floorNumber}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from(
                                { length: floorConfig.wardsPerFloor },
                                (_, i) => i + 1
                            ).map(ward => (
                                <div key={ward}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number of Beds in Ward {ward}
                                    </label>
                                    <input
                                        type="number"
                                        value={
                                            wardConfigs.find(
                                                c =>
                                                    c.floorNumber === floorConfig.floorNumber &&
                                                    c.wardNumber === ward
                                            )?.bedsPerWard || ""
                                        }
                                        onChange={e =>
                                            handleBedsChange(
                                                floorConfig.floorNumber,
                                                ward,
                                                e.target.value
                                            )
                                        }
                                        required
                                        min="1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
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
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}
