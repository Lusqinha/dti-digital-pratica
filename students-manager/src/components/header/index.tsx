import { Sidebar } from "@/components/sidebar";
import { User } from "lucide-react";


export function Header(): React.ReactElement { 
    return (
        
        <header className="border-b-2 shadow-lg">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-evenly">
                    <Sidebar />
                    <div className="w-full text-white text-center text-2xl font-semibold">
                        Gereciador de Notas
                    </div>
                    <User className="w-8 h-8 hidden md:flex "/>
                </div>
            </div>
        </header>
    )

}