import React, { useEffect, useRef, useState } from "react";
import "./InfiniteScrollText.css";

interface IInfiniteScrollTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const InfiniteScrollText: React.FC<IInfiniteScrollTextProps> = ({
  text,
  speed = 10,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [repeatedText, setRepeatedText] = useState(text);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;

      let repeatCount = Math.ceil((containerWidth * 2) / textWidth);
      if (repeatCount < 2) repeatCount = 2;

      setRepeatedText(Array(repeatCount).fill(text).join(" \u00A0\u00A0 "));
    }
  }, [text]);

  return (
    <div className={`scroll-container ${className}`} ref={containerRef}>
      <div
        className="scroll-content"
        style={{ animationDuration: `${speed}s` }}
      >
        <span ref={textRef}>{repeatedText}</span>
      </div>
    </div>
  );
};

export default InfiniteScrollText;
