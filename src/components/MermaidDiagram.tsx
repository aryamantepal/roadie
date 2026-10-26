'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showRaw, setShowRaw] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
          themeVariables: {
            darkMode: true,
            background: '#0d1117',
            mainBkg: '#161b22',
            primaryColor: '#1f2937',
            primaryTextColor: '#f3f4f6',
            primaryBorderColor: '#374151',
            lineColor: '#60a5fa',
            secondaryColor: '#111827',
            tertiaryColor: '#1f242c',
            edgeLabelBackground: '#0d1117',
            clusterBkg: '#0d1117',
            clusterBorder: '#30363d',
            titleColor: '#e5e7eb',
            nodeBorder: '#4b5563',
          },
        });

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, chart);

        if (isMounted) {
          setSvgContent(svg);
          setHasError(false);
        }
      } catch (err) {
        console.error('Failed to render Mermaid diagram:', err);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        border: '1px solid #30363d',
        backgroundColor: '#0d1117',
        overflow: 'hidden',
      }}
    >
      {/* Top toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid #21262d',
          backgroundColor: '#161b22',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '12px',
              fontWeight: 600,
              color: '#8b949e',
            }}
          >
            architecture.mmd
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: '#21262d',
              color: '#c9d1d9',
            }}
          >
            Mermaid Diagram
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setShowRaw(!showRaw)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#21262d',
              border: '1px solid #30363d',
              color: '#c9d1d9',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            {showRaw ? <Eye size={13} /> : <Code size={13} />}
            <span>{showRaw ? 'Visual View' : 'Raw Definition'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#21262d',
              border: '1px solid #30363d',
              color: '#c9d1d9',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            {copied ? <Check size={13} color="#3fb950" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Source'}</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      {showRaw ? (
        <pre
          style={{
            margin: 0,
            padding: '16px',
            fontSize: '12px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: '#c9d1d9',
            backgroundColor: '#0d1117',
            overflowX: 'auto',
            lineHeight: 1.5,
          }}
        >
          {chart}
        </pre>
      ) : (
        <div
          ref={containerRef}
          style={{
            padding: '24px 16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto',
            backgroundColor: '#0d1117',
            minHeight: '360px',
          }}
        >
          {svgContent ? (
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          ) : hasError ? (
            <div style={{ textAlign: 'center', color: '#8b949e', fontSize: '13px' }}>
              <p>Visual diagram rendering unavailable. Showing raw definition below:</p>
              <pre
                style={{
                  textAlign: 'left',
                  marginTop: '12px',
                  padding: '12px',
                  background: '#161b22',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
              >
                {chart}
              </pre>
            </div>
          ) : (
            <div style={{ color: '#8b949e', fontSize: '13px' }}>Rendering agent architecture diagram...</div>
          )}
        </div>
      )}
    </div>
  );
};
