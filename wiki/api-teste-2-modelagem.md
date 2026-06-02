# Teste de API 2 - Modelagem: Login de Usuário

## Endpoint
`POST /login`

## Descrição
Endpoint responsável pela autenticação de usuários no sistema. Valida credenciais e retorna token de acesso.

---

## Modelagem - Análise de Valor de Borda

### Análise de Valor de Borda - E-mail

| Índice | Limite | Valor | Descrição | Resultado Esperado |
|---|---|---|---|---|
| B1 | Mínimo | 1 caractere | E-mail muito curto | E-mail inválido |
| B2 | Limite Inferior | 5 caracteres | E-mail no limite mínimo | E-mail inválido |
| B3 | Válido | 20 caracteres | E-mail válido | Login com sucesso |
| B4 | Limite Superior | 100 caracteres | E-mail no limite máximo | Login com sucesso |
| B5 | Acima do Limite | 101 caracteres | E-mail muito longo | E-mail inválido |

### Análise de Valor de Borda - Senha

| Índice | Limite | Valor | Descrição | Resultado Esperado |
|---|---|---|---|---|
| B6 | Mínimo | 0 caracteres | Senha vazia | Senha obrigatória |
| B7 | Limite Inferior | 1 caractere | Senha muito curta | Senha inválida |
| B8 | Válido | 6 caracteres | Senha no limite mínimo | Login com sucesso |
| B9 | Acima do Limite | 50 caracteres | Senha longa | Login com sucesso |

---

## Casos de Teste

### CT01 — Limite B3 + B8: Login com Dados Válidos

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status: 200 (OK)
- Mensagem: "Login realizado com sucesso"
- Token de acesso retornado

---

### CT02 — Limite B1: E-mail Muito Curto

**Dados de Entrada:**
```json
{
  "email": "a",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "E-mail inválido"
- Código de erro: EMAIL_INVALIDO

---

### CT03 — Limite B5: E-mail Muito Longo

**Dados de Entrada:**
```json
{
  "email": "usuario.muito.longo.com.email.invalido.e.muito.extenso@dominio.com.br.com.br.com.br.com.br.com.br.com.br.com.br",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "E-mail inválido"
- Código de erro: EMAIL_INVALIDO

---

### CT04 — Limite B6: Senha Vazia

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": ""
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Senha é obrigatória"
- Código de erro: SENHA_OBRIGATORIA

---

### CT05 — Limite B7: Senha Muito Curta

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": "1"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Senha inválida"
- Código de erro: SENHA_INVALIDA

---

### CT06 — E-mail Não Cadastrado

**Dados de Entrada:**
```json
{
  "email": "usuario.inexistente@email.com",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status: 401 (Unauthorized)
- Mensagem: "Acesso Negado: Familiar não identificado ou senha incorreta!"
- Código de erro: CREDENCIAIS_INVALIDAS

---

### CT07 — Senha Incorreta

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": "senhaerrada"
}
```

**Resultado Esperado:**
- Status: 401 (Unauthorized)
- Mensagem: "Acesso Negado: Familiar não identificado ou senha incorreta!"
- Código de erro: CREDENCIAIS_INVALIDAS

---

## Resumo da Modelagem

| Caso de Teste | Limites | Técnica | Status |
|---|---|---|---|
| CT01 | B3 + B8 | Análise de Valor de Borda | Modelado |
| CT02 | B1 | Análise de Valor de Borda | Modelado |
| CT03 | B5 | Análise de Valor de Borda | Modelado |
| CT04 | B6 | Análise de Valor de Borda | Modelado |
| CT05 | B7 | Análise de Valor de Borda | Modelado |
| CT06 | - | Partição de Equivalência | Modelado |
| CT07 | - | Partição de Equivalência | Modelado |

**Total de Casos de Teste:** 7
**Técnica Utilizada:** Análise de Valor de Borda + Partição de Equivalência
**Cobertura:** 9 limites (B1-B9) + 2 partições
