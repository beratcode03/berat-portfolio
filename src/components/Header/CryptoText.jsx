import { useState } from 'react';

const CryptoText = ({ text = "BERATCODE" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; 
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className="font-bold tracking-tighter text-gray-100 cursor-default min-w-[150px] inline-block"
    >
      {displayText}
    </span>
  );
};

export default CryptoText;