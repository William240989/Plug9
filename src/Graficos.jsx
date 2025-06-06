import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

export default function Graficos({ visitantes }) {
  const sexoData = [
    {
      name: "Masculino",
      value: visitantes.filter((v) => v.sexo === "Masculino").length,
    },
    {
      name: "Feminino",
      value: visitantes.filter((v) => v.sexo === "Feminino").length,
    },
    {
      name: "Outro",
      value: visitantes.filter((v) => v.sexo === "Outro").length,
    },
  ];

  const estadoCivilData = [
    {
      name: "Solteiro(a)",
      value: visitantes.filter((v) => v.estadoCivil === "Solteiro(a)").length,
    },
    {
      name: "Casado(a)",
      value: visitantes.filter((v) => v.estadoCivil === "Casado(a)").length,
    },
    {
      name: "Divorciado(a)",
      value: visitantes.filter((v) => v.estadoCivil === "Divorciado(a)").length,
    },
    {
      name: "Viúvo(a)",
      value: visitantes.filter((v) => v.estadoCivil === "Viúvo(a)").length,
    },
  ];

  const faixaEtariaData = [
    {
      name: "0-17",
      value: visitantes.filter((v) => Number(v.idade) <= 17).length,
    },
    {
      name: "18-35",
      value: visitantes.filter(
        (v) => Number(v.idade) >= 18 && Number(v.idade) <= 35
      ).length,
    },
    {
      name: "36-60",
      value: visitantes.filter(
        (v) => Number(v.idade) >= 36 && Number(v.idade) <= 60
      ).length,
    },
    {
      name: "60+",
      value: visitantes.filter((v) => Number(v.idade) > 60).length,
    },
  ];

  return (
    <section style={{ marginTop: 40, marginBottom: 60 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Dashboard</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 20,
        }}
      >
        {/* Gráfico Sexo */}
        <div style={{ width: 300, minHeight: 300 }}>
          <h3 style={{ textAlign: "center" }}>Distribuição por Sexo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sexoData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {sexoData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Estado Civil */}
        <div style={{ width: 300, minHeight: 300 }}>
          <h3 style={{ textAlign: "center" }}>Estado Civil</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={estadoCivilData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Faixa Etária */}
        <div style={{ width: 300, minHeight: 300 }}>
          <h3 style={{ textAlign: "center" }}>Faixa Etária</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={faixaEtariaData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
