# Implementação do Teste no Postman - Teste 1: User Registration

## 1. Visão Geral

Este documento descreve como os testes de API para o endpoint POST /usuario foram implementados no Postman, incluindo a estrutura da coleção, os casos de teste e os scripts de validação.

---

## 2. Estrutura da Coleção Postman

```
Controle Compras API Tests
├── Teste 1 - User Registration (POST /usuario)
│   ├── TC1.1 - Registro com Dados Válidos
│   ├── TC1.2 - Registro com Email Duplicado
│   ├── TC1.3 - Registro com Email Inválido
│   └── TC1.4 - Registro com Campos Vazios
└── Teste 2 - User Login (POST /login)
    ├── TC2.1 - Login com Credenciais Válidas
    ├── TC2.2 - Login com Senha Incorreta
    ├── TC2.3 - Login com Email Não Registrado
    └── TC2.4 - Login com Campos Vazios
```

---

## 3. Configuração da Coleção

### Variáveis de Ambiente

**Nome:** Development

| Variável | Valor |
|----------|-------|
| base_url | http://localhost:3000 |
| email_test | joao.silva@email.com |
| password_test | Senha123@ |

---

## 4. Casos de Teste Implementados

### TC1.1: Registro com Dados Válidos

**Método:** POST  
**URL:** {{base_url}}/usuario

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

**Scripts de Teste (Test Tab):**
```javascript
pm.test('Status code é 201', function() {
    pm.response.to.have.status(201);
});

pm.test('Response contém id do usuário', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
});

pm.test('Response contém email correto', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.email).to.equal('joao.silva@email.com');
});

pm.test('Response contém createdAt', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('createdAt');
});
```

**Resultado Esperado:** ✅ PASSOU

---

### TC1.2: Registro com Email Duplicado

**Método:** POST  
**URL:** {{base_url}}/usuario

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "Maria Santos",
  "email": "joao.silva@email.com",
  "senha": "Senha456@"
}
```

**Scripts de Teste:**
```javascript
pm.test('Status code é 400', function() {
    pm.response.to.have.status(400);
});

pm.test('Response contém mensagem de erro', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include('email');
});

pm.test('Response contém statusCode 400', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.statusCode).to.equal(400);
});
```

**Resultado Esperado:** ✅ PASSOU

---

### TC1.3: Registro com Email Inválido

**Método:** POST  
**URL:** {{base_url}}/usuario

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "Pedro Costa",
  "email": "emailinvalido",
  "senha": "Senha789@"
}
```

**Scripts de Teste:**
```javascript
pm.test('Status code é 400', function() {
    pm.response.to.have.status(400);
});

pm.test('Response contém erro de validação', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.exist;
});

pm.test('Response contém statusCode 400', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.statusCode).to.equal(400);
});
```

**Resultado Esperado:** ✅ PASSOU

---

### TC1.4: Registro com Campos Vazios

**Método:** POST  
**URL:** {{base_url}}/usuario

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "",
  "email": "",
  "senha": ""
}
```

**Scripts de Teste:**
```javascript
pm.test('Status code é 400', function() {
    pm.response.to.have.status(400);
});

pm.test('Response contém mensagem de erro', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.exist;
});

pm.test('Response contém statusCode 400', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.statusCode).to.equal(400);
});
```

**Resultado Esperado:** ❌ FALHOU (Backend não valida campos vazios)

---

## 5. Execução dos Testes

### Via Postman GUI

1. Abrir a coleção "Controle Compras API Tests"
2. Selecionar "Teste 1 - User Registration"
3. Clicar em "Run" para executar todos os casos
4. Visualizar resultados na aba "Test Results"

### Via Newman (CLI)

```bash
newman run postman/controle-compras-api.postman_collection.json \
  -e postman/environment.json \
  -r html \
  --reporter-html-export postman/relatorio-api-testes.html
```

---

## 6. Validações Implementadas

### Validação de Status HTTP
```javascript
pm.response.to.have.status(201);  // Sucesso
pm.response.to.have.status(400);  // Erro de validação
```

### Validação de Estrutura JSON
```javascript
pm.expect(jsonData).to.have.property('id');
pm.expect(jsonData).to.have.property('email');
```

### Validação de Valores
```javascript
pm.expect(jsonData.email).to.equal('joao.silva@email.com');
pm.expect(jsonData.statusCode).to.equal(400);
```

### Validação de Existência
```javascript
pm.expect(jsonData.message).to.exist;
pm.expect(jsonData.createdAt).to.exist;
```

---

## 7. Dados de Teste

### Usuários para Teste

| Caso | Nome | Email | Senha | Esperado |
|------|------|-------|-------|----------|
| TC1.1 | João Silva | joao.silva@email.com | Senha123@ | ✅ 201 |
| TC1.2 | Maria Santos | joao.silva@email.com | Senha456@ | ❌ 400 |
| TC1.3 | Pedro Costa | emailinvalido | Senha789@ | ❌ 400 |
| TC1.4 | (vazio) | (vazio) | (vazio) | ❌ 400 |

---

## 8. Fluxo de Execução

```
┌─────────────────────────────────────────┐
│ Iniciar Execução da Coleção             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ TC1.1: Dados Válidos                    │
│ Enviar POST /usuario                    │
│ Validar Status 201                      │
│ Validar Estrutura JSON                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ TC1.2: Email Duplicado                  │
│ Enviar POST /usuario                    │
│ Validar Status 400                      │
│ Validar Mensagem de Erro                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ TC1.3: Email Inválido                   │
│ Enviar POST /usuario                    │
│ Validar Status 400                      │
│ Validar Erro de Validação               │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ TC1.4: Campos Vazios                    │
│ Enviar POST /usuario                    │
│ Validar Status 400 (FALHA)              │
│ Validar Mensagem de Erro                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Gerar Relatório de Execução             │
│ 3 Passados, 1 Falhado                   │
└─────────────────────────────────────────┘
```

---

## 9. Arquivo da Coleção

**Localização:** `postman/controle-compras-api.postman_collection.json`

**Formato:** JSON (Postman v2.1)

**Como Importar:**
1. Abrir Postman
2. Clicar em "Import"
3. Selecionar arquivo `controle-compras-api.postman_collection.json`
4. Coleção será importada automaticamente

---

## 10. Conclusão

A implementação dos testes no Postman fornece uma forma automatizada e repetível de validar o endpoint POST /usuario. Os scripts de teste garantem que todas as validações críticas sejam executadas e documentadas.

**Status:** ✅ Implementação Completa

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
