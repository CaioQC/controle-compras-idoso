*** Settings ***
Library    Keywords_us04.py

Suite Setup    Configurar Suite
Suite Teardown    Fechar Navegador

*** Variables ***
${URL}              http://localhost:5173
${ADMIN_EMAIL}      admin@example.com
${ADMIN_SENHA}      admin1!
${CATEGORIA_TESTE}  Categoria Teste US04

*** Keywords ***
Configurar Suite
    Abrir Navegador    ${URL}
    Fazer Login Admin    ${ADMIN_EMAIL}    ${ADMIN_SENHA}

*** Test Cases ***
CT-04-01 Categoria cadastrada com sucesso
    [Documentation]    Validar que o usuário admin cadastra categoria com nome válido.
    Ir Para Gerenciar Categorias
    Preencher Nome Categoria    ${CATEGORIA_TESTE}
    Clicar Em Adicionar Categoria
    Verificar Categoria Na Lista    ${CATEGORIA_TESTE}
    Excluir Categoria Por Nome    ${CATEGORIA_TESTE}
    Voltar Para Painel Admin

CT-04-02 Campo obrigatório vazio
    [Documentation]    Validar que o sistema bloqueia cadastro sem nome de categoria.
    Ir Para Gerenciar Categorias
    Clicar Em Adicionar Categoria
    Verificar Mensagem Erro Categoria    O nome da categoria é obrigatório
    Voltar Para Painel Admin

CT-04-03 Categoria duplicada
    [Documentation]    Validar que o sistema impede cadastro de categoria com nome já existente.
    Ir Para Gerenciar Categorias
    Preencher Nome Categoria    Medicamento
    Clicar Em Adicionar Categoria
    Verificar Mensagem Erro Categoria    Esta categoria já existe
    Voltar Para Painel Admin
