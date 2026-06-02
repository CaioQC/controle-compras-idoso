# Implementação no Postman - Teste de API 2: Login de Usuário

## Configuração Base

### URL
```
POST http://localhost:3000/login
```

### Headers Padrão
```
Content-Type: application/json
```

---

## Casos de Teste no Postman

### CT01 — Login com Dados Válidos

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "admin@familia.com",
  "senha": "123456"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Resposta deve ser JSON", function () {
    pm.response.to.be.json;
});

pm.test("Status deve ser 'sucesso'", function () {
    var json = pm.response.json();
    pm.expect(json.status).to.eql("sucesso");
});

pm.test("Mensagem de sucesso", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Login realizado com sucesso");
});

pm.test("Deve retornar token de acesso", function () {
    var json = pm.response.json();
    pm.expect(json.dados.token).to.exist;
});

pm.test("Deve retornar ID do usuário", function () {
    var json = pm.response.json();
    pm.expect(json.dados.idUsuario).to.exist;
});

pm.test("Deve retornar email do usuário", function () {
    var json = pm.response.json();
    pm.expect(json.dados.email).to.eql("admin@familia.com");
});

// Armazenar token para uso em requisições subsequentes
pm.environment.set("token", pm.response.json().dados.token);
```

---

### CT02 — E-mail Muito Curto

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "a",
  "senha": "123456"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de email", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("E-mail inválido");
});

pm.test("Código de erro deve ser EMAIL_INVALIDO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("EMAIL_INVALIDO");
});
```

---

### CT03 — E-mail Muito Longo

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "usuario.muito.longo.com.email.invalido.e.muito.extenso@dominio.com.br.com.br.com.br.com.br.com.br.com.br.com.br",
  "senha": "123456"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de email", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("E-mail inválido");
});

pm.test("Código de erro deve ser EMAIL_INVALIDO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("EMAIL_INVALIDO");
});
```

---

### CT04 — Senha Vazia

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "admin@familia.com",
  "senha": ""
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de senha obrigatória", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Senha é obrigatória");
});

pm.test("Código de erro deve ser SENHA_OBRIGATORIA", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("SENHA_OBRIGATORIA");
});
```

---

### CT05 — Senha Muito Curta

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "admin@familia.com",
  "senha": "1"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de senha", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Senha inválida");
});

pm.test("Código de erro deve ser SENHA_INVALIDA", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("SENHA_INVALIDA");
});
```

---

### CT06 — E-mail Não Cadastrado

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "usuario.inexistente@email.com",
  "senha": "123456"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Mensagem de erro de credenciais", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.include("Acesso Negado");
});

pm.test("Código de erro deve ser CREDENCIAIS_INVALIDAS", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("CREDENCIAIS_INVALIDAS");
});
```

---

### CT07 — Senha Incorreta

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/login

**Body (JSON):**
```json
{
  "email": "admin@familia.com",
  "senha": "senhaerrada"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Mensagem de erro de credenciais", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.include("Acesso Negado");
});

pm.test("Código de erro deve ser CREDENCIAIS_INVALIDAS", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("CREDENCIAIS_INVALIDAS");
});

pm.test("Não deve retornar token", function () {
    var json = pm.response.json();
    pm.expect(json.dados.token).to.not.exist;
});
```

---

## Instruções de Execução

### Passo 1: Importar para o Postman
1. Abrir Postman
2. Criar nova coleção chamada "Testes de API"
3. Criar nova pasta chamada "Login de Usuário"
4. Criar requisição para cada caso de teste

### Passo 2: Configurar Variáveis
```
Variável: base_url
Valor: http://localhost:3000

Variável: token
Valor: (será preenchido automaticamente por CT01)
```

### Passo 3: Executar Testes
1. Executar CT01 primeiro (para obter token)
2. Selecionar cada requisição
3. Clicar em "Send"
4. Verificar resposta
5. Executar scripts de teste

### Passo 4: Executar Coleção
1. Clicar em "Run" na coleção
2. Selecionar ambiente
3. Clicar em "Run Testes de API"
4. Verificar resultados

---

## Resumo dos Testes

| Caso | Método | Endpoint | Status Esperado | Resultado |
|---|---|---|---|---|
| CT01 | POST | /login | 200 | ✅ |
| CT02 | POST | /login | 400 | ✅ |
| CT03 | POST | /login | 400 | ✅ |
| CT04 | POST | /login | 400 | ✅ |
| CT05 | POST | /login | 400 | ✅ |
| CT06 | POST | /login | 401 | ✅ |
| CT07 | POST | /login | 401 | ✅ |

---

## Dicas Importantes

1. **Ordem de Execução:** Execute CT01 primeiro para obter um token válido
2. **Variáveis de Ambiente:** Use variáveis para armazenar token e base_url
3. **Assertions:** Todos os testes incluem assertions para validar resposta
4. **Token:** O token retornado em CT01 é armazenado automaticamente
5. **Segurança:** Nunca compartilhe tokens em repositórios públicos

---

## Troubleshooting

**Problema:** Erro 404 ao executar testes
**Solução:** Verificar se o servidor está rodando em http://localhost:3000

**Problema:** CT01 falha (credenciais inválidas)
**Solução:** Verificar se usuário admin@familia.com existe no banco de dados

**Problema:** CT06 falha (retorna 400 em vez de 401)
**Solução:** Verificar se validação de e-mail está funcionando corretamente

**Problema:** Token não é armazenado
**Solução:** Verificar se script de teste em CT01 está sendo executado
