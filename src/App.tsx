
import { useRef, useState } from "react";
import {
  Film, Home, Plus, FolderOpen, Sparkles,
   Upload, Smartphone, Monitor,
  WandSparkles, Play, Clapperboard
} from "lucide-react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [script, setScript] = useState("");
  const [video, setVideo] = useState("");
  const [format, setFormat] = useState("9:16");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function createScript() {
    if (!title.trim()) {
      setMessage("Digite o assunto do vídeo.");
      return;
    }

    setScript(
      `Título: ${title}\n\n` +
      `INTRODUÇÃO:\nVocê já conhece ${title}?\n\n` +
      `DESENVOLVIMENTO:\n` +
      `Vamos conhecer os principais detalhes sobre ${title}.\n\n` +
      `ENCERRAMENTO:\nGostou do conteúdo? Curta, compartilhe e siga nosso perfil!`
    );

    setMessage("Roteiro inicial criado! Você pode editá-lo.");
  }

  function selectVideo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setMessage("Selecione um arquivo de vídeo válido.");
      return;
    }

    setVideo(URL.createObjectURL(file));
    setMessage("Vídeo carregado com sucesso!");
  }

  return (
    <div className="app">

      <aside className="sidebar">
        <h2 className="logo">
          <Clapperboard /> Video Maker <span>AI</span>
        </h2>

        <nav>
          <a className="active"><Home /> Painel inicial</a>
          <a><Plus /> Criar vídeo</a>
          <a><FolderOpen /> Meus projetos</a>
          <a><Sparkles /> Inteligência artificial</a>
          <a><Film /> Biblioteca</a>
        </nav>

        <div className="sidebar-bottom">
          <p>VIDEO MAKER AI</p>
          <small>Versão inicial 1.0</small>
        </div>
      </aside>

      <main className="main">

        <header className="header">
          <div>
            <h1>Painel de criação</h1>
            <p>Transforme suas ideias em vídeos.</p>
          </div>

          <div className="header-tag">
            <Sparkles size={17} /> IA VIDEO
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="eyebrow">SUA CENTRAL DE CRIAÇÃO</span>
            <h2>Crie vídeos incríveis com inteligência artificial.</h2>
            <p>Produza, edite e prepare conteúdos para suas redes sociais.</p>
          </div>

          <Clapperboard size={90} />
        </section>

        <section className="tools">
          <h2>O que deseja criar?</h2>

          <div className="tool-grid">
            <button onClick={() => fileRef.current?.click()}>
              <Upload />
              <strong>Editar vídeo</strong>
              <small>Carregue um vídeo do dispositivo</small>
            </button>

            <button onClick={createScript}>
              <WandSparkles />
              <strong>Criar roteiro</strong>
              <small>Comece com uma ideia</small>
            </button>

            <button onClick={() => setMessage(
              "O gerador de vídeo por IA será conectado na próxima etapa."
            )}>
              <Sparkles />
              <strong>Gerar com IA</strong>
              <small>Criação automatizada</small>
            </button>
          </div>
        </section>

        <section className="workspace">
          <div className="editor">
            <h2>Novo projeto</h2>

            <label>Assunto do vídeo</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex.: Como começar a investir..."
            />

            <label>Formato de vídeo</label>
            <select
              value={format}
              onChange={e => setFormat(e.target.value)}
            >
              <option value="9:16">Vertical 9:16 - Reels/TikTok</option>
              <option value="1:1">Quadrado 1:1 - Instagram</option>
              <option value="16:9">Horizontal 16:9 - YouTube</option>
            </select>

            <label>Roteiro do vídeo</label>
            <textarea
              value={script}
              onChange={e => setScript(e.target.value)}
              placeholder="Escreva seu roteiro ou clique em criar roteiro..."
              rows={8}
            />

            <button className="primary" onClick={createScript}>
              <WandSparkles size={18} />
              Criar roteiro inicial
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              hidden
              onChange={selectVideo}
            />

            <button
              className="secondary"
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={18} /> Importar vídeo
            </button>

            {message && <p className="message">{message}</p>}
          </div>

          <div className="preview">
            <h2>Pré-visualização</h2>

            <div className="screen" data-format={format}>
              {video ? (
                <video
                  src={video}
                  controls
                  playsInline
                  className="video-player"
                />
              ) : (
                <div className="empty">
                  <Play size={38} />
                  <p>Seu vídeo aparecerá aqui</p>
                </div>
              )}
            </div>

            <p className="format">
              Formato selecionado: {format}
            </p>
          </div>
        </section>

        <footer>
          <span>Video Maker AI © 2026</span>
          <span><Smartphone size={14}/> <Monitor size={14}/> Multiplataforma</span>
        </footer>

      </main>
    </div>
  );
}

export default App;
