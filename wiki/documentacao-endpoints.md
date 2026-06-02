# Documentação de Endpoints - API Controle de Compras

## Endpoint 1: POST /usuario

### Informações

| Item | Valor |
|------|-------|
| Método | POST |
| URL | http://localhost:3000/usuario |
| Content-Type | application/json |

### Requisição

```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

### Resposta Sucesso (201)

```json
{
  "id": "uuid-1234",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "createdAt": "2026-06-01T21:50:00Z"
}
```

### Resposta Erro (400)

```json
{
  "statusCode": 400,
  "message": "Email já cadastrado",
  "error": "Bad Request"
}
```

### Validações Testadas

- ✅ Email duplicado é rejeitado
- ✅ Email inválido é rejeitado
- ✅ Dados válidos são aceitos
- ❌ Campos vazios não são validados (BUG)

---

## Endpoint 2: POST /login

### Informações

| Item | Valor |
|------|-------|
| Método | POST |
| URL | http://localhost:3000/login |
| Content-Type | application/json |

### Requisição

```json
{
  "email": "admin@familia.com",
  "senha": "123456"
}
```

### Resposta Sucesso (200)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Resposta Erro (401)

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Validações Testadas

- ✅ Credenciais válidas retornam token JWT
- ✅ Senha incorreta é rejeitada
- ✅ Email não registrado é rejeitado
- ❌ Campos vazios não são validados (BUG)
