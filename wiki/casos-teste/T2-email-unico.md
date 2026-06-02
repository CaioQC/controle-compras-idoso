# T2 - E-mail Único no Cadastro

**ID:** T2  
**Título:** E-mail Único no Cadastro  
**Tipo:** Teste de Aceite  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R2  
**Modo(s) de Falha Controlado(s):** F2  

---

## Objetivo
Validar que o sistema impede o cadastro de um novo usuário com um e-mail que já existe no banco de dados, exibindo mensagem de erro apropriada.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário não deve estar autenticado
- Banco de dados deve conter usuário com e-mail `admin@familia.com`
- Tela de cadastro deve estar acessível

---

## Dados de Entrada (Partição de Equivalência)

### Classe 1 - Válida (E-mail Novo)
- **Nome:** João Silva
- **E-mail:** joao.silva@test.com
- **Senha:** Senha123@
- **Confirmar Senha:** Senha123@
- **Comportamento Esperado:** Cadastro realizado com sucesso

### Classe 2 - Inválida (E-mail Duplicado)
- **Nome:** Maria Santos
- **E-mail:** admin@familia.com (já existe)
- **Senha:** Senha123@
- **Confirmar Senha:** Senha123@
- **Comportamento Esperado:** Cadastro rejeitado

### Classe 3 - Inválida (E-mail Duplicado - Variação)
- **Nome:** Pedro Costa
- **E-mail:** admin@familia.com (já existe)
- **Senha:** OutraSenha456@
- **Confirmar Senha:** OutraSenha456@
- **Comportamento Esperado:** Cadastro rejeitado

---

## Passos de Execução

1. Acessar http://localhost:3000 no navegador
2. Clicar no link "Criar Conta" ou "Cadastre-se"
3. Aguardar carregamento da tela de cadastro
4. Preencher campo "Nome Completo" com valor de entrada
5. Preencher campo "E-mail" com valor de entrada
6. Preencher campo "Senha" com valor de entrada
7. Preencher campo "Confirmar Senha" com valor de entrada
8. Clicar no botão "Criar Conta"
9. Aguardar 2 segundos para resposta do sistema
10. Observar comportamento do sistema

---

## Resultado Esperado (Classe 2 e 3)

- Mensagem de erro "E-mail já cadastrado" é exibida
- Mensagem de erro aparece em vermelho ou com ícone de erro
- Campo de e-mail é destacado em vermelho
- Novo usuário não é criado no banco de dados
- Usuário permanece na tela de cadastro
- Campos não são limpos (valores permanecem visíveis)
- Nenhum redirecionamento para tela de login ocorre

---

## Resultado Obtido

### Execução - Classe 2 (E-mail Duplicado - admin@familia.com)
- ✅ Mensagem de erro "E-mail já cadastrado" exibida
- ✅ Campo de e-mail destacado em vermelho
- ✅ Novo usuário não foi criado
- ✅ Usuário permanece na tela de cadastro
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento

### Execução - Classe 3 (E-mail Duplicado - Variação)
- ✅ Mensagem de erro "E-mail já cadastrado" exibida
- ✅ Campo de e-mail destacado em vermelho
- ✅ Novo usuário não foi criado
- ✅ Usuário permanece na tela de cadastro
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. A validação de unicidade de e-mail funciona corretamente no backend. Sistema impede duplicação de e-mails de forma consistente.

---

## Rastreabilidade
- **Requisito R2:** Sistema deve validar unicidade de e-mail no cadastro ✅
- **Modo de Falha F2:** Sistema permite cadastro com e-mail duplicado ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
CT-04-02: Cadastro com e-mail já existente
    [Documentation]    Verifica se o sistema bloqueia cadastro com e-mail duplicado
    Clicar Em Cadastro
    Preencher Nome Cadastro    Maria Santos
    Preencher Email Cadastro    admin@familia.com
    Preencher Senha Cadastro    Senha123@
    Preencher Confirmar Senha Cadastro    Senha123@
    Submeter Cadastro
    Verificar Mensagem Erro Email
```

**Status de Implementação:** Implementado ✅
