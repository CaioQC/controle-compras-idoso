# TF5 - Aviso de Irreversibilidade na Exclusão

**ID:** TF5  
**Título:** Aviso de Irreversibilidade na Exclusão  
**Tipo:** Teste de Controle de Falha  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R10  
**Modo(s) de Falha Controlado(s):** F10  

---

## Objetivo
Validar que o sistema exibe um aviso claro informando que a exclusão de conta é irreversível antes de permitir a ação, protegendo o usuário contra exclusão acidental.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Usuário deve estar autenticado com credenciais válidas
- Usuário deve estar na página de configurações
- Botão "Excluir Minha Conta" deve estar visível

---

## Dados de Entrada (Partição de Equivalência)

### Classe 1 - Aviso Exibido Corretamente
- **Ação:** Clicar em "Excluir Minha Conta"
- **Comportamento Esperado:** Modal com aviso aparece

### Classe 2 - Aviso Contém Palavra "Irreversível"
- **Ação:** Verificar conteúdo do modal
- **Comportamento Esperado:** Texto contém "irreversível"

### Classe 3 - Opção de Cancelar Disponível
- **Ação:** Verificar botões do modal
- **Comportamento Esperado:** Botão "Cancelar" está visível e funcional

### Classe 4 - Cancelamento Funciona
- **Ação:** Clicar em "Cancelar"
- **Comportamento Esperado:** Modal fecha, conta não é deletada

---

## Passos de Execução

1. Fazer login com credenciais válidas
2. Acessar página de configurações
3. Localizar botão "Excluir Minha Conta"
4. Clicar no botão
5. Aguardar 1 segundo para modal aparecer
6. Verificar se modal é exibido
7. Ler conteúdo do modal
8. Procurar pela palavra "irreversível"
9. Verificar se botões "Cancelar" e "Confirmar" estão visíveis
10. Clicar em "Cancelar"
11. Verificar se modal fecha
12. Verificar se usuário permanece logado

---

## Resultado Esperado

### Exibição do Modal
- ✅ Modal aparece imediatamente após clicar em "Excluir Minha Conta"
- ✅ Modal é exibido no centro da tela
- ✅ Modal tem fundo escuro (overlay) para destaque
- ✅ Modal não pode ser fechado clicando fora dele

### Conteúdo do Modal
- ✅ Título claro como "Excluir Conta" ou "Atenção"
- ✅ Texto contém a palavra "irreversível"
- ✅ Texto explica que a exclusão é permanente
- ✅ Texto menciona que dados serão perdidos
- ✅ Texto é legível e bem formatado

### Botões do Modal
- ✅ Botão "Cancelar" está visível e funcional
- ✅ Botão "Confirmar Exclusão" está visível
- ✅ Botões têm cores diferentes para destaque
- ✅ Botão "Cancelar" tem cor menos agressiva (cinza/azul)
- ✅ Botão "Confirmar" tem cor agressiva (vermelho)

### Funcionalidade de Cancelamento
- ✅ Clicar em "Cancelar" fecha o modal
- ✅ Usuário retorna à página de configurações
- ✅ Conta não é deletada
- ✅ Usuário permanece logado
- ✅ Nenhuma alteração é feita

---

## Resultado Obtido

### Exibição do Modal
- ✅ Modal apareceu imediatamente
- ✅ Modal exibido no centro da tela
- ✅ Fundo escuro (overlay) presente
- ✅ Modal não fecha ao clicar fora

### Conteúdo do Modal
- ✅ Título "Excluir Conta" exibido
- ✅ Texto contém "irreversível"
- ✅ Explica que exclusão é permanente
- ✅ Menciona perda de dados
- ✅ Texto bem formatado e legível

### Botões do Modal
- ✅ Botão "Cancelar" visível e funcional
- ✅ Botão "Confirmar Exclusão" visível
- ✅ Cores diferenciadas (cinza e vermelho)
- ✅ Botões bem posicionados

### Funcionalidade de Cancelamento
- ✅ Modal fechou ao clicar em "Cancelar"
- ✅ Retornou à página de configurações
- ✅ Conta não foi deletada
- ✅ Usuário permanece logado
- ✅ Nenhuma alteração foi feita

---

## Conteúdo do Modal Verificado

```
Título: Excluir Conta

Mensagem:
"Atenção! Esta ação é irreversível.

Ao confirmar a exclusão de sua conta, todos os seus dados 
serão permanentemente removidos do sistema, incluindo:
- Informações pessoais
- Histórico de compras
- Listas de itens
- Configurações

Esta ação não pode ser desfeita. Tem certeza que deseja continuar?"

Botões:
[Cancelar]  [Confirmar Exclusão]
```

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. O aviso de irreversibilidade é claro e bem apresentado. Modal funciona corretamente, protegendo o usuário contra exclusão acidental. Texto contém todas as informações necessárias.

---

## Rastreabilidade
- **Requisito R10:** Sistema deve avisar sobre irreversibilidade da exclusão ✅
- **Modo de Falha F10:** Sistema não exibe aviso antes de excluir conta ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
US010-CT02 Aviso de irreversibilidade
    [Documentation]    Verifica se o sistema exibe aviso sobre irreversibilidade
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Verificar Aviso Irreversibilidade
    Cancelar Exclusao
    Realizar Logout
```

**Status de Implementação:** Implementado ✅
