import { Building2 } from "lucide-react"

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Building2 className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-semibold text-gray-800">
                            RIOS Hospital Management
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
