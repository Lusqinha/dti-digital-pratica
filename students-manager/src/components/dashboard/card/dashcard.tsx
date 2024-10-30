import { DashContentCard } from "@/components/dashboard/card/contentcard";
import { cn } from "@/lib/utils";

interface DashCardProps{
    titulo: string;
    valor?: number | string;
    descricao?: string;
    icone: React.ReactNode;
    className?: string;
    valorClassName?: string;
}

export const DashCard: React.FC<DashCardProps> = ({ className, ...props }) => {
    return (
        <DashContentCard titulo={props.titulo} icone={props.icone} descricao={props.descricao} className={className}  >
            <p className={cn("text-5xl font-bold transition ease-in-out delay-100", props.valorClassName)}>
                {props.valor}
            </p>
        </DashContentCard>
    );
}

