import { useEffect, useLayoutEffect, useRef } from 'react';
import './ScrollStackEffect.css';

interface ScrollStackEffectProps {
  children: React.ReactNode;
}

const ScrollStackEffect = ({ children }: ScrollStackEffectProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    const updateCardTransforms = () => {
      const scrollTop = window.scrollY;
      const containerHeight = window.innerHeight;
      const stackPosition = containerHeight * 0.2; // 20%
      const scaleEndPosition = containerHeight * 0.1; // 10%
      const itemStackDistance = 40;
      const baseScale = 0.85;
      const itemScale = 0.08;

      cards.forEach((card, i) => {
        if (!card) return;

        const cardTop = card.offsetTop;
        const triggerStart = cardTop - stackPosition - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPosition;
        const pinStart = cardTop - stackPosition - itemStackDistance * i;
        
        // Calculate progress
        const scaleProgress = Math.max(0, Math.min(1, (scrollTop - triggerStart) / (triggerEnd - triggerStart)));
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);

        // Calculate translateY for pinning effect
        let translateY = 0;
        if (scrollTop >= pinStart) {
          translateY = scrollTop - cardTop + stackPosition + itemStackDistance * i;
        }

        // Apply transforms
        const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        card.style.transform = transform;
        card.style.transformOrigin = 'top center';
      });
    };

    const handleScroll = () => {
      updateCardTransforms();
    };

    window.addEventListener('scroll', handleScroll);
    updateCardTransforms(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollerRef} className="scroll-stack-effect">
      {children}
    </div>
  );
};

export default ScrollStackEffect;