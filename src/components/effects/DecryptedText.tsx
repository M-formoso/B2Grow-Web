import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
  wrapper: {
    display: 'inline-block' as const,
    whiteSpace: 'pre-wrap' as const
  },
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden' as const,
    clip: 'rect(0,0,0,0)',
    border: 0
  }
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  ...props
}: {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const scramble = () => {
      if (currentIteration < maxIterations) {
        setDisplayText(prev =>
          prev
            .split('')
            .map((char, index) => {
              if (revealedIndices.has(index)) return text[index];
              if (char === ' ') return ' ';
              if (useOriginalCharsOnly) {
                const originalChars = text.split('').filter(c => c !== ' ');
                return originalChars[Math.floor(Math.random() * originalChars.length)];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );
        currentIteration++;
      } else {
        const newRevealed = new Set(revealedIndices);
        if (sequential) {
          const nextIndex = getNextIndex(newRevealed);
          if (nextIndex < text.length && !newRevealed.has(nextIndex)) {
            newRevealed.add(nextIndex);
          }
        } else {
          const unrevealedIndices = Array.from({ length: text.length }, (_, i) => i).filter(i => !newRevealed.has(i));
          if (unrevealedIndices.length > 0) {
            const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
            newRevealed.add(randomIndex);
          }
        }
        setRevealedIndices(newRevealed);
        currentIteration = 0;

        if (newRevealed.size === text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }
    };

    const shouldAnimate = animateOn === 'hover' ? isHovering : !hasAnimated;

    if (shouldAnimate && !isScrambling) {
      setIsScrambling(true);
      setRevealedIndices(new Set());
      interval = setInterval(scramble, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, text, speed, maxIterations, characters, sequential, revealDirection, useOriginalCharsOnly, revealedIndices, isScrambling, animateOn, hasAnimated]);

  useEffect(() => {
    if (animateOn === 'view' && containerRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated]);

  return (
    <div
      ref={containerRef}
      style={styles.wrapper}
      className={parentClassName}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
      {...props}
    >
      <span style={styles.srOnly}>{text}</span>
      <motion.span aria-hidden className={className}>
        {displayText.split('').map((char, index) => (
          <span key={index} className={revealedIndices.has(index) ? className : encryptedClassName}>
            {char}
          </span>
        ))}
      </motion.span>
    </div>
  );
}
