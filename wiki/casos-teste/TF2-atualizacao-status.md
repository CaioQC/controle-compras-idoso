# TF2 - Atualização de Status de Item

**ID:** TF2  
**Título:** Atualização de Status de Item  
**Tipo:** Teste de Controle de Falha  
**Técnica:** Análise de Valor de Borda  
**Requisito(s) Relacionado(s):** R7  
**Modo(s) de Falha Controlado(s):** F7  

---

## Objetivo
Validar que o status de um item é atualizado corretamente quando o usuário clica no botão "Comprado", movendo o item da aba "Pendentes" para "Histórico".

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário deve estar autenticado
- Usuário deve estar na tela de lista de itens
- Deve existir pelo menos um item com status "Pendente"

---

## Dados de Entrada (Análise de Valor de Borda)

### Teste 1 - Primeiro Item da Lista (Limite Inferior)
- **Item:** Primeiro item pendente
- **Ação:** Clicar em "✓ Comprado"
- **Comportamento Esperado:** Item movido para histórico

### Teste 2 - Item do Meio da Lista
- **Item:** Item no meio da lista
- **Ação:** Clicar em "✓ Comprado"
- **Comportamento Esperado:** Item movido para histórico

### Teste 3 - Último Item da Lista (Limite Superior)
- **Item:** Último item pendente
- **Ação:** Clicar em "✓ Comprado"
- **Comportamento Esperado:** Item movido para histórico

### Teste 4 - Múltiplos Itens Marcados
- **Itens:** 3 itens pendentes
- **Ação:** Marcar 2 itens como comprados
- **Comportamento Esperado:** 2 itens no histórico, 1 pendente

---

## Passos de Execução

1. Fazer login com credenciais válidas
2. Navegar para tela de lista de itens
3. Verificar se aba "Itens Pendentes" está ativa
4. Localizar item a ser testado
5. Clicar no botão "✓ Comprado" do item
6. Aguardar 1 segundo para atualização
7. Verificar se item desapareceu da aba "Pendentes"
8. Clicar na aba "Histórico"
9. Verificar se item aparece no histórico

---

## Resultado Esperado

### Para Todos os Testes
- ✅ Item desaparece da aba "Itens Pendentes"
- ✅ Item aparece na aba "Histórico de Comprados"
- ✅ Status do item muda para "Comprado"
- ✅ Informações do item (nome, idoso, responsável) são mantidas
- ✅ Data/hora de marcação como comprado é registrada
- ✅ Nenhuma mensagem de erro é exibida
- ✅ Outros itens não são afetados

---

## Resultado Obtido

### Teste 1 - Primeiro Item
- ✅ Item desapareceu de "Pendentes"
- ✅ Item aparece em "Histórico"
- ✅ Status atualizado para "Comprado"
- ✅ Informações mantidas corretamente

### Teste 2 - Item do Meio
- ✅ Item desapareceu de "Pendentes"
- ✅ Item aparece em "Histórico"
- ✅ Status atualizado para "Comprado"
- ✅ Informações mantidas corretamente

### Teste 3 - Último Item
- ✅ Item desapareceu de "Pendentes"
- ✅ Item aparece em "Histórico"
- ✅ Status atualizado para "Comprado"
- ✅ Informações mantidas corretamente

### Teste 4 - Múltiplos Itens
- ✅ 2 itens movidos para histórico
- ✅ 1 item permanece em pendentes
- ✅ Todos os status atualizados corretamente
- ✅ Nenhuma informação perdida

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120. A atualização de status funciona corretamente em todas as posições da lista. O sistema mantém integridade dos dados ao mover itens entre abas.

---

## Rastreabilidade
- **Requisito R7:** Status de item deve ser atualizável ✅
- **Modo de Falha F7:** Item não é marcado como comprado quando clicado ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
CT-03-01: Marcar item como comprado
    [Documentation]    Verifica se o item é movido para histórico ao marcar como comprado
    Realizar Login    admin@familia.com    123456
    Adicionar Item    Leite    Maria    João
    Clicar em Comprado    Leite
    Verificar Item em Histórico    Leite
    Verificar Item não em Pendentes    Leite
```

**Status de Implementação:** Implementado ✅
