# T1 - Validação de Credenciais Inválidas no Login

**ID:** T1  
**Título:** Validação de Credenciais Inválidas no Login  
**Tipo:** Teste de Aceite  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R1  
**Modo(s) de Falha Controlado(s):** F1  

---

## Objetivo
Validar que o sistema bloqueia o acesso quando credenciais inválidas são fornecidas, exibindo mensagem de erro apropriada.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário não deve estar autenticado
- Banco de dados deve conter usuário com e-mail `admin@familia.com` e senha `123456`
- Navegador deve estar em modo normal (não incógnito)

---

## Dados de Entrada (Partição de Equivalência)

### Classe 1 - Válida (Controle Positivo)
- **E-mail:** admin@familia.com
- **Senha:** 123456
- **Comportamento Esperado:** Acesso concedido

### Classe 2 - Inválida (E-mail Inexistente)
- **E-mail:** usuario_inexistente@test.com
- **Senha:** 123456
- **Comportamento Esperado:** Acesso negado

### Classe 3 - Inválida (Senha Incorreta)
- **E-mail:** admin@familia.com
- **Senha:** senhaerrada
- **Comportamento Esperado:** Acesso negado

### Classe 4 - Inválida (Ambos Incorretos)
- **E-mail:** invalido@test.com
- **Senha:** senhaerrada
- **Comportamento Esperado:** Acesso negado

---

## Passos de Execução

1. Acessar http://localhost:3000 no navegador
2. Aguardar carregamento completo da página
3. Verificar se tela de login é exibida
4. Preencher campo "E-mail" com valor de entrada
5. Preencher campo "Senha" com valor de entrada
6. Clicar no botão "Entrar"
7. Aguardar 2 segundos para resposta do sistema
8. Observar comportamento do sistema

---

## Resultado Esperado (Classe 2 e 3)

- Mensagem de erro "Acesso Negado: Familiar não identificado ou senha incorreta!" é exibida
- Mensagem de erro aparece em vermelho ou com ícone de erro
- Usuário permanece na tela de login
- Campos de entrada não são limpos (valores permanecem visíveis)
- Nenhum redirecionamento para tela principal ocorre
- Foco retorna para campo de e-mail

---

## Resultado Obtido

### Execução - Classe 2 (E-mail Inexistente)
- ✅ Mensagem de erro exibida corretamente
- ✅ Usuário permanece na tela de login
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento
- ✅ Foco retorna para campo de e-mail

### Execução - Classe 3 (Senha Incorreta)
- ✅ Mensagem de erro exibida corretamente
- ✅ Usuário permanece na tela de login
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento
- ✅ Foco retorna para campo de e-mail

### Execução - Classe 4 (Ambos Incorretos)
- ✅ Mensagem de erro exibida corretamente
- ✅ Usuário permanece na tela de login
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento
- ✅ Foco retorna para campo de e-mail

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. Comportamento consistente para todas as classes de equivalência. A validação de credenciais funciona corretamente no backend e frontend.

---

## Rastreabilidade
- **Requisito R1:** Usuário deve fazer login com e-mail e senha válidos ✅
- **Modo de Falha F1:** Usuário consegue fazer login com credenciais inválidas ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
CT-01-02: Login com credenciais inválidas
    [Documentation]    Verifica se o sistema bloqueia o acesso com credenciais inválidas
    Ir Para Pagina    ${BASE_URL}
    Realizar Login    usuario_inexistente@test.com    123456
    Verificar Mensagem Erro Login
```

**Status de Implementação:** Implementado ✅
