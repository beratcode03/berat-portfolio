import { Link } from 'react-router-dom';
import CryptoText from './CryptoText';
import { FaGithub } from 'react-icons/fa'; 

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-8 flex justify-between items-center h-20">
      
      {/* logo */}
      <Link to="/" className="font-mono text-2xl md:text-3xl flex items-center select-none group no-underline">
        <CryptoText text="BERATCODE03" />
        <span className="inline-block w-2 h-2 bg-primary rounded-none mx-1 mb-1"></span>
        <span className="text-primary font-bold">dev</span>
        <span className="inline-block w-3 h-7 bg-primary ml-1 animate-blink shadow-[0_0_10px_rgba(139,92,246,0.8)] align-middle mb-1"></span>
      </Link>

      {/* BUTTONS ON THE RIGHT SIDE */}
      <nav className="flex items-center gap-6">
        
        {/* 1. GITHUB BUTTON  */}
        <a 
          href="https://github.com/beratcode03" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors"
        >
          <FaGithub className="text-xl group-hover:text-primary transition-colors" />
          {/* Icon on mobile text on desktop */}
          <span className="hidden md:inline group-hover:underline decoration-primary underline-offset-4">
            _github
          </span>
        </a>

        {/* 2. PROJECTS BUTTON */}
        <Link 
          to="/projects" 
          className="font-mono text-sm text-primary hover:text-primary-glow transition-all border border-primary/20 px-4 py-2 rounded hover:bg-primary/10"
        >
          <span className="text-gray-500">_</span>projects
        </Link>
      </nav>
    </header>
  );
};

export default Header;