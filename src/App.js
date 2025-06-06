import React, { useState } from "react";
import { database } from "./firebase";
import { ref, push } from "firebase/database";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation

export default function App() {
  const location = useLocation();

  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    sexo: "",
    idade: "",
    cidade: "",
    bairro: "",
    estadoCivil: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => v.trim() === "")) {
      alert("Preencha todos os campos.");
      return;
    }

    const visitanteRef = ref(database, "visitantes");
    await push(visitanteRef, {
      ...form,
      data: new Date().toISOString(),
    });

    alert("Cadastro enviado com sucesso!");
    setForm({
      nome: "",
      whatsapp: "",
      sexo: "",
      idade: "",
      cidade: "",
      bairro: "",
      estadoCivil: "",
    });
  };

  return (
    <div style={estilos.container}>
      {/* Menu de navegação */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <Link
          to="/"
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: 5,
            fontWeight: "bold",
            color: location.pathname === "/" ? "white" : "#4caf50",
            backgroundColor:
              location.pathname === "/" ? "#4caf50" : "transparent",
            border: `2px solid #4caf50`,
            transition: "all 0.3s",
          }}
        >
          Formulário
        </Link>

        <Link
          to="/admin"
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: 5,
            fontWeight: "bold",
            color: location.pathname === "/admin" ? "white" : "#4caf50",
            backgroundColor:
              location.pathname === "/admin" ? "#4caf50" : "transparent",
            border: `2px solid #4caf50`,
            transition: "all 0.3s",
          }}
        >
          Cadastros
        </Link>
      </nav>

      <h1 style={estilos.titulo}>Plug - Lagoinha</h1>
      <form onSubmit={handleSubmit} style={estilos.form}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          style={estilos.input}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp com DDD"
          value={form.whatsapp}
          onChange={handleChange}
          style={estilos.input}
        />
        <select
          name="sexo"
          value={form.sexo}
          onChange={handleChange}
          style={estilos.input}
        >
          <option value="">Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          value={form.idade}
          onChange={handleChange}
          style={estilos.input}
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          style={estilos.input}
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          style={estilos.input}
        />
        <select
          name="estadoCivil"
          value={form.estadoCivil}
          onChange={handleChange}
          style={estilos.input}
        >
          <option value="">Estado civil</option>
          <option value="Solteiro(a)">Solteiro(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Viúvo(a)">Viúvo(a)</option>
        </select>
        <button type="submit" style={estilos.botao}>
          Enviar
        </button>
      </form>
    </div>
  );
}

const estilos = {
  container: {
    maxWidth: "480px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  titulo: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  botao: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
