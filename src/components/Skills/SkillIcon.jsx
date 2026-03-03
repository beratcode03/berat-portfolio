const SkillIcon = ({ name, Icon, color }) => {
  return (
    <div 
      className="group flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2"
    >
      <div 
        className="text-4xl md:text-5xl text-gray-600 transition-all duration-300"
        style={{ color: 'inherit' }}
      >
        <Icon 
          className="group-hover:drop-shadow-[0_0_15px_var(--icon-color)] transition-colors duration-300 group-hover:text-[var(--icon-color)]" 
          style={{ '--icon-color': color }}
        />
      </div>
      <span className="text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {name}
      </span>
    </div>
  );
};

export default SkillIcon;