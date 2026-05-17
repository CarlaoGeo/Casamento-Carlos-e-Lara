import React, { useState, useRef,  useEffect } from 'react'; 
import './index.css';
import { listaPresentes } from './assets/listadepresentes';


function TimerCasamento() {
  const [tempoRestante, setTempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });


  useEffect(() => {
    // Data alvo ajustada para 20 de Março de 2027
    const dataCasamento = new Date('2027-03-20T00:00:00').getTime();

    const intervalo = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataCasamento - agora;

      if (diferenca > 0) {
        setTempoRestante({
          dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((diferenca % (1000 * 60)) / 1000),
        });
      } else {
        // Se a data já passou (o grande dia chegou!)
        clearInterval(intervalo);
      }
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalo);
  }, []);
  return (
    <div style={styles.timerContainer}>
      <div style={styles.timerBloco}>
        <span style={styles.timerNumero}>{tempoRestante.dias}</span>
        <span style={styles.timerRotulo}>Dias</span>
      </div>
      <div style={styles.timerBloco}>
        <span style={styles.timerNumero}>{tempoRestante.horas}</span>
        <span style={styles.timerRotulo}>Horas</span>
      </div>
      <div style={styles.timerBloco}>
        <span style={styles.timerNumero}>{tempoRestante.minutos}</span>
        <span style={styles.timerRotulo}>Min</span>
      </div>
      <div style={styles.timerBloco}>
        <span style={styles.timerNumero}>{tempoRestante.segundos}</span>
        <span style={styles.timerRotulo}>Seg</span>
      </div>
    </div>
  );
}


  

function App() {
  // Lógica para saber qual seção mostrar
  const [secaoAtiva, setSecaoAtiva] = useState('informacoes');
  const menuRef = useRef<HTMLElement>(null);
  const [presenteSelecionado, setPresenteSelecionado] = useState<any>(null);
  const linkformulario = "https://forms.gle/5v3xbk4iLvsM27kU7";

  const mudarSecao = (secao: string) => {
    setSecaoAtiva(secao);

    setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  

  return (
    <div style={styles.container}>
      
      {/*FLORES NAS BORDAS */}
      <img src="/folhas_fundo.png" alt="Folhas" style={styles.florTopoEsq} />
      <img src="/folhas_fundo.png" alt="Folhas" style={styles.florBaseDir} />

      {/* SEÇÃO HERO */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.subtitulo}>COM A BENÇÃO DE DEUS E DE SEUS PAIS</p>
          <h1 style={styles.titulo}>Carlos & Lara</h1>
          <p style={styles.data}>20 . 03 . 2027</p>
          <TimerCasamento />
        </div>
      </header>

      {/* MENU DE BOTÕES */}
      <nav ref={menuRef} style={styles.menuNav}>
        <button 
          style={secaoAtiva === 'informacoes' ? styles.botaoAtivo : styles.botao} 
          onClick={() => mudarSecao('informacoes')}
        >
          Informações Gerais
        </button>
        <button 
          style={secaoAtiva === 'presenca' ? styles.botaoAtivo : styles.botao} 
          onClick={() => mudarSecao('presenca')}
        >
          Lista de Presença
        </button>
        <button 
          style={secaoAtiva === 'mapa' ? styles.botaoAtivo : styles.botao} 
          onClick={() => mudarSecao('mapa')}
        >
          Mapa de Mesas
        </button>
        <button 
          style={secaoAtiva === 'pedidos' ? styles.botaoAtivo : styles.botao} 
          onClick={() => mudarSecao('pedidos')}
        >
          Nossos Pedidos
        </button>
      </nav>

      {/* CONTEÚDO DINÂMICO (MUDA CONFORME O BOTÃO) */}
      <main style={styles.mainContent}>
        
        {secaoAtiva === 'informacoes' && (
          <section style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>A Cerimônia</h2>
            <p style={styles.infoText}>Temos a alegria de convidar para o nosso casamento, a ser realizado na:</p>
            <div style={styles.cardLocal} onClick={() => window.open('https://maps.app.goo.gl/3spQXX6snJEu9fN9A', '_blank')}>
              <h3 style={styles.localNome}>Paróquia São Judas Tadeu</h3>
              <p style={styles.localEnd}>Av. Independência, 3747 - Piracicaba</p>
              <p style={styles.localHora}>Às 16h30</p>
            </div>
            <div style={styles.cardLocal} onClick={() => window.open('https://maps.app.goo.gl/hfsmbdfSpoNKn7a48', '_blank')}>
              <h3 style={styles.localNome}>Espaço Haras - Piracicaba</h3>
              <p style={styles.localEnd}>Rod. Dep. Laércio Côrte, Km 136 - Piracicaba, Limeira - SP</p>
              <p style={styles.localHora}>Às 18h00</p>
            </div>
          </section>
        )}

        {secaoAtiva === 'presenca' && (
          <section style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Confirmar Presença</h2>
            <p style={styles.infoText}>Sua presença é muito importante para nós! Por favor, confirme até o dia 20/02/2027.</p>
            <div style={styles.cardLocal}>
              <p>Clique aqui para confirmar sua presença:</p>
              <button 
                style={styles.btnFormulario}
                onClick={() => window.open(linkformulario, '_blank')}
              >
                Confirmar Presença
              </button>
            </div>
          </section>
        )}

        {secaoAtiva === 'mapa' && (
          <section style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Mapa de Mesas</h2>
            <p style={styles.infoText}>Preparamos um lugar especial para você aproveitar a festa conosco.</p>
            <div style={styles.cardLocal}>
              <p>O mapa será liberado próximo à data do evento.</p>
            </div>
          </section>
        )}

        
        {secaoAtiva === 'pedidos' && (
          <section style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Nossos Pedidos</h2>
            <p style={styles.infoText}>
              Sua presença é nosso maior presente! Mas se desejar nos abençoar 
              com algo a mais, criamos algumas opções com muito carinho.
              Temos nosso Link da Magalu, mas também preparamos uma vitrine especial para quem quiser presentear via PIX, com opções que adoramos e que vão nos ajudar a construir nosso lar doce lar.
            </p>
            
            {/* GRID DE PRESENTES */}
            <div style={styles.gridPresentes}>
              
              {/* 1º ITEM FIXO: LISTA DA MAGALU */}
              <div style={styles.cardPresente}>
                {/* Você pode colocar a URL de uma imagem da Magalu ou de casamento aqui */}
                <img 
                  src="https://gretchen.querodecasamento.com.br/static/images/05301e42b9700e855b2e7b9af734a17c.png" 
                  alt="Lista Quero de Casamento Magalu" 
                  style={styles.imgPresente} 
                />
                <div style={styles.cardPresenteConteudo}>
                  <h3 style={styles.tituloPresente}>Lista Quero de Casamento</h3>
                  <p style={styles.descPresente}>Veja nossa lista completa de presentes diretamente no site da Magalu.</p>
                  <p style={styles.valorPresente}>Diversos Valores</p>
                  <button 
                    style={styles.btnPix}
                    onClick={() => window.open('https://www.querodecasamento.com.br/lista-de-casamento/lara-santiago-carlos-eduardo-de-lima-carvalho', '_blank')}
                  >
                    Acessar Site da Magalu
                  </button>
                </div>
              </div>

              {/* DEMAIS ITENS: LISTA VIA PIX */}
              {listaPresentes.map((presente) => (
                <div key={presente.id} style={styles.cardPresente}>
                  <img src={presente.imagem} alt={presente.titulo} style={styles.imgPresente} />
                  <div style={styles.cardPresenteConteudo}>
                    <h3 style={styles.tituloPresente}>{presente.titulo}</h3>
                    <p style={styles.descPresente}>{presente.descricao}</p>
                    <p style={styles.valorPresente}>{presente.valor}</p>
                    <button style={styles.btnPix}
                      onClick={() => setPresenteSelecionado(presente)}
                    >
                      Presentear com PIX
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      {/* POP-UP / MODAL DO PIX */}
      {presenteSelecionado && (
        <div style={styles.modalOverlay} onClick={() => setPresenteSelecionado(null)}>
          {/* O e.stopPropagation() impede que clicar DENTRO da caixa feche ela */}
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.btnFechar} onClick={() => setPresenteSelecionado(null)}>X</button>
            <h3 style={styles.modalTitulo}>{presenteSelecionado.titulo}</h3>
            <p style={styles.modalValor}>{presenteSelecionado.valor}</p>
            
            {/* ESPAÇO PARA O SEU QR CODE */}
            <div style={styles.qrCodeBox}>
              <img 
                src={presenteSelecionado.qrCode} 
                alt="QR Code" 
                style={{width: '150px', height: '150px'}} 
              />
            </div>
            
            <p style={{fontSize: '0.9rem', marginBottom: '15px'}}>Ou copie a chave PIX abaixo:</p>
            <div style={styles.chavePixBox}>
              <span style={{fontWeight: 'bold', userSelect: 'all'}}>{presenteSelecionado.chavePix}</span>
            </div>
          </div>
        </div>
      )}  
      <footer style={{padding: '40px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6, zIndex: 1}}>
        Carlos & Lara © 2027
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  florTopoEsq: {
    position: 'fixed',
    top: -20,
    left: -20,
    width: 'clamp(150px, 35vw, 350px)', // Adapta o tamanho da imagem à tela
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.85,
  },
  florBaseDir: {
    position: 'fixed',
    bottom: -20,
    right: -20,
    width: 'clamp(150px, 35vw, 350px)', // Adapta o tamanho da imagem à tela
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.85,
    transform: 'rotate(180deg)',
  },
  hero: {
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    zIndex: 1,
  },
  heroContent: {
    border: '2px solid var(--verde-claro)',
    padding: 'clamp(30px, 5vw, 50px) clamp(15px, 4vw, 30px)',
    borderRadius: '10px',
    backgroundColor: 'rgba(251, 250, 248, 0.9)',
    zIndex: 1,
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    width: '90%', // Impede que cole nas bordas do celular
    maxWidth: '600px',
    boxSizing: 'border-box',
  },
  subtitulo: { 
    fontSize: 'clamp(0.6rem, 3vw, 0.8rem)', 
    letterSpacing: '2px', 
    marginBottom: '20px', 
    color: 'var(--cinza-texto)' 
  },
  titulo: { 
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
    margin: '0 0 10px 0' 
  },
  data: { 
    fontSize: 'clamp(1rem, 4vw, 1.2rem)', 
    fontWeight: 500, 
    letterSpacing: '3px', 
    color: 'var(--verde-folha)' 
  },
  
  timerContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(8px, 2vw, 15px)',
    marginTop: '25px',
    flexWrap: 'wrap', // Permite quebrar linha em telas muito estreitas
  },
  timerBloco: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 114, 88, 0.08)',
    padding: 'clamp(8px, 2vw, 10px) clamp(10px, 3vw, 15px)',
    borderRadius: '8px',
    minWidth: 'clamp(55px, 15vw, 65px)',
    border: '1px solid rgba(90, 114, 88, 0.15)',
  },
  timerNumero: {
    fontSize: 'clamp(1.2rem, 5vw, 1.6rem)',
    fontWeight: 'bold',
    color: 'var(--verde-folha)',
  },
  timerRotulo: {
    fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--cinza-texto)',
    marginTop: '2px',
  },

  // ESTILOS DO MENU
  menuNav: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 15px)',
    padding: 'clamp(10px, 3vw, 20px)',
    zIndex: 2,
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(251, 250, 248, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  botao: {
    padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
    backgroundColor: 'transparent',
    border: '1px solid var(--verde-folha)',
    borderRadius: '30px',
    color: 'var(--verde-folha)',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    transition: '0.3s',
  },
  botaoAtivo: {
    padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
    backgroundColor: 'var(--verde-folha)',
    border: '1px solid var(--verde-folha)',
    borderRadius: '30px',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(90, 114, 88, 0.3)',
  },

  mainContent: {
    flex: 1,
    zIndex: 1,
    width: '100%',
    padding: '0 15px', // Margem lateral para o mobile
    boxSizing: 'border-box',
  },
  infoSection: { 
    padding: 'clamp(30px, 6vw, 60px) clamp(15px, 4vw, 20px)', 
    textAlign: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 'clamp(40px, 8vw, 80px)', 
    margin: '20px auto', 
    maxWidth: '800px',
    border: '1px solid rgba(255,255,255,0.5)',
    boxSizing: 'border-box',
  },

  sectionTitle: { 
    fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', 
    marginBottom: '20px', 
    textShadow: '0px 0px 8px #ffffff'
  },
  infoText: { 
    fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
    marginBottom: '30px', 
    lineHeight: '1.6', 
    maxWidth: '600px', 
    margin: '0 auto 30px auto',
    textShadow: '0px 0px 32px #ffffff' 
  },
  cardLocal: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 'clamp(20px, 5vw, 40px)', 
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    maxWidth: '450px',
    margin: '10px auto',
    border: '1px solid #eee',
    width: '100%',
    boxSizing: 'border-box',
  },

  localNome: { 
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
    marginBottom: '10px' 
  },
  localEnd: { 
    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
    marginBottom: '15px' 
  },
  localHora: { 
    fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
    fontWeight: 'bold', 
    color: 'var(--verde-folha)' 
  },

  // ESTILOS DA VITRINE DE PRESENTES
  gridPresentes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 250px), 1fr))', // Otimizado para não estourar em telas de 320px
    gap: 'clamp(15px, 4vw, 20px)', 
    marginTop: '30px',
    width: '100%',
  },
  cardPresente: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
  },
  imgPresente: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  cardPresenteConteudo: {
    padding: 'clamp(15px, 4vw, 20px)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tituloPresente: {
    fontSize: 'clamp(1.1rem, 3.5vw, 1.2rem)',
    color: 'var(--verde-folha)',
    marginBottom: '8px',
  },
  descPresente: {
    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    color: 'var(--cinza-texto)',
    marginBottom: '15px',
    flex: 1, 
  },
  valorPresente: {
    fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '15px',
  },
  btnPix: {
    width: '100%',
    padding: 'clamp(10px, 3vw, 12px)',
    backgroundColor: 'var(--verde-folha)',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
  },
  btnFormulario: {
    padding: 'clamp(10px, 3vw, 12px) clamp(20px, 5vw, 30px)',
    backgroundColor: 'var(--verde-folha)',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '1s',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    marginTop: '15px',
  },

  // ESTILOS DO MODAL / POP-UP PIX
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    padding: '15px', // Garante respiro nas bordas laterais do celular
    boxSizing: 'border-box',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 'clamp(20px, 5vw, 30px)',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
  },
  btnFechar: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#888',
    padding: '5px',
  },
  modalTitulo: { 
    color: 'var(--verde-folha)', 
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
    marginBottom: '10px' 
  },
  modalValor: { 
    fontSize: 'clamp(1.5rem, 6vw, 1.8rem)', 
    fontWeight: 'bold', 
    color: '#444', 
    marginBottom: '20px' 
  },
  qrCodeBox: {
    border: '2px dashed var(--verde-claro)',
    padding: '10px',
    borderRadius: '10px',
    display: 'inline-block',
    marginBottom: '20px',
    maxWidth: '100%', // Impede que o QR vaze
  },
  chavePixBox: {
    backgroundColor: '#f4f1ea',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    wordBreak: 'break-all', // Quebra a chave Pix se for muito grande para a tela
    fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
  }
};

export default App;