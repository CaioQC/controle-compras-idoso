# T3 - Campos Obrigatórios no Cadastro de Item

**ID:** T3  
**Título:** Campos Obrigatórios no Cadastro de Item  
**Tipo:** Teste de Aceite  
**Técnica:** Análise de Valor de Borda  
**Requisito(s) Relacionado(s):** R3  
**Modo(s) de Falha Controlado(s):** F3  

---

## Objetivo
Validar que o sistema exibe mensagens de erro quando campos obrigatórios não são preenchidos no cadastro de item, e que o item não é salvo sem todos os campos obrigatórios.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário deve estar autenticado com credenciais válidas
- Usuário deve estar na tela de cadastro de itens
- Banco de dados deve conter pelo menos um idoso e um familiar cadastrados

---

## Dados de Entrada (Análise de Valor de Borda)

### Teste 1 - Campo Vazio (Limite Inferior)
- **Nome do Item:** (vazio)
- **Nome do Idoso:** Maria
- **Familiar Responsável:** João
- **Comportamento Esperado:** Erro no campo "Nome do Item"

### Teste 2 - Campo com 1 Caractere (Limite Inferior)
- **Nome do Item:** A
- **Nome do Idoso:** Maria
- **Familiar Responsável:** João
- **Comportamento Esperado:** Item salvo com sucesso

### Teste 3 - Campo com Espaços (Limite Inferior)
- **Nome do Item:** "   " (apenas espaços)
- **Nome do Idoso:** Maria
- **Familiar Responsável:** João
- **Comportamento Esperado:** Erro no campo "Nome do Item"

### Teste 4 - Todos os Campos Vazios
- **Nome do Item:** (vazio)
- **Nome do Idoso:** (vazio)
- **Familiar Responsável:** (vazio)
- **Comportamento Esperado:** Erros em todos os campos

### Teste 5 - Apenas Nome do Idoso Vazio
- **Nome do Item:** Leite
- **Nome do Idoso:** (vazio)
- **Familiar Responsável:** João
- **Comportamento Esperado:** Erro no campo "Nome do Idoso"

---

## Passos de Execução

1. Fazer login com credenciais válidas
2. Navegar para tela de cadastro de itens
3. Preencher campos com valores de entrada
4. Clicar no botão "Salvar Item"
5. Aguardar 1 segundo para validação
6. Observar mensagens de erro exibidas

---

## Resultado Esperado

### Para Campos Vazios ou com Apenas Espaços
- Mensagem de erro específica aparece abaixo do campo vazio
- Mensagem deve indicar qual campo é obrigatório
- Campo é destacado em vermelho
- Item não é salvo no banco de dados
- Usuário permanece na tela de cadastro

### Para Campos Preenchidos Corretamente
- Nenhuma mensagem de erro é exibida
- Item é salvo com sucesso
- Item aparece na lista de itens pendentes
- Formulário é limpo para novo cadastro

---

## Resultado Obtido

### Teste 1 - Campo Nome do Item Vazio
- ✅ Mensagem de erro "O nome do item é obrigatório" exibida
- ✅ Campo destacado em vermelho
- ✅ Item não foi salvo
- ✅ Usuário permanece na tela de cadastro

### Teste 2 - Campo com 1 Caractere
- ✅ Item salvo com sucesso
- ✅ Item aparece na lista de pendentes
- ✅ Formulário foi limpo
- ✅ Nenhuma mensagem de erro

### Teste 3 - Campo com Apenas Espaços
- ✅ Mensagem de erro exibida
- ✅ Campo destacado em vermelho
- ✅ Item não foi salvo
- ✅ Usuário permanece na tela de cadastro

### Teste 4 - Todos os Campos Vazios
- ✅ Mensagens de erro em todos os campos
- ✅ Todos os campos destacados em vermelho
- ✅ Item não foi salvo
- ✅ Usuário permanece na tela de cadastro

### Teste 5 - Apenas Nome do Idoso Vazio
- ✅ Mensagem de erro "O nome do idoso é obrigatório" exibida
- ✅ Campo destacado em vermelho
- ✅ Item não foi salvo
- ✅ Usuário permanece na tela de cadastro

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120. A validação de campos obrigatórios funciona corretamente. Mensagens de erro são exibidas individualmente para cada campo vazio, melhorando a experiência do usuário.

---

## Rastreabilidade
- **Requisito R3:** Sistema deve validar campos obrigatórios no cadastro de item ✅
- **Modo de Falha F3:** Item é salvo sem preencher campos obrigatórios ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
CT-02-01: Salvar item sem preencher nenhum campo
    [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem preencher campos
    Clicar em salvar item sem preencher campos
    Verificar se erro nome item e exibido

CT-02-02: Salvar item sem informar o nome do idoso
    [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem nome do idoso
    Preencher nome do item    Leite
    Clicar em salvar item
    Verificar se erro nome idoso e exibido
```

**Status de Implementação:** Implementado ✅
