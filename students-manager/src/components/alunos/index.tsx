import { DashAlunosTable } from "@/components/alunos/table"
import { DashTable } from "./table/viewtable"
import { getDisciplinas, deleteDisciplina } from "@/lib/utilsapi";
import { Disciplina } from "@/types/endpoints";

export function AlunosView() { 

    return (

            <div className="flex flex-col items-center justify-center">
            <div className="w-3/4 h-full my-5">
                <DashAlunosTable />
            </div>
            <div className="w-3/4 h-full">

                <DashTable<Disciplina>
                    title="Lista de Disciplinas"
                    dataFetcher={getDisciplinas}
                    columns={[
                        { header: "ID", key: "id" },
                        { header: "Nome", key: "nome" }
                    ]}
                    onDelete={deleteDisciplina}
                    />
            </div>
            </div>

    )
}