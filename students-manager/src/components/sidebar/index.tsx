import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowBigDown, Home, Menu} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function Sidebar(): React.ReactElement {
    const menuItems = [
        { nome: "Home", icone: <Home />, link: "/" },
        { nome: "Cadastro", icone: <ArrowBigDown />, link: "/cadastro" },
        { nome: "Visualização", icone: <ArrowBigDown />, link: "/visualizacao" },
    ]
    return (
        <div className="flex flex-col">
            <div className="flex felx-col">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Menu className="w-5 h-5" />
                            <span className="sr-only">
                                alternar barra lateral
                            </span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent>
                        <div className="">
                            <div className="flex flex-col">
                                {menuItems.map((item, index) => (
                                    <Button key={index} className="flex justify-start text-xl space-x-2 my-2" size="lg" variant="ghost">
                                        {item.icone}
                                        <Link href={item.link}>
                                            {item.nome}
                                        </Link>
                                    </Button>
                                ))}
                               
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
} 