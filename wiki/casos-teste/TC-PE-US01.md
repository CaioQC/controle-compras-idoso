# TC-PE-US01: Validação de Partição de Equivalência - Cadastro de Usuário

## 1. Identificação

| Atributo | Valor |
|----------|-------|
| **ID do Teste** | TC-PE-US01 |
| **Título** | Validação de Partição de Equivalência - Cadastro de Usuário |
| **Técnica** | Partição de Equivalência (PE) |
| **Requisito** | R1 - Cadastro de Usuário |
| **Modo de Falha** | F1 - Dados inválidos no cadastro |
| **Prioridade** | Alta |
| **Status** | Ativo |

---

## 2. Objetivo

Validar que o sistema aceita dados válidos e rejeita dados inválidos no cadastro de usuário, utilizando a técnica de Partição de Equivalência para agrupar dados em classes válidas e inválidas.

---

## 3. Pré-condições

- Sistema de autenticação está operacional
- Página de cadastro está acessível
- Navegador Chrome está instalado
- Servidor está rodando em `http://localhost:3000`
- Nenhum usuário com os emails de teste está registrado

---

## 4. Dados de Teste

### Partição de Equivalência

| Classe | Tipo | Dados | Esperado |
|--------|------|-------|----------|
| **Válida** | Dados Completos | Nome: "João Silva", Email: "joao@email.com", Senha: "Senha123@" | ✅ Aceitar |
| **Inválida** | Nome Vazio | Nome: "", Email: "maria@email.com", Senha: "Senha123@" | ❌ Rejeitar |
| **Inválida** | Email Vazio | Nome: "Maria Silva", Email: "", Senha: "Senha123@" | ❌ Rejeitar |
| **Inválida** | Senha Vazia | Nome: "Pedro Costa", Email: "pedro@email.com", Senha: "" | ❌ Rejeitar |
| **Inválida** | Email Inválido | Nome: "Ana Silva", Email: "emailinvalido", Senha: "Senha123@" | ❌ Rejeitar |
| **Inválida** | Senhas Diferentes | Nome: "Carlos", Email: "carlos@email.com", Senha: "Senha123@", Confirmar: "Senha456@" | ❌ Rejeitar |

---

## 5. Passos de Execução

### Passo 1: Acessar a Página de Cadastro
1. Abrir navegador Chrome
2. Navegar para `http://localhost:3000`
3. Clicar no link "Não tem conta? Cadastre-se"
4. **Resultado Esperado:** Formulário de cadastro é exibido

---

### Teste 1: Cadastro com Dados Válidos (Classe Válida)

**Passo 2.1:** Preencher Formulário com Dados Válidos
1. Preencher "Nome": `João Silva`
2. Preencher "Email": `joao.silva@email.com`
3. Preencher "Senha": `Senha123@`
4. Preencher "Confirmar Senha": `Senha123@`
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Cadastro realizado com sucesso, redirecionado para login

---

### Teste 2: Cadastro com Nome Vazio (Classe Inválida)

**Passo 2.2:** Preencher Formulário com Nome Vazio
1. Preencher "Nome": `` (vazio)
2. Preencher "Email": `maria.silva@email.com`
3. Preencher "Senha": `Senha123@`
4. Preencher "Confirmar Senha": `Senha123@`
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Mensagem de erro "Nome é obrigatório"

---

### Teste 3: Cadastro com Email Vazio (Classe Inválida)

**Passo 2.3:** Preencher Formulário com Email Vazio
1. Preencher "Nome": `Pedro Costa`
2. Preencher "Email": `` (vazio)
3. Preencher "Senha": `Senha123@`
4. Preencher "Confirmar Senha": `Senha123@`
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Mensagem de erro "Email é obrigatório"

---

### Teste 4: Cadastro com Senha Vazia (Classe Inválida)

**Passo 2.4:** Preencher Formulário com Senha Vazia
1. Preencher "Nome": `Ana Silva`
2. Preencher "Email": `ana.silva@email.com`
3. Preencher "Senha": `` (vazio)
4. Preencher "Confirmar Senha": `` (vazio)
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Mensagem de erro "Senha é obrigatória"

---

### Teste 5: Cadastro com Email Inválido (Classe Inválida)

**Passo 2.5:** Preencher Formulário com Email Inválido
1. Preencher "Nome": `Carlos Santos`
2. Preencher "Email": `emailinvalido` (sem @)
3. Preencher "Senha": `Senha123@`
4. Preencher "Confirmar Senha": `Senha123@`
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Mensagem de erro "Email inválido"

---

### Teste 6: Cadastro com Senhas Diferentes (Classe Inválida)

**Passo 2.6:** Preencher Formulário com Senhas Diferentes
1. Preencher "Nome": `Lucia Costa`
2. Preencher "Email": `lucia.costa@email.com`
3. Preencher "Senha": `Senha123@`
4. Preencher "Confirmar Senha": `Senha456@` (diferente)
5. Clicar em "Cadastrar"
6. **Resultado Esperado:** Mensagem de erro "Senhas não conferem"

---

## 6. Resultados Esperados

| Teste | Classe | Dados | Resultado Esperado | Resultado Obtido | Status |
|-------|--------|-------|-------------------|------------------|--------|
| 1 | Válida | Dados Completos | Cadastro realizado | Cadastro realizado | ✅ PASS |
| 2 | Inválida | Nome Vazio | Erro exibido | Erro exibido | ✅ PASS |
| 3 | Inválida | Email Vazio | Erro exibido | Erro exibido | ✅ PASS |
| 4 | Inválida | Senha Vazia | Erro exibido | Erro exibido | ✅ PASS |
| 5 | Inválida | Email Inválido | Erro exibido | Erro exibido | ✅ PASS |
| 6 | Inválida | Senhas Diferentes | Erro exibido | Erro exibido | ✅ PASS |

---

## 7. Critérios de Aceitação

✅ **PASSOU** - Sistema aceita dados válidos completos  
✅ **PASSOU** - Sistema rejeita nome vazio  
✅ **PASSOU** - Sistema rejeita email vazio  
✅ **PASSOU** - Sistema rejeita senha vazia  
✅ **PASSOU** - Sistema rejeita email com formato inválido  
✅ **PASSOU** - Sistema rejeita senhas que não conferem

---

## 8. Observações

- A técnica de Partição de Equivalência reduz significativamente o número de testes necessários
- Cada classe (válida/inválida) é testada apenas uma vez, representando todos os valores da classe
- As mensagens de erro são claras e ajudam o usuário a corrigir os dados

---

## 9. Rastreabilidade

| Tipo | ID | Descrição |
|------|----|----|
| Requisito | R1 | Cadastro de Usuário |
| Modo de Falha | F1 | Dados inválidos no cadastro |
| Técnica | PE | Partição de Equivalência |

---

## 10. Automação

### Script Robot Framework

```robot
*** Test Cases ***
TC-PE-US01-01 Cadastro com Dados Válidos
    [Documentation]    Valida cadastro com dados completos e válidos
    [Tags]    PE    Cadastro    Válido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    João Silva
    Preencher Email Cadastro    joao.silva@email.com
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Submeter Cadastro
    Verificar Redirecionamento Login

TC-PE-US01-02 Cadastro com Nome Vazio
    [Documentation]    Valida rejeição de cadastro com nome vazio
    [Tags]    PE    Cadastro    Inválido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Email Cadastro    maria.silva@email.com
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Submeter Cadastro
    Verificar Mensagem Erro Nome Obrigatorio

TC-PE-US01-03 Cadastro com Email Vazio
    [Documentation]    Valida rejeição de cadastro com email vazio
    [Tags]    PE    Cadastro    Inválido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    Pedro Costa
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Submeter Cadastro
    Verificar Mensagem Erro Email Obrigatorio

TC-PE-US01-04 Cadastro com Senha Vazia
    [Documentation]    Valida rejeição de cadastro com senha vazia
    [Tags]    PE    Cadastro    Inválido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    Ana Silva
    Preencher Email Cadastro    ana.silva@email.com
    Submeter Cadastro
    Verificar Mensagem Erro Senha Obrigatoria

TC-PE-US01-05 Cadastro com Email Inválido
    [Documentation]    Valida rejeição de cadastro com email inválido
    [Tags]    PE    Cadastro    Inválido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    Carlos Santos
    Preencher Email Cadastro    emailinvalido
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Submeter Cadastro
    Verificar Mensagem Erro Email Invalido

TC-PE-US01-06 Cadastro com Senhas Diferentes
    [Documentation]    Valida rejeição de cadastro com senhas diferentes
    [Tags]    PE    Cadastro    Inválido
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    Lucia Costa
    Preencher Email Cadastro    lucia.costa@email.com
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha456@
    Submeter Cadastro
    Verificar Mensagem Erro Senhas Diferentes
```

---

## 11. Conclusão

O teste TC-PE-US01 valida com sucesso a implementação da validação de cadastro de usuário, cobrindo tanto a classe válida (dados completos e corretos) quanto as classes inválidas (dados faltantes ou incorretos). A técnica de Partição de Equivalência permite testar eficientemente múltiplos cenários com um número reduzido de testes.

**Status Final:** ✅ **PASSOU**

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
