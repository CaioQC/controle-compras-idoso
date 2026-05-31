import React, { useState, useEffect } from 'react';
import Login from './pages/common/Login/Login';
import CadastroUsuario from './pages/common/Cadastro/Cadastro';
import Configuracoes from './pages/common/Configuracoes/Configuracoes';
import FamiliaHome from './pages/familia/Home';
import AdminHome from './pages/admin/Home';
import GerenciarIdosos from './pages/admin/GerenciarIdosos/GerenciarIdosos';
import GerenciarCategorias from './pages/admin/GerenciarCategorias/GerenciarCategorias';
import './App.css';

const getStoredCurrentUser = () => {
  try {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const App = () => {
  const [telaAtual, setTelaAtual] = useState(getStoredCurrentUser() ? 'home' : 'login');
  const [currentUser, setCurrentUser] = useState(getStoredCurrentUser());

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setTelaAtual('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTelaAtual('login');
  };

  const handleDeleteAccount = () => {
    setCurrentUser(null);
    setTelaAtual('login');
  };

  const handleConfig = () => setTelaAtual('configuracoes');
  const handleManageIdosos = () => setTelaAtual('gerenciar-idosos');
  const handleManageCategorias = () => setTelaAtual('gerenciar-categorias');

  if (telaAtual === 'login') {
    return <Login mudarTela={setTelaAtual} onLoginSuccess={handleLoginSuccess} />;
  }

  if (telaAtual === 'cadastro') {
    return <CadastroUsuario mudarTela={setTelaAtual} />;
  }

  if (!currentUser) {
    return <Login mudarTela={setTelaAtual} onLoginSuccess={handleLoginSuccess} />;
  }

  if (telaAtual === 'configuracoes') {
    return (
      <Configuracoes
        onLogout={handleLogout}
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

  return currentUser.role === 'admin' ? (
    <AdminHome
      onManageIdosos={handleManageIdosos}
      onManageCategorias={handleManageCategorias}
      onConfig={handleConfig}
      onLogout={handleLogout}
    />
  ) : (
    <FamiliaHome
      onLogout={handleLogout}
      onConfig={handleConfig}
      onDeleteAccount={handleDeleteAccount}
    />
  );
};

export default App;
