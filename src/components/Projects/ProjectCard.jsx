const ProjectCard = ({ project }) => {
  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group bg-surface border border-white/5 rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
        <span className="text-4xl">↗</span>
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
      </div>
      
      <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed flex-1">
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t, i) => (
          <span key={i} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/10">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
};

export default ProjectCard;