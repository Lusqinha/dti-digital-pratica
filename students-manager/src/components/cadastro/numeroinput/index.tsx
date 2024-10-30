import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SquareNumInputProps {
    min: number;
    max: number;
    id: number | string;
    label: string;
    placeholder?: string;
    className?: string;
    value?: number | "";
    onChange?: (value: number | "") => void;
}

export function SquareNumInput({ className, value = "", onChange, ...props }: SquareNumInputProps): React.ReactElement {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue === "") {
            onChange && onChange("");
        } else {
            const numValue = Number(newValue);
            if (!isNaN(numValue) && numValue >= props.min && numValue <= props.max) {
                onChange && onChange(numValue);
            }
        }
    };

    return (
        <div className='flex flex-col max-w-sm items-center'>
            <Label className='text-xl font-extrabold' htmlFor={`${props.id}`}>{props.label}</Label>
            <Input 
                min={props.min} 
                max={props.max} 
                className={cn('[appearance:textfield] text-6xl text-center w-24 h-24 max-w-fit border bg-black/25', className)} 
                id={`${props.id}`} 
                name={`${props.id}`} 
                type='number' 
                placeholder={props.placeholder} 
                required 
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
