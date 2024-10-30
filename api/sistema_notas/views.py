from sistema_notas.utils import alunos_acima_media, alunos_baixa_frequencia, media_geral_turma, media_frequencia, media_geral_turma_por_disciplina
from sistema_notas.serializers import AlunoSerializer, DisciplinaSerializer, NotaSerializer, FrequenciaSerializer
from sistema_notas.models import Aluno, Disciplina, Nota, Frequencia
from rest_framework.decorators import action, api_view
from django.db.models.manager import BaseManager
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from typing import Dict

class AlunoViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Aluno] = Aluno.objects.all()
    serializer_class = AlunoSerializer


class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Disciplina] = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer


class FrequenciaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Frequencia] = Frequencia.objects.all()
    serializer_class = FrequenciaSerializer
    
    @action(detail=False, methods=['get'])
    def baixa_frequencia(self, request) -> Response:
        alunos: BaseManager[Aluno] = alunos_baixa_frequencia()
        
        serializer = AlunoSerializer(alunos, many=True)
        
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def media_frequencia(self, request, pk=None) -> Response:
        media: float = media_frequencia(pk)
        
        return Response({
            'aluno_id': pk,
            'aluno_nome': Aluno.objects.get(id=pk).nome,
            'media_frequencia': media
        })


class NotaViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Nota] = Nota.objects.all()
    serializer_class = NotaSerializer
    
    @action(detail=False, methods=['get'])
    def media_geral(self, request) -> Response:
        media: float = media_geral_turma()
        
        media = round(media, 1)
        
        return Response({'media_geral': media})

    @action(detail=False, methods=['get'])
    def media_geral_por_disciplina(self, request) -> Response:
        medias: Dict[str, float] = media_geral_turma_por_disciplina()
        
        return Response(medias)
    
    @action(detail=False, methods=['get'])
    def alunos_acima_media(self, request) -> Response:
        alunos: BaseManager[Aluno] = alunos_acima_media()
        
        serializer = AlunoSerializer(alunos, many=True)
        
        return Response(serializer.data)


@api_view(['POST'])
def InsercaoCompleta(request) -> Response:
    data = request.data
    
    aluno:Aluno; created:bool = Aluno.objects.get_or_create(nome=data['aluno'])
    
    if created:
        aluno = Aluno.objects.get(nome=data['aluno'])

    for disciplina in data['notas']:
        Nota.objects.create(aluno=aluno, nota=data['notas'][disciplina], disciplina=Disciplina.objects.get(id=disciplina))
        

    Frequencia.objects.create(aluno=aluno, porcentagem=data['frequencia'])
    
    return Response({'aluno': aluno.nome, 'aluno_id':aluno.id}, status=status.HTTP_201_CREATED)