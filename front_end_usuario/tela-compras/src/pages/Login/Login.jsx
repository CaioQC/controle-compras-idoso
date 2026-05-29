import React, { useState } from 'react';
import './Login.css';

export default function Login({ mudarTela }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logar = (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (isSubmitting) return;

    // Validação de campos vazios
    if (email.trim() === '' || senha.trim() === '') {
      setErrorMessage('Ei, preencha todos os campos antes de entrar!');
      return;
    }

    setIsSubmitting(true);

    // Verificar usuários cadastrados no localStorage
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuariosCadastrados.find(u => u.email === email.toLowerCase() && u.senha === senha);

    // Regra de Acesso para a apresentação de hoje (Usuário Fixo)
    if (email === 'admin@familia.com' && senha === '123456') {
      localStorage.setItem('currentUser', JSON.stringify({
        email: 'admin@familia.com',
        nome: 'Administrador',
        senha: '123456'
      }));
      mudarTela('home'); // Sucesso: Vai para o Controle de Necessidades
    } else if (usuario) {
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      mudarTela('home'); // Usuário cadastrado
    } else {
      setErrorMessage('Acesso Negado: Familiar não identificado ou senha incorreta!');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-branding">
        <div className="login-branding-icon">❤</div>
        <div className="login-branding-text">
          <h3>Cuidado ao Idoso</h3>
          <p>Família &amp; Cuidado</p>
        </div>
      </div>

      <div className="login-card">
        <header className="login-header">
          <div className="login-icon-wrapper" aria-hidden="true">
            <span className="login-heart">❤</span>
          </div>
          <div className="login-title">
            <h2>Cuidado ao Idoso</h2>
            <p>Controle de Necessidades e Compras</p>
          </div>
        </header>

        <div className="login-content">
          <form onSubmit={logar} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email" className="login-label">E-mail</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">✉</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="login-email"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-senha" className="login-label">Senha</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">🔒</span>
                <input
                  id="login-senha"
                  type="password"
                  placeholder="••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  data-testid="login-senha"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="login-error" role="alert" data-testid="login-error">
                {errorMessage}
              </p>
            )}

            <button type="submit" className="login-submit" data-testid="login-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="login-footer">
            Não possui conta?{' '}
            <button onClick={() => mudarTela('cadastro')} className="login-link">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>

      <p className="login-page-footer">Cuidado ao Idoso &copy; 2026</p>

    </div>
  );
}