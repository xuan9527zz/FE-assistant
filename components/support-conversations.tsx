"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Heart, MessageCircle, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { characters, type Character } from "@/lib/game-data";
import { supportPairs, type SupportRank } from "@/lib/support-data";

const storageKey = "fe-assistant-support-conversations-v1";
const characterById = new Map(characters.map((character) => [character.id, character]));
const pairs = supportPairs.flatMap((pair) => {
  const first = characterById.get(pair.firstId);
  const second = characterById.get(pair.secondId);
  return first && second ? [{ ...pair, first, second }] : [];
});
const validStages = new Set(pairs.flatMap((pair) => pair.ranks.map((rank) => `${pair.key}:${rank}`)));

function Portrait({ character }: { character: Character }) {
  return character.avatarUrl ? (
    // GameWith portraits are already used throughout the site.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={character.avatarUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
  ) : (
    <span aria-hidden="true">{character.name.slice(0, 1)}</span>
  );
}

export function SupportConversations({
  plannedIds,
  routeName,
  onOpenPlanner,
}: {
  plannedIds: string[];
  routeName: string;
  onOpenPlanner: () => void;
}) {
  const [seenStages, setSeenStages] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [plannedOnly, setPlannedOnly] = useState(false);
  const [unfinishedOnly, setUnfinishedOnly] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(saved)) {
          setSeenStages([...new Set(saved.filter((stage): stage is string =>
            typeof stage === "string" && validStages.has(stage),
          ))]);
        }
      } catch {
        setSeenStages([]);
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(seenStages));
  }, [hydrated, seenStages]);

  const seen = useMemo(() => new Set(seenStages), [seenStages]);
  const planned = useMemo(() => new Set(plannedIds), [plannedIds]);
  const totalStages = pairs.reduce((count, pair) => count + pair.ranks.length, 0);
  const visiblePairs = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return pairs.filter((pair) => {
      if (plannedOnly && !(planned.has(pair.firstId) && planned.has(pair.secondId))) return false;
      if (unfinishedOnly && pair.ranks.every((rank) => seen.has(`${pair.key}:${rank}`))) return false;
      return !needle || `${pair.first.name} ${pair.first.ja} ${pair.second.name} ${pair.second.ja}`
        .toLocaleLowerCase()
        .includes(needle);
    });
  }, [query, plannedOnly, unfinishedOnly, planned, seen]);

  const toggleStage = (key: string, rank: SupportRank) => {
    const stage = `${key}:${rank}`;
    setSeenStages((current) => current.includes(stage)
      ? current.filter((item) => item !== stage)
      : [...current, stage]);
  };

  return (
    <section className="support-panel">
      <div className="support-header">
        <div>
          <p className="eyebrow">Support Conversation Ledger</p>
          <h2>支援对话</h2>
          <p>按角色组合查看实际存在的 C／B／A 对话，点亮已看过的阶段，留下接下来要刷的目标。</p>
        </div>
        <div className="support-summary" aria-label="支援对话收集进度">
          <MessageCircle aria-hidden="true" />
          <strong>{seenStages.length}<span> / {totalStages}</span></strong>
          <small>已观看对话阶段 · 保存在此浏览器</small>
        </div>
      </div>

      <div className="support-controls">
        <label className="support-search">
          <Search aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索任一角色"
            aria-label="搜索支援对话角色"
          />
        </label>
        <button
          type="button"
          className="support-filter"
          aria-pressed={plannedOnly}
          onClick={() => setPlannedOnly((current) => !current)}
        >
          <Users aria-hidden="true" />只看{routeName}已选队友
        </button>
        <button
          type="button"
          className="support-filter"
          aria-pressed={unfinishedOnly}
          onClick={() => setUnfinishedOnly((current) => !current)}
        >
          <Heart aria-hidden="true" />只看未看完
        </button>
      </div>

      <div className="support-result-count">显示 {visiblePairs.length} 组角色 · 各组仅列出已确认存在的对话阶段</div>

      {visiblePairs.length ? (
        <div className="support-grid">
          {visiblePairs.map((pair) => {
            const completed = pair.ranks.filter((rank) => seen.has(`${pair.key}:${rank}`)).length;
            return (
              <article className="support-card" key={pair.key}>
                <div className="support-pair">
                  <div className="support-person"><Portrait character={pair.first} /><strong>{pair.first.name}</strong></div>
                  <Heart className="support-pair-heart" aria-hidden="true" />
                  <div className="support-person"><Portrait character={pair.second} /><strong>{pair.second.name}</strong></div>
                </div>
                <div className="support-card-footer">
                  <div className="support-stages" aria-label={`${pair.first.name}与${pair.second.name}的支援对话`}>
                    {pair.ranks.map((rank) => {
                      const watched = seen.has(`${pair.key}:${rank}`);
                      return (
                        <button
                          type="button"
                          key={rank}
                          aria-pressed={watched}
                          aria-label={`${pair.first.name}与${pair.second.name}的${rank}级对话：${watched ? "已观看" : "未观看"}`}
                          onClick={() => toggleStage(pair.key, rank)}
                        >
                          {rank}
                          {watched && <Check className="support-stage-check" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                  <small>{completed}/{pair.ranks.length}</small>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="support-empty">
          <MessageCircle aria-hidden="true" />
          <h3>{plannedOnly && plannedIds.length < 2 ? "先选两名队友" : "没有符合条件的角色组合"}</h3>
          <p>{plannedOnly && plannedIds.length < 2
            ? "在路线预组队中选好角色，就可以只查看他们之间的支援对话。"
            : "试试清除搜索词，或关闭筛选条件。"}</p>
          {plannedOnly && plannedIds.length < 2 && <Button onClick={onOpenPlanner}>前往路线预组队</Button>}
        </div>
      )}
    </section>
  );
}
