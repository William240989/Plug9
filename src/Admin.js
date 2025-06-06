import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { Link, useLocation } from "react-router-dom";

import Graficos from "./Graficos";
import TabelaVisitantes from "./TabelaVisitantes";

export default function Admin() {
  const location = useLocation();

  const [visitantes, setVisitantes] = useState([]);
  const [filtroSexo, setFiltroSexo] = useState("");
  const [filtroIdade, setFiltroIdade] = useState("");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");

  useEffect(() => {
    const visitantesRef = ref(database, "visitantes");
    onValue(visitantesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setVisitantes(lista);
      } else {
        setVisitantes([]);
      }
    });
  }, []);

  const aplicarFiltros = (lista) => {
    return lista.filter((v) => {
      // Filtro sexo
      const atendeSexo = filtroSexo ? v.sexo === filtroSexo : true;

      // Filtro idade
      const idadeNum = Number(v.idade);
      const atendeIdade = filtroIdade
        ? filtroIdade === "0-17"
          ? idadeNum <= 17
          : filtroIdade === "18-35"
          ? idadeNum >= 18 && idadeNum <= 35
          : filtroIdade === "36-60"
          ? idadeNum >= 36 && idadeNum <= 60
          : idadeNum > 60
        : true;

      // Filtro cidade
      const atendeCidade = filtroCidade
        ? v.cidade?.toLowerCase() === filtroCidade.toLowerCase()
        : true;

      // Filtro bairro
      const atendeBairro = filtroBairro
        ? v.bairro?.toLowerCase() === filtroBairro.toLowerCase()
        : true;

      // Filtro intervalo de datas
      if (filtroDataInicio || filtroDataFim) {
        const dataRegistro = new Date(v.data);
        const inicio = filtroDataInicio ? new Date(filtroDataInicio) : null;
        const fim = filtroDataFim ? new Date(filtroDataFim) : null;

        if (inicio && dataRegistro < inicio) return false;
        if (fim && dataRegistro > fim) return false;
      }

      return atendeSexo && atendeIdade && atendeCidade && atendeBairro;
    });
  };

  const visitantesFiltrados = aplicarFiltros(visitantes);

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        fontFamily: "Segoe UI, sans-serif",
        padding: "0 20px",
      }}
    >
      {/* Menu de Navegação */}
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

      <h1 style={{ textAlign: "center" }}>Visitantes Lagoinha Montenegro</h1>

      {/* Filtros */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          margin: "20px 0",
          justifyContent: "center",
        }}
      >
        <select
          value={filtroSexo}
          onChange={(e) => setFiltroSexo(e.target.value)}
          style={{
            minWidth: 150,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          <option value="">Todos os sexos</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>

        <select
          value={filtroIdade}
          onChange={(e) => setFiltroIdade(e.target.value)}
          style={{
            minWidth: 150,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          <option value="">Todas as idades</option>
          <option value="0-17">0-17</option>
          <option value="18-35">18-35</option>
          <option value="36-60">36-60</option>
          <option value="60+">60+</option>
        </select>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            minWidth: 320,
          }}
        >
          <label style={{ fontSize: 14, color: "#555" }}>Data início:</label>
          <input
            type="date"
            value={filtroDataInicio}
            onChange={(e) => setFiltroDataInicio(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />

          <label style={{ fontSize: 14, color: "#555" }}>Data fim:</label>
          <input
            type="date"
            value={filtroDataFim}
            onChange={(e) => setFiltroDataFim(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />
        </div>
      </section>

      {/* Componentes de gráfico e tabela */}
      <Graficos visitantes={visitantesFiltrados} />
      <TabelaVisitantes visitantes={visitantesFiltrados} />
    </div>
  );
}
