import React, { useMemo } from 'react';
import katex from 'katex';

export default function MathFormula({ math, block = true, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (e) {
      console.error("Error rendering KaTeX math:", e);
      return math;
    }
  }, [math, block]);

  return (
    <div 
      className={`katex-container ${block ? 'my-2 flex justify-center overflow-x-auto py-1' : 'inline-block'} ${className}`} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
