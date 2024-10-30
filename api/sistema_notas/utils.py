from typing import Literal, Dict
from django.db.models.manager import BaseManager
from sistema_notas.models import Aluno, Nota, Frequencia, Disciplina

def media_geral_turma_por_disciplina() -> Dict[str, float]:
    disciplinas: BaseManager[Disciplina] = Disciplina.objects.all()
    medias: dict = {}

    for disciplina in disciplinas:
        notas: BaseManager[Nota] = Nota.objects.filter(disciplina=disciplina)
        
        total_notas: float | Literal[0] = sum(nota.nota for nota in notas)
        quantidade_notas: int = notas.count()
        
        media: float | Literal[0] = total_notas / quantidade_notas if quantidade_notas > 0 else 0
        medias[disciplina.nome] = media

    return medias


def media_geral_turma() -> float | Literal[0]:
    notas: BaseManager[Nota] = Nota.objects.all()
    
    if notas.exists():
        media: float = sum(nota.nota for nota in notas) / notas.count()
        return media
    
    return 0

def alunos_acima_media() -> BaseManager[Aluno]:
    media: float = media_geral_turma()
    alunos: BaseManager[Aluno] = Aluno.objects.filter(media_notas__gt=media)
    
    return alunos


def alunos_baixa_frequencia() -> BaseManager[Aluno]:
    alunos: BaseManager[Aluno] = Aluno.objects.all()
    alunos_baixa_frequencia: list = []

    for aluno in alunos:
        aluno.atualizar_media_frequencia()
        media_frequencia: float = aluno.media_frequencia
        
        if media_frequencia < 75:
            alunos_baixa_frequencia.append(aluno)

    return alunos_baixa_frequencia
    
    
def media_frequencia(aluno_id) -> float | Literal[0]:
    frequencias: BaseManager[Frequencia] = Frequencia.objects.filter(aluno_id=aluno_id)
    
    if frequencias.exists():
        total_frequencias: float | Literal[0] = sum(frequencia.porcentagem for frequencia in frequencias)
        quantidade_frequencias: int = frequencias.count()
        
        media_frequencia: float | Literal[0] = round(total_frequencias / quantidade_frequencias, 1) if quantidade_frequencias > 0 else 0
        return media_frequencia

    return 0
