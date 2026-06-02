# Minhas Contribuições no Projeto - Sistema de Controle de Compras para Idosos

Oi professor! Aqui está um resumo de tudo que fiz no projeto durante a disciplina de Teste de Software.

---

## 📱 O que fiz no Frontend (React + Vite)

### Tela de Login
- Criei a tela de login com um design inspirado na aplicação "Família Cares"
- Melhorei a experiência do usuário mostrando erros inline (sem aqueles alerts chatos)
- Adicionei validação básica dos campos

### Tela de Cadastro de Itens
- Implementei a tela onde o usuário pode adicionar itens à lista de compras
- Adicionei validação por campo (cada campo obrigatório mostra seu próprio erro)
- Removi aqueles emojis dos placeholders que estavam estranhos
- Coloquei ícones dentro dos campos de input para ficar mais bonito

### Página de Configurações (Nova!)
- Criei uma página de configurações com opções para o usuário
- Adicionei um botão "Voltar" para navegar de volta à tela principal
- Implementei a funcionalidade de excluir conta com validação de senha

### Novas Páginas de Gerenciamento
- **Gerenciar Idosos:** Página para cadastrar, visualizar e deletar idosos assistidos
- **Gerenciar Categorias:** Página para gerenciar categorias de itens (mercado, farmácia, etc.)

### Melhorias Visuais Gerais
- Removi aquele contorno azul chato do botão de visualizar senha
- Adicionei imagens de fundo para login e dashboard
- Melhorei o design geral da aplicação para ficar mais consistente
- Adicionei alertas na página de lista para melhor feedback ao usuário

---

## 🧪 Testes Automatizados (Robot Framework)

### Testes do Cadastro de Itens (HDU-2)
Criei testes automatizados para validar:
- Salvar item sem preencher nenhum campo
- Salvar item sem informar o nome do idoso
- Salvar item sem informar o familiar responsável
- Cadastro de item com sucesso

### Testes de Exclusão de Conta (US-010) - NOVO!
Implementei uma suíte completa com 5 casos de teste:
1. **Criar usuário de teste** - Setup para os outros testes
2. **Aviso de irreversibilidade** - Verifica se o sistema avisa que a exclusão é permanente
3. **Confirmar com senha incorreta** - Testa se o sistema bloqueia com senha errada
4. **Cancelar exclusão** - Verifica se a conta é mantida ao cancelar
5. **Excluir conta com sucesso** - Testa a exclusão real da conta

**Status:** ✅ Todos os 5 testes passando!

---

## 🔧 Organização do Código de Testes

- Centralizei todas as keywords (funções reutilizáveis) em um arquivo chamado `keywords.py`
- Criei 20+ keywords específicas para automação dos testes
- Desabilitei aqueles logs de erro do Selenium/Chrome para deixar a saída dos testes limpa
- Configurei o Suite Setup/Teardown para manter a sessão do navegador entre testes

---

## 📝 Documentação

### README Principal
- Documentei toda a estrutura do projeto
- Expliquei como rodar o projeto (frontend, backend e tudo junto)
- Listei todas as histórias de usuário (HdU 01, 02, 03, 04)
- Documentei todos os casos de teste com a convenção CT-[HdU]-[número]

### README de Testes
- Criei documentação específica para os testes Robot Framework
- Expliquei como instalar as dependências
- Mostrei como executar os testes

### Scripts de Execução
- Criei `start-all.bat` (para Windows)
- Criei `start-all.sh` (para Linux/Mac)
- Esses scripts facilitam rodar o projeto inteiro com um único comando

---

## 🎯 Casos de Teste Documentados

### HdU 01 - Login de Familiar (3 testes)
- Login com campos vazios
- Login com credenciais inválidas
- Login com sucesso

### HdU 02 - Cadastro de Novo Item (4 testes)
- Salvar item sem preencher nenhum campo
- Salvar item sem informar o nome do idoso
- Salvar item sem informar o familiar responsável
- Cadastro de item com sucesso

### HdU 03 - Atualização de Status (2 testes)
- Marcar item como comprado
- Arquivar item comprado

### HdU 04 - Cadastro de Novo Usuário (3 testes)
- Cadastro com campos obrigatórios vazios
- Cadastro com e-mail já existente
- Cadastro com sucesso

### US-010 - Excluir Conta e Dados Permanentemente (5 testes)
- Criar usuário de teste
- Aviso de irreversibilidade
- Confirmar com senha incorreta
- Cancelar exclusão de conta
- Excluir conta com sucesso

---

## 💡 Tecnologias que Usei

- **React 18** - Para criar a interface
- **Vite** - Para compilar o projeto rápido
- **CSS** - Para estilizar tudo
- **LocalStorage** - Para guardar dados do usuário
- **Robot Framework** - Para automação dos testes
- **SeleniumLibrary** - Para controlar o navegador nos testes
- **Python** - Para criar as keywords customizadas

---

## 🚀 Como Rodar os Testes

### Pré-requisitos
- Python 3.x instalado
- Robot Framework (`pip install robotframework`)
- SeleniumLibrary (`pip install robotframework-seleniumlibrary`)
- Chrome/Chromium instalado

### Executar os testes de exclusão de conta
```bash
cd tests/robot
robot us010.robot
```

### Executar os testes de cadastro de itens
```bash
cd tests/robot
robot hdu2_cadastro_item.robot
```

---

## 📊 Resumo do que foi Entregue

✅ **Frontend completo** com todas as páginas e funcionalidades
✅ **Testes automatizados** para validar o sistema
✅ **Documentação clara** de como usar e testar
✅ **Código organizado** e fácil de manter
✅ **Scripts de execução** para facilitar a vida
✅ **Validações** em todos os formulários
✅ **Design melhorado** e mais intuitivo

---

## 🎓 O que Aprendi

Nesse projeto, aprendi na prática:
- Como criar testes automatizados com Robot Framework
- A importância de validar dados nos formulários
- Como organizar código reutilizável (keywords)
- A importância de documentação clara
- Como trabalhar com localStorage no React
- Boas práticas de UI/UX

Valeu pela oportunidade de trabalhar nesse projeto! 🚀
