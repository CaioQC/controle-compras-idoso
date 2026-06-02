# Modelagem de Teste de API - Teste 1: User Registration (POST /usuario)

## 1. Identificação

| Atributo | Valor |
|----------|-------|
| **ID do Teste** | API-TEST-01 |
| **Título** | Teste de Registro de Usuário |
| **Endpoint** | POST /usuario |
| **Técnica de Teste** | Partição de Equivalência (PE) + Análise de Valores Limites (BVA) |
| **Tipo de Teste** | Teste de API REST |
| **Ferramenta** | Postman + Newman |
| **Prioridade** | Alta |

---

## 2. Objetivo

Validar a funcionalidade do endpoint de registro de usuário (POST /usuario), garantindo que:
- O sistema aceita dados válidos e cria novo usuário
- O sistema rejeita emails duplicados
- O sistema valida formato de email
- O sistema valida campos obrigatórios
- O sistema retorna status HTTP apropriados

---

## 3. Requisitos Relacionados

| ID | Descrição | Tipo |
|----|-----------|------|
| R1.1 | Aceitar registro com dados válidos | Funcional |
| R1.2 | Rejeitar email duplicado | Funcional |
| R1.3 | Validar formato de email | Funcional |
| R1.4 | Validar campos obrigatórios | Funcional |
| R1.5 | Retornar status HTTP correto | Funcional |

---

## 4. Partições de Equivalência

### Classe 1: Dados Válidos (Válida)
- **Descrição:** Todos os campos preenchidos corretamente
- **Dados:** Nome válido, email válido, senha válida
- **Resultado Esperado:** ✅ HTTP 201, usuário criado

### Classe 2: Email Duplicado (Inválida)
- **Descrição:** Email já existe no sistema
- **Dados:** Email existente
- **Resultado Esperado:** ❌ HTTP 400, mensagem de erro

### Classe 3: Email Inválido (Inválida)
- **Descrição:** Email sem formato correto
- **Dados:** Email sem @, sem domínio
- **Resultado Esperado:** ❌ HTTP 400, erro de validação

### Classe 4: Campos Vazios (Inválida)
- **Descrição:** Um ou mais campos obrigatórios vazios
- **Dados:** Nome vazio, email vazio ou senha vazia
- **Resultado Esperado:** ❌ HTTP 400, erro de validação

---

## 5. Análise de Valores Limites (BVA)

| Aspecto | Limite Inferior | Valor Válido | Limite Superior |
|---------|-----------------|--------------|-----------------|
| Comprimento Nome | 0 caracteres | 3+ caracteres | Sem limite |
| Comprimento Email | 0 caracteres | 5+ caracteres | Sem limite |
| Comprimento Senha | 0 caracteres | 6+ caracteres | Sem limite |
| Caracteres Especiais | Sem @ | Com @ e . | Múltiplos @ |

---

## 6. Casos de Teste

### TC1.1: Registro com Dados Válidos

**Objetivo:** Validar criação de novo usuário com dados corretos

**Dados de Entrada:**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

**Passos:**
1. Enviar POST para /usuario com dados válidos
2. Aguardar resposta do servidor
3. Validar status HTTP
4. Validar estrutura da resposta

**Resultado Esperado:**
- Status HTTP: 201 Created
- Response contém id do usuário
- Response contém email correto
- Response contém timestamp de criação

**Critérios de Aceitação:**
- ✅ Status code é 201
- ✅ Usuário é criado no banco de dados
- ✅ Response contém id válido (UUID)
- ✅ Email retornado é igual ao enviado

---

### TC1.2: Registro com Email Duplicado

**Objetivo:** Validar rejeição de email já registrado

**Dados de Entrada:**
```json
{
  "nome": "Maria Santos",
  "email": "joao.silva@email.com",
  "senha": "Senha456@"
}
```

**Passos:**
1. Enviar POST para /usuario com email já existente
2. Aguardar resposta do servidor
3. Validar status HTTP
4. Validar mensagem de erro

**Resultado Esperado:**
- Status HTTP: 400 Bad Request
- Response contém mensagem "Email já cadastrado"
- Nenhum novo usuário é criado

**Critérios de Aceitação:**
- ✅ Status code é 400
- ✅ Mensagem de erro menciona email
- ✅ Usuário não é criado no banco

---

### TC1.3: Registro com Email Inválido

**Objetivo:** Validar rejeição de email com formato inválido

**Dados de Entrada:**
```json
{
  "nome": "Pedro Costa",
  "email": "emailinvalido",
  "senha": "Senha789@"
}
```

**Passos:**
1. Enviar POST para /usuario com email sem @
2. Aguardar resposta do servidor
3. Validar status HTTP
4. Validar mensagem de erro

**Resultado Esperado:**
- Status HTTP: 400 Bad Request
- Response contém mensagem de erro de validação
- Nenhum novo usuário é criado

**Critérios de Aceitação:**
- ✅ Status code é 400
- ✅ Mensagem menciona formato de email
- ✅ Usuário não é criado

---

### TC1.4: Registro com Campos Vazios

**Objetivo:** Validar rejeição de registro com campos obrigatórios vazios

**Dados de Entrada:**
```json
{
  "nome": "",
  "email": "",
  "senha": ""
}
```

**Passos:**
1. Enviar POST para /usuario com campos vazios
2. Aguardar resposta do servidor
3. Validar status HTTP
4. Validar mensagem de erro

**Resultado Esperado:**
- Status HTTP: 400 Bad Request
- Response contém mensagem de erro
- Nenhum novo usuário é criado

**Critérios de Aceitação:**
- ✅ Status code é 400
- ✅ Mensagem de erro é clara
- ✅ Usuário não é criado

---

## 7. Matriz de Rastreabilidade

| Caso de Teste | Requisito | Classe PE | Técnica | Status |
|---------------|-----------|-----------|---------|--------|
| TC1.1 | R1.1 | Válida | PE | ✅ PASS |
| TC1.2 | R1.2 | Inválida | PE | ✅ PASS |
| TC1.3 | R1.3 | Inválida | BVA | ✅ PASS |
| TC1.4 | R1.4 | Inválida | PE | ❌ FAIL |

---

## 8. Dados de Teste

### Usuários de Teste
```json
[
  {
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "senha": "Senha123@"
  },
  {
    "nome": "Maria Santos",
    "email": "maria.santos@email.com",
    "senha": "Senha456@"
  },
  {
    "nome": "Pedro Costa",
    "email": "pedro.costa@email.com",
    "senha": "Senha789@"
  }
]
```

---

## 9. Ambiente de Teste

| Componente | Especificação |
|-----------|---------------|
| Base URL | http://localhost:3000 |
| Método HTTP | POST |
| Content-Type | application/json |
| Banco de Dados | SQLite (desenvolvimento) |
| Ferramenta | Postman |

---

## 10. Critérios de Aceitação Geral

✅ Sistema aceita dados válidos completos  
✅ Sistema rejeita email duplicado  
✅ Sistema rejeita email com formato inválido  
✅ Sistema rejeita campos vazios  
✅ Sistema retorna status HTTP apropriados  
✅ Sistema retorna mensagens de erro claras  

---

## 11. Conclusão

A modelagem de teste para o endpoint POST /usuario cobre os cenários críticos de registro de usuário, utilizando técnicas de Partição de Equivalência e Análise de Valores Limites. Os testes garantem que o sistema valida corretamente os dados de entrada e retorna respostas apropriadas.

**Status:** ✅ Modelagem Completa

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
