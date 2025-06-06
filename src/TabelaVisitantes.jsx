import React, { useState, useEffect } from "react";

const thStyle = {
  padding: "12px 8px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px 8px",
  border: "1px solid #ddd",
};

// Template da mensagem padrão, com placeholder para o nome
const MENSAGEM_PADRAO_TEMPLATE =
  "Olá, {nome}! Seja muito bem-vindo à Lagoinha Montenegro! É uma alegria ter recebido você conosco no culto. Que você se sinta acolhido e em casa neste ambiente de fé, esperança e amor. VIVA O NOVO DE DEUS em sua vida! Que esta experiência seja um marco de transformação, paz e renovação para o seu coração. Se tiver alguma dúvida ou precisar de ajuda, estamos à disposição — é só nos procurar, será um prazer conversar com você! Deus te abençoe!!";

// Função para formatar número para o padrão WhatsApp (com código do país)
function formatarNumeroParaWhatsapp(numero) {
  let numeroLimpo = numero.replace(/\D/g, "");

  // Remove zeros à esquerda
  while (numeroLimpo.startsWith("0")) {
    numeroLimpo = numeroLimpo.slice(1);
  }

  // Adiciona código do país (55) caso não tenha
  if (!numeroLimpo.startsWith("55")) {
    numeroLimpo = "55" + numeroLimpo;
  }

  return numeroLimpo;
}

export default function TabelaVisitantes({ visitantes }) {
  const [enviouMensagem, setEnviouMensagem] = useState(() => {
    const salvo = localStorage.getItem("enviouMensagem");
    return salvo ? JSON.parse(salvo) : {};
  });

  // Gera mensagem com nome e já codifica para URL
  function gerarMensagemComNome(nome) {
    const mensagem = MENSAGEM_PADRAO_TEMPLATE.replace("{nome}", nome);
    return encodeURIComponent(mensagem);
  }

  function enviarMensagemPadrao(whatsapp, id, nome) {
    const numeroFormatado = formatarNumeroParaWhatsapp(whatsapp);
    const mensagem = gerarMensagemComNome(nome);
    const url = `https://wa.me/${numeroFormatado}?text=${mensagem}`;
    window.open(url, "_blank");
    setEnviouMensagem((prev) => ({ ...prev, [id]: true }));
  }

  function enviarMensagemPersonalizada(whatsapp, nome) {
    const numeroFormatado = formatarNumeroParaWhatsapp(whatsapp);
    const mensagem = encodeURIComponent(`Olá, ${nome}, como você está?`);
    const url = `https://wa.me/${numeroFormatado}?text=${mensagem}`;
    window.open(url, "_blank");
  }

  return (
    <section style={{ marginTop: 60 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}></h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>WhatsApp</th>
              <th style={thStyle}>Sexo</th>
              <th style={thStyle}>Idade</th>
              <th style={thStyle}>Cidade</th>
              <th style={thStyle}>Bairro</th>
              <th style={thStyle}>Estado Civil</th>
              <th style={thStyle}>Data Cadastro</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{v.nome}</td>
                <td style={tdStyle}>{v.whatsapp}</td>
                <td style={tdStyle}>{v.sexo}</td>
                <td style={tdStyle}>{v.idade}</td>
                <td style={tdStyle}>{v.cidade}</td>
                <td style={tdStyle}>{v.bairro}</td>
                <td style={tdStyle}>{v.estadoCivil}</td>
                <td style={tdStyle}>
                  {v.data ? new Date(v.data).toLocaleDateString() : ""}
                </td>
                <td style={{ ...tdStyle, display: "flex", gap: "8px" }}>
                  <button
                    onClick={() =>
                      enviarMensagemPadrao(v.whatsapp, v.id, v.nome)
                    }
                    disabled={enviouMensagem[v.id]}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: enviouMensagem[v.id]
                        ? "#ccc"
                        : "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: enviouMensagem[v.id] ? "not-allowed" : "pointer",
                    }}
                  >
                    {enviouMensagem[v.id]
                      ? "Mensagem Enviada"
                      : "Enviar Mensagem"}
                  </button>

                  <button
                    onClick={() =>
                      enviarMensagemPersonalizada(v.whatsapp, v.nome)
                    }
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Mensagem Personalizada
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
