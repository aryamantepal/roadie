'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Code, Eye, RefreshCw } from 'lucide-react';

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
          theme: 'base',
          securityLevel: 'loose',
          fontFamily: 'var(--font-sans), Instrument Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          themeVariables: {
            darkMode: false,
            background: 'transparent',
            mainBkg: '#ffffff',
            primaryColor: '#ffffff',
            primaryTextColor: '#1b2333',
            primaryBorderColor: '#1d4ed8',
            lineColor: '#2563eb',
            secondaryColor: '#fbfaf8',
            tertiaryColor: '#f4efe6',
            edgeLabelBackground: '#fbfaf7',
            clusterBkg: '#fdfcf9',
            clusterBorder: '#dcd5c5',
            titleColor: '#1b2333',
            nodeBorder: '#2563eb',
            fontFamily: 'var(--font-sans), Instrument Sans, sans-serif',
            fontSize: '13px',
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
        borderRadius: 'var(--r-card)',
        border: '1px solid var(--rule)',
        backgroundColor: 'var(--paper)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-subtle)',
      }}
    >
      {/* Top toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          borderBottom: '1px solid var(--rule)',
          backgroundColor: 'var(--paper-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ink-2)',
              letterSpacing: '0.02em',
            }}
          >
            architecture.mmd
          </span>
          <span
            className="chip live"
            style={{
              fontSize: '11px',
              padding: '2px 8px',
            }}
          >
            Round Agent Graph
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setShowRaw(!showRaw)}
            className="btn-paper"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              fontSize: '12px',
            }}
          >
            {showRaw ? <Eye size={13} /> : <Code size={13} />}
            <span>{showRaw ? 'Visual Diagram' : 'Mermaid Source'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-paper"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              fontSize: '12px',
            }}
          >
            {copied ? <Check size={13} color="var(--emerald)" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Source'}</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      {showRaw ? (
        <pre
          style={{
            margin: 0,
            padding: '20px',
            fontSize: '12.5px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--ink)',
            backgroundColor: 'var(--paper-2)',
            overflowX: 'auto',
            lineHeight: 1.55,
          }}
        >
          {chart}
        </pre>
      ) : (
        <div
          ref={containerRef}
          style={{
            padding: '32px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto',
            backgroundColor: 'var(--paper)',
            minHeight: '440px',
            backgroundPosition: 'center',
            backgroundSize: '24px 24px',
            backgroundImage:
              'radial-gradient(circle, oklch(24% 0.030 260 / 0.06) 1px, transparent 1px)',
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
              className="mermaid-svg-container"
            />
          ) : hasError ? (
            <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: '13px' }}>
              <p>Visual diagram rendering fallback. Inspect raw definition below:</p>
              <pre
                style={{
                  textAlign: 'left',
                  marginTop: '12px',
                  padding: '14px',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--r-control)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {chart}
              </pre>
            </div>
          ) : (
            <div
              style={{
                color: 'var(--ink-3)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <RefreshCw size={14} className="spin-slow" />
              <span>Rendering round agent graph...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
