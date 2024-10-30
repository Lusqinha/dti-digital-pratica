from sistema_notas.models import Aluno, Disciplina, Nota, Frequencia
from rest_framework import serializers

class AlunoSerializer(serializers.ModelSerializer):
    
    media = serializers.FloatField(source='calcular_media', read_only=True)
    
    class Meta:
        model = Aluno
        fields = '__all__'
        
class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = '__all__'

class FrequenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequencia
        fields = '__all__'