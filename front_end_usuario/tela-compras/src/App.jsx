import React, { useState, useEffect } from 'react';
import Cadastro from './Cadastro';
import Lista from './Lista';
import Login from './pages/Login/Login';
import CadastroUsuario from './pages/Cadastro/Cadastro';
import Configuracoes from './pages/Configuracoes/Configuracoes';
import GerenciarIdosos from './pages/GerenciarIdosos/GerenciarIdosos';
import GerenciarCategorias from './pages/GerenciarCategorias/GerenciarCategorias';
import './App.css';

const App = () => {
  const [telaAtual, setTelaAtual] = useState('login'); 

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('cuidado_lista');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cuidado_lista', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const handleAddItem = (data) => {
    setShoppingList([...shoppingList, { id: crypto.randomUUID(), ...data, status: 'Pendente' }]);
  };

  const handleToggleStatus = (id) => {
    setShoppingList(shoppingList.map(item => item.id === id ? { ...item, status: 'Comprado' } : item));
  };

  const handleArchiveItem = (id) => {
    setShoppingList(shoppingList.map(item => item.id === id ? { ...item, status: 'Arquivado' } : item));
  };

  const handleDeleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const handleDeleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Remover usuário da lista de usuários
    const usuariosAtualizados = usuarios.filter(u => u.email !== currentUser.email);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

    // Remover itens criados pelo usuário
    const listaAtualizada = shoppingList.filter(item => item.responsavel !== currentUser.nome);
    localStorage.setItem('cuidado_lista', JSON.stringify(listaAtualizada));

    // Limpar sessão atual
    localStorage.removeItem('currentUser');

    // Redirecionar para login
    setTelaAtual('login');
  };

  if (telaAtual === 'login') {
    return <Login mudarTela={setTelaAtual} />;
  }

  if (telaAtual === 'cadastro') {
    return <CadastroUsuario mudarTela={setTelaAtual} />;
  }

  if (telaAtual === 'configuracoes') {
    return (
      <Configuracoes
        onLogout={() => setTelaAtual('login')}
        onDeleteAccount={handleDeleteAccount}
        onBack={() => setTelaAtual('home')}
      />
    );
  }

  if (telaAtual === 'gerenciar-idosos') {
    return <GerenciarIdosos onBack={() => setTelaAtual('home')} />;
  }

  if (telaAtual === 'gerenciar-categorias') {
    return <GerenciarCategorias onBack={() => setTelaAtual('home')} />;
  }

  return (
    <main className="main-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="header-icon-wrapper">
              <span className="header-heart">❤</span>
            </div>
            <h1 style={{ margin: 0 }}>Controle de Suprimentos do Idoso</h1>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setTelaAtual('gerenciar-idosos')}
              className="btn-menu"
              data-testid="btn-gerenciar-idosos"
              title="Gerenciar Idosos"
            >
              👴
            </button>
            <button
              onClick={() => setTelaAtual('gerenciar-categorias')}
              className="btn-menu"
              data-testid="btn-gerenciar-categorias"
              title="Gerenciar Categorias"
            >
              📁
            </button>
            <button
              onClick={() => setTelaAtual('configuracoes')}
              className="btn-config"
              data-testid="btn-configuracoes"
            >
              ⚙️
            </button>
            <button
              onClick={() => setTelaAtual('login')}
              className="btn-sair"
              data-testid="btn-sair-principal"
            >
              Sair
            </button>
          </div>
        </div>
        <p>Gestão de Farmácia e Mercado</p>
      </header>
      
      <Cadastro onAddItem={handleAddItem} />

      <Lista
        itens={shoppingList.filter(item => item.status !== 'Arquivado')}
        onToggleStatus={handleToggleStatus}
        onArchive={handleArchiveItem}
        onDelete={handleDeleteItem}
      />
    </main>
  );
};

export default App;