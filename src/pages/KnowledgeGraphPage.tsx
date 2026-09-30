import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_GRAPH_NODES, INITIAL_GRAPH_EDGES } from '../data/knowledgeGraph';
import { GraphNode, GraphEdge } from '../types';
import { 
  Network, Search, Filter, RotateCcw, ZoomIn, ZoomOut, 
  Maximize2, X, ChevronRight, Info, ShieldCheck, MapPin, 
  Sprout, Bug, Cpu, FileText, FlaskConical, CloudSun 
} from 'lucide-react';

export const KnowledgeGraphPage: React.FC = () => {
  const { navigateTo, selectedCrop, selectedDistrict, selectedState } = useApp();

  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(INITIAL_GRAPH_EDGES);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(INITIAL_GRAPH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map coordinates in circular / force layout
  const positionedNodes = useMemo(() => {
    const total = nodes.length;
    return nodes.map((node, i) => {
      // Deterministic spread around canvas (width: 900, height: 600)
      let x = 450;
      let y = 300;

      if (node.type === 'state') { x = 160; y = 180 + (i * 120); }
      else if (node.type === 'district') { x = 320; y = 140 + (i * 100); }
      else if (node.type === 'crop') { x = 460; y = 180 + (i * 90); }
      else if (node.type === 'soil') { x = 400; y = 460 + (i * 60); }
      else if (node.type === 'disease') { x = 620; y = 160 + (i * 90); }
      else if (node.type === 'weather') { x = 760; y = 120 + (i * 90); }
      else if (node.type === 'evidence') { x = 740; y = 400 + (i * 90); }
      else if (node.type === 'treatment') { x = 600; y = 480 + (i * 70); }
      else if (node.type === 'sensor') { x = 800; y = 290; }
      else if (node.type === 'observation') { x = 500; y = 70; }

      return { ...node, x, y };
    });
  }, [nodes]);

  // Find connected node IDs for current selection
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const connected = new Set<string>();
    connected.add(selectedNode.id);

    for (const edge of edges) {
      if (edge.source === selectedNode.id) connected.add(edge.target);
      if (edge.target === selectedNode.id) connected.add(edge.source);
    }
    return connected;
  }, [selectedNode, edges]);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return positionedNodes.filter(node => {
      const matchesSearch = !searchQuery || node.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = filterGroup === 'all' || node.group === filterGroup;
      return matchesSearch && matchesGroup;
    });
  }, [positionedNodes, searchQuery, filterGroup]);

  // Filtered Edges
  const visibleNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);
  const visibleEdges = useMemo(() => {
    return edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [edges, visibleNodeIds]);

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'crop': return '#10b981'; // emerald
      case 'disease': return '#f43f5e'; // rose
      case 'state': return '#8b5cf6'; // purple
      case 'district': return '#a855f7'; // violet
      case 'soil': return '#d97706'; // amber
      case 'weather': return '#06b6d4'; // cyan
      case 'evidence': return '#3b82f6'; // blue
      case 'treatment': return '#ec4899'; // pink
      case 'sensor': return '#14b8a6'; // teal
      case 'observation': return '#eab308'; // yellow
      default: return '#64748b';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedNode(INITIAL_GRAPH_NODES[0]);
    setSearchQuery('');
    setFilterGroup('all');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Network className="w-7 h-7 text-emerald-400" />
              <span>Semantic Agricultural Knowledge Graph</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              12,480 Nodes
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Dynamic knowledge network connecting crops, pathogens, regional soils, IoT sensors, and research papers.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.0))}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs flex items-center gap-1.5"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes (e.g. Paddy, Brown Spot, Warangal)..."
            className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'agronomy', label: 'Crops & Soils' },
            { id: 'pathology', label: 'Pathology' },
            { id: 'location', label: 'Geographic' },
            { id: 'science', label: 'Evidence' },
            { id: 'telemetry', label: 'Telemetry' }
          ].map(grp => (
            <button
              key={grp.id}
              onClick={() => setFilterGroup(grp.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                filterGroup === grp.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas Stage + Slide-out Inspector Drawer */}
      <div className="relative rounded-3xl bg-stone-950 border border-stone-800 h-[620px] overflow-hidden flex">
        
        {/* SVG Graph Viewport */}
        <div 
          className="flex-1 h-full cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg className="w-full h-full">
            <defs>
              <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="0.75" fill="#292524" />
              </pattern>
              {/* Arrow Marker */}
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#57534e" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>

            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Transform Group for Pan & Zoom */}
            <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
              
              {/* Edges */}
              {visibleEdges.map((edge) => {
                const srcNode = positionedNodes.find(n => n.id === edge.source);
                const tgtNode = positionedNodes.find(n => n.id === edge.target);
                if (!srcNode || !tgtNode) return null;

                const isConnected = selectedNode && (
                  edge.source === selectedNode.id || edge.target === selectedNode.id
                );

                const midX = (srcNode.x! + tgtNode.x!) / 2;
                const midY = (srcNode.y! + tgtNode.y!) / 2;

                return (
                  <g key={edge.id} className="transition-opacity duration-300">
                    <line
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke={isConnected ? '#10b981' : '#44403c'}
                      strokeWidth={isConnected ? 2 : 1}
                      strokeDasharray={isConnected ? 'none' : '3 3'}
                      opacity={selectedNode && !isConnected ? 0.2 : 0.8}
                      markerEnd={isConnected ? 'url(#arrow-active)' : 'url(#arrow)'}
                    />
                    {/* Edge Label Badge */}
                    <text
                      x={midX}
                      y={midY}
                      fill={isConnected ? '#a7f3d0' : '#78716c'}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isConnected = connectedNodeIds.has(node.id);
                const isDimmed = selectedNode && !isConnected;

                const color = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(node);
                    }}
                    className="cursor-pointer transition-all duration-300"
                    opacity={isDimmed ? 0.25 : 1}
                  >
                    {/* Outer glow ring for selected node */}
                    {isSelected && (
                      <circle
                        r="28"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r="18"
                      fill="#1c1917"
                      stroke={color}
                      strokeWidth={isSelected ? 3 : 2}
                      className="hover:scale-110 transition-transform"
                    />

                    {/* Node Center Dot */}
                    <circle r="5" fill={color} />

                    {/* Node Label Below */}
                    <text
                      y="32"
                      fill={isSelected ? '#ffffff' : '#d6d3d1'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                      className="select-none pointer-events-none drop-shadow-md"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Slide-Out Inspector Drawer */}
        {selectedNode && (
          <div className="w-80 sm:w-96 bg-stone-900 border-l border-stone-800 p-5 overflow-y-auto flex flex-col justify-between shrink-0 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                    {selectedNode.type} Node
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5">{selectedNode.label}</h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Node Metadata / Details */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <span className="font-mono text-emerald-400 uppercase text-[10px] font-bold block">
                  Agronomic Knowledge Attributes:
                </span>
                {selectedNode.details ? (
                  Object.entries(selectedNode.details).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-stone-800/60 pb-1 text-stone-300">
                      <span className="text-stone-300 font-mono capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-stone-200 text-right max-w-[180px] truncate">
                        {Array.isArray(val) ? val.join(', ') : String(val)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-stone-300 italic">No direct attributes.</p>
                )}
              </div>

              {/* Linked Relationships Section */}
              <div className="space-y-2">
                <span className="font-mono text-stone-400 uppercase text-[10px] font-bold block">
                  Active Connected Relationships:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(e => {
                    const isOutgoing = e.source === selectedNode.id;
                    const otherNodeId = isOutgoing ? e.target : e.source;
                    const otherNode = nodes.find(n => n.id === otherNodeId);

                    return (
                      <div
                        key={e.id}
                        onClick={() => otherNode && setSelectedNode(otherNode)}
                        className="p-2 rounded-xl bg-stone-950/70 hover:bg-stone-800 border border-stone-800/80 text-xs flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-mono text-[10px] text-emerald-400">
                            {isOutgoing ? '→' : '←'} {e.label}
                          </span>
                          <span className="text-stone-200 font-medium truncate">
                            {otherNode?.label}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Context Navigation CTA */}
            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={() => navigateTo('/field-analysis')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Cross-Reference Field Telemetry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
