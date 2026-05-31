import React, { useState } from 'react';
import './Configuracoes.css';

export default function Configuracoes({ onLogout, onDeleteAccount, onBack }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleDeleteConfirm = async () => {
    if (!password) {
      setError('Por favor, insira sua senha para confirmar.');
      return;
    }

    setError('');
    setIsDeleting(true);

    try {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

      const loginResp = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, senha: password })
      });

      if (!loginResp.ok) {
        setError('Senha incorreta. Tente novamente.');
        setIsDeleting(false);
        return;
      }

      const { access_token } = await loginResp.json();

      const deleteResp = await fetch('http://localhost:3000/usuario/me', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${access_token}` }
      });

      if (deleteResp.ok) {
        onDeleteAccount();
      } else {
        setError('Erro ao excluir conta. Tente novamente.');
        setIsDeleting(false);
      }
    } catch {
      setError('Erro ao comunicar com o servidor.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="configuracoes-container">
      <div className="configuracoes-card">
        <header className="configuracoes-header">
          <h2>⚙️ Configurações</h2>
          <p>Gerencie sua conta e dados pessoais</p>
        </header>

        <div className="configuracoes-content">
          <section className="config-section">
            <h3>👤 Informações da Conta</h3>
            <div className="info-item">
              <label>Nome:</label>
              <span>{currentUser.nome || 'Não informado'}</span>
            </div>
            <div className="info-item">
              <label>E-mail:</label>
              <span>{currentUser.email || 'Não informado'}</span>
            </div>
          </section>

          <section className="config-section danger-zone">
            <h3>⚠️ Zona de Perigo</h3>
            <p className="danger-warning">
              Excluir sua conta é uma ação permanente. Todos os seus dados pessoais, 
              itens de compra e histórico serão removidos permanentemente do sistema.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn-delete-account"
              data-testid="btn-excluir-conta"
            >
              🗑️ Excluir Minha Conta
            </button>
          </section>

          <section className="config-section">
            <button onClick={onLogout} className="btn-logout" data-testid="btn-sair-config">
              🚪 Sair da Conta
            </button>
          </section>

          <section className="config-section">
            <button onClick={onBack} className="btn-voltar" data-testid="btn-voltar-config">
              ← Voltar
            </button>
          </section>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" data-testid="modal-excluir-conta">
          <div className="modal-content danger-modal">
            <h3>⚠️ Confirmar Exclusão de Conta</h3>
            <p className="modal-description">
              Esta ação é <strong>irreversível</strong>. Todos os seus dados serão removidos permanentemente:
            </p>
            <ul className="modal-list">
              <li>📝 Seus dados pessoais (nome, e-mail)</li>
              <li>🛒 Todos os itens de compra que você criou</li>
              <li>📊 Seu histórico de compras</li>
              <li>🔐 Suas credenciais de acesso</li>
            </ul>
            <p className="modal-warning">
              Para confirmar, digite sua senha atual:
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="modal-input"
              data-testid="input-senha-exclusao"
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword('');
                  setError('');
                }}
                className="btn-cancelar"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="btn-confirmar-excluir"
                disabled={isDeleting}
                data-testid="btn-confirmar-excluir-conta"
              >
                {isDeleting ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
