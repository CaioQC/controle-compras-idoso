# Documentação da API - Cadastro de Usuário

## Endpoint
`POST /usuario`

## URL Base
`http://localhost:3000`

## Descrição
Responsável pelo cadastro de novos usuários no sistema. Valida os dados de entrada e cria um novo registro de usuário no banco de dados.

---

## Requisição

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "nome": "string (obrigatório, mínimo 3 caracteres)",
  "email": "string (obrigatório, formato válido)",
  "senha": "string (obrigatório, mínimo 6 caracteres)"
}
```

### Exemplo de Requisição Válida
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

---

## Respostas

### 201 — Usuário Cadastrado com Sucesso

**Status Code:** 201 Created

**Response Body:**
```json
{
  "status": "sucesso",
  "mensagem": "Usuário cadastrado com sucesso",
  "dados": {
    "idUsuario": "a1b2c3d4e5f6g7h8",
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "dataCriacao": "2026-06-01T20:30:45Z"
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
  "timestamp": "2026-06-01T20:30:45Z"
}
```

---

### 400 — E-mail Já Cadastrado

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "E-mail já cadastrado",
  "codigoErro": "EMAIL_DUPLICADO",
  "timestamp": "2026-06-01T20:30:45Z"
}
```

---

### 400 — Senha Inválida

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Senha deve ter no mínimo 6 caracteres",
  "codigoErro": "SENHA_INVALIDA",
  "timestamp": "2026-06-01T20:30:45Z"
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
  "timestamp": "2026-06-01T20:30:45Z"
}
```

---

### 400 — Nome Inválido

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Nome deve ter no mínimo 3 caracteres",
  "codigoErro": "NOME_INVALIDO",
  "timestamp": "2026-06-01T20:30:45Z"
}
```

---

### 400 — Nome Obrigatório

**Status Code:** 400 Bad Request

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Nome é obrigatório",
  "codigoErro": "NOME_OBRIGATORIO",
  "timestamp": "2026-06-01T20:30:45Z"
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
  "timestamp": "2026-06-01T20:30:45Z"
}
```

---

## Validações

### Nome
- **Obrigatório:** Sim
- **Tipo:** String
- **Comprimento Mínimo:** 3 caracteres
- **Comprimento Máximo:** 100 caracteres
- **Padrão:** Aceita letras, números e espaços

### E-mail
- **Obrigatório:** Sim
- **Tipo:** String
- **Formato:** usuario@dominio.com
- **Validação:** RFC 5322 (simplificado)
- **Unicidade:** Deve ser único no banco de dados

### Senha
- **Obrigatório:** Sim
- **Tipo:** String
- **Comprimento Mínimo:** 6 caracteres
- **Comprimento Máximo:** 50 caracteres
- **Armazenamento:** Hash (bcrypt)
- **Requisitos:** Sem requisitos especiais de complexidade

---

## Códigos de Erro

| Código | Descrição | Status HTTP |
|---|---|---|
| EMAIL_INVALIDO | Formato de e-mail inválido | 400 |
| EMAIL_DUPLICADO | E-mail já cadastrado | 400 |
| SENHA_INVALIDA | Senha não atende aos requisitos | 400 |
| SENHA_OBRIGATORIA | Campo de senha não preenchido | 400 |
| NOME_INVALIDO | Nome não atende aos requisitos | 400 |
| NOME_OBRIGATORIO | Campo de nome não preenchido | 400 |
| ERRO_INTERNO | Erro no servidor | 500 |

---

## Exemplo de Uso com cURL

```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "senha": "Senha123@"
  }'
```

---

## Notas Importantes

1. **Segurança:** A senha é armazenada como hash no banco de dados
2. **Validação:** Todas as validações são realizadas no backend
3. **Resposta:** A resposta sempre inclui um timestamp
4. **Idempotência:** A requisição não é idempotente (múltiplas chamadas criam múltiplos usuários)
5. **Rate Limiting:** Recomenda-se implementar rate limiting para prevenir abuso

---

## Histórico de Versões

| Versão | Data | Alterações |
|---|---|---|
| 1.0 | 01/06/2026 | Versão inicial da documentação |
