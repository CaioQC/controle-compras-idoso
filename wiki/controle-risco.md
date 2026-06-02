# Controle de Risco - Ações de Controle Baseadas em Teste

## Ações de Controle para Modos de Falha

### T1 - Teste de Validação de Credenciais Inválidas
**Modo de Falha Controlado:** F1 - Usuário consegue fazer login com credenciais inválidas

**Descrição Sucinta do Teste:**
Validar que o sistema bloqueia o acesso quando credenciais inválidas são fornecidas. O teste verifica se a mensagem de erro apropriada é exibida e o usuário não é redirecionado para a tela principal.

**Procedimento:**
1. Acessar a tela de login
2. Informar e-mail inválido ou inexistente
3. Informar senha incorreta
4. Clicar em "Entrar"
5. Verificar se mensagem de erro é exibida
6. Verificar se usuário permanece na tela de login

**Resultado Esperado:** Acesso negado com mensagem de erro clara

---

### T2 - Teste de E-mail Único no Cadastro
**Modo de Falha Controlado:** F2 - Sistema permite cadastro com e-mail duplicado

**Descrição Sucinta do Teste:**
Validar que o sistema impede o cadastro de um novo usuário com um e-mail que já existe no banco de dados. O teste verifica se a mensagem de erro apropriada é exibida.

**Procedimento:**
1. Acessar a tela de cadastro
2. Preencher formulário com e-mail já existente (ex: admin@familia.com)
3. Preencher outros campos corretamente
4. Clicar em "Criar Conta"
5. Verificar se mensagem "E-mail já cadastrado" é exibida
6. Verificar se novo usuário não foi criado

**Resultado Esperado:** Cadastro rejeitado com mensagem de erro

---

### T3 - Teste de Campos Obrigatórios no Cadastro de Item
**Modo de Falha Controlado:** F3 - Item é salvo sem preencher campos obrigatórios

**Descrição Sucinta do Teste:**
Validar que o sistema exibe mensagens de erro quando campos obrigatórios não são preenchidos. O teste verifica cada campo individualmente.

**Procedimento:**
1. Acessar tela de cadastro de item
2. Deixar campo "Nome do item" vazio
3. Clicar em "Salvar Item"
4. Verificar se mensagem de erro aparece abaixo do campo
5. Repetir para campos "Nome do idoso" e "Familiar responsável"

**Resultado Esperado:** Mensagens de erro individuais para cada campo vazio

---

### T4 - Teste de Validação de Senha na Exclusão de Conta
**Modo de Falha Controlado:** F4 - Conta é deletada sem confirmar a senha

**Descrição Sucinta do Teste:**
Validar que o sistema exige a confirmação de senha antes de deletar a conta. O teste verifica se a exclusão é bloqueada com senha incorreta.

**Procedimento:**
1. Fazer login com usuário de teste
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Informar senha incorreta no modal
5. Clicar em "Confirmar Exclusão"
6. Verificar se mensagem de erro é exibida
7. Verificar se conta não foi deletada

**Resultado Esperado:** Exclusão bloqueada com mensagem de erro

---

### T5 - Teste de Persistência de Dados no LocalStorage
**Modo de Falha Controlado:** F5 - Dados do usuário são perdidos após logout

**Descrição Sucinta do Teste:**
Validar que os dados do usuário são salvos no localStorage e recuperados após logout/login. O teste verifica se as informações persistem.

**Procedimento:**
1. Fazer login com usuário
2. Adicionar itens à lista
3. Fazer logout
4. Fazer login novamente
5. Verificar se itens adicionados ainda estão na lista
6. Verificar se dados do usuário foram recuperados

**Resultado Esperado:** Dados persistem após logout/login

---

### TF1 - Teste de Autenticação em Rota Protegida
**Modo de Falha Controlado:** F6 - Usuário consegue acessar tela de configurações sem estar logado

**Descrição Sucinta do Teste:**
Validar que usuários não autenticados não conseguem acessar rotas protegidas. O teste tenta acessar a página de configurações sem estar logado.

**Procedimento:**
1. Abrir navegador em modo incógnito
2. Tentar acessar URL da página de configurações diretamente
3. Verificar se usuário é redirecionado para login
4. Verificar se página de configurações não é carregada

**Resultado Esperado:** Redirecionamento para tela de login

---

### TF2 - Teste de Atualização de Status de Item
**Modo de Falha Controlado:** F7 - Item não é marcado como comprado quando clicado

**Descrição Sucinta do Teste:**
Validar que o status de um item é atualizado corretamente quando o usuário clica no botão "Comprado". O teste verifica se o item é movido para o histórico.

**Procedimento:**
1. Fazer login
2. Adicionar um item à lista
3. Clicar no botão "✓ Comprado" do item
4. Verificar se item desaparece da aba "Pendentes"
5. Verificar se item aparece na aba "Histórico"

**Resultado Esperado:** Item movido para histórico com sucesso

---

### TF3 - Teste de Comprimento Mínimo de Senha
**Modo de Falha Controlado:** F8 - Sistema aceita senha com menos de 6 caracteres

**Descrição Sucinta do Teste:**
Validar que o sistema rejeita senhas com menos de 6 caracteres durante o cadastro. O teste tenta criar uma conta com senha curta.

**Procedimento:**
1. Acessar tela de cadastro
2. Preencher formulário com senha de 5 caracteres
3. Clicar em "Criar Conta"
4. Verificar se mensagem de erro é exibida
5. Verificar se conta não foi criada

**Resultado Esperado:** Cadastro rejeitado com mensagem de erro

---

### TF4 - Teste de Exclusão Permanente de Conta
**Modo de Falha Controlado:** F9 - Usuário consegue fazer login após exclusão da conta

**Descrição Sucinta do Teste:**
Validar que após a exclusão de uma conta, o usuário não consegue mais fazer login com aquelas credenciais. O teste verifica se a exclusão foi permanente.

**Procedimento:**
1. Fazer login com usuário de teste
2. Acessar configurações
3. Clicar em "Excluir Minha Conta"
4. Informar senha correta
5. Confirmar exclusão
6. Tentar fazer login novamente com mesmas credenciais
7. Verificar se acesso é negado

**Resultado Esperado:** Acesso negado após exclusão

---

### TF5 - Teste de Aviso de Irreversibilidade na Exclusão
**Modo de Falha Controlado:** F10 - Sistema não exibe aviso antes de excluir conta

**Descrição Sucinta do Teste:**
Validar que o sistema exibe um aviso claro informando que a exclusão de conta é irreversível antes de permitir a ação. O teste verifica se o modal de confirmação contém o aviso.

**Procedimento:**
1. Fazer login
2. Acessar configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal aparece
5. Verificar se texto contém palavra "irreversível"
6. Verificar se há opção de cancelar

**Resultado Esperado:** Modal com aviso de irreversibilidade é exibido

---

## Resumo das Ações de Controle

| ID | Tipo | Modo de Falha | Status |
|---|---|---|---|
| T1 | Teste de Aceite | F1 | Implementado |
| T2 | Teste de Aceite | F2 | Implementado |
| T3 | Teste de Aceite | F3 | Implementado |
| T4 | Teste de Aceite | F4 | Implementado |
| T5 | Teste de Aceite | F5 | Implementado |
| TF1 | Teste de Controle | F6 | Implementado |
| TF2 | Teste de Controle | F7 | Implementado |
| TF3 | Teste de Controle | F8 | Implementado |
| TF4 | Teste de Controle | F9 | Implementado |
| TF5 | Teste de Controle | F10 | Implementado |

Todas as ações de controle foram implementadas através de testes automatizados no Robot Framework.
