from sistema_notas.views import AlunoViewSet, DisciplinaViewSet, NotaViewSet, FrequenciaViewSet, InsercaoCompleta
from django.urls.resolvers import URLResolver
from django.urls import path, include
from rest_framework import routers
from django.contrib import admin

router = routers.DefaultRouter()

router.register(r'alunos', AlunoViewSet)
router.register(r'disciplinas', DisciplinaViewSet)
router.register(r'notas', NotaViewSet)
router.register(r'frequencias', FrequenciaViewSet)

urlpatterns: list[URLResolver] = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
    path('utils/registro_completo', InsercaoCompleta, name='registro_completo'),
]
