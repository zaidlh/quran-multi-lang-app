"use client";

import React, { useState, useMemo } from "react";

// Node types for the knowledge graph
export interface GraphNode {
  id: string;
  type: "concept" | "prophet" | "place" | "theme" | "surah";
  name: string;
  nameArabic?: string;
  description?: string;
  relatedAyah?: { surah: number; ayah: number }[];
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
  strength: number; // 0-1
}

// Quran Knowledge Graph Data
export const QURAN_KNOWLEDGE_GRAPH = {
  nodes: [
    // Major Themes
    { id: "tawhid", type: "theme", name: "Tawhid", nameArabic: "التوحيد", description: "Oneness of Allah" },
    { id: "iman", type: "theme", name: "Iman", nameArabic: "الإيمان", description: "Faith" },
    { id: "sabr", type: "theme", name: "Patience", nameArabic: "الصبر", description: "Patience and perseverance" },
    { id: "rahma", type: "theme", name: "Mercy", nameArabic: "الرحمة", description: "Divine mercy" },
    { id: "shukr", type: "theme", name: "Gratitude", nameArabic: "الشكر", description: "Thanksgiving" },
    { id: "taqwa", type: "theme", name: "Piety", nameArabic: "التقوى", description: "God-consciousness" },
    { id: "adl", type: "theme", name: "Justice", nameArabic: "العدل", description: "Justice and fairness" },
    { id: "hikmah", type: "theme", name: "Wisdom", nameArabic: "الحكمة", description: "Divine wisdom" },
    { id: "khauf", type: "theme", name: "Fear of Allah", nameArabic: "الخوف", description: "Fear of Allah" },
    { id: " Raja", type: "theme", name: "Hope", nameArabic: "رجاء", description: "Hope in Allah" },
    
    // Prophets
    { id: "adam", type: "prophet", name: "Adam", nameArabic: "آدم", description: "First human and prophet" },
    { id: "nuh", type: "prophet", name: "Noah", nameArabic: "نوح", description: "Prophet of the flood" },
    { id: "ibrahim", type: "prophet", name: "Abraham", nameArabic: "إبراهيم", description: "Father of prophets" },
    { id: "musa", type: "prophet", name: "Moses", nameArabic: "موسى", description: "Prophet who spoke to Allah" },
    { id: "isa", type: "prophet", name: "Jesus", nameArabic: "عيسى", description: "Prophet and messenger" },
    { id: "muhammad", type: "prophet", name: "Muhammad", nameArabic: "محمد", description: "Final messenger" },
    { id: "yunus", type: "prophet", name: "Jonah", nameArabic: "يونس", description: "Prophet of Nineveh" },
    { id: "yusuf", type: "prophet", name: "Joseph", nameArabic: "يوسف", description: "Prophet of wisdom" },
    { id: "ayyub", type: "prophet", name: "Job", nameArabic: "أيوب", description: "Patient sufferer" },
    { id: "ishaq", type: "prophet", name: "Isaac", nameArabic: "إسحاق", description: "Son of Abraham" },
    { id: "yaqub", type: "prophet", name: "Jacob", nameArabic: "يعقوب", description: "Father of Yusuf" },
    { id: "harun", type: "prophet", name: "Aaron", nameArabic: "هرون", description: "Brother of Musa" },
    { id: "shuayb", type: "prophet", name: "Shuayb", nameArabic: "شيب", description: "Prophet of Midian" },
    
    // Places
    { id: "makkah", type: "place", name: "Mecca", nameArabic: "مكة", description: "Holy city of Islam" },
    { id: "madinah", type: "place", name: "Medina", nameArabic: "المدينة", description: "City of the Prophet" },
    { id: "bait_maqdis", type: "place", name: "Al-Aqsa", nameArabic: "المسجد الأقصى", description: "Farthest mosque" },
    { id: "tur_sinai", type: "place", name: "Mount Sinai", nameArabic: "طور سينين", description: "Mountain of Musa" },
    { id: "jahannam", type: "place", name: "Hell", nameArabic: "جهنم", description: "Place of punishment" },
    { id: "jannah", type: "place", name: "Paradise", nameArabic: "الجنة", description: "Eternal garden" },
    
    // Surahs
    { id: "surah_fatiha", type: "surah", name: "Al-Fatiha", surahNumber: 1, description: "The Opening" },
    { id: "surah_yasin", type: "surah", name: "Ya-Sin", surahNumber: 36, description: "The heart of Quran" },
    { id: "surah_mulk", type: "surah", name: "Al-Mulk", surahNumber: 67, description: "The Dominion" },
    { id: "surah_ikhlas", type: "surah", name: "Al-Ikhlas", surahNumber: 112, description: "Sincerity" },
    
    // Concepts
    { id: "qiyamah", type: "concept", name: "Day of Judgment", nameArabic: "قيامة", description: "Final day" },
    { id: "fitnah", type: "concept", name: "Trial", nameArabic: "فتنة", description: "Test and temptation" },
    { id: "shaitan", type: "concept", name: "Satan", nameArabic: "شيطان", description: "The tempter" },
    { id: "nafs", type: "concept", name: "Self", nameArabic: "النفس", description: "The soul" },
  ] as GraphNode[],
  
  edges: [
    // Theme relationships
    { source: "tawhid", target: "iman", relationship: "foundational", strength: 0.95 },
    { source: "sabr", target: "rahma", relationship: "leads_to", strength: 0.7 },
    { source: "shukr", target: "rahma", relationship: "increases", strength: 0.75 },
    { source: "taqwa", target: "jannah", relationship: "leads_to", strength: 0.85 },
    { source: "adl", target: "hikmah", relationship: "requires", strength: 0.8 },
    { source: "khauf", target: " Raja", relationship: "balanced_by", strength: 0.6 },
    
    // Prophet relationships
    { source: "ibrahim", target: "makkah", relationship: "founded", strength: 0.9 },
    { source: "muhammad", target: "madinah", relationship: "migrated", strength: 0.95 },
    { source: "muhammad", target: "makkah", relationship: "born_in", strength: 0.95 },
    { source: "musa", target: "tur_sinai", relationship: "received_at", strength: 0.9 },
    { source: "musa", target: "fir_awn", relationship: "opposed_by", strength: 0.95 },
    { source: "nuh", target: "tufan", relationship: "prophet_during", strength: 0.95 },
    { source: "yusuf", target: "madinah", relationship: "buried_in", strength: 0.8 },
    { source: "isa", target: "maryam", relationship: "born_to", strength: 0.95 },
    { source: "yunus", target: "hut", relationship: "swallowed_by", strength: 0.9 },
    { source: "ibrahim", target: "isa", relationship: "father_of", strength: 0.9 },
    { source: "ibrahim", target: "ishaq", relationship: "father_of", strength: 0.95 },
    { source: "ishaq", target: "yaqub", relationship: "father_of", strength: 0.95 },
    { source: "yaqub", target: "yusuf", relationship: "father_of", strength: 0.95 },
    { source: "musa", target: "harun", relationship: "brother_of", strength: 0.95 },
    
    // Place relationships
    { source: "makkah", target: "kabah", relationship: "location_of", strength: 0.95 },
    { source: "madinah", target: "masjid_nabawi", relationship: "location_of", strength: 0.95 },
    { source: "jannah", target: "tawhid", relationship: "reward_for", strength: 0.9 },
    { source: "jahannam", target: "shaitan", relationship: "destination", strength: 0.7 },
    
    // Theme to surah
    { source: "tawhid", target: "surah_ikhlas", relationship: "primary_theme", strength: 0.95 },
    { source: "rahma", target: "surah_yasin", relationship: "recurs_in", strength: 0.8 },
    { source: "hikmah", target: "surah_mulk", relationship: "recurs_in", strength: 0.8 },
    { source: "iman", target: "surah_fatiha", relationship: "core_of", strength: 0.9 },
  ] as GraphEdge[],
};

// Get node by ID
export function getNode(id: string): GraphNode | undefined {
  return QURAN_KNOWLEDGE_GRAPH.nodes.find((n) => n.id === id);
}

// Get related nodes
export function getRelatedNodes(nodeId: string): Array<{ node: GraphNode; relationship: string; strength: number }> {
  const edges = QURAN_KNOWLEDGE_GRAPH.edges.filter(
    (e) => e.source === nodeId || e.target === nodeId
  );
  
  return edges.map((edge) => ({
    node: getNode(edge.source === nodeId ? edge.target : edge.source)!,
    relationship: edge.source === nodeId ? edge.relationship : `inverse_${edge.relationship}`,
    strength: edge.strength,
  })).filter((r) => r.node);
}

// Search nodes
export function searchNodes(query: string): GraphNode[] {
  const q = query.toLowerCase();
  return QURAN_KNOWLEDGE_GRAPH.nodes.filter(
    (n) =>
      n.name.toLowerCase().includes(q) ||
      n.nameArabic?.includes(q) ||
      n.description?.toLowerCase().includes(q)
  );
}

// Get nodes by type
export function getNodesByType(type: GraphNode["type"]): GraphNode[] {
  return QURAN_KNOWLEDGE_GRAPH.nodes.filter((n) => n.type === type);
}

// Knowledge Graph Visualization Component
export function KnowledgeGraph({ 
  centerNodeId,
  onNodeClick,
}: { 
  centerNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
}) {
  const [selectedNode, setSelectedNode] = useState<string | null>(centerNodeId || null);
  
  const centerNode = selectedNode ? getNode(selectedNode) : null;
  const relatedNodes = selectedNode ? getRelatedNodes(selectedNode) : [];
  
  const nodeColors: Record<string, string> = {
    theme: "bg-purple-500/20 text-purple-600 border-purple-300",
    prophet: "bg-blue-500/20 text-blue-600 border-blue-300",
    place: "bg-green-500/20 text-green-600 border-green-300",
    surah: "bg-amber-500/20 text-amber-600 border-amber-300",
    concept: "bg-pink-500/20 text-pink-600 border-pink-300",
  };
  
  if (!centerNodeId) {
    return (
      <div className="p-6 text-center">
        <p className="text-on-surface-variant">
          Select a concept, prophet, or place to view its relationships
        </p>
        
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["tawhid", "rahma", "sabr", "jannah", "muhammad", "musa", "makkah"].map((id) => {
            const node = getNode(id);
            if (!node) return null;
            return (
              <button
                key={id}
                onClick={() => onNodeClick?.(id)}
                className="px-3 py-1.5 text-xs bg-surface-container rounded-full hover:bg-primary-fixed/20 transition-colors"
              >
                {node.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Center node */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
          nodeColors[centerNode?.type || "concept"]
        }`}>
          <span className="font-semibold">{centerNode?.name}</span>
          {centerNode?.nameArabic && (
            <span className="arabic-text text-sm" dir="rtl">
              {centerNode.nameArabic}
            </span>
          )}
        </div>
        {centerNode?.description && (
          <p className="mt-2 text-sm text-on-surface-variant">
            {centerNode.description}
          </p>
        )}
      </div>
      
      {/* Related nodes */}
      {relatedNodes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-outline text-center">
            Related to {centerNode?.name}:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedNodes.map(({ node, relationship, strength }) => (
              <button
                key={node.id}
                onClick={() => onNodeClick?.(node.id)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:scale-105 ${
                  nodeColors[node.type]
                }`}
                style={{ opacity: strength }}
              >
                {node.name}
                {relationship && (
                  <span className="ml-1 text-[10px] opacity-70">
                    ({relationship.replace("_", " ")})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for using the graph
export function useKnowledgeGraph() {
  return {
    graph: QURAN_KNOWLEDGE_GRAPH,
    getNode,
    getRelatedNodes,
    searchNodes,
    getNodesByType,
  };
}