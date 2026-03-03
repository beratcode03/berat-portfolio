import InteractiveIDE from './InteractiveIDE';
import Quote from './Quote';
import SkillsGrid from '../Skills/SkillsGrid';

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* left side (5 br width) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10 order-2 lg:order-1">
          
          {/* Name Space */}
          <div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-white">
                BERAT
              </span>
            </h1>
          </div>

          {/* quote */}
          <Quote />

          {/* Tech Stack */}
          <div className="pt-2">
             <SkillsGrid />
          </div>
        </div>

        {/* right side (7br) IDE  */}
        <div className="lg:col-span-7 w-full flex justify-center lg:justify-end z-20 order-1 lg:order-2 perspective-container">
          {/* IDE için scale */}
          <div className="w-full transform lg:scale-110 lg:translate-x-5">
             <InteractiveIDE />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;