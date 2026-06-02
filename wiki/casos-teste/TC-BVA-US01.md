# TC-BVA-US01: Validação de Limite de Email

## 1. Identificação

| Atributo | Valor |
|----------|-------|
| **ID do Teste** | TC-BVA-US01 |
| **Título** | Validação de Limite de Email |
| **Técnica** | Análise de Valores Limites (BVA) |
| **Requisito** | R2 - Validação de Email |
| **Modo de Falha** | F2 - Email com formato inválido |
| **Prioridade** | Alta |
| **Status** | Ativo |

---

## 2. Objetivo

Validar que o sistema rejeita emails com formato inválido, testando os limites da partição de equivalência de emails válidos. O teste foca em valores limites do formato de email (presença/ausência de caracteres especiais como @ e .).

---

## 3. Pré-condições

- Sistema de autenticação está operacional
- Página de login/cadastro está acessível
- Navegador Chrome está instalado
- Servidor está rodando em `http://localhost:3000`

---

## 4. Dados de Teste

### Partição de Equivalência - Análise de Valores Limites

| Classe | Valor | Formato | Esperado |
|--------|-------|---------|----------|
| Limite Inválido (Sem @) | `emailexemplo.com` | Sem @ | ❌ Rejeitar |
| Limite Inválido (Sem .) | `email@exemplocom` | Sem . | ❌ Rejeitar |
| Limite Válido (Mínimo) | `a@b.co` | Válido mínimo | ✅ Aceitar |
| Valor Típico (Válido) | `usuario@exemplo.com` | Válido típico | ✅ Aceitar |

---

## 5. Passos de Execução

### Passo 1: Acessar a Página de Cadastro
1. Abrir navegador Chrome
2. Navegar para `http://localhost:3000`
3. Clicar no link "Não tem conta? Cadastre-se"
4. **Resultado Esperado:** Formulário de cadastro é exibido

### Passo 2: Preencher Dados Válidos (Exceto Email)
1. Preencher campo "Nome": `Maria Santos`
2. Preencher campo "Senha": `Senha123@`
3. Preencher campo "Confirmar Senha": `Senha123@`
4. **Resultado Esperado:** Campos preenchidos sem erros

### Passo 3: Inserir Email Sem @ (Limite Inválido)
1. Clicar no campo "Email"
2. Digitar: `mariasantosexemplo.com` (sem @)
3. Clicar fora do campo
4. **Resultado Esperado:** Mensagem de erro é exibida indicando formato inválido

### Passo 4: Corrigir para Email Sem . (Limite Inválido)
1. Limpar campo "Email"
2. Digitar: `maria.santos@exemplocom` (sem .)
3. Clicar fora do campo
4. **Resultado Esperado:** Mensagem de erro é exibida indicando formato inválido

### Passo 5: Inserir Email Válido Mínimo
1. Limpar campo "Email"
2. Digitar: `m@e.co` (formato válido mínimo)
3. Clicar fora do campo
4. **Resultado Esperado:** Nenhuma mensagem de erro, campo aceita o valor

### Passo 6: Inserir Email Válido Típico
1. Limpar campo "Email"
2. Digitar: `maria.santos@exemplo.com` (formato válido típico)
3. Clicar fora do campo
4. **Resultado Esperado:** Nenhuma mensagem de erro, campo aceita o valor

### Passo 7: Submeter Formulário
1. Clicar no botão "Cadastrar"
2. **Resultado Esperado:** Cadastro é realizado com sucesso

---

## 6. Resultados Esperados

| Etapa | Resultado Esperado | Resultado Obtido | Status |
|-------|-------------------|------------------|--------|
| Acesso ao cadastro | Formulário exibido | Formulário exibido | ✅ PASS |
| Email sem @ | Erro exibido | Erro exibido | ✅ PASS |
| Email sem . | Erro exibido | Erro exibido | ✅ PASS |
| Email válido mínimo | Sem erro | Sem erro | ✅ PASS |
| Email válido típico | Sem erro | Sem erro | ✅ PASS |
| Submissão com email válido | Cadastro realizado | Cadastro realizado | ✅ PASS |

---

## 7. Critérios de Aceitação

✅ **PASSOU** - O sistema rejeita emails sem @  
✅ **PASSOU** - O sistema rejeita emails sem .  
✅ **PASSOU** - O sistema aceita emails com formato válido  
✅ **PASSOU** - Validação ocorre em tempo real (ao sair do campo)

---

## 8. Observações

- A validação de formato de email é crítica para comunicação
- O teste valida especificamente os limites do formato (presença de @ e .)
- A técnica BVA é apropriada pois testa valores nos limites das partições

---

## 9. Rastreabilidade

| Tipo | ID | Descrição |
|------|----|----|
| Requisito | R2 | Validação de Email |
| Modo de Falha | F2 | Email com formato inválido |
| Técnica | BVA | Análise de Valores Limites |

---

## 10. Automação

### Script Robot Framework

```robot
*** Test Cases ***
TC-BVA-US01 Validação de Limite de Email
    [Documentation]    Valida rejeição de emails com formato inválido
    [Tags]    BVA    Email    Validação
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    Maria Santos
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Preencher Email Cadastro    mariasantosexemplo.com
    Submeter Cadastro
    Verificar Mensagem Erro Email Invalido
    Preencher Email Cadastro    maria.santos@exemplocom
    Submeter Cadastro
    Verificar Mensagem Erro Email Invalido
    Preencher Email Cadastro    maria.santos@exemplo.com
    Submeter Cadastro
    Verificar Redirecionamento Login
```

---

## 11. Conclusão

O teste TC-BVA-US01 valida com sucesso a implementação da validação de formato de email, testando especificamente os valores limites (presença/ausência de @ e .) que definem um email válido.

**Status Final:** ✅ **PASSOU**

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
