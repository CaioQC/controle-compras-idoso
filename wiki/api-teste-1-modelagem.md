# Teste de API 1 - Modelagem: Cadastro de Usuário

## Endpoint
`POST /usuario`

## Descrição
Endpoint responsável pelo cadastro de novos usuários no sistema. Valida dados de entrada e cria novo registro no banco de dados.

---

## Modelagem - Partição de Equivalência

### Partições de Equivalência - E-mail

| Índice | Partição | Descrição | Resultado Esperado |
|---|---|---|---|
| P1 | E-mail válido | Formato correto (usuario@dominio.com) | Cadastro com sucesso |
| P2 | E-mail inválido | Formato incorreto (sem @) | E-mail inválido |
| P3 | E-mail duplicado | E-mail já cadastrado no sistema | E-mail já existe |

### Partições de Equivalência - Senha

| Índice | Partição | Descrição | Resultado Esperado |
|---|---|---|---|
| P4 | Senha válida | Mínimo 6 caracteres | Cadastro com sucesso |
| P5 | Senha inválida | Menos de 6 caracteres | Senha inválida |
| P6 | Senha vazia | Campo não preenchido | Senha obrigatória |

### Partições de Equivalência - Nome

| Índice | Partição | Descrição | Resultado Esperado |
|---|---|---|---|
| P7 | Nome válido | Mínimo 3 caracteres | Cadastro com sucesso |
| P8 | Nome inválido | Menos de 3 caracteres | Nome inválido |
| P9 | Nome vazio | Campo não preenchido | Nome obrigatório |

---

## Casos de Teste

### CT01 — Partição P1 + P4 + P7: Cadastro com Dados Válidos

**Dados de Entrada:**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

**Resultado Esperado:**
- Status: 201 (Created)
- Mensagem: "Usuário cadastrado com sucesso"
- Usuário criado no banco de dados

---

### CT02 — Partição P2: E-mail Inválido

**Dados de Entrada:**
```json
{
  "nome": "Maria Santos",
  "email": "mariasantosemail.com",
  "senha": "Senha123@"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "E-mail inválido"
- Código de erro: EMAIL_INVALIDO
- Usuário não é criado

---

### CT03 — Partição P3: E-mail Duplicado

**Dados de Entrada:**
```json
{
  "nome": "Pedro Costa",
  "email": "admin@familia.com",
  "senha": "Senha123@"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "E-mail já cadastrado"
- Código de erro: EMAIL_DUPLICADO
- Usuário não é criado

---

### CT04 — Partição P5: Senha Inválida (Menos de 6 Caracteres)

**Dados de Entrada:**
```json
{
  "nome": "Ana Silva",
  "email": "ana.silva@email.com",
  "senha": "12345"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Senha deve ter no mínimo 6 caracteres"
- Código de erro: SENHA_INVALIDA
- Usuário não é criado

---

### CT05 — Partição P6: Senha Vazia

**Dados de Entrada:**
```json
{
  "nome": "Carlos Santos",
  "email": "carlos.santos@email.com",
  "senha": ""
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Senha é obrigatória"
- Código de erro: SENHA_OBRIGATORIA
- Usuário não é criado

---

### CT06 — Partição P8: Nome Inválido (Menos de 3 Caracteres)

**Dados de Entrada:**
```json
{
  "nome": "Jo",
  "email": "jo@email.com",
  "senha": "Senha123@"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Nome deve ter no mínimo 3 caracteres"
- Código de erro: NOME_INVALIDO
- Usuário não é criado

---

### CT07 — Partição P9: Nome Vazio

**Dados de Entrada:**
```json
{
  "nome": "",
  "email": "usuario@email.com",
  "senha": "Senha123@"
}
```

**Resultado Esperado:**
- Status: 400 (Bad Request)
- Mensagem: "Nome é obrigatório"
- Código de erro: NOME_OBRIGATORIO
- Usuário não é criado

---

## Resumo da Modelagem

| Caso de Teste | Partições | Técnica | Status |
|---|---|---|---|
| CT01 | P1 + P4 + P7 | Partição de Equivalência | Modelado |
| CT02 | P2 | Partição de Equivalência | Modelado |
| CT03 | P3 | Partição de Equivalência | Modelado |
| CT04 | P5 | Partição de Equivalência | Modelado |
| CT05 | P6 | Partição de Equivalência | Modelado |
| CT06 | P8 | Partição de Equivalência | Modelado |
| CT07 | P9 | Partição de Equivalência | Modelado |

**Total de Casos de Teste:** 7
**Técnica Utilizada:** Partição de Equivalência
**Cobertura:** 9 partições (P1-P9)
