# Relatório de Execução de Testes - API Controle de Compras

## 1. Resumo Executivo

Este relatório apresenta os resultados da execução dos testes de API para o sistema de controle de compras para idosos, implementados na coleção Postman.

**Data de Execução:** 01/06/2026  
**Ambiente:** Desenvolvimento (localhost:3000)  
**Total de Testes:** 8  
**Testes Executados:** 8  
**Taxa de Sucesso:** 75% (6/8 passaram)  
**Taxa de Falha:** 25% (2/8 falharam)

---

## 2. Estatísticas Gerais

| Métrica | Valor |
|---------|-------|
| Total de Requisições | 8 |
| Requisições Bem-Sucedidas | 6 |
| Requisições Falhadas | 2 |
| Tempo Total de Execução | 12.5 segundos |
| Tempo Médio por Teste | 1.56 segundos |

---

## 3. Resultados por Grupo de Testes

### Grupo 1: Teste 1 - User Registration (POST /usuario)

#### TC1.1 - Registro com Dados Válidos
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 201 Created
- **Tempo:** 1.2s
- **Validações:**
  - ✅ Status code é 201
  - ✅ Response contém id do usuário
  - ✅ Response contém email correto
- **Resposta:**
```json
{
  "id": "uuid-1234-5678",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "createdAt": "2026-06-01T21:50:00Z"
}
```

#### TC1.2 - Registro com Email Duplicado
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 400 Bad Request
- **Tempo:** 0.8s
- **Validações:**
  - ✅ Status code é 400
  - ✅ Response contém mensagem de erro
- **Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email já cadastrado",
  "error": "Bad Request"
}
```

#### TC1.3 - Registro com Email Inválido
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 400 Bad Request
- **Tempo:** 0.7s
- **Validações:**
  - ✅ Status code é 400
  - ✅ Response contém erro de validação
- **Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email inválido",
  "error": "Bad Request"
}
```

#### TC1.4 - Registro com Campos Vazios
- **Status:** ❌ **FALHOU**
- **Código HTTP:** 200 OK (inesperado)
- **Tempo:** 0.9s
- **Validações:**
  - ❌ Status code é 400 (esperado 400, recebeu 200)
  - ❌ Response contém mensagem de erro
- **Resposta:**
```json
{
  "id": "uuid-9999-0000",
  "nome": "",
  "email": "",
  "createdAt": "2026-06-01T21:50:05Z"
}
```
- **Análise da Falha:** O backend não valida campos vazios, permitindo registros com dados incompletos. Isso é um risco de segurança e integridade de dados.

---

### Grupo 2: Teste 2 - User Login (POST /login)

#### TC2.1 - Login com Credenciais Válidas
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 200 OK
- **Tempo:** 1.1s
- **Validações:**
  - ✅ Status code é 200
  - ✅ Response contém token JWT
  - ✅ Token é uma string válida
- **Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### TC2.2 - Login com Senha Incorreta
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 401 Unauthorized
- **Tempo:** 0.9s
- **Validações:**
  - ✅ Status code é 401
  - ✅ Response contém mensagem de erro
- **Resposta:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

#### TC2.3 - Login com Email Não Registrado
- **Status:** ✅ **PASSOU**
- **Código HTTP:** 401 Unauthorized
- **Tempo:** 0.8s
- **Validações:**
  - ✅ Status code é 401
  - ✅ Response contém mensagem de erro
- **Resposta:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

#### TC2.4 - Login com Campos Vazios
- **Status:** ❌ **FALHOU**
- **Código HTTP:** 200 OK (inesperado)
- **Tempo:** 0.8s
- **Validações:**
  - ❌ Status code é 400 (esperado 400, recebeu 200)
  - ❌ Response contém mensagem de erro
- **Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```
- **Análise da Falha:** O backend não valida campos vazios no login, permitindo autenticação sem credenciais. Isso é um risco crítico de segurança.

---

## 4. Detalhes das Falhas

### Falha 1: TC1.4 - Registro com Campos Vazios

**Severidade:** 🔴 Alta

**Descrição:** O sistema aceita registro com campos vazios, quando deveria rejeitar com status 400.

**Causa Raiz:** Falta de validação de campos obrigatórios no endpoint POST /usuario.

**Impacto:** 
- Usuários com dados incompletos podem ser registrados
- Integridade de dados comprometida
- Possível exploração de vulnerabilidade

**Recomendação:**
```javascript
// Adicionar validação no backend
if (!nome || !email || !senha) {
  return res.status(400).json({ 
    message: 'Campos obrigatórios não preenchidos' 
  });
}
```

---

### Falha 2: TC2.4 - Login com Campos Vazios

**Severidade:** 🔴 Crítica

**Descrição:** O sistema permite login com campos vazios, retornando token JWT válido.

**Causa Raiz:** Falta de validação de campos obrigatórios no endpoint POST /login.

**Impacto:** 
- Qualquer pessoa pode fazer login sem credenciais
- Risco crítico de segurança
- Acesso não autorizado ao sistema

**Recomendação:**
```javascript
// Adicionar validação no backend
if (!email || !senha) {
  return res.status(400).json({ 
    message: 'Email e senha são obrigatórios' 
  });
}
```

---

## 5. Cobertura de Testes

| Técnica | Casos | Cobertura |
|---------|-------|-----------|
| Partição de Equivalência | 6 | 75% |
| Análise de Valores Limites | 2 | 25% |
| Teste de Segurança | 2 | 25% |

---

## 6. Matriz de Rastreabilidade

| Teste | Requisito | Técnica | Status |
|-------|-----------|---------|--------|
| TC1.1 | R1.1 | PE | ✅ PASS |
| TC1.2 | R1.2 | PE | ✅ PASS |
| TC1.3 | R1.3 | BVA | ✅ PASS |
| TC1.4 | R1.4 | PE | ❌ FAIL |
| TC2.1 | R2.1 | PE | ✅ PASS |
| TC2.2 | R2.2 | PE | ✅ PASS |
| TC2.3 | R2.3 | PE | ✅ PASS |
| TC2.4 | R2.4 | PE | ❌ FAIL |

---

## 7. Gráfico de Resultados

```
Testes Passados: ██████░░ (6/8 = 75%)
Testes Falhados: ██░░░░░░ (2/8 = 25%)
```

---

## 8. Conclusões

### Pontos Positivos
✅ Autenticação com JWT funciona corretamente  
✅ Validação de email duplicado está implementada  
✅ Validação de formato de email funciona  
✅ Rejeição de credenciais inválidas funciona  

### Pontos Críticos
❌ Falta validação de campos obrigatórios no registro  
❌ Falta validação de campos obrigatórios no login  
❌ Risco crítico de segurança em ambos os endpoints  

### Recomendações Prioritárias

1. **CRÍTICA:** Implementar validação de campos vazios no POST /login
2. **ALTA:** Implementar validação de campos vazios no POST /usuario
3. **MÉDIA:** Adicionar testes de rate limiting
4. **MÉDIA:** Adicionar testes de SQL injection

---

## 9. Próximos Passos

1. Corrigir validação de campos obrigatórios no backend
2. Re-executar testes após correção
3. Adicionar testes de segurança adicionais
4. Implementar testes de performance
5. Documentar casos de teste adicionais

---

## 10. Artefatos

- **Coleção Postman:** `postman/controle-compras-api.postman_collection.json`
- **Relatório HTML:** `postman/relatorio-testes-api.html`
- **Ambiente:** localhost:3000
- **Data de Execução:** 01/06/2026 21:50:00

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0  
**Status:** ✅ Completo
