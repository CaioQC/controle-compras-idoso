from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time


class TestKeywords(object):
    def __init__(self):
        self.driver = None

    def abrir_navegador(self, url):
        """Abre o navegador Chrome e navega para a URL especificada"""
        self.driver = webdriver.Chrome()
        self.driver.get(url)
        self.driver.maximize_window()

    def fechar_navegador(self):
        """Fecha o navegador"""
        if self.driver:
            self.driver.quit()

    def preencher_campo_de_login(self, email, senha):
        """Preenche os campos de email e senha e clica em entrar"""
        wait = WebDriverWait(self.driver, 10)
        
        # Preencher email
        email_input = wait.until(EC.presence_of_element_located((By.ID, 'login-email')))
        email_input.clear()
        email_input.send_keys(email)
        
        # Preencher senha
        senha_input = self.driver.find_element(By.ID, 'login-senha')
        senha_input.clear()
        senha_input.send_keys(senha)

    def clicar_em_entrar(self):
        """Clica no botão de entrar"""
        wait = WebDriverWait(self.driver, 10)
        entrar_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="login-submit"]')))
        entrar_btn.click()
        
        # Aguarda a tela principal carregar
        time.sleep(1)

    def preencher_campo_nome_item(self, nome):
        """Preenche o campo nome do item"""
        wait = WebDriverWait(self.driver, 10)
        nome_item_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="nome-item"]')))
        nome_item_input.clear()
        nome_item_input.send_keys(nome)

    def preencher_campo_nome_idoso(self, nome_idoso):
        """Preenche o campo nome do idoso"""
        wait = WebDriverWait(self.driver, 10)
        nome_idoso_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="nome-idoso"]')))
        nome_idoso_input.clear()
        nome_idoso_input.send_keys(nome_idoso)

    def preencher_campo_familiar(self, familiar):
        """Preenche o campo familiar responsável"""
        wait = WebDriverWait(self.driver, 10)
        familiar_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="familiar-responsavel"]')))
        familiar_input.clear()
        familiar_input.send_keys(familiar)

    def clicar_no_botao_salvar(self):
        """Clica no botão salvar item"""
        wait = WebDriverWait(self.driver, 10)
        salvar_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="salvar-item"]')))
        salvar_btn.click()
        time.sleep(0.5)

    def verificar_se_erro_nome_item_e_exibido(self):
        """Verifica se a mensagem de erro do campo nome do item está exibida"""
        wait = WebDriverWait(self.driver, 5)
        try:
            erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="erro-nome-item"]')))
            if erro.is_displayed():
                return True
            raise AssertionError("Erro do campo nome do item não está visível")
        except:
            raise AssertionError("Erro do campo nome do item não foi encontrado")

    def verificar_se_erro_nome_idoso_e_exibido(self):
        """Verifica se a mensagem de erro do campo nome do idoso está exibida"""
        wait = WebDriverWait(self.driver, 5)
        try:
            erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="erro-nome-idoso"]')))
            if erro.is_displayed():
                return True
            raise AssertionError("Erro do campo nome do idoso não está visível")
        except:
            raise AssertionError("Erro do campo nome do idoso não foi encontrado")

    def verificar_se_erro_familiar_responsavel_e_exibido(self):
        """Verifica se a mensagem de erro do campo familiar responsável está exibida"""
        wait = WebDriverWait(self.driver, 5)
        try:
            erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="erro-familiar-responsavel"]')))
            if erro.is_displayed():
                return True
            raise AssertionError("Erro do campo familiar responsável não está visível")
        except:
            raise AssertionError("Erro do campo familiar responsável não foi encontrado")

    def verificar_se_item_foi_adicionado_na_lista(self):
        """Verifica se o item foi adicionado na lista de itens pendentes"""
        wait = WebDriverWait(self.driver, 10)
        try:
            itens_pendentes = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="itens-pendentes"]')))
            if itens_pendentes.is_displayed():
                return True
            raise AssertionError("Item não foi adicionado à lista")
        except:
            raise AssertionError("Lista de itens pendentes não foi encontrada")

    # Keywords para US-010 - Excluir conta e dados permanentemente
    def clicar_em_configuracoes(self):
        """Clica no botão de configurações"""
        wait = WebDriverWait(self.driver, 10)
        btn_config = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-configuracoes"]')))
        btn_config.click()
        time.sleep(0.5)

    def clicar_em_excluir_conta(self):
        """Clica no botão de excluir conta"""
        wait = WebDriverWait(self.driver, 10)
        btn_excluir = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-excluir-conta"]')))
        btn_excluir.click()
        time.sleep(0.5)

    def digitar_senha_exclusao(self, senha):
        """Digita a senha no campo de confirmação de exclusão"""
        wait = WebDriverWait(self.driver, 10)
        senha_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="input-senha-exclusao"]')))
        senha_input.clear()
        senha_input.send_keys(senha)

    def confirmar_exclusao(self):
        """Clica no botão de confirmar exclusão"""
        wait = WebDriverWait(self.driver, 10)
        btn_confirmar = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-confirmar-excluir-conta"]')))
        btn_confirmar.click()
        time.sleep(0.5)

    def cancelar_exclusao(self):
        """Clica no botão de cancelar exclusão"""
        wait = WebDriverWait(self.driver, 10)
        btn_cancelar = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.btn-cancelar')))
        btn_cancelar.click()
        time.sleep(0.5)

    def verificar_aviso_irreversibilidade(self):
        """Verifica se o aviso de irreversibilidade está visível"""
        wait = WebDriverWait(self.driver, 10)
        aviso = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.modal-description')))
        if 'irreversível' in aviso.text.lower():
            return True
        raise AssertionError("Aviso de irreversibilidade não encontrado")

    def verificar_mensagem_erro_senha(self):
        """Verifica se a mensagem de erro de senha está visível"""
        wait = WebDriverWait(self.driver, 10)
        erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.modal-error')))
        if erro.is_displayed():
            return True
        raise AssertionError("Mensagem de erro de senha não encontrada")

    def realizar_logout_configuracoes(self):
        """Clica no botão de sair da tela de configurações"""
        wait = WebDriverWait(self.driver, 10)
        btn_sair = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-sair-config"]')))
        btn_sair.click()
        time.sleep(0.5)

    def logout_tela_principal(self):
        """Clica no botão de sair da tela principal"""
        wait = WebDriverWait(self.driver, 10)
        btn_sair = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-sair-principal"]')))
        btn_sair.click()
        time.sleep(0.5)

    def clicar_botao_voltar_configuracoes(self):
        """Clica no botão voltar da tela de configurações"""
        wait = WebDriverWait(self.driver, 10)
        btn_voltar = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-voltar-config"]')))
        btn_voltar.click()
        time.sleep(0.5)

    def clicar_em_cadastro(self):
        """Clica no link de cadastro"""
        wait = WebDriverWait(self.driver, 10)
        link_cadastro = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.login-link')))
        link_cadastro.click()
        time.sleep(0.5)

    def preencher_nome_cadastro(self, nome):
        """Preenche o campo nome no cadastro"""
        wait = WebDriverWait(self.driver, 10)
        nome_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="cadastro-nome"]')))
        nome_input.clear()
        nome_input.send_keys(nome)

    def preencher_email_cadastro(self, email):
        """Preenche o campo email no cadastro"""
        wait = WebDriverWait(self.driver, 10)
        email_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="cadastro-email"]')))
        email_input.clear()
        email_input.send_keys(email)

    def preencher_senha_cadastro(self, senha):
        """Preenche o campo senha no cadastro"""
        wait = WebDriverWait(self.driver, 10)
        senha_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="cadastro-senha"]')))
        senha_input.clear()
        senha_input.send_keys(senha)

    def preencher_confirmar_senha_cadastro(self, senha):
        """Preenche o campo confirmar senha no cadastro"""
        wait = WebDriverWait(self.driver, 10)
        confirmar_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="cadastro-confirmar-senha"]')))
        confirmar_input.clear()
        confirmar_input.send_keys(senha)

    def submeter_cadastro(self):
        """Clica no botão de cadastrar"""
        wait = WebDriverWait(self.driver, 10)
        btn_cadastrar = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="cadastro-submit"]')))
        btn_cadastrar.click()
        time.sleep(2)

    def limpar_localstorage_usuarios(self):
        """Limpa os dados de usuários e sessão do localStorage"""
        if self.driver:
            self.driver.execute_script("localStorage.removeItem('usuarios'); localStorage.removeItem('currentUser');")

    def verificar_mensagem_erro_cadastro(self, mensagem):
        """Verifica se uma mensagem de erro de cadastro está visível"""
        wait = WebDriverWait(self.driver, 10)
        erros = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.cadastro-error')))
        for erro in erros:
            if mensagem.lower() in erro.text.lower():
                return True
        raise AssertionError(f"Mensagem de erro de cadastro esperada não encontrada: {mensagem}")

    def verificar_mensagem_sucesso_cadastro(self, mensagem):
        """Verifica se a mensagem de cadastro com sucesso está visível"""
        wait = WebDriverWait(self.driver, 10)
        sucesso = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="cadastro-success"]')))
        if mensagem.lower() in sucesso.text.lower():
            return True
        raise AssertionError(f"Mensagem de sucesso de cadastro esperada não encontrada: {mensagem}")

    def verificar_redirecionamento_login(self):
        """Verifica se foi redirecionado para a tela de login"""
        wait = WebDriverWait(self.driver, 10)
        login_email = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-email"]')))
        if login_email.is_displayed():
            return True
        raise AssertionError("Não foi redirecionado para a tela de login")

    def verificar_tela_configuracoes(self):
        """Verifica se está na tela de configurações"""
        wait = WebDriverWait(self.driver, 10)
        config_card = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.configuracoes-card')))
        if config_card.is_displayed():
            return True
        raise AssertionError("Não está na tela de configurações")

    def verificar_mensagem_erro_login(self):
        """Verifica se a mensagem de erro de login está visível"""
        wait = WebDriverWait(self.driver, 10)
        erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-error"]')))
        if erro.is_displayed():
            return True
        raise AssertionError("Mensagem de erro de login não encontrada")

    def verificar_login_com_sucesso(self):
        """Verifica se o login foi realizado com sucesso"""
        wait = WebDriverWait(self.driver, 10)
        main_container = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.main-container')))
        if main_container.is_displayed():
            return True
        raise AssertionError("Login não foi realizado com sucesso")
