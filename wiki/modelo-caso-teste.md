# Modelo de Caso de Teste

## Template Padrão para Documentação de Casos de Teste

Este documento define o template e instruções para criação de casos de teste utilizando técnicas de teste de caixa preta.

---

## Estrutura Padrão

### Cabeçalho do Caso de Teste

```
ID: [T# ou TF#]
Título: [Título descritivo do teste]
Tipo: [Teste de Aceite / Teste de Controle de Falha]
Técnica: [Partição de Equivalência / Análise de Valor de Borda / Tabela de Decisão]
Requisito(s) Relacionado(s): [R#, R#, ...]
Modo(s) de Falha Controlado(s): [F#, F#, ...]
```

---

## Seções Obrigatórias

### 1. Objetivo
Descrição clara e concisa do que o teste pretende validar.

**Exemplo:**
```
Validar que o sistema bloqueia o acesso quando credenciais inválidas são fornecidas.
```

### 2. Pré-Condições
Estado inicial necessário para executar o teste.

**Exemplo:**
```
- Sistema deve estar acessível
- Usuário não deve estar autenticado
- Banco de dados deve conter usuário com e-mail válido
```

### 3. Dados de Entrada
Valores específicos utilizados no teste, incluindo a técnica aplicada.

**Exemplo (Partição de Equivalência):**
```
- Classe 1 (Válida): e-mail=admin@familia.com, senha=123456
- Classe 2 (Inválida - E-mail): e-mail=invalido@, senha=123456
- Classe 3 (Inválida - Senha): e-mail=admin@familia.com, senha=12345
```

### 4. Passos de Execução
Sequência numerada e detalhada de ações.

**Exemplo:**
```
1. Acessar a tela de login
2. Preencher campo "E-mail" com [valor de entrada]
3. Preencher campo "Senha" com [valor de entrada]
4. Clicar no botão "Entrar"
5. Aguardar resposta do sistema
```

### 5. Resultado Esperado
Comportamento esperado do sistema após execução dos passos.

**Exemplo:**
```
- Mensagem de erro é exibida
- Usuário permanece na tela de login
- Campo de e-mail recebe foco
```

### 6. Resultado Obtido
Preenchido durante a execução do teste.

**Exemplo:**
```
- ✅ Mensagem de erro exibida
- ✅ Usuário permanece na tela de login
- ⚠️ Campo de e-mail não recebe foco
```

### 7. Status
Estado final do teste: **Aprovado (A)**, **Reprovado (R)**, **Pendente (P)**, **Em Construção (C)**, **Implementado (I)**

### 8. Observações
Notas adicionais, bugs encontrados ou comportamentos inesperados.

---

## Técnicas de Teste de Caixa Preta

### 1. Partição de Equivalência

**Definição:** Divide os dados de entrada em classes equivalentes onde o sistema deve se comportar de forma similar.

**Estrutura:**
```
Classe 1 (Válida): [Descrição e valores]
Classe 2 (Inválida): [Descrição e valores]
Classe 3 (Inválida): [Descrição e valores]
```

**Exemplo:**
```
Teste de Login - Partição de Equivalência

Classe 1 (Válida): 
  - E-mail válido, senha válida
  - Resultado: Acesso concedido

Classe 2 (Inválida - E-mail):
  - E-mail inválido, senha válida
  - Resultado: Acesso negado

Classe 3 (Inválida - Senha):
  - E-mail válido, senha inválida
  - Resultado: Acesso negado
```

---

### 2. Análise de Valor de Borda

**Definição:** Testa os valores nos limites das classes de equivalência.

**Estrutura:**
```
Limite Inferior: [Valor mínimo válido]
Valor Válido: [Valor dentro do intervalo]
Limite Superior: [Valor máximo válido]
Abaixo do Limite: [Valor abaixo do mínimo]
Acima do Limite: [Valor acima do máximo]
```

**Exemplo:**
```
Teste de Comprimento de Senha - Análise de Valor de Borda

Limite Inferior: 6 caracteres (mínimo válido)
  - Entrada: "123456"
  - Resultado: Aceito

Abaixo do Limite: 5 caracteres
  - Entrada: "12345"
  - Resultado: Rejeitado

Acima do Limite: 20 caracteres
  - Entrada: "12345678901234567890"
  - Resultado: Aceito
```

---

### 3. Tabela de Decisão

**Definição:** Documenta combinações de condições e suas ações resultantes.

**Estrutura:**
```
| Condição 1 | Condição 2 | Condição 3 | Ação Esperada |
|---|---|---|---|
| V | V | V | [Resultado] |
| V | V | F | [Resultado] |
| V | F | V | [Resultado] |
| ... | ... | ... | ... |
```

**Exemplo:**
```
Teste de Exclusão de Conta - Tabela de Decisão

| Usuário Logado | Senha Correta | Modal Exibido | Resultado |
|---|---|---|---|
| Sim | Sim | Sim | Conta deletada |
| Sim | Não | Sim | Erro exibido |
| Não | - | Não | Redirecionado para login |
| Sim | Sim | Não | Erro no sistema |
```

---

## Instruções de Preenchimento

1. **ID:** Use T# para testes de aceite, TF# para testes de controle
2. **Título:** Seja descritivo e específico
3. **Técnica:** Escolha uma das três técnicas de caixa preta
4. **Dados de Entrada:** Liste explicitamente todos os valores
5. **Passos:** Seja detalhado, um passo por linha
6. **Resultado Esperado:** Descreva todos os comportamentos esperados
7. **Status:** Atualize conforme o teste progride

---

## Exemplo Completo

**ID:** T1  
**Título:** Validação de Credenciais Inválidas no Login  
**Tipo:** Teste de Aceite  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R1  
**Modo(s) de Falha Controlado(s):** F1  

### Objetivo
Validar que o sistema bloqueia o acesso quando credenciais inválidas são fornecidas.

### Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário não deve estar autenticado
- Banco de dados deve conter usuário com e-mail admin@familia.com e senha 123456

### Dados de Entrada (Partição de Equivalência)

**Classe 1 - Válida:**
- E-mail: admin@familia.com
- Senha: 123456

**Classe 2 - Inválida (E-mail):**
- E-mail: invalido@test.com
- Senha: 123456

**Classe 3 - Inválida (Senha):**
- E-mail: admin@familia.com
- Senha: senhaerrada

### Passos de Execução
1. Acessar http://localhost:3000
2. Verificar se tela de login é exibida
3. Preencher campo "E-mail" com valor de entrada
4. Preencher campo "Senha" com valor de entrada
5. Clicar no botão "Entrar"
6. Aguardar 2 segundos para resposta do sistema

### Resultado Esperado
- Mensagem de erro "Acesso Negado: Familiar não identificado ou senha incorreta!" é exibida
- Usuário permanece na tela de login
- Campos de entrada não são limpos
- Nenhum redirecionamento ocorre

### Resultado Obtido
- ✅ Mensagem de erro exibida corretamente
- ✅ Usuário permanece na tela de login
- ✅ Campos mantêm valores inseridos
- ✅ Nenhum redirecionamento

### Status
**Aprovado (A)**

### Observações
Teste executado com sucesso em Chrome versão 120. Comportamento consistente para todas as classes de equivalência.

---

## Checklist para Criação de Casos de Teste

- [ ] ID único atribuído
- [ ] Título descritivo
- [ ] Tipo de teste definido
- [ ] Técnica de caixa preta selecionada
- [ ] Requisitos relacionados identificados
- [ ] Modos de falha controlados identificados
- [ ] Objetivo claro e conciso
- [ ] Pré-condições documentadas
- [ ] Dados de entrada explícitos
- [ ] Passos numerados e detalhados
- [ ] Resultado esperado completo
- [ ] Status definido
- [ ] Observações adicionadas (se necessário)

---

## Referências

- CARPINETTI, Luiz Cesar Ribeiro. Gestão da qualidade. São Paulo: Atlas, 2016.
- LOZADA, Gisele; AFFONSO, Ligia M. F; PEZZATTO, Alan T. Sistema de controle da qualidade. Porto Alegre: SAGAH, 2018.
