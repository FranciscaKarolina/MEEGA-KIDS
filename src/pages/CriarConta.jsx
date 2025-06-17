import React from "react";

function CriarConta() {
  return (
    <div>
      <h2>Criar Conta</h2>
      <input type="text" placeholder="Nome" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />
      <button>Criar Conta</button>
    </div>
  );
}

// Certifique-se de que o componente é exportado como default
export default CriarConta;
