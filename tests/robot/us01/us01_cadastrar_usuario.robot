*** Settings ***
Library    ../resources/Keywords.py

Suite Teardown    Limpar Banco Ao Final Da Suite
Test Setup    abrir_navegador    http://localhost:5173
Test Teardown    fechar_navegador

*** Keywords ***
Limpar Banco Ao Final Da Suite
    abrir_navegador    http://localhost:5173
    excluir_usuario_banco    caio.queiroz@example.com    Abc123!
    excluir_usuario_banco    duplicado.teste@example.com    Abc123!
    fechar_navegador

*** Test Cases ***
CT-01-01 Cadastro realizado com sucesso
    [Documentation]    Validar cadastro do familiar cuidador com nome completo, e-mail válido e senha forte.
    Clicar em Cadastro
    Preencher Nome Cadastro    Caio Queiroz Caetano
    Preencher Email Cadastro    caio.queiroz@example.com
    Preencher Senha Cadastro    Abc123!
    Preencher Confirmar Senha Cadastro    Abc123!
    Submeter Cadastro
    Verificar Mensagem Sucesso Cadastro    Cadastro realizado com sucesso
    Verificar Redirecionamento Login

CT-01-02 Nome incompleto
    [Documentation]    Validar que o formulário bloqueia cadastro quando o nome não possui sobrenome.
    Clicar em Cadastro
    Preencher Nome Cadastro    Caio
    Preencher Email Cadastro    caio.queiroz@example.com
    Preencher Senha Cadastro    Abc123!
    Preencher Confirmar Senha Cadastro    Abc123!
    Submeter Cadastro
    Verificar Mensagem Erro Cadastro    Informe nome e sobrenome

CT-01-03 E-mail inválido
    [Documentation]    Validar que o formulário rejeita e-mail em formato inválido.
    Clicar em Cadastro
    Preencher Nome Cadastro    Caio Queiroz Caetano
    Preencher Email Cadastro    caio.queiroz@invalid
    Preencher Senha Cadastro    Abc123!
    Preencher Confirmar Senha Cadastro    Abc123!
    Submeter Cadastro
    Verificar Mensagem Erro Cadastro    E-mail inválido

CT-01-04 Senha fraca
    [Documentation]    Validar que o formulário bloqueia cadastro quando a senha não atende aos critérios mínimos.
    Clicar em Cadastro
    Preencher Nome Cadastro    Caio Queiroz Caetano
    Preencher Email Cadastro    caio.queiroz@example.com
    Preencher Senha Cadastro    abc
    Preencher Confirmar Senha Cadastro    abc
    Submeter Cadastro
    Verificar Mensagem Erro Cadastro    A senha deve conter

CT-01-05 E-mail já cadastrado
    [Documentation]    Validar que o sistema impede novo cadastro com e-mail já existente.
    Clicar em Cadastro
    Preencher Nome Cadastro    Caio Queiroz Caetano
    Preencher Email Cadastro    duplicado.teste@example.com
    Preencher Senha Cadastro    Abc123!
    Preencher Confirmar Senha Cadastro    Abc123!
    Submeter Cadastro
    Verificar Mensagem Sucesso Cadastro    Cadastro realizado com sucesso
    Verificar Redirecionamento Login
    Clicar em Cadastro
    Preencher Nome Cadastro    Maria Silva
    Preencher Email Cadastro    duplicado.teste@example.com
    Preencher Senha Cadastro    Abc123!
    Preencher Confirmar Senha Cadastro    Abc123!
    Submeter Cadastro
    Verificar Mensagem Erro Cadastro    E-mail já cadastrado
