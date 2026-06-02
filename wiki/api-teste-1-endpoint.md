# Documentação do Endpoint - POST /usuario

## 1. Informações Gerais

| Atributo | Valor |
|----------|-------|
| **Método HTTP** | POST |
| **Endpoint** | /usuario |
| **Base URL** | http://localhost:3000 |
| **Content-Type** | application/json |
| **Autenticação** | Não requerida |
| **Versão da API** | v1 |

---

## 2. Descrição

O endpoint POST /usuario é responsável por registrar um novo usuário no sistema de controle de compras para idosos. Este endpoint valida os dados fornecidos e cria um novo registro de usuário no banco de dados.

---

## 3. Requisição

### URL Completa
```
POST http://localhost:3000/usuario
```

### Headers Obrigatórios
```
Content-Type: application/json
```

### Corpo da Requisição

**Formato:** JSON

**Campos Obrigatórios:**

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| nome | string | Nome completo do usuário | "João Silva" |
| email | string | Email único do usuário | "joao@email.com" |
| senha | string | Senha do usuário (mín. 6 caracteres) | "Senha123@" |

**Exemplo de Requisição:**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

---

## 4. Resposta

### Resposta de Sucesso (201 Created)

**Status Code:** 201 Created

**Corpo da Resposta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "createdAt": "2026-06-01T21:50:00Z",
  "updatedAt": "2026-06-01T21:50:00Z"
}
```

**Descrição dos Campos:**
- **id:** Identificador único do usuário (UUID)
- **nome:** Nome do usuário registrado
- **email:** Email do usuário registrado
- **createdAt:** Data e hora de criação (ISO 8601)
- **updatedAt:** Data e hora da última atualização

---

### Resposta de Erro - Email Duplicado (400 Bad Request)

**Status Code:** 400 Bad Request

**Corpo da Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email já cadastrado",
  "error": "Bad Request"
}
```

---

### Resposta de Erro - Email Inválido (400 Bad Request)

**Status Code:** 400 Bad Request

**Corpo da Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email inválido",
  "error": "Bad Request"
}
```

---

### Resposta de Erro - Campos Vazios (400 Bad Request)

**Status Code:** 400 Bad Request

**Corpo da Resposta:**
```json
{
  "statusCode": 400,
  "message": "Nome, email e senha são obrigatórios",
  "error": "Bad Request"
}
```

---

### Resposta de Erro - Servidor (500 Internal Server Error)

**Status Code:** 500 Internal Server Error

**Corpo da Resposta:**
```json
{
  "statusCode": 500,
  "message": "Erro interno do servidor",
  "error": "Internal Server Error"
}
```

---

## 5. Códigos de Status HTTP

| Código | Descrição | Cenário |
|--------|-----------|---------|
| 201 | Created | Usuário registrado com sucesso |
| 400 | Bad Request | Dados inválidos ou email duplicado |
| 500 | Internal Server Error | Erro no servidor |

---

## 6. Validações

### Validação de Nome
- ✅ Obrigatório
- ✅ Mínimo 3 caracteres
- ✅ Máximo 255 caracteres
- ✅ Apenas letras, números e espaços

### Validação de Email
- ✅ Obrigatório
- ✅ Deve conter @ e domínio
- ✅ Deve ser único no sistema
- ✅ Máximo 255 caracteres
- ✅ Formato: usuario@dominio.com

### Validação de Senha
- ✅ Obrigatório
- ✅ Mínimo 6 caracteres
- ✅ Máximo 255 caracteres
- ✅ Recomendado: incluir maiúsculas, minúsculas, números e caracteres especiais

---

## 7. Exemplos de Uso

### Exemplo 1: Registro com Sucesso

**Requisição:**
```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "senha": "Senha123@"
  }'
```

**Resposta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "createdAt": "2026-06-01T21:50:00Z",
  "updatedAt": "2026-06-01T21:50:00Z"
}
```

---

### Exemplo 2: Email Duplicado

**Requisição:**
```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "email": "joao.silva@email.com",
    "senha": "Senha456@"
  }'
```

**Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email já cadastrado",
  "error": "Bad Request"
}
```

---

### Exemplo 3: Email Inválido

**Requisição:**
```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Costa",
    "email": "emailinvalido",
    "senha": "Senha789@"
  }'
```

**Resposta:**
```json
{
  "statusCode": 400,
  "message": "Email inválido",
  "error": "Bad Request"
}
```

---

## 8. Fluxo de Processamento

```
┌─────────────────────────────────────────┐
│ Requisição POST /usuario                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Validar Campos Obrigatórios             │
└────────────────┬────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    Válido            Inválido
         │                │
         │                ▼
         │        ┌──────────────────┐
         │        │ HTTP 400         │
         │        │ Erro de Validação│
         │        └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Validar Formato de Email                │
└────────────────┬────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    Válido            Inválido
         │                │
         │                ▼
         │        ┌──────────────────┐
         │        │ HTTP 400         │
         │        │ Email Inválido   │
         │        └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Verificar Email Duplicado               │
└────────────────┬────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    Único            Duplicado
         │                │
         │                ▼
         │        ┌──────────────────┐
         │        │ HTTP 400         │
         │        │ Email Duplicado  │
         │        └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Hash da Senha                           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Criar Usuário no Banco de Dados         │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ HTTP 201 Created                        │
│ Retornar Dados do Usuário               │
└─────────────────────────────────────────┘
```

---

## 9. Notas Importantes

- ⚠️ A senha é armazenada com hash (não em texto plano)
- ⚠️ O email é case-insensitive para validação de duplicidade
- ⚠️ O sistema retorna o id do usuário para referência futura
- ⚠️ Timestamps são retornados em formato ISO 8601 (UTC)

---

## 10. Conclusão

O endpoint POST /usuario é um serviço crítico para o sistema, responsável pelo registro de novos usuários. A documentação acima fornece todas as informações necessárias para integração e testes.

**Status:** ✅ Documentação Completa

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
