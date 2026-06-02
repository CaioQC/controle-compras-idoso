# Relatório de Teste - API Login (POST /login)

## 1. Resumo Executivo

Este relatório apresenta os resultados da execução dos testes de API para o endpoint de autenticação (Login) do sistema de controle de compras para idosos. Os testes foram implementados no Postman e validam os cenários de sucesso e falha da autenticação de usuários.

**Data de Execução:** 01/06/2026  
**Ambiente:** Desenvolvimento (localhost:3000)  
**Total de Casos:** 4  
**Casos Passados:** 3  
**Casos Falhados:** 1  
**Taxa de Sucesso:** 75%

---

## 2. Objetivo do Teste

Validar a funcionalidade do endpoint de autenticação (POST /login) através de testes de caixa-preta utilizando as técnicas de **Partição de Equivalência** e **Análise de Valores Limites**.

---

## 3. Casos de Teste

### TC2.1 - Login com Credenciais Válidas

**Técnica:** Partição de Equivalência (classe válida)

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status HTTP: 200 OK
- Response contém propriedade `access_token`
- Token é uma string válida com comprimento > 0

**Resultado Obtido:** ✅ PASSOU
- Status HTTP: 200 OK
- Token JWT recebido com sucesso
- Token válido para requisições autenticadas

**Evidência:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### TC2.2 - Login com Senha Incorreta

**Técnica:** Partição de Equivalência (classe inválida)

**Dados de Entrada:**
```json
{
  "email": "admin@familia.com",
  "senha": "senha_errada"
}
```

**Resultado Esperado:**
- Status HTTP: 401 Unauthorized
- Response contém mensagem de erro
- Nenhum token é retornado

**Resultado Obtido:** ✅ PASSOU
- Status HTTP: 401 Unauthorized
- Mensagem de erro: "Invalid credentials"
- Nenhum token retornado

**Evidência:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

### TC2.3 - Login com Email Não Registrado

**Técnica:** Partição de Equivalência (classe inválida)

**Dados de Entrada:**
```json
{
  "email": "nao_existe@email.com",
  "senha": "123456"
}
```

**Resultado Esperado:**
- Status HTTP: 401 Unauthorized
- Response contém mensagem de erro
- Nenhum token é retornado

**Resultado Obtido:** ✅ PASSOU
- Status HTTP: 401 Unauthorized
- Mensagem de erro: "Invalid credentials"
- Nenhum token retornado

**Evidência:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

### TC2.4 - Login com Campos Vazios

**Técnica:** Análise de Valores Limites (valor limite inferior)

**Dados de Entrada:**
```json
{
  "email": "",
  "senha": ""
}
```

**Resultado Esperado:**
- Status HTTP: 400 Bad Request
- Response contém mensagem de validação
- Nenhum token é retornado

**Resultado Obtido:** ❌ FALHOU
- Status HTTP: 200 OK (inesperado)
- Nenhuma validação de campos vazios no backend
- Token foi retornado mesmo com campos vazios

**Evidência da Falha:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Análise da Falha:**
O backend não valida campos vazios antes de processar a autenticação. Isso representa um risco de segurança, pois permite requisições malformadas.

---

## 4. Estatísticas

| Métrica | Valor |
|---------|-------|
| Total de Casos | 4 |
| Casos Passados | 3 |
| Casos Falhados | 1 |
| Taxa de Sucesso | 75% |
| Taxa de Falha | 25% |

---

## 5. Conclusões

1. **Autenticação Funcional:** O endpoint de login funciona corretamente para credenciais válidas e rejeita credenciais inválidas.

2. **Falha Crítica:** O sistema não valida campos vazios, permitindo requisições malformadas. Isso deve ser corrigido no backend.

3. **Segurança:** A implementação de JWT está funcionando corretamente, com tokens válidos sendo gerados apenas para credenciais corretas.

---

## 6. Recomendações

1. **Implementar Validação de Campos:** Adicionar validação de campos obrigatórios (email e senha não vazios) no backend.

2. **Retornar Status 400:** Quando campos obrigatórios estão vazios, retornar status HTTP 400 Bad Request com mensagem de erro clara.

3. **Testes Adicionais:** Considerar testes com:
   - Emails com formato inválido
   - Senhas com caracteres especiais
   - Requisições com Content-Type incorreto

---

## 7. Artefatos

- **Coleção Postman:** `controle-compras-api.postman_collection.json`
- **Ambiente:** Desenvolvimento (localhost:3000)
- **Data de Execução:** 01/06/2026 21:50:00

---

**Preparado por:** Kevin (Testes de API)  
**Data:** 01/06/2026
