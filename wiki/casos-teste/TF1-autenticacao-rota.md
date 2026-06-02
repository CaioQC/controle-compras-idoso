# TF1 - Autenticação em Rota Protegida

**ID:** TF1  
**Título:** Autenticação em Rota Protegida  
**Tipo:** Teste de Controle de Falha  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R6  
**Modo(s) de Falha Controlado(s):** F6  

---

## Objetivo
Validar que usuários não autenticados não conseguem acessar rotas protegidas (como página de configurações) e são redirecionados para a tela de login.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Navegador deve estar em modo incógnito ou com cache/cookies limpos
- Usuário não deve estar autenticado
- URLs das rotas protegidas devem ser conhecidas

---

## Dados de Entrada (Partição de Equivalência)

### Classe 1 - Usuário Não Autenticado Acessando Rota Protegida
- **Estado:** Não autenticado
- **Ação:** Tentar acessar /configuracoes
- **Comportamento Esperado:** Redirecionamento para login

### Classe 2 - Usuário Autenticado Acessando Rota Protegida
- **Estado:** Autenticado
- **Ação:** Acessar /configuracoes
- **Comportamento Esperado:** Acesso concedido

### Classe 3 - Usuário Não Autenticado Acessando Rota Pública
- **Estado:** Não autenticado
- **Ação:** Acessar /
- **Comportamento Esperado:** Acesso concedido (tela de login)

---

## Passos de Execução

### Teste 1: Acesso Não Autenticado a Rota Protegida

1. Abrir navegador em modo incógnito
2. Limpar cache e cookies
3. Navegar diretamente para http://localhost:3000/configuracoes
4. Aguardar 2 segundos para processamento
5. Observar comportamento do sistema
6. Verificar URL atual do navegador
7. Verificar se tela de login é exibida

### Teste 2: Acesso Autenticado a Rota Protegida

1. Fazer login com credenciais válidas
2. Navegar para http://localhost:3000/configuracoes
3. Aguardar carregamento da página
4. Verificar se página de configurações é exibida
5. Verificar se botões de configuração estão visíveis

### Teste 3: Acesso Não Autenticado a Rota Pública

1. Abrir navegador em modo incógnito
2. Navegar para http://localhost:3000
3. Aguardar carregamento da página
4. Verificar se tela de login é exibida

---

## Resultado Esperado

### Teste 1: Acesso Não Autenticado a Rota Protegida
- ✅ Usuário é redirecionado para http://localhost:3000 (tela de login)
- ✅ Página de configurações não é carregada
- ✅ Mensagem de erro ou aviso pode ser exibida
- ✅ Nenhum conteúdo da página protegida é visível
- ✅ Redirecionamento ocorre automaticamente

### Teste 2: Acesso Autenticado a Rota Protegida
- ✅ Página de configurações é carregada com sucesso
- ✅ URL permanece em /configuracoes
- ✅ Todos os elementos da página são visíveis
- ✅ Botões de configuração funcionam corretamente

### Teste 3: Acesso Não Autenticado a Rota Pública
- ✅ Tela de login é exibida
- ✅ Campos de e-mail e senha estão visíveis
- ✅ Botão "Entrar" está disponível
- ✅ Link para cadastro está disponível

---

## Resultado Obtido

### Teste 1: Acesso Não Autenticado a Rota Protegida
- ✅ Redirecionamento para tela de login funcionou
- ✅ URL mudou para http://localhost:3000
- ✅ Página de configurações não foi carregada
- ✅ Nenhum conteúdo protegido foi exibido
- ✅ Redirecionamento foi automático e imediato

### Teste 2: Acesso Autenticado a Rota Protegida
- ✅ Página de configurações carregou com sucesso
- ✅ URL permaneceu em /configuracoes
- ✅ Todos os botões de configuração estão visíveis
- ✅ Funcionalidades de configuração funcionam

### Teste 3: Acesso Não Autenticado a Rota Pública
- ✅ Tela de login foi exibida
- ✅ Campos de entrada estão visíveis
- ✅ Botão "Entrar" está funcional
- ✅ Link para cadastro está disponível

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. O sistema protege corretamente as rotas protegidas, redirecionando usuários não autenticados para a tela de login. A proteção de rotas funciona de forma consistente.

---

## Rastreabilidade
- **Requisito R6:** Rotas protegidas devem exigir autenticação ✅
- **Modo de Falha F6:** Usuário consegue acessar tela de configurações sem estar logado ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
Teste de Acesso Não Autenticado
    [Documentation]    Verifica se usuário não autenticado é redirecionado
    Open Browser    http://localhost:3000/configuracoes    chrome
    Wait Until Element Is Visible    css=[data-testid="login-email"]    10s
    Location Should Be    http://localhost:3000
    Close Browser

Teste de Acesso Autenticado
    [Documentation]    Verifica se usuário autenticado consegue acessar rota protegida
    Open Browser    http://localhost:3000    chrome
    Realizar Login    admin@familia.com    123456
    Go To    http://localhost:3000/configuracoes
    Element Should Be Visible    css=.configuracoes-card
    Close Browser
```

**Status de Implementação:** Implementado ✅
