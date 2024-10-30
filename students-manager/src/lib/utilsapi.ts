import { Aluno, Disciplina, Nota, MediaGeral, RegistroCompletoData } from "@/types/endpoints";
import { apiBaseUrl } from "@/config";

export const getAlunosBaixaFrequencia = async (): Promise<Aluno[]> => {
  const response = await fetch(`${apiBaseUrl}/frequencias/baixa_frequencia/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar alunos com baixa frequência');
  }
  return response.json();
};

export const getNotas = async (): Promise<Nota[]> => {
  const response = await fetch(`${apiBaseUrl}/notas/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar notas dos alunos');
  }
  return response.json();
};

export const getNotasIndividual = async (id: number): Promise<Nota[]> => {
  const response = await fetch(`${apiBaseUrl}/notas/${id}/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar notas do aluno');
  }
  return response.json();
};

export const getMediaGeral = async (): Promise<MediaGeral>=> {
  const response = await fetch(`${apiBaseUrl}/notas/media_geral/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar média geral da turma');
  }
  const data = await response.json();
  return data;
};

export const getMediaGeralPorDisciplina = async (): Promise<Record<string, number>> => {
  const response = await fetch(`${apiBaseUrl}/notas/media_geral_por_disciplina/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar média geral por disciplina');
  }
  return response.json();
};

export const getAlunosAcimaMedia = async (): Promise<Aluno[]> => {
  const response = await fetch(`${apiBaseUrl}/notas/alunos_acima_media/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar alunos acima da média');
  }
  return response.json();
};

export const getAlunos = async (): Promise<Aluno[]> => {
  const response = await fetch(`${apiBaseUrl}/alunos/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar alunos');
  }
  return response.json();
};

export const addAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch(`${apiBaseUrl}/alunos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aluno),
  });

  if (!response.ok) {
    throw new Error('Erro ao adicionar aluno');
  }

  return response.json();
};

export const deleteAluno = async (id: number): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/alunos/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar aluno');
  }
};

export const getDisciplinas = async (): Promise<Disciplina[]> => {
  const response = await fetch(`${apiBaseUrl}/disciplinas/`);
  if (!response.ok) throw new Error("Erro ao buscar disciplinas");
  return response.json();
};

export const addDisciplina = async (disciplina: Disciplina): Promise<Disciplina> => {
  const response = await fetch(`${apiBaseUrl}/disciplinas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(disciplina),
  });

  if (!response.ok) {
    throw new Error('Erro ao adicionar disciplina');
  }

  return response.json();
};

export const deleteDisciplina = async (id: number): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/disciplinas/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar disciplina');
  }
};

export const registrarAlunoCompleto = async (data: RegistroCompletoData): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/utils/registro_completo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao registrar aluno, notas e frequência');
  }
};