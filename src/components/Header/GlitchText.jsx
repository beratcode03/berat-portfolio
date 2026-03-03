const GlitchText = ({ text }) => {
  return (
    <div className="relative group cursor-default">
      <span 
        className="glitch-wrapper font-bold tracking-tighter text-gray-100 group-hover:text-white transition-colors" 
        data-text={text}
      >
        {text}
      </span>
    </div>
  );
};

export default GlitchText;