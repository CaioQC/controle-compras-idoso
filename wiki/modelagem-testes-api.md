# Modelagem de Testes de API

## Teste 1: User Registration (POST /usuario)

### Técnica: Partição de Equivalência (PE)

### Classes de Equivalência

| Classe | Dados | Resultado |
|--------|-------|-----------|
| Válida | Nome, email, senha válidos | ✅ HTTP 201 |
| Inválida | Email duplicado | ❌ HTTP 400 |
| Inválida | Email sem @ | ❌ HTTP 400 |
| Inválida | Campos vazios | ❌ HTTP 400 |

### Casos de Teste Executados

1. **TC1.1** - Dados válidos → ✅ PASSOU
2. **TC1.2** - Email duplicado → ✅ PASSOU
3. **TC1.3** - Email inválido → ✅ PASSOU
4. **TC1.4** - Campos vazios → ❌ FALHOU

**Taxa de Sucesso:** 75% (3/4)

---

## Teste 2: User Login (POST /login)

### Técnica: Partição de Equivalência (PE)

### Classes de Equivalência

| Classe | Dados | Resultado |
|--------|-------|-----------|
| Válida | Email e senha corretos | ✅ HTTP 200 + Token |
| Inválida | Senha incorreta | ❌ HTTP 401 |
| Inválida | Email não registrado | ❌ HTTP 401 |
| Inválida | Campos vazios | ❌ HTTP 400 |

### Casos de Teste Executados

1. **TC2.1** - Credenciais válidas → ✅ PASSOU
2. **TC2.2** - Senha incorreta → ✅ PASSOU
3. **TC2.3** - Email não registrado → ✅ PASSOU
4. **TC2.4** - Campos vazios → ❌ FALHOU

**Taxa de Sucesso:** 75% (3/4)
