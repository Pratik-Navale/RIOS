import { useEffect } from "react"

export default function Summary({ config }) {
    const generateBedId = (floor, ward, bed) => `RIOS-F${floor}W${ward}B${bed}`

    useEffect(() => {
        // Generate and log hierarchical structure
        const hierarchicalStructure = {}

        config.floorConfigs.forEach(floor => {
            hierarchicalStructure[`Floor ${floor.floorNumber}`] = {}
            const floorWards = config.wardConfigs.filter(
                w => w.floorNumber === floor.floorNumber
            )

            floorWards.forEach(ward => {
                hierarchicalStructure[`Floor ${floor.floorNumber}`][
                    `Ward ${ward.wardNumber}`
                ] = Array.from({ length: ward.bedsPerWard }, (_, i) =>
                    generateBedId(floor.floorNumber, ward.wardNumber, i + 1)
                )
            })
        })

        console.log("Hospital Structure:")
        console.log(JSON.stringify(hierarchicalStructure, null))
    }, [config])

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                Hospital Configuration Summary
            </h2>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Basic Information
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">
                                Hospital Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {config.basicInfo.hospitalName}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {config.basicInfo.email}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {config.basicInfo.addressLine}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {config.basicInfo.city}, {config.basicInfo.state} -{" "}
                                {config.basicInfo.pinCode}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {config.basicInfo.phone}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Bed Configuration
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    {config.floorConfigs.map(floor => {
                        const wardConfigs = config.wardConfigs.filter(
                            w => w.floorNumber === floor.floorNumber
                        )

                        return (
                            <div
                                key={floor.floorNumber}
                                className="px-4 py-5 sm:px-6 border-b border-gray-200"
                            >
                                <h4 className="font-medium text-gray-900 mb-4">
                                    Floor {floor.floorNumber}
                                </h4>
                                <div className="space-y-4">
                                    {wardConfigs.map(ward => (
                                        <div
                                            key={ward.wardNumber}
                                            className="bg-gray-50 p-4 rounded-lg"
                                        >
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">
                                                Ward {ward.wardNumber}
                                            </h5>
                                            <div className="grid grid-cols-4 gap-2">
                                                {Array.from(
                                                    { length: ward.bedsPerWard },
                                                    (_, i) => i + 1
                                                ).map(bed => (
                                                    <div
                                                        key={bed}
                                                        className="bg-blue-50 p-2 rounded text-sm text-blue-700 hover:bg-blue-100 transition-colors"
                                                    >
                                                        {generateBedId(
                                                            floor.floorNumber,
                                                            ward.wardNumber,
                                                            bed
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
