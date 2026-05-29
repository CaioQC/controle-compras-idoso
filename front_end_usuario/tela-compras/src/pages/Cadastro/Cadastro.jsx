import React, { useState } from 'react';
import './Cadastro.css';

export default function Cadastro({ mudarTela }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('mínimo 6 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('uma letra maiúscula');
    if (!/[a-z]/.test(password)) errors.push('uma letra minúscula');
    if (!/[0-9]/.test(password)) errors.push('um número');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('um caractere especial');
    return errors;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório';
    } else if (nome.trim().split(' ').length < 2) {
      newErrors.nome = 'Informe nome e sobrenome';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else {
      const passwordErrors = validatePassword(senha);
      if (passwordErrors.length > 0) {
        newErrors.senha = `A senha deve conter: ${passwordErrors.join(', ')}`;
      }
    }

    if (!confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme sua senha';
    } else if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fazerCadastro = async (evento) => {
    evento.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Verificar se e-mail já existe no localStorage
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const emailJaExiste = usuariosCadastrados.some(u => u.email === email.toLowerCase());

      if (emailJaExiste) {
        setErrors({ email: 'E-mail já cadastrado' });
        setIsSubmitting(false);
        return;
      }

      // Salvar novo usuário
      const novoUsuario = {
        id: crypto.randomUUID(),
        nome: nome.trim(),
        email: email.toLowerCase(),
        senha: senha
      };

      usuariosCadastrados.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

      setSuccessMessage('Cadastro realizado com sucesso! Faça login para continuar.');
      setTimeout(() => {
        mudarTela('login');
      }, 2000);
    } catch (error) {
      setErrors({ geral: 'Erro ao realizar cadastro. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = validatePassword(senha);
  const getPasswordStrengthColor = () => {
    const strength = passwordStrength.length;
    if (strength === 0) return '#28a745'; // Forte - verde
    if (strength <= 1) return '#ffc107'; // Média - amarelo
    if (strength <= 2) return '#fd7e14'; // Fraca - laranja
    if (strength <= 3) return '#dc3545'; // Muito fraca - vermelho
    return '#dc3545'; // Muito fraca - vermelho
  };

  return (
    <div className="cadastro-page" data-testid="cadastro-page">
      <div className="cadastro-branding">
        <div className="cadastro-branding-icon">❤</div>
        <div className="cadastro-branding-text">
          <h3>Cuidado ao Idoso</h3>
          <p>Família &amp; Cuidado</p>
        </div>
      </div>

      <div className="cadastro-card">
        <header className="cadastro-header">
          <div className="cadastro-icon-wrapper" aria-hidden="true">
            <span className="cadastro-heart">❤</span>
          </div>
          <div className="cadastro-title">
            <h2>Criar Conta</h2>
            <p>Cadastre-se para gerenciar as compras</p>
          </div>
        </header>

        <div className="cadastro-content">
          {successMessage && (
            <div className="cadastro-success" data-testid="cadastro-success">
              {successMessage}
            </div>
          )}
          <form onSubmit={fazerCadastro} className="cadastro-form">
            <div className="cadastro-field">
              <label htmlFor="cadastro-nome" className="cadastro-label">Nome Completo</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">👤</span>
                <input
                  id="cadastro-nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  data-testid="cadastro-nome"
                  autoComplete="name"
                />
              </div>
              {errors.nome && <p className="cadastro-error">{errors.nome}</p>}
            </div>

            <div className="cadastro-field">
              <label htmlFor="cadastro-email" className="cadastro-label">E-mail</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">✉</span>
                <input
                  id="cadastro-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="cadastro-email"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="cadastro-error">{errors.email}</p>}
            </div>

            <div className="cadastro-field">
              <label htmlFor="cadastro-senha" className="cadastro-label">Senha</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">🔒</span>
                <input
                  id="cadastro-senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha forte"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  data-testid="cadastro-senha"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {senha && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${((5 - passwordStrength.length) / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    />
                  </div>
                  <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                    {passwordStrength.length === 0 ? 'Senha forte' : 'Força: Fraca'}
                  </span>
                </div>
              )}
              {errors.senha && <p className="cadastro-error">{errors.senha}</p>}
            </div>

            <div className="cadastro-field">
              <label htmlFor="cadastro-confirmar-senha" className="cadastro-label">Confirmar Senha</label>
              <div className="input-with-icon">
                <span className="field-icon" aria-hidden="true">🔒</span>
                <input
                  id="cadastro-confirmar-senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  data-testid="cadastro-confirmar-senha"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmarSenha && <p className="cadastro-error">{errors.confirmarSenha}</p>}
            </div>

            {errors.geral && <p className="cadastro-error geral">{errors.geral}</p>}

            <button type="submit" className="cadastro-submit" data-testid="cadastro-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="cadastro-footer">
            Já possui conta?{' '}
            <button onClick={() => mudarTela('login')} className="cadastro-link">
              Faça Login
            </button>
          </p>
        </div>
      </div>

      <p className="cadastro-page-footer">Cuidado ao Idoso &copy; 2026</p>
    </div>
  );
}