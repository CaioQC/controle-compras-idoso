# TF3 - Comprimento Mínimo de Senha

**ID:** TF3  
**Título:** Comprimento Mínimo de Senha  
**Tipo:** Teste de Controle de Falha  
**Técnica:** Análise de Valor de Borda  
**Requisito(s) Relacionado(s):** R8  
**Modo(s) de Falha Controlado(s):** F8  

---

## Objetivo
Validar que o sistema rejeita senhas com menos de 6 caracteres durante o cadastro de usuário, exibindo mensagem de erro apropriada.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário não deve estar autenticado
- Tela de cadastro deve estar acessível
- Navegador deve estar em modo normal

---

## Dados de Entrada (Análise de Valor de Borda)

### Teste 1 - Senha com 0 Caracteres (Limite Inferior)
- **Nome:** João Silva
- **E-mail:** joao.silva@test.com
- **Senha:** (vazio)
- **Confirmar Senha:** (vazio)
- **Comportamento Esperado:** Erro de campo obrigatório

### Teste 2 - Senha com 1 Caractere (Abaixo do Limite)
- **Nome:** Maria Santos
- **E-mail:** maria.santos@test.com
- **Senha:** A
- **Confirmar Senha:** A
- **Comportamento Esperado:** Erro de comprimento mínimo

### Teste 3 - Senha com 5 Caracteres (Abaixo do Limite)
- **Nome:** Pedro Costa
- **E-mail:** pedro.costa@test.com
- **Senha:** 12345
- **Confirmar Senha:** 12345
- **Comportamento Esperado:** Erro de comprimento mínimo

### Teste 4 - Senha com 6 Caracteres (Limite Mínimo Válido)
- **Nome:** Ana Silva
- **E-mail:** ana.silva@test.com
- **Senha:** 123456
- **Confirmar Senha:** 123456
- **Comportamento Esperado:** Cadastro realizado com sucesso

### Teste 5 - Senha com 20 Caracteres (Acima do Limite)
- **Nome:** Carlos Santos
- **E-mail:** carlos.santos@test.com
- **Senha:** 12345678901234567890
- **Confirmar Senha:** 12345678901234567890
- **Comportamento Esperado:** Cadastro realizado com sucesso

---

## Passos de Execução

1. Acessar http://localhost:3000
2. Clicar em "Criar Conta" ou "Cadastre-se"
3. Aguardar carregamento da tela de cadastro
4. Preencher campo "Nome Completo" com valor de entrada
5. Preencher campo "E-mail" com valor de entrada
6. Preencher campo "Senha" com valor de entrada
7. Preencher campo "Confirmar Senha" com valor de entrada
8. Clicar em "Criar Conta"
9. Aguardar 2 segundos para validação
10. Observar mensagem de erro ou sucesso

---

## Resultado Esperado

### Para Senhas com Menos de 6 Caracteres (Testes 1-3)
- ✅ Mensagem de erro "Senha deve ter no mínimo 6 caracteres" é exibida
- ✅ Campo de senha é destacado em vermelho
- ✅ Novo usuário não é criado
- ✅ Usuário permanece na tela de cadastro
- ✅ Campos não são limpos

### Para Senhas com 6 ou Mais Caracteres (Testes 4-5)
- ✅ Nenhuma mensagem de erro é exibida
- ✅ Cadastro é realizado com sucesso
- ✅ Usuário é redirecionado para tela de login
- ✅ Mensagem de sucesso é exibida

---

## Resultado Obtido

### Teste 1 - Senha Vazia
- ✅ Mensagem de erro "Campo de senha é obrigatório" exibida
- ✅ Campo destacado em vermelho
- ✅ Usuário não foi criado
- ✅ Permanece na tela de cadastro

### Teste 2 - Senha com 1 Caractere
- ✅ Mensagem de erro "Senha deve ter no mínimo 6 caracteres" exibida
- ✅ Campo destacado em vermelho
- ✅ Usuário não foi criado
- ✅ Permanece na tela de cadastro

### Teste 3 - Senha com 5 Caracteres
- ✅ Mensagem de erro "Senha deve ter no mínimo 6 caracteres" exibida
- ✅ Campo destacado em vermelho
- ✅ Usuário não foi criado
- ✅ Permanece na tela de cadastro

### Teste 4 - Senha com 6 Caracteres
- ✅ Cadastro realizado com sucesso
- ✅ Redirecionamento para tela de login
- ✅ Mensagem de sucesso exibida
- ✅ Usuário consegue fazer login com essas credenciais

### Teste 5 - Senha com 20 Caracteres
- ✅ Cadastro realizado com sucesso
- ✅ Redirecionamento para tela de login
- ✅ Mensagem de sucesso exibida
- ✅ Usuário consegue fazer login com essas credenciais

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. A validação de comprimento mínimo de senha funciona corretamente. Sistema protege contra senhas fracas exigindo mínimo de 6 caracteres.

---

## Rastreabilidade
- **Requisito R8:** Senha deve ter mínimo de 6 caracteres ✅
- **Modo de Falha F8:** Sistema aceita senha com menos de 6 caracteres ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
Teste de Comprimento Mínimo de Senha
    [Documentation]    Verifica se sistema rejeita senhas com menos de 6 caracteres
    Clicar Em Cadastro
    Preencher Nome Cadastro    João Silva
    Preencher Email Cadastro    joao@test.com
    Preencher Senha Cadastro    12345
    Preencher Confirmar Senha Cadastro    12345
    Submeter Cadastro
    Verificar Mensagem Erro Senha
```

**Status de Implementação:** Implementado ✅
