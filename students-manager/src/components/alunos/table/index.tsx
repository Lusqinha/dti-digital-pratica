import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAlunos, getNotas, deleteAluno, getDisciplinas } from "@/lib/utilsapi";
import { Aluno, Disciplina, Nota } from "@/types/endpoints";
import { toast } from "sonner";

export function DashAlunosTable(): React.ReactElement {
    const [dadosAlunos, setDadosAlunos] = useState<Aluno[]>([]);
    const [notas, setNotas] = useState<Nota[]>([]);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [alunos, notasData, disciplinasData] = await Promise.all([
                    getAlunos(),
                    getNotas(),
                    getDisciplinas()
                ]);
              
                setDadosAlunos(alunos);
                setNotas(notasData);
                setDisciplinas(disciplinasData);
              
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                toast("Erro ao buscar dados");
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteAluno(id);
            setDadosAlunos((prevAlunos) => prevAlunos.filter(aluno => aluno.id !== id));
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
            toast("Erro ao deletar aluno");
        }
    };

    return (
        <Card className="bg-transparent shadow-xl text-white">
            <CardHeader>
                <CardTitle className="text-xl text-center font-semibold">Notas e Frequência dos Alunos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-gray-400">Nome</TableHead>
                                {disciplinas.map((item) => (
                                    <TableHead key={item.id} className="text-gray-400 text-center">{item.nome.toLowerCase()}</TableHead>
                                ))}
                                  <TableHead className="text-gray-400 text-center">Frequência</TableHead>
                                  <TableHead className="text-gray-400 text-center">Média</TableHead>
                                  <TableHead className="text-gray-400">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dadosAlunos.map((aluno) => {
                              const notasAluno = notas.filter(nota => nota.aluno === aluno.id);
                                console.log(notasAluno[0].nota);
                                const mediaFrequencia = aluno.media_frequencia ?? 0;
                                
                                return (
                                    <TableRow key={aluno.id} className="hover:bg-gray-700/50 transition-colors">
                                        <TableCell className="font-medium">{aluno.nome}</TableCell>
                                        
                                        {notasAluno.map((nota, i) => (
                                            <TableCell key={nota.id} className="text-center text-xl">
                                            {nota.nota}
                                            </TableCell>
                                        ))}
                                    
                                        <TableCell className="text-xl text-center font-extrabold text-yellow-500">
                                            {`${mediaFrequencia}%`}
                                       </TableCell>
                                        <TableCell className="text-xl text-center font-extrabold text-yellow-500">
                                          {aluno.media_notas}   
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDelete(aluno.id)}>Deletar</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
