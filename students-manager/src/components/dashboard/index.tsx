import { getAlunosBaixaFrequencia, getMediaGeral, getAlunosAcimaMedia, getAlunos, getMediaGeralPorDisciplina  } from "@/lib/utilsapi";
import { Aluno, MediaGeral, MediaGeralPorDisciplina } from "@/types/endpoints";
import { TrendingUp, User, ClockAlert, Album, Ruler } from "lucide-react";
import { DashContentCard } from "@/components/dashboard/card/contentcard";
import { DashCard } from "@/components/dashboard/card/dashcard";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Dashboard(): React.ReactElement {
  const [alunosAcimaMedia, setalunosAcimaMedia] = useState<Aluno[]>([]);
  const [alunosBaixaFrequencia, setalunosBaixaFrequencia] = useState<Aluno[]>([]);
  const [mediaGeralPorDisciplina, setMediaGeralPorDisciplina] = useState<MediaGeralPorDisciplina>({});
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [mediaGeral, setMediaGeral] = useState<MediaGeral>();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const mediaGeralPorDisciplinaResponse = await getMediaGeralPorDisciplina();
        const frequenciaResponse = await getAlunosBaixaFrequencia();
        const acimaMediaResponse = await getAlunosAcimaMedia();
        const mediaGeralResponse = await getMediaGeral();
        const alunosResponse = await getAlunos();

        setMediaGeralPorDisciplina(mediaGeralPorDisciplinaResponse);
        setalunosBaixaFrequencia(frequenciaResponse);
        setalunosAcimaMedia(acimaMediaResponse);
        setMediaGeral(mediaGeralResponse); 
        setAlunos(alunosResponse);

      } catch (error) {
        toast('Erro ao buscar dados do dashboard');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-svh xl:w-3/4 mx-auto flex flex-col items-center">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-3 p-5 w-full">
        <DashCard
          titulo="Média Geral da Turma"
          valor={mediaGeral?.media_geral}
          icone={<Ruler className="w-5 h-5" />}
          descricao="Média geral entre todas as disciplinas"  
        />
        <DashCard
          titulo="Alunos Acima da Média"
          valor={alunosAcimaMedia.length} 
          icone={<TrendingUp className="w-5 h-5" />}
          descricao={`Alunos com notas acima da média de: ${mediaGeral?.media_geral}`}
          valorClassName="text-green-600"
        />
        <DashCard
          titulo="Alunos infrequentes"
          valor={alunosBaixaFrequencia.length} 
          icone={<ClockAlert className="w-5 h-5" />}
          descricao="Alunos com frequência abaixo de 75%"
          valorClassName="text-red-600"
        />
        <DashCard
          titulo="Alunos cadastrados"
          valor={alunos.length} 
          icone={<ClockAlert className="w-5 h-5" />}
          descricao="Alunos com frequência abaixo de 75%"
          valorClassName="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full p-5">
        <DashContentCard
          titulo="Alunos com Notas Acima da Média"
          descricao="Alunos com notas acima da média"
          icone={<TrendingUp className="w-5 h-5" />}
        >
          <ul className="space-y-2">
            {alunosAcimaMedia.map(aluno => (
              <li key={aluno.id} className="flex justify-between items-center bg-[#2d2d2d]/50 p-2 rounded-md hover:bg-[#2d2d2d]/25">
                <div className="flex justify-center items-center">
                  <User className="w-5 h-5 mr-5" />
                  <span className="text-lg font-bold">{aluno.nome.toUpperCase()}</span>
                </div>
                <Badge variant="default" className="font-semibold text-lg bg-green-600/50">
                  {aluno.media_notas?.toFixed(1)}
                </Badge>
              </li>
            ))}
          </ul>
        </DashContentCard>

        <DashContentCard
          titulo="Alunos Infrequentes"
          descricao="Alunos com frequência abaixo de 75%"
          icone={<ClockAlert className="w-5 h-5" />}
        >
          <ul className="space-y-2">
            {alunosBaixaFrequencia.map(aluno => (
              <li key={aluno.id} className="flex justify-between items-center bg-[#2d2d2d]/50 p-2 rounded-md hover:bg-[#2d2d2d]/25">
                <div className="flex justify-center items-center">
                  <User className="w-5 h-5 mr-5" />
                  <span className="text-lg font-bold">{aluno.nome.toUpperCase()}</span>
                </div>
                <Badge variant="destructive" className="font-semibold text-lg">
                  {aluno.media_frequencia}%
                </Badge>
              </li>
            ))}
          </ul>
        </DashContentCard>
      </div>

      <div className="w-full p-5 ">
        <DashContentCard
          titulo="Média da turma por Disciplina"
          descricao="Média da turma por disciplina"
          icone={<Ruler className="w-5 h-5" />
          }
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {Object.entries(mediaGeralPorDisciplina).map(([disciplina, media]) => (
              <DashCard
                key={disciplina}
                titulo={disciplina}
                valor={media.toFixed(1)}
                icone={<Album className="w-5 h-5" />}
                valorClassName="text-center "
              />
            ))}
          </ul>
          
        </DashContentCard>

      </div>
    </div>
  );
}

export default Dashboard;
