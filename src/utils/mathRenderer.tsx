import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Parses strings containing $inline$ and $$block$$ math formulas and renders them using KaTeX.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', inline = true }) => {
  if (!content) return null;

  // Split string by $$...$$ (block) and $...$ (inline)
  // Regex pattern matching $...$ or $$...$$
  const parts: React.ReactNode[] = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }

    const matchedStr = match[0];
    const isBlock = matchedStr.startsWith('$$') && matchedStr.endsWith('$$');
    const formula = isBlock 
      ? matchedStr.slice(2, -2).trim() 
      : matchedStr.slice(1, -1).trim();

    try {
      const html = katex.renderToString(formula, {
        displayMode: isBlock,
        throwOnError: false,
        output: 'html'
      });
      parts.push(
        <span
          key={match.index}
          className={isBlock ? 'block my-2 overflow-x-auto py-1' : 'inline-block mx-0.5'}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      parts.push(<span key={match.index} className="font-mono text-amber-300">{formula}</span>);
    }

    lastIndex = regex.lastIndex;
  }

  // Remainder
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
};
