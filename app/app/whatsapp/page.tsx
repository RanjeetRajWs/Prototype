'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Send,
  MousePointer2,
  Code2,
  Settings,
  Trash2,
  Info,
  Smartphone,
} from 'lucide-react';

// Each node is positioned in absolute canvas-pixel coords so the SVG
// connectors can be drawn deterministically between them.
interface Node {
  id: string;
  type: 'welcome' | 'reply' | 'branch';
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  text: string;
}

const NODES: Node[] = [
  { id: 'n1', type: 'welcome', x: 40,  y: 60,  w: 240, h: 110, text: 'Hi! Welcome to {agency_name}. How can I help you today?' },
  { id: 'n2', type: 'reply',   x: 360, y: 20,  w: 240, h: 90,  label: 'Book a tour',   text: 'Great — which city interests you? Reply with Prague, Budapest, Vienna, or Krakow.' },
  { id: 'n3', type: 'reply',   x: 360, y: 140, w: 240, h: 90,  label: 'My booking',    text: 'Please send your booking reference (e.g. TES-2026-04F7K2).' },
  { id: 'n4', type: 'reply',   x: 360, y: 260, w: 240, h: 90,  label: 'Speak to human', text: 'Connecting you with a manager — average wait under 2 minutes.' },
];

// Pre-computed Bézier connectors from the welcome node's right edge
// to each reply node's left edge.
function connectorPath(from: Node, to: Node): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

export default function WhatsAppBuilder() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('n1');
  const selectedNode = NODES.find((n) => n.id === selectedNodeId) ?? NODES[0];

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">WhatsApp Builder</h1>
          <p className="text-ink-2">Design automated booking flows for your customers.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border shadow-sm">
            <Smartphone className="w-4 h-4 mr-2" /> Preview on Phone
          </Button>
          <Button className="bg-success hover:bg-success/90 text-white font-bold shadow-lg gap-2">
            <Send className="w-4 h-4" /> Publish Flow
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Canvas */}
        <div
          className="flex-1 bg-surface border border-border rounded-3xl relative overflow-auto shadow-inner bg-[radial-gradient(circle_at_center,_var(--border)_1px,_transparent_1px)] [background-size:24px_24px]"
        >
          <div className="relative" style={{ width: 720, height: 420 }}>
            {/* Connectors */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width="720"
              height="420"
              viewBox="0 0 720 420"
            >
              {NODES.filter((n) => n.id !== 'n1').map((n) => (
                <g key={`edge-${n.id}`}>
                  <path
                    d={connectorPath(NODES[0], n)}
                    stroke="var(--ink-2)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="2 4"
                    opacity="0.6"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y + n.h / 2}
                    r="3"
                    fill="var(--accent)"
                  />
                </g>
              ))}
            </svg>

            {/* Nodes */}
            {NODES.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`absolute text-left p-4 rounded-xl border-2 shadow-sm cursor-pointer transition-all bg-surface ${
                    isSelected
                      ? 'border-accent ring-4 ring-accent-soft shadow-md'
                      : 'border-border hover:border-ink-3'
                  }`}
                  style={{ left: node.x, top: node.y, width: node.w, height: node.h }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        node.type === 'welcome'
                          ? 'bg-brand text-white'
                          : 'bg-bg text-ink-3'
                      }`}
                    >
                      {node.type}
                    </span>
                    {node.label && (
                      <span className="text-[10px] font-bold text-ink-2 uppercase tracking-widest">
                        ↳ {node.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-ink-2 leading-relaxed line-clamp-3">
                    {node.text}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Canvas controls */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-10">
            <div className="bg-surface border border-border p-2 rounded-xl shadow-lg flex gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><MousePointer2 className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><Plus className="w-4 h-4" /></Button>
              <div className="w-px h-6 bg-border mx-1 self-center" />
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><Code2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        {/* Properties panel */}
        <div className="w-80 flex flex-col gap-6 shrink-0">
          <Card className="border-border shadow-subtle flex-1 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h3 className="font-display font-bold">Node Properties</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-danger"><Trash2 className="w-4 h-4" /></Button>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Node Label</label>
                  <Input key={selectedNode.id} defaultValue={selectedNode.label || 'Start'} className="h-11 rounded-xl font-bold" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Message Content</label>
                  <textarea
                    className="w-full h-40 p-4 bg-bg border border-border rounded-xl text-sm font-medium focus:ring-2 ring-accent/20 outline-none transition-all resize-none"
                    defaultValue={selectedNode.text}
                    key={selectedNode.id}
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['{agency_name}', '{pax_count}', '{tour_name}', '{time}'].map(tag => (
                      <button key={tag} className="px-2 py-1 bg-accent-soft text-accent text-[10px] font-bold rounded hover:bg-accent hover:text-white transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-3 uppercase tracking-widest">Save response</span>
                    <div className="w-10 h-5 bg-success rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <div className="p-3 bg-bg border border-border rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-ink-3">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">Variable mapping</div>
                      <div className="text-xs font-bold">customer_intent</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 bg-brand text-white font-bold rounded-xl mt-6">
                Save Node
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-brand text-white border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-bold">Templates library</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Pre-built flows: booking reminder, tour-day check-in, review request.
              </p>
              <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest h-9 bg-white/5 hover:bg-white/10 text-white border border-white/10">
                Browse Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
