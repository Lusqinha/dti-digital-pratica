import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashContentCardProps{
    titulo: string;
    descricao?: string;
    icone: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const DashContentCard: React.FC<DashContentCardProps> = ({ className, children, ...props }) => {
  return (
    <Card className={cn("flex flex-col justify-between  text-left w-full group bg-transparent text-white transition ease-in-out delay-100", className)} >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h1 className="text- mr-5">{ props.titulo }</h1>
            { props.icone }
        </CardHeader>
        <CardContent>
          {children}
      </CardContent>
      <CardFooter className="">
        <p className="text-xs text-gray-500">{props.descricao}</p>
      </CardFooter>
    </Card>
  );
}
