
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Erro crítico: Elemento root não encontrado no DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FreeRewards: Aplicação montada com sucesso.");
  } catch (error) {
    console.error("Erro ao renderizar a aplicação:", error);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a1a3a; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
        <div>
          <h1 style="color: #007bff;">Ops! Algo deu errado.</h1>
          <p>Não foi possível carregar a plataforma. Por favor, recarregue a página.</p>
          <button onclick="window.location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 20px;">TENTAR NOVAMENTE</button>
        </div>
      </div>
    `;
  }
};

// Garante que o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
