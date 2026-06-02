# T4 - Validação de Senha na Exclusão de Conta

**ID:** T4  
**Título:** Validação de Senha na Exclusão de Conta  
**Tipo:** Teste de Aceite  
**Técnica:** Tabela de Decisão  
**Requisito(s) Relacionado(s):** R4  
**Modo(s) de Falha Controlado(s):** F4  

---

## Objetivo
Validar que o sistema exige a confirmação de senha correta antes de permitir a exclusão de conta, bloqueando a exclusão com senha incorreta.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário deve estar autenticado com credenciais válidas
- Usuário deve estar na página de configurações
- Modal de exclusão de conta deve estar visível

---

## Tabela de Decisão

| Usuário Logado | Modal Exibido | Senha Informada | Senha Correta | Resultado Esperado |
|---|---|---|---|---|
| Sim | Sim | Sim | Sim | Exclusão confirmada |
| Sim | Sim | Sim | Não | Erro exibido |
| Sim | Sim | Não | - | Erro exibido |
| Sim | Não | - | - | Modal não aparece |
| Não | - | - | - | Redirecionado para login |

---

## Casos de Teste

### Caso 1: Senha Correta Informada
**Condições:** Usuário logado, Modal exibido, Senha informada = Correta

**Passos:**
1. Fazer login com credenciais válidas
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal de confirmação aparece
5. Preencher campo de senha com a senha correta do usuário
6. Clicar em "Confirmar Exclusão"

**Resultado Esperado:**
- ✅ Conta é deletada permanentemente
- ✅ Usuário é redirecionado para tela de login
- ✅ Mensagem de sucesso é exibida
- ✅ Usuário não consegue fazer login com credenciais anteriores

---

### Caso 2: Senha Incorreta Informada
**Condições:** Usuário logado, Modal exibido, Senha informada = Incorreta

**Passos:**
1. Fazer login com credenciais válidas
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal de confirmação aparece
5. Preencher campo de senha com uma senha incorreta
6. Clicar em "Confirmar Exclusão"

**Resultado Esperado:**
- ✅ Mensagem de erro "Senha incorreta" é exibida
- ✅ Modal permanece aberto
- ✅ Conta não é deletada
- ✅ Usuário permanece logado
- ✅ Campo de senha é limpo ou destacado em vermelho

---

### Caso 3: Campo de Senha Vazio
**Condições:** Usuário logado, Modal exibido, Senha informada = Vazia

**Passos:**
1. Fazer login com credenciais válidas
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal de confirmação aparece
5. Deixar campo de senha vazio
6. Clicar em "Confirmar Exclusão"

**Resultado Esperado:**
- ✅ Mensagem de erro "Campo de senha é obrigatório" é exibida
- ✅ Modal permanece aberto
- ✅ Conta não é deletada
- ✅ Usuário permanece logado

---

### Caso 4: Cancelar Exclusão
**Condições:** Usuário logado, Modal exibido

**Passos:**
1. Fazer login com credenciais válidas
2. Acessar página de configurações
3. Clicar em "Excluir Minha Conta"
4. Verificar se modal de confirmação aparece
5. Clicar em "Cancelar" ou fechar o modal
6. Verificar se modal desaparece

**Resultado Esperado:**
- ✅ Modal é fechado
- ✅ Conta não é deletada
- ✅ Usuário permanece logado
- ✅ Usuário retorna à página de configurações

---

## Resultado Obtido

### Caso 1: Senha Correta
- ✅ Conta deletada permanentemente
- ✅ Redirecionamento para tela de login
- ✅ Mensagem de sucesso exibida
- ✅ Login com credenciais anteriores bloqueado

### Caso 2: Senha Incorreta
- ✅ Mensagem de erro "Senha incorreta" exibida
- ✅ Modal permanece aberto
- ✅ Conta não foi deletada
- ✅ Usuário permanece logado
- ✅ Campo de senha destacado em vermelho

### Caso 3: Campo Vazio
- ✅ Mensagem de erro exibida
- ✅ Modal permanece aberto
- ✅ Conta não foi deletada
- ✅ Usuário permanece logado

### Caso 4: Cancelar Exclusão
- ✅ Modal fechado corretamente
- ✅ Conta não foi deletada
- ✅ Usuário permanece logado
- ✅ Retorno à página de configurações

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120. A validação de senha funciona corretamente. Sistema protege contra exclusão acidental de conta exigindo confirmação de senha.

---

## Rastreabilidade
- **Requisito R4:** Usuário deve confirmar senha antes de excluir conta ✅
- **Modo de Falha F4:** Conta é deletada sem confirmar a senha ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
US010-CT03 Confirmar com senha incorreta
    [Documentation]    Verifica se o sistema bloqueia a exclusão com senha incorreta
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Digitar Senha Exclusao    senha_errada
    Confirmar Exclusao
    Verificar Mensagem Erro Senha
    Cancelar Exclusao
    Realizar Logout
```

**Status de Implementação:** Implementado ✅
