import React from 'react';

export default function Home({ onManageIdosos, onManageCategorias, onConfig, onLogout }) {
  return (
    <main className="main-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="header-icon-wrapper">
              <span className="header-heart">❤</span>
            </div>
            <h1 style={{ margin: 0 }}>Painel de Administração</h1>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button onClick={onConfig} className="btn-config" title="Configurações">⚙️</button>
            <button onClick={onLogout} className="btn-sair" title="Sair">Sair</button>
          </div>
        </div>
        <p>Gerencie idosos, categorias e o acesso à plataforma</p>
      </header>

      <section className="admin-actions" style={{ padding: '20px', display: 'grid', gap: '16px', maxWidth: '640px', margin: '0 auto' }}>
        <button onClick={onManageIdosos} className="btn-menu" data-testid="btn-gerenciar-idosos">
          👴 Gerenciar Idosos
        </button>
        <button onClick={onManageCategorias} className="btn-menu" data-testid="btn-gerenciar-categorias">
          📁 Gerenciar Categorias
        </button>
      </section>
    </main>
  );
}
