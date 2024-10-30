# Projeto de Teste Técnico - Processo Seletivo dti digital

Este projeto foi desenvolvido como parte do processo seletivo para a dti digital. Ele implementa uma aplicação full-stack que permite a realização do cadastramento, visualização e gerenciamento de alunos. Projeto este que foi realizado no prazo de dois dias.

## Como executar

### Executando localmente

#### Pré-requisitos

- Node.js 20 ou superior
- Yarn
- Python 3.10 ou superior

#### Instruções

1. Clone o repositório:

```bash
git clone https://github.com/Lusqinha/dti-digital-pratica.git

cd dti-digital-pratica
```

2. Crie um ambiente virtual e instale as dependências do backend:

Windows:
```bash
python -m venv env

source env/bin/activate
```

Linux:
```bash
python3 -m venv env

source env/bin/activate
```


```bash
pip install -r backend/requirements.txt
```
4. Execute as migrações do banco de dados:

```bash
python backend/manage.py migrate
```

5. Inicie o servidor do backend:

```bash
python backend/manage.py runserver
```

6. Em outro terminal, instale as dependências do frontend e inicie o servidor:

```bash
cd student-manager

yarn install

yarn dev
```

7. Acesse a aplicação no navegador:

- [http://localhost:3000](http://localhost:3000) para acessar o frontend
- [http://localhost:8000](http://localhost:8000) para acessar o backend

### Executando com Docker

#### Pré-requisitos

- Docker

#### Instruções

1. Clone o repositório:

```bash
git clone https://github.com/Lusqinha/dti-digital-pratica.git

cd dti-digital-pratica
```

2. Execute o comando para subir os containers:

```bash
docker build -t dti-digital-pratica .

docker run -p 8000:8000 -p 3000:3000 dti-digital-pratica -d
```

3. Acesse a aplicação no navegador:

- [http://localhost:3000](http://localhost:3000) para acessar o frontend
- [http://localhost:8000](http://localhost:8000) para acessar o backend




## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Python](https://www.python.org/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)

Escolhi utilizar o Django Rest Framework para o backend por ser um framework robusto e que fornece uma documentação nativa para a API e possui uma grande comunidade de desenvolvedores. Já para o frontend, escolhi o Next.js junto da biblioteca gáfica shadcn para a criação de interfaces de usuário, por ser uma ferramenta que facilita a criação de aplicações web e por estar em alta, possui um ótimo suporte.

## Decisões de projeto	


- Decidi definir a interface de cadastro principal com inputs maiores pensando em facilitar a usabilidade no caso de Carlos ter dificuldades visuais.

- A utilização de SQLite como banco de dados para este projeto se deu pela sua versatilidade, leveza e velocidade de implementação. Ainda mais por se tratar de um projeto que será executado localmente com baixo volume de tráfego de dados.

- Para facilitar a visualização dos dados, todas a principais informações dos alunos são exibidas na tela principal, evitando a necessidade de navegação entre páginas para visualizar os dados mais acessados.

- 


## Premissas assumidas

- Presumisse que a aplicação seria utilizada apenas por Carlos localmente, por isso não foi implementado um sistema de autenticação.

- Em um primeiro momento, presumi que todos os alunos cadastrados por Carlos seriam de uma única turma, por isso não foi implementado um sistema de turmas.

- Presume-se que por ser mantido localmente, não seria necessário uma database robusta exectando em paralelo.

- Presume-se que Carlos não teria muitos alunos para gerenciar, por isso não foi implementado um sistema de paginação.

## Melhorias futuras

- Meu próximo passo seria implementar um sistema de turmas, para que pudesse separar os alunos por turmas e facilitar a visualização e gerenciamento.

- Seria pertinente a implementação de um sistema de "chamadas" para que Carlos pudesse marcar a presença dos alunos e gerar relatórios de presença ao fim de certo período letivo.

- Adicionar ao sistema uma etapa de autenticação para garantir a segurança e separar os alunos entre outros usuários além do Carlos.

- Migrar o banco de dados para um banco de dados mais robusto, como o PostgreSQL, para garantir a escalabilidade da aplicação no caso de um aumento no volume de dados.





