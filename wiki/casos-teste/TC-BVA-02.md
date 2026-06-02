# TC-BVA-02: Validação de Limite Inferior de Senha

## 1. Identificação

| Atributo | Valor |
|----------|-------|
| **ID do Teste** | TC-BVA-02 |
| **Título** | Validação de Limite Inferior de Senha |
| **Técnica** | Análise de Valores Limites (BVA) |
| **Requisito** | R3 - Validação de Senha |
| **Modo de Falha** | F3 - Senha com comprimento inválido |
| **Prioridade** | Alta |
| **Status** | Ativo |

---

## 2. Objetivo

Validar que o sistema rejeita senhas com comprimento inferior ao mínimo permitido (6 caracteres), testando o limite inferior da partição de equivalência de senhas válidas.

---

## 3. Pré-condições

- Sistema de autenticação está operacional
- Página de login/cadastro está acessível
- Navegador Chrome está instalado
- Servidor está rodando em `http://localhost:3000`

---

## 4. Dados de Teste

### Partição de Equivalência - Análise de Valores Limites

| Classe | Valor | Comprimento | Esperado |
|--------|-------|-------------|----------|
| Limite Inferior (Inválido) | `12345` | 5 caracteres | ❌ Rejeitar |
| Limite Inferior + 1 (Válido) | `123456` | 6 caracteres | ✅ Aceitar |
| Valor Típico (Válido) | `Senha123@` | 9 caracteres | ✅ Aceitar |

---

## 5. Passos de Execução

### Passo 1: Acessar a Página de Cadastro
1. Abrir navegador Chrome
2. Navegar para `http://localhost:3000`
3. Clicar no link "Não tem conta? Cadastre-se"
4. **Resultado Esperado:** Formulário de cadastro é exibido

### Passo 2: Preencher Dados Válidos (Exceto Senha)
1. Preencher campo "Nome": `João Silva`
2. Preencher campo "Email": `joao.silva@email.com`
3. **Resultado Esperado:** Campos preenchidos sem erros

### Passo 3: Inserir Senha com 5 Caracteres (Limite Inferior)
1. Clicar no campo "Senha"
2. Digitar: `12345` (5 caracteres)
3. Clicar no campo "Confirmar Senha"
4. Digitar: `12345`
5. **Resultado Esperado:** Mensagem de erro é exibida indicando que a senha é muito curta

### Passo 4: Tentar Submeter o Formulário
1. Clicar no botão "Cadastrar"
2. **Resultado Esperado:** Formulário não é submetido, erro permanece visível

### Passo 5: Corrigir para Senha Válida
1. Limpar campo "Senha"
2. Digitar: `123456` (6 caracteres - limite inferior válido)
3. Clicar no campo "Confirmar Senha"
4. Limpar e digitar: `123456`
5. **Resultado Esperado:** Mensagem de erro desaparece

### Passo 6: Submeter Formulário
1. Clicar no botão "Cadastrar"
2. **Resultado Esperado:** Cadastro é realizado com sucesso, redirecionado para página de login

---

## 6. Resultados Esperados

| Etapa | Resultado Esperado | Resultado Obtido | Status |
|-------|-------------------|------------------|--------|
| Acesso ao cadastro | Formulário exibido | Formulário exibido | ✅ PASS |
| Preenchimento de dados | Campos preenchidos | Campos preenchidos | ✅ PASS |
| Senha com 5 caracteres | Erro exibido | Erro exibido | ✅ PASS |
| Tentativa de submissão | Formulário não submetido | Formulário não submetido | ✅ PASS |
| Senha com 6 caracteres | Erro desaparece | Erro desaparece | ✅ PASS |
| Submissão com senha válida | Cadastro realizado | Cadastro realizado | ✅ PASS |

---

## 7. Critérios de Aceitação

✅ **PASSOU** - O sistema rejeita senhas com menos de 6 caracteres  
✅ **PASSOU** - O sistema aceita senhas com 6 ou mais caracteres  
✅ **PASSOU** - Mensagem de erro é clara e informativa  
✅ **PASSOU** - Validação ocorre em tempo real (ao sair do campo)

---

## 8. Observações

- A validação de comprimento mínimo de senha é crítica para segurança
- O teste valida especificamente o limite inferior (5 vs 6 caracteres)
- A técnica BVA é apropriada pois testa valores nos limites das partições

---

## 9. Rastreabilidade

| Tipo | ID | Descrição |
|------|----|----|
| Requisito | R3 | Validação de Senha |
| Modo de Falha | F3 | Senha com comprimento inválido |
| Técnica | BVA | Análise de Valores Limites |

---

## 10. Automação

### Script Robot Framework

```robot
*** Test Cases ***
TC-BVA-02 Validação de Limite Inferior de Senha
    [Documentation]    Valida rejeição de senha com menos de 6 caracteres
    [Tags]    BVA    Senha    Validação
    Ir Para Pagina    http://localhost:3000
    Clicar Em Cadastro
    Preencher Nome Cadastro    João Silva
    Preencher Email Cadastro    joao.silva@email.com
    Preencher Senha Cadastro    12345
    Preencher Confirmar Senha Cadastro    12345
    Submeter Cadastro
    Verificar Mensagem Erro Senha Curta
    Preencher Senha Cadastro    123456
    Preencher Confirmar Senha Cadastro    123456
    Submeter Cadastro
    Verificar Redirecionamento Login
```

---

## 11. Conclusão

O teste TC-BVA-02 valida com sucesso a implementação da validação de comprimento mínimo de senha, testando especificamente o valor limite inferior (5 caracteres) que deve ser rejeitado e o valor limite válido (6 caracteres) que deve ser aceito.

**Status Final:** ✅ **PASSOU**

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
