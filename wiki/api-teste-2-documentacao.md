# Documentação da API - Login de Usuário

## Endpoint
`POST /login`

## URL Base
`http://localhost:3000`

## Descrição
Responsável pela autenticação de usuários no sistema. Valida as credenciais fornecidas e retorna um token de acesso para operações subsequentes.

---

## Requisição

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "email": "string (obrigatório, formato válido)",
  "senha": "string (obrigatório, mínimo 6 caracteres)"
}
```

### Exemplo de Requisição Válida
```json
{
  "email": "admin@familia.com",
  "senha": "123456"
}
```

---

## Respostas

### 200 — Login Realizado com Sucesso

**Status Code:** 200 OK

**Response Body:**
```json
{
  "status": "sucesso",
  "mensagem": "Login realizado com sucesso",
  "dados": {
    "idUsuario": "a1b2c3d4e5f6g7h8",
    "nome": "Admin Família",
    "email": "admin@familia.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "dataLogin": "2026-06-01T20:45:30Z"
  }
}
```

---

### 400 — E-mail Inválido

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "E-mail inválido",
  "codigoErro": "EMAIL_INVALIDO",
  "timestamp": "2026-06-01T20:45:30Z"
}
```

---

### 400 — Senha Inválida

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Senha inválida",
  "codigoErro": "SENHA_INVALIDA",
  "timestamp": "2026-06-01T20:45:30Z"
}
```

---

### 400 — Senha Obrigatória

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Senha é obrigatória",
  "codigoErro": "SENHA_OBRIGATORIA",
  "timestamp": "2026-06-01T20:45:30Z"
}
```

---

### 401 — Credenciais Inválidas

**Status Code:** 401 Unauthorized

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Acesso Negado: Familiar não identificado ou senha incorreta!",
  "codigoErro": "CREDENCIAIS_INVALIDAS",
  "timestamp": "2026-06-01T20:45:30Z"
}
```

---

### 500 — Erro Interno do Servidor

**Status Code:** 500 Internal Server Error

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Erro interno do servidor",
  "codigoErro": "ERRO_INTERNO",
  "timestamp": "2026-06-01T20:45:30Z"
}
```

---

## Validações

### E-mail
- **Obrigatório:** Sim
- **Tipo:** String
- **Formato:** usuario@dominio.com
- **Comprimento Mínimo:** 5 caracteres
- **Comprimento Máximo:** 100 caracteres
- **Validação:** RFC 5322 (simplificado)

### Senha
- **Obrigatório:** Sim
- **Tipo:** String
- **Comprimento Mínimo:** 6 caracteres
- **Comprimento Máximo:** 50 caracteres
- **Armazenamento:** Comparado com hash (bcrypt)

---

## Códigos de Erro

| Código | Descrição | Status HTTP |
|---|---|---|
| EMAIL_INVALIDO | Formato de e-mail inválido | 400 |
| SENHA_INVALIDA | Senha não atende aos requisitos | 400 |
| SENHA_OBRIGATORIA | Campo de senha não preenchido | 400 |
| CREDENCIAIS_INVALIDAS | E-mail ou senha incorretos | 401 |
| ERRO_INTERNO | Erro no servidor | 500 |

---

## Token de Acesso

O token retornado é um JWT (JSON Web Token) que deve ser incluído em requisições subsequentes.

### Uso do Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Validade do Token
- **Duração:** 24 horas
- **Renovação:** Possível ao fazer novo login
- **Revogação:** Ao fazer logout

---

## Exemplo de Uso com cURL

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@familia.com",
    "senha": "123456"
  }'
```

---

## Notas Importantes

1. **Segurança:** A senha é comparada com hash, nunca armazenada em texto plano
2. **Rate Limiting:** Recomenda-se implementar limite de tentativas de login
3. **Logs:** Todas as tentativas de login devem ser registradas
4. **Token:** Deve ser armazenado de forma segura no cliente
5. **HTTPS:** Recomenda-se usar HTTPS em produção

---

## Histórico de Versões

| Versão | Data | Alterações |
|---|---|---|
| 1.0 | 01/06/2026 | Versão inicial da documentação |
