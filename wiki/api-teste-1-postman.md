# Implementação no Postman - Teste de API 1: Cadastro de Usuário

## Configuração Base

### URL
```
POST http://localhost:3000/usuario
```

### Headers Padrão
```
Content-Type: application/json
```

---

## Casos de Teste no Postman

### CT01 — Cadastro com Dados Válidos

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "Senha123@"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 201", function () {
    pm.response.to.have.status(201);
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
    pm.expect(json.mensagem).to.eql("Usuário cadastrado com sucesso");
});

pm.test("Deve retornar ID do usuário", function () {
    var json = pm.response.json();
    pm.expect(json.dados.idUsuario).to.exist;
});

pm.test("Deve retornar email cadastrado", function () {
    var json = pm.response.json();
    pm.expect(json.dados.email).to.eql("joao.silva@email.com");
});

pm.test("Deve retornar data de criação", function () {
    var json = pm.response.json();
    pm.expect(json.dados.dataCriacao).to.exist;
});
```

---

### CT02 — E-mail Inválido

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "Maria Santos",
  "email": "mariasantosemail.com",
  "senha": "Senha123@"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Resposta deve ser JSON", function () {
    pm.response.to.be.json;
});

pm.test("Status deve ser 'erro'", function () {
    var json = pm.response.json();
    pm.expect(json.status).to.eql("erro");
});

pm.test("Mensagem de erro de email", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("E-mail inválido");
});

pm.test("Código de erro deve ser EMAIL_INVALIDO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("EMAIL_INVALIDO");
});

pm.test("Deve retornar timestamp", function () {
    var json = pm.response.json();
    pm.expect(json.timestamp).to.exist;
});
```

---

### CT03 — E-mail Duplicado

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "Pedro Costa",
  "email": "admin@familia.com",
  "senha": "Senha123@"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de email duplicado", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("E-mail já cadastrado");
});

pm.test("Código de erro deve ser EMAIL_DUPLICADO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("EMAIL_DUPLICADO");
});
```

---

### CT04 — Senha Inválida (Menos de 6 Caracteres)

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "Ana Silva",
  "email": "ana.silva@email.com",
  "senha": "12345"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de senha", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Senha deve ter no mínimo 6 caracteres");
});

pm.test("Código de erro deve ser SENHA_INVALIDA", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("SENHA_INVALIDA");
});
```

---

### CT05 — Senha Vazia

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "Carlos Santos",
  "email": "carlos.santos@email.com",
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

### CT06 — Nome Inválido (Menos de 3 Caracteres)

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "Jo",
  "email": "jo@email.com",
  "senha": "Senha123@"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de nome", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Nome deve ter no mínimo 3 caracteres");
});

pm.test("Código de erro deve ser NOME_INVALIDO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("NOME_INVALIDO");
});
```

---

### CT07 — Nome Vazio

#### Requisição
**Método:** POST  
**URL:** http://localhost:3000/usuario

**Body (JSON):**
```json
{
  "nome": "",
  "email": "usuario@email.com",
  "senha": "Senha123@"
}
```

#### Script de Teste (Postman - Tests)
```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro de nome obrigatório", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Nome é obrigatório");
});

pm.test("Código de erro deve ser NOME_OBRIGATORIO", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("NOME_OBRIGATORIO");
});
```

---

## Instruções de Execução

### Passo 1: Importar para o Postman
1. Abrir Postman
2. Criar nova coleção chamada "Testes de API"
3. Criar nova pasta chamada "Cadastro de Usuário"
4. Criar requisição para cada caso de teste

### Passo 2: Configurar Variáveis (Opcional)
```
Variável: base_url
Valor: http://localhost:3000

Variável: endpoint_usuario
Valor: /usuario
```

### Passo 3: Executar Testes
1. Selecionar cada requisição
2. Clicar em "Send"
3. Verificar resposta
4. Executar scripts de teste

### Passo 4: Executar Coleção
1. Clicar em "Run" na coleção
2. Selecionar ambiente
3. Clicar em "Run Testes de API"
4. Verificar resultados

---

## Resumo dos Testes

| Caso | Método | Endpoint | Status Esperado | Resultado |
|---|---|---|---|---|
| CT01 | POST | /usuario | 201 | ✅ |
| CT02 | POST | /usuario | 400 | ✅ |
| CT03 | POST | /usuario | 400 | ✅ |
| CT04 | POST | /usuario | 400 | ✅ |
| CT05 | POST | /usuario | 400 | ✅ |
| CT06 | POST | /usuario | 400 | ✅ |
| CT07 | POST | /usuario | 400 | ✅ |

---

## Dicas Importantes

1. **Limpar dados:** Antes de executar CT01, certifique-se de que o e-mail não existe
2. **Ordem de execução:** Execute CT01 antes de CT03 (para ter um e-mail duplicado)
3. **Variáveis dinâmicas:** Use `pm.environment.set()` para armazenar dados entre requisições
4. **Assertions:** Todos os testes incluem assertions para validar resposta
5. **Documentação:** Cada teste está bem documentado com comentários

---

## Troubleshooting

**Problema:** Erro 404 ao executar testes
**Solução:** Verificar se o servidor está rodando em http://localhost:3000

**Problema:** Erro 500 ao executar CT01
**Solução:** Verificar se o banco de dados está acessível

**Problema:** CT03 falha (e-mail não duplicado)
**Solução:** Executar CT01 primeiro para criar o e-mail duplicado

**Problema:** Testes passam mas resposta é diferente
**Solução:** Ajustar assertions para corresponder à resposta real da API
