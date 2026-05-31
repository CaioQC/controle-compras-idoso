*** Settings ***
Documentation     Testes para US-010 - Excluir conta e dados permanentemente
Library           SeleniumLibrary
Suite Setup       Abrir Navegador
Suite Teardown    Fechar Navegador

*** Variables ***
${BASE_URL}       http://localhost:3000
${EMAIL_TESTE}    teste@exclusao.com
${SENHA_TESTE}    Teste123@
${NOME_TESTE}     Usuário Teste

*** Test Cases ***
US010-CT01 Criar usuário de teste
    [Documentation]    Cria um usuário de teste para os casos de exclusão
    [Tags]    US010    setup
    Ir Para Pagina    ${BASE_URL}
    Clicar Em Cadastro
    Preencher Nome Cadastro    ${NOME_TESTE}
    Preencher Email Cadastro    ${EMAIL_TESTE}
    Preencher Senha Cadastro    ${SENHA_TESTE}
    Preencher Confirmar Senha Cadastro    ${SENHA_TESTE}
    Submeter Cadastro
    Verificar Redirecionamento Login

US010-CT02 Aviso de irreversibilidade
    [Documentation]    Verifica se o sistema exibe aviso destacando que a exclusão é irreversível
    [Tags]    US010    exclusao    aviso
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Verificar Aviso Irreversibilidade
    Cancelar Exclusao
    Realizar Logout

US010-CT03 Confirmar com senha incorreta
    [Documentation]    Verifica se o sistema bloqueia a exclusão com senha incorreta
    [Tags]    US010    exclusao    senha-incorreta
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Digitar Senha Exclusao    senha_errada
    Confirmar Exclusao
    Verificar Mensagem Erro Senha
    # Modal não fecha com senha incorreta, então cancelamos
    Cancelar Exclusao
    Realizar Logout

US010-CT04 Cancelar exclusão de conta
    [Documentation]    Verifica se a conta é mantida ao cancelar o processo de exclusão
    [Tags]    US010    exclusao    cancelar
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Cancelar Exclusao
    Verificar Tela Configuracoes
    # Usa o botão voltar para sair da tela de configurações
    Clicar Botao Voltar Configuracoes
    # Aguarda voltar para a tela principal
    Wait Until Element Is Visible    css=.main-container    10s
    # Agora faz logout da tela principal
    Logout Da Tela Principal
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Verificar Login Com Sucesso
    Logout Da Tela Principal

US010-CT05 Excluir conta com sucesso
    [Documentation]    Verifica se a conta é excluída permanentemente ao confirmar com senha correta
    [Tags]    US010    exclusao    sucesso
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Clicar Em Configuracoes
    Clicar Em Excluir Conta
    Digitar Senha Exclusao    ${SENHA_TESTE}
    Confirmar Exclusao
    Verificar Redirecionamento Login
    Tentar Login Com Credenciais Excluidas    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Verificar Mensagem Erro Login

*** Keywords ***
Abrir Navegador
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${options}    add_argument    --log-level=3
    Call Method    ${options}    add_argument    --disable-logging
    Call Method    ${options}    add_experimental_option    excludeSwitches    enable-logging
    Open Browser    ${BASE_URL}    chrome    options=${options}
    Set Selenium Implicit Wait    10s
    Maximize Browser Window

Fechar Navegador
    Close Browser

Realizar Login
    [Arguments]    ${email}    ${senha}
    Wait Until Element Is Visible    css=[data-testid="login-email"]    10s
    Input Text    css=[data-testid="login-email"]    ${email}
    Input Text    css=[data-testid="login-senha"]    ${senha}
    Click Element    css=[data-testid="login-submit"]
    Wait Until Element Is Visible    css=.main-container    10s

Clicar Em Configuracoes
    Click Element    css=[data-testid="btn-configuracoes"]
    Wait Until Element Is Visible    css=.configuracoes-card    10s

Clicar Em Excluir Conta
    Click Element    css=[data-testid="btn-excluir-conta"]
    Wait Until Element Is Visible    css=[data-testid="modal-excluir-conta"]    10s

Digitar Senha Exclusao
    [Arguments]    ${senha}
    Input Text    css=[data-testid="input-senha-exclusao"]    ${senha}

Confirmar Exclusao
    Click Element    css=[data-testid="btn-confirmar-excluir-conta"]
    # Não espera o modal fechar pois pode não fechar com senha incorreta

Cancelar Exclusao
    Click Element    css=.btn-cancelar
    Wait Until Element Is Not Visible    css=[data-testid="modal-excluir-conta"]    10s

Verificar Redirecionamento Login
    Wait Until Element Is Visible    css=[data-testid="login-email"]    10s

Verificar Tela Configuracoes
    Element Should Be Visible    css=.configuracoes-card

Verificar Mensagem Erro Senha
    Element Should Be Visible    css=.modal-error

Verificar Aviso Irreversibilidade
    Element Should Be Visible    css=.modal-description
    Element Should Contain    css=.modal-description    irreversível

Realizar Logout
    Click Element    css=[data-testid="btn-sair-config"]
    Wait Until Element Is Visible    css=[data-testid="login-page"]    10s

Logout Da Tela Principal
    Click Element    css=[data-testid="btn-sair-principal"]
    Wait Until Element Is Visible    css=[data-testid="login-page"]    10s

Tentar Login Com Credenciais Excluidas
    [Arguments]    ${email}    ${senha}
    Input Text    css=[data-testid="login-email"]    ${email}
    Input Text    css=[data-testid="login-senha"]    ${senha}
    Click Element    css=[data-testid="login-submit"]

Verificar Mensagem Erro Login
    Element Should Be Visible    css=[data-testid="login-error"]

Verificar Login Com Sucesso
    Element Should Be Visible    css=.main-container

Clicar Botao Voltar Configuracoes
    Click Element    css=[data-testid="btn-voltar-config"]
    Wait Until Element Is Visible    css=.main-container    10s

Ir Para Pagina
    [Arguments]    ${url}
    Go To    ${url}

Clicar Em Cadastro
    Click Element    css=.login-link
    Wait Until Element Is Visible    css=.cadastro-form    10s

Preencher Nome Cadastro
    [Arguments]    ${nome}
    Input Text    css=[data-testid="cadastro-nome"]    ${nome}

Preencher Email Cadastro
    [Arguments]    ${email}
    Input Text    css=[data-testid="cadastro-email"]    ${email}

Preencher Senha Cadastro
    [Arguments]    ${senha}
    Input Text    css=[data-testid="cadastro-senha"]    ${senha}

Preencher Confirmar Senha Cadastro
    [Arguments]    ${senha}
    Input Text    css=[data-testid="cadastro-confirmar-senha"]    ${senha}

Submeter Cadastro
    Click Element    css=[data-testid="cadastro-submit"]
    Wait Until Element Is Visible    css=[data-testid="login-email"]    10s
