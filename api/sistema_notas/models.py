from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Aluno(models.Model):
    nome = models.CharField(max_length=100)
    media_notas = models.FloatField(default=0.0)
    media_frequencia = models.FloatField(default=0.0)
    
    def atualizar_media_frequencia(self) -> None:
        frequencias: models.BaseManager[Frequencia] = Frequencia.objects.filter(aluno=self)
        
        if frequencias.exists():
            self.media_frequencia: float = sum(frequencia.porcentagem for frequencia in frequencias) / frequencias.count()
        else:
            self.media_frequencia = 0.0
        self.save(update_fields=["media_frequencia"])
       
    def atualizar_media_notas(self) -> None:
        notas: models.BaseManager[Nota] = Nota.objects.filter(aluno=self)
        
        if notas.exists():
            self.media_notas: float = sum(nota.nota for nota in notas) / notas.count()
        else:
            self.media_notas = 0.0
        self.save(update_fields=["media_notas"])
    
    def __str__(self) -> str:
        return self.nome

class Frequencia(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    porcentagem = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(100.0)])
    
    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)
        self.aluno.atualizar_media_frequencia()
    
    def __str__(self) -> str:
        return f"{self.aluno} | {self.porcentagem:.0f}%"
    
class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.nome
    
class Nota(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    nota = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Atualiza a média de notas do aluno
        self.aluno.atualizar_media_notas()
    
    def __str__(self) -> str:
        return f"{self.aluno} | {self.disciplina}: {self.nota}"
