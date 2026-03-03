import { useState, useRef } from 'react';

const InteractiveIDE = () => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div 
      className="perspective-1000 w-full"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="w-full bg-[#1e1e1e] rounded-lg shadow-2xl shadow-primary/20 border border-white/10 overflow-hidden"
      >
        {/* IDE Header */}
        <div className="bg-[#252526] px-4 py-3 flex items-center border-b border-black/40">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
             <span className="text-blue-400">📄</span> berat.cs 
          </span>
        </div>

        {/* CODE AREA */}
        <div className="p-5 font-mono text-[11px] sm:text-xs text-gray-300 leading-6 overflow-hidden">
            <div className="flex">
                {/* Line Numbers */}
                <div className="text-gray-600 select-none mr-4 text-right border-r border-gray-700 pr-3 opacity-50">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21
                </div>
                
                {/* Code Content */}
                <div className="w-full">
                    <span className="text-[#569cd6]">namespace</span> BeratCode.Dev<br/>
                    {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-[#569cd6]">public class</span> <span className="text-[#4ec9b0]">FullStackDev</span> : <span className="text-[#4ec9b0]">Human</span><br/>
                    &nbsp;&nbsp;{'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#569cd6]">public string</span> Name = <span className="text-[#ce9178]">"BERAT"</span>;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#569cd6]">public string</span> Location = <span className="text-[#ce9178]">"Turkey"</span>;<br/>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#569cd6]">public string</span>[] Stack = <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ce9178]">"React"</span>, <span className="text-[#ce9178]">"Node.js"</span>, <span className="text-[#ce9178]">"C#"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ce9178]">"TypeScript"</span>, <span className="text-[#ce9178]">"Tailwind"</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'};<br/>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#569cd6]">public string</span> Motto = <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ce9178]">"Discipline. Consistency. Continuous Learning."</span>;<br/>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#569cd6]">public void</span> <span className="text-[#dcdcaa]">Build</span>()<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">while</span>(<span className="text-[#569cd6]">true</span>)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#dcdcaa]">Learn</span>();<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#dcdcaa]">Code</span>();<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#dcdcaa]">Improve</span>();<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'}
                </div>
            </div>
        </div>
        
        {/* Footer Bar */}
        <div className="bg-[#007acc] text-white text-[10px] px-2 py-1 flex justify-between font-sans">
            <div>master*</div>
            <div className="flex gap-4">
                <span>Ln 1, Col 1</span>
                <span>UTF-8</span>
                <span>C#</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveIDE;