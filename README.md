🧩 To-Do List Frontend - Keevo Challenge
Interface web desenvolvida em Angular para o sistema de gerenciamento de tarefas da aplicação To-Do List. Permite ao usuário visualizar, criar, editar, concluir e excluir tarefas de forma simples, rápida e com feedbacks visuais.

Este projeto se conecta à API desenvolvida em .NET Core. Veja o repositório do backend aqui (substitua pelo link real se tiver).

⚙️ Tecnologias utilizadas

-Angular Standalone Components

-TypeScript

-Angular HttpClient

-Angular Forms

-ToastService customizado para feedback

-Exportação para Excel (FileSaver.js)

🧠 Funcionalidades

✅ Listagem de tarefas em cards com visual moderno

✅ Filtro de tarefas por status

✅ Criação de tarefas com título, descrição e status

✅ Edição de tarefas com formulário interativo

✅ Marcação de tarefas como concluídas

✅ Exclusão de tarefas com feedback imediato

✅ Notificações visuais (toasts)

✅ Exportação da lista de tarefas para Excel

✅ Interface responsiva e amigável

✅ Integração com a API .NET (via HttpClient)

🚀 Como executar o projeto
1. Instale as dependências
bash
npm install

2. Execute o servidor de desenvolvimento
bash
ng serve
A aplicação estará disponível em: http://localhost:4200

Certifique-se de que a API backend esteja rodando corretamente (em https://localhost:5235 ou a porta configurada).

🌐 Configuração de ambiente
Se necessário, ajuste a URL da API no serviço responsável pelas requisições HTTP:


// Exemplo: src/app/services/task.service.ts
private apiUrl = 'https://localhost:5235/api/tasks';

Projeto desenvolvido para fins de avaliação técnica. Uso restrito à equipe da Keevo.

👨‍💻 Autor
Desenvolvido por Heron Carlos
LinkedIn | heroncarlos.r6@gmail.com