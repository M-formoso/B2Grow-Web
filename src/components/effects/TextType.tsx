'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface TextTypeProps {
  text: string | string[];
  as?: keyof JSX.IntrinsicElements;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: () => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<any>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'hsl(var(--foreground))';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const animateText = () => {
      const currentText = textArray[currentTextIndex];
      
      if (!isDeleting && currentCharIndex <= currentText.length) {
        setDisplayedText(currentText.substring(0, currentCharIndex));
        setCurrentCharIndex(prev => prev + 1);
        timeout = setTimeout(animateText, getRandomSpeed());
        
        if (currentCharIndex === currentText.length) {
          onSentenceComplete?.();
          if (textArray.length > 1) {
            timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
      } else if (isDeleting && currentCharIndex >= 0) {
        setDisplayedText(currentText.substring(0, currentCharIndex));
        setCurrentCharIndex(prev => prev - 1);
        timeout = setTimeout(animateText, deletingSpeed);
        
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
        }
      }
    };

    if (initialDelay > 0) {
      timeout = setTimeout(animateText, initialDelay);
    } else {
      animateText();
    }

    return () => clearTimeout(timeout);
  }, [isVisible, currentCharIndex, isDeleting, currentTextIndex, textArray, getRandomSpeed, deletingSpeed, pauseDuration, initialDelay, onSentenceComplete]);

  const elementProps = {
    ref: containerRef,
    className: `text-type ${className}`,
    style: { color: getCurrentTextColor() },
    ...props
  } as any;

  return (
    <Component {...elementProps}>
      {displayedText}
      {showCursor && (!hideCursorWhileTyping || isDeleting || currentCharIndex === textArray[currentTextIndex]?.length) && (
        <span ref={cursorRef} className={`text-type-cursor ${cursorClassName}`}>
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};

export default TextType;