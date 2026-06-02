# Modelagem — Teste de UI: Excluir item (Particionamento de Equivalência)

Técnica: **Particionamento de Equivalência**.
Tela: lista de itens pendentes. Ao clicar em excluir, abre um modal de confirmação; o resultado depende da ação escolhida.

| Índice | Partição | Descrição | Resultado esperado |
|---|---|---|---|
| P1 | Confirmar exclusão | clica em "Confirmar Exclusão" | item removido da lista |
| P2 | Cancelar exclusão | clica em "Cancelar" | item permanece na lista |

Casos:
- CT01 (P1): abre o modal e confirma -> item some da lista
- CT02 (P2): abre o modal e cancela -> item permanece

Implementação: arquivo `excluir_item.robot` (neste mesmo diretório).
