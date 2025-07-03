import React, { useEffect, useState } from 'react';

interface BouncingIconProps {
  icon: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  className?: string;
}

export const BouncingIcon: React.FC<BouncingIconProps> = ({
  icon,
  delay = 0,
  onClick,
  className = '',
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Start animation after component mounts and delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    if (onClick) {
      setIsTapped(true);
      setTimeout(() => setIsTapped(false), 200);
      onClick();
    }
  };

  return (
    <div 
      className={`cursor-pointer ${className} ${isActive ? 'animate-bounce' : 'opacity-0'} transition-all duration-200 ${
        isHovered ? 'scale-110' : 'scale-100'
      } ${isTapped ? 'scale-95' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {icon}
    </div>
  );
};
