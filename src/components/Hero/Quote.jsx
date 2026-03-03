const Quote = () => {
  return (
    <div className="border-l-4 border-primary pl-6 py-2 my-6 bg-white/5 backdrop-blur-sm rounded-r-lg relative overflow-hidden group">
      
      {/* low bloom effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <p className="italic text-gray-300 text-sm md:text-[15px] leading-relaxed font-light">
        "Çalışmadan, yorulmadan, öğrenmeden rahat yaşama yollarını alışkanlık haline getirmiş milletler; evvela haysiyetlerini, sonra hürriyetlerini, daha sonra da istikballerini kaybetmeye mahkûmdurlar."
      </p>
      
      <footer className="flex items-center gap-3 mt-3">
        <div className="h-[1px] w-8 bg-primary"></div>
        <span className="text-primary text-xs font-bold uppercase tracking-widest">
          Mustafa Kemal Atatürk
        </span>
      </footer>
    </div>
  );
};

export default Quote;