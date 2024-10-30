import { registrarAlunoCompleto, getDisciplinas, addDisciplina } from "@/lib/utilsapi";
import { Disciplina } from "@/types/endpoints";
import { SquareNumInput } from '@/components/cadastro/numeroinput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from "react";
import Layout from '@/pages/layout';
import { toast } from "sonner";

export default function Cadastro(): React.ReactElement {
    const [alunoNome, setAlunoNome] = useState("");
    const [notas, setNotas] = useState<{ [key: number]: number }>({});
    const [frequencia, setFrequencia] = useState(0);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [disciplinaNome, setDisciplinaNome] = useState("");

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await getDisciplinas();
                setDisciplinas(response);
            } catch (error) {
                console.error("Erro ao buscar disciplinas:", error);
                toast("Erro ao buscar disciplinas.");
            }
        };

        fetchDisciplinas();
    }, []);

    const handleNotaChange = (disciplinaId: number, valor: number) => {
        setNotas(prev => ({ ...prev, [disciplinaId]: valor }));
    };

    const handleSubmitAluno = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const alunoData = {
                aluno: alunoNome,
                notas,
                frequencia,
            };

            await registrarAlunoCompleto(alunoData);
            toast("Aluno salvo com sucesso.");

            setAlunoNome("");
            setNotas({});
            setFrequencia(0);
        } catch (error) {
            console.error("Erro ao salvar o aluno:", error);
            toast("Erro ao salvar o aluno.");
        }
    };

    const handleSubmitDisciplina = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const disciplinaData: Disciplina = {
                nome: disciplinaNome.toUpperCase(),
            };

            await addDisciplina(disciplinaData);


            toast("Disciplina salva com sucesso.");

            setDisciplinaNome("");

            const updatedDisciplinas = await getDisciplinas();

            setDisciplinas(updatedDisciplinas);

        } catch (error) {
            console.error("Erro ao salvar a disciplina:", error);
            toast("Erro ao salvar a disciplina.");
        }
    };

    return (
        <Layout>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 m-auto w-11/12">
                <form onSubmit={handleSubmitAluno} className="m-auto flex flex-col justify-center items-center gap-12 md:border rounded-lg w-full py-10 ">
                    <div className="flex flex-col max-w-sm items-center w-full px-2 md:px-0">
                        <Label className="text-2xl text-start font-bold" htmlFor="aluno-nome">ALUNO</Label>
                        <Input
                            className="text-center w-full h-10 text-2xl font-bold uppercase bg-black/25"
                            id="aluno-nome"
                            name="aluno-nome"
                            type="text"
                            placeholder="Ex.: João da Silva"
                            value={alunoNome}
                            onChange={(e) => setAlunoNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6 w-full h-full md:px-10">
                        {disciplinas.map((disciplina) => (
                            <SquareNumInput
                                key={disciplina.id}
                                min={0}
                                max={10}
                                id={`notas-${disciplina.id}`}
                                label={disciplina.nome.toUpperCase()}
                                value={disciplina.id !== undefined ? notas[disciplina.id] || "" : ""}
                                onChange={(value) => disciplina.id !== undefined && handleNotaChange(disciplina.id, Number(value))}
                            />
                        ))}
                        <SquareNumInput
                            min={0}
                            max={100}
                            id="frequencia"
                            label="FREQUÊNCIA"
                            className="text-4xl border-yellow-500"
                            value={frequencia || ""}
                            onChange={(value) => setFrequencia(Number(value))}
                        />
                    </div>

                    <div className="flex gap-5 flex-col justify-center items-center">
                        <Button type="submit" size="lg" className="text-xl font-semibold" variant="outline">
                            Salvar
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmitAluno(e);
                                setAlunoNome("");
                                setNotas({});
                                setFrequencia(0);
                            }}
                            size="lg"
                            className="text-xl font-semibold"
                            variant="outline"
                        >
                            Salvar e Adicionar Outro
                        </Button>
                    </div>
                </form>

                <form onSubmit={handleSubmitDisciplina} className="w-full m-auto h-full flex flex-col justify-center items-center gap-6 md:border rounded-lg py-6">
                    <div className="flex flex-col max-w-sm items-center w-full px-2 md:px-5">
                        <Label className="text-2xl text-start font-bold" htmlFor="disciplina-nome">DISCIPLINA</Label>
                        <Input
                            className="text-center w-full h-10 text-2xl font-bold uppercase bg-black/25"
                            id="disciplina-nome"
                            name="disciplina-nome"
                            type="text"
                            placeholder="Ex.: Matemática"
                            value={disciplinaNome}
                            onChange={(e) => setDisciplinaNome(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" size="lg" className="text-xl font-semibold" variant="outline">
                        Salvar Disciplina
                    </Button>
                </form>
            </div>
        </Layout>
    );
}
