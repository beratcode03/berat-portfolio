import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../../data/dummyProjects';
import { FaGithub, FaFolder, FaRegFileCode, FaBookOpen, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // HTML etiketlerini çalıştırmak için eklendi

const timeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));
  
  const [commitInfo, setCommitInfo] = useState({ message: "Loading latest commit...", date: "", url: "" });
  const [readmeContent, setReadmeContent] = useState("Loading README...");

  useEffect(() => {
    if (project && project.repoName) {
      // 1. Son Commit Bilgisini Çek
      fetch(`https://api.github.com/repos/beratcode03/${project.repoName}/commits`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const latestCommit = data[0];
            setCommitInfo({
              message: latestCommit.commit.message.split('\n')[0],
              date: timeAgo(latestCommit.commit.author.date),
              url: latestCommit.html_url
            });
          } else {
            setCommitInfo({ message: "No commits found.", date: "", url: "" });
          }
        })
        .catch(err => {
          console.error("Error fetching commit:", err);
          setCommitInfo({ message: "Failed to load commit data.", date: "", url: "" });
        });

      // 2. Canlı README Dosyasını Çek
      fetch(`https://api.github.com/repos/beratcode03/${project.repoName}/readme`)
        .then(res => res.json())
        .then(data => {
          if (data.download_url) {
            return fetch(data.download_url);
          }
          throw new Error("README URL not found");
        })
        .then(res => res.text())
        .then(text => {
          // GITHUB RAW URL'si: Kırık resimleri düzeltmek için ana dizin linki
          const rawBaseUrl = `https://raw.githubusercontent.com/beratcode03/${project.repoName}/main/`;
          
          let fixedText = text
            // HTML içindeki (örn: <img src="docs/...">) lokal yolları mutlak GitHub yoluna çevirir
            .replace(/src="(?!(?:https?|ftp):\/\/)(.*?)"/g, `src="${rawBaseUrl}$1"`)
            // Markdown içindeki (örn: ![alt](docs/...)) lokal yolları mutlak GitHub yoluna çevirir
            .replace(/!\[(.*?)\]\((?!(?:https?|ftp):\/\/)(.*?)\)/g, `![$1](${rawBaseUrl}$2)`);

          setReadmeContent(fixedText);
        })
        .catch(err => {
          console.error("Error fetching README:", err);
          setReadmeContent("Failed to load README.md from GitHub.");
        });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen pt-28 px-6 text-center text-white flex flex-col items-center">
        <h2 className="text-2xl font-mono mb-4 text-primary">404 - Project Not Found</h2>
        <Link to="/projects" className="text-gray-400 hover:text-white underline">Return to projects</Link>
      </div>
    );
  }

  const renderFiles = () => {
    if (project.id === 1) { 
      return (
        <>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>client</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>electron</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>server</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>shared</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaRegFileCode className="text-gray-400 text-lg" /> <span>package.json</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaRegFileCode className="text-gray-400 text-lg" /> <span>vite.config.ts</span></div>
        </>
      );
    } else { 
      return (
        <>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>public</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaFolder className="text-blue-400 text-lg" /> <span>src</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaRegFileCode className="text-gray-400 text-lg" /> <span>package.json</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaRegFileCode className="text-gray-400 text-lg" /> <span>tailwind.config.js</span></div>
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 cursor-default"><FaRegFileCode className="text-gray-400 text-lg" /> <span>vite.config.js</span></div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 md:px-20 pb-12 bg-background">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-2 mb-8 text-xl md:text-2xl font-mono">
          <FaGithub className="text-gray-400" />
          <span className="text-primary">beratcode03</span>
          <span className="text-gray-500">/</span>
          <span className="font-bold text-gray-100">{project.repoName}</span>
          <span className="ml-3 text-[10px] sm:text-xs border border-gray-600 text-gray-400 px-2 py-0.5 rounded-full font-sans uppercase">
            Public
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-6">
            
            <div className="border border-white/10 rounded-lg bg-surface overflow-hidden font-mono text-sm shadow-lg">
              <div className="bg-[#161b22] px-4 py-3 border-b border-white/10 text-gray-300 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3 truncate pr-4">
                  <span className="font-bold shrink-0">beratcode03</span> 
                  {commitInfo.url ? (
                    <a href={commitInfo.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 truncate hover:underline transition-colors">
                      {commitInfo.message}
                    </a>
                  ) : (
                    <span className="text-gray-400 truncate">{commitInfo.message}</span>
                  )}
                </div>
                <span className="text-gray-500 text-xs shrink-0">{commitInfo.date}</span>
              </div>
              
              <div className="flex flex-col">
                {renderFiles()}
                <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-gray-300 cursor-default">
                  <FaBookOpen className="text-gray-400 text-lg" /> <span>README.md</span>
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-lg bg-surface overflow-hidden shadow-lg">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 font-bold text-gray-200 flex items-center gap-2">
                 <FaBookOpen className="text-gray-400" /> README.md
              </div>
              <div className="p-6 md:p-8 font-sans overflow-x-auto">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} // HTML KODLARINI ÇALIŞTIRIR
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white border-b border-white/10 pb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-200" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed text-base mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                    
                    // RESİMLER YAN YANA DİZİLSİN VE RESPONSIVE OLSUN DİYE EKLENDİ (inline-block ve mr-2)
                    img: ({node, ...props}) => <img className="inline-block rounded-md max-w-full h-auto mr-2 mb-2 shadow-md" {...props} />,
                    
                    // DIV ETİKETLERİ (Özellikle Quantpraxus'taki align="center" divleri için)
                    div: ({node, ...props}) => {
                      if (props.align === "center") {
                        return <div className="flex flex-col justify-center items-center w-full my-6" {...props} />;
                      }
                      return <div className="my-4" {...props} />;
                    },
                    
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-gray-400 bg-white/5 my-4 rounded-r" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline 
                        ? <code className="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> 
                        : <code className="block bg-[#161b22] p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300 border border-white/10 my-4" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full text-left border-collapse" {...props} /></div>,
                    th: ({node, ...props}) => <th className="border-b border-white/10 py-2 px-4 text-gray-200 bg-white/5 font-semibold" {...props} />,
                    td: ({node, ...props}) => <td className="border-b border-white/10 py-2 px-4 text-gray-300" {...props} />,
                  }}
                >
                  {readmeContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-bold text-gray-100 mb-4 text-lg border-b border-white/10 pb-2">About</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {project.desc.substring(0, 110)}...
              </p>
              
              <div className="space-y-3">
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-glow text-white py-2 rounded-md transition-colors text-sm font-semibold shadow-lg">
                    <FaExternalLinkAlt className="text-sm" /> Live Demo
                  </a>
                )}
                
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2 rounded-md transition-colors text-sm font-semibold shadow-lg">
                  <FaGithub className="text-lg" /> Source on GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-100 mb-4 text-sm">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs font-mono text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link to="/projects" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2 font-mono">
                 ← cd ../projects
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;