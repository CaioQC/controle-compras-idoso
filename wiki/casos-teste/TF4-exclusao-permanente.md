# TF4 - Exclusão Permanente de Conta

**ID:** TF4  
**Título:** Exclusão Permanente de Conta  
**Tipo:** Teste de Controle de Falha  
**Técnica:** Tabela de Decisão  
**Requisito(s) Relacionado(s):** R9  
**Modo(s) de Falha Controlado(s):** F9  

---

## Objetivo
Validar que após a exclusão de uma conta, o usuário não consegue mais fazer login com aquelas credenciais, confirmando que a exclusão foi permanente.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário deve estar autenticado com credenciais válidas
- Usuário deve estar na página de configurações
- Modal de exclusão de conta deve estar acessível

---

## Tabela de Decisão

| Condição / Regra | CT01 | CT02 | CT03 | CT04 |
|---|---|---|---|---|
| R1 — Usuário logado | S | S | N | S |
| R2 — Modal exibido | S | S | - | S |
| R3 — Senha correta informada | S | N | - | S |
| R4 — Confirmação realizada | S | S | - | S |
| Resultado esperado | Conta deletada | Erro de senha | Redirecionado | Conta deletada |
| Login posterior | Bloqueado | Permitido | - | Bloqueado |

---

## Casos de Teste Derivados

### CT01 - Exclusão com Senha Correta

**Condições:** Usuário logado, Modal exibido, Senha correta

**Passos:**
1. Fazer login com usuário de teste (email: teste@exclusao.com, senha: Teste123@)
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal de confirmação aparece
5. Preencher campo de senha com a senha correta
6. Clicar em "Confirmar Exclusão"
7. Aguardar 2 segundos
8. Verificar redirecionamento para tela de login
9. Tentar fazer login novamente com mesmas credenciais
10. Verificar se acesso é negado

**Resultado Esperado:**
- ✅ Conta é deletada permanentemente
- ✅ Usuário é redirecionado para tela de login
- ✅ Mensagem de sucesso é exibida
- ✅ Login com credenciais anteriores é bloqueado
- ✅ Mensagem "Acesso Negado" é exibida ao tentar login

---

### CT02 - Tentativa de Login Após Exclusão

**Condições:** Conta deletada, Tentativa de login com credenciais anteriores

**Passos:**
1. Após executar CT01
2. Estar na tela de login
3. Preencher e-mail com credenciais da conta deletada
4. Preencher senha com credenciais da conta deletada
5. Clicar em "Entrar"
6. Aguardar resposta do sistema

**Resultado Esperado:**
- ✅ Mensagem de erro "Acesso Negado: Familiar não identificado ou senha incorreta!" é exibida
- ✅ Usuário permanece na tela de login
- ✅ Nenhum redirecionamento ocorre
- ✅ Conta não é recuperada

---

### CT03 - Verificação de Dados Deletados

**Condições:** Conta deletada

**Passos:**
1. Após executar CT01 e CT02
2. Abrir console do navegador (F12)
3. Verificar localStorage
4. Procurar por dados da conta deletada
5. Verificar se dados foram removidos completamente

**Resultado Esperado:**
- ✅ Dados do usuário não existem mais no localStorage
- ✅ Dados não podem ser recuperados
- ✅ Nenhum rastro da conta permanece
- ✅ Exclusão foi permanente

---

### CT04 - Novo Cadastro com E-mail Anterior

**Condições:** Conta deletada, Tentativa de cadastro com mesmo e-mail

**Passos:**
1. Após executar CT01
2. Acessar tela de cadastro
3. Preencher nome com novo valor
4. Preencher e-mail com o e-mail da conta deletada
5. Preencher senha com novo valor
6. Confirmar senha
7. Clicar em "Criar Conta"

**Resultado Esperado:**
- ✅ Novo cadastro é realizado com sucesso
- ✅ E-mail pode ser reutilizado
- ✅ Nova conta é criada com dados diferentes
- ✅ Nenhuma mensagem de erro sobre e-mail duplicado

---

## Resultado Obtido

### CT01 - Exclusão com Senha Correta
- ✅ Conta deletada permanentemente
- ✅ Redirecionamento para tela de login funcionou
- ✅ Mensagem de sucesso exibida
- ✅ Login bloqueado após exclusão

### CT02 - Tentativa de Login Após Exclusão
- ✅ Mensagem de erro exibida
- ✅ Usuário permanece na tela de login
- ✅ Nenhum redirecionamento
- ✅ Conta não foi recuperada

### CT03 - Verificação de Dados Deletados
- ✅ Dados removidos do localStorage
- ✅ Nenhum rastro da conta permanece
- ✅ Exclusão foi permanente e completa

### CT04 - Novo Cadastro com E-mail Anterior
- ✅ Novo cadastro realizado com sucesso
- ✅ E-mail pode ser reutilizado
- ✅ Nova conta criada corretamente
- ✅ Sem conflitos de e-mail

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120. A exclusão de conta é permanente e completa. Dados são removidos do sistema e não podem ser recuperados. E-mail pode ser reutilizado para novo cadastro após exclusão.

---

## Rastreabilidade
- **Requisito R9:** Exclusão de conta deve ser permanente ✅
- **Modo de Falha F9:** Usuário consegue fazer login após exclusão da conta ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
US010-CT05 Excluir conta com sucesso
    [Documentation]    Verifica se a conta é excluída permanentemente
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Digitar Senha Exclusao    ${SENHA_TESTE}
    Confirmar Exclusao
    Verificar Redirecionamento Login
    Tentar Login Com Credenciais Excluidas    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Verificar Mensagem Erro Login
```

**Status de Implementação:** Implementado ✅
