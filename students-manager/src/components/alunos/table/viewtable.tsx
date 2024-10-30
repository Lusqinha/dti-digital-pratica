import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface ColumnConfig<T> {
    header: string;
    key: keyof T;
    render?: (item: T) => React.ReactNode;
}

interface DashTableProps<T> {
    title: string;
    dataFetcher: () => Promise<T[]>;
    columns: ColumnConfig<T>[];
    onDelete?: (id: number) => Promise<void>;
}

export function DashTable<T extends { id: number }>({
    title,
    dataFetcher,
    columns,
    onDelete,
}: DashTableProps<T>): React.ReactElement {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataFetcher();
                setData(result);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [dataFetcher]);

    const handleDelete = async (id: number) => {
        if (onDelete) {
            try {
                await onDelete(id);
                setData((prevData) => prevData.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Erro ao deletar item:", error);
            }
        }
    };

    return (
        <Card className="bg-transparent shadow-xl text-white">
            <CardHeader>
                <CardTitle className="text-xl text-center font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index} className="text-gray-400 text-center">
                                        {column.header}
                                    </TableHead>
                                ))}
                                {onDelete && (
                                    <TableHead className="text-gray-400 text-center">Ações</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-700/50 transition-colors">
                                    {columns.map((column, index) => (
                                        <TableCell key={index} className="text-center">
                                            {column.render ? column.render(item) : String(item[column.key])}
                                        </TableCell>
                                    ))}
                                    {onDelete && (
                                        <TableCell className="text-center">
                                            <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                                                Deletar
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
