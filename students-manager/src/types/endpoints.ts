

export interface Aluno {
  id: number;          
  nome: string;       
  media_notas?: number;
  media_frequencia?: number;
}

export interface Disciplina {
  id?: number;          
  nome: string;        
}


export interface Nota {
    id: number;
    aluno: number;       
    disciplina: number;
    nota: number;
}

export interface Frequencia {
    id: number;
    aluno: number;
    data: string;
    presente: boolean;  

}

export interface MediaGeral {
    media_geral: number;
}

export interface MediaGeralPorDisciplina {
    [disciplina: string]: number;
}

export interface RegistroCompletoData {
  aluno: string;
  notas: Record<string, number>;
  frequencia: number;
}