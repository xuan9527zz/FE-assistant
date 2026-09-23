"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  Check,
  ChevronRight,
  CirclePlus,
  Clock3,
  ExternalLink,
  Gift,
  GraduationCap,
  Heart,
  Info,
  ListChecks,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  characters,
  conditionLabel,
  conditionScore,
  getGiftDetails,
  isFastestRoute,
  routeColor,
  routes,
  sources,
  type Character,
  type RouteKey,
} from "@/lib/game-data";

type Plans = Record<RouteKey, string[]>;

const emptyPlans: Plans = { cai: [], dietrich: [], theodora: [], leda: [] };
const storageKey = "fortunes-weave-recruitment-plans-v1";

type WebMCPContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown | Promise<unknown>;
    },
    options?: { signal?: AbortSignal },
  ) => void | Promise<void>;
};

function nextPaint() {
  return new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
}

function tierLabel(tier?: number) {
  return tier ? `Tier ${tier}` : "暂未评级";
}

export default function Home() {
  const [route, setRoute] = useState<RouteKey>("leda");
  const [query, setQuery] = useState("");
  const [plans, setPlans] = useState<Plans>(emptyPlans);
  const [hydrated, setHydrated] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const routeRef = useRef(route);
  const plansRef = useRef(plans);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setPlans({ ...emptyPlans, ...JSON.parse(saved) });
        const savedRoute = window.localStorage.getItem(`${storageKey}-route`) as RouteKey | null;
        if (savedRoute && routes.some((item) => item.key === savedRoute)) setRoute(savedRoute);
      } catch {
        setPlans(emptyPlans);
      } finally {
        setHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(plans));
    window.localStorage.setItem(`${storageKey}-route`, route);
  }, [hydrated, plans, route]);

  useEffect(() => {
    routeRef.current = route;
    plansRef.current = plans;
  }, [plans, route]);

  useEffect(() => {
    if (!hydrated) return;

    const context = (document as Document & { modelContext?: WebMCPContext }).modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const register = async () => {
      await context.registerTool(
        {
          name: "read_recruitment_plan",
          title: "读取路线招募计划",
          description: "读取当前选择的路线与该路线已保存的预组队角色。",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
          annotations: { readOnlyHint: true, untrustedContentHint: false },
          execute: () => {
            const currentRoute = routeRef.current;
            return {
              route: currentRoute,
              routeName: routes.find((item) => item.key === currentRoute)?.name,
              characters: plansRef.current[currentRoute]
                .map((id) => characters.find((character) => character.id === id)?.name)
                .filter(Boolean),
            };
          },
        },
        { signal: lifecycle.signal },
      );

      await context.registerTool(
        {
          name: "save_route_recruitment_plan",
          title: "保存路线招募计划",
          description: "选择一条路线，并用角色 ID 批量替换该路线的预组队名单；可从角色资料的 id 字段取得 ID。",
          inputSchema: {
            type: "object",
            properties: {
              route: { type: "string", enum: routes.map((item) => item.key) },
              characterIds: {
                type: "array",
                items: { type: "string", enum: characters.map((character) => character.id) },
                uniqueItems: true,
              },
            },
            required: ["route", "characterIds"],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input) {
            if (!input || typeof input !== "object") throw new Error("输入必须是对象");
            const candidate = input as { route?: unknown; characterIds?: unknown };
            const validRoute = routes.some((item) => item.key === candidate.route);
            const validIds =
              Array.isArray(candidate.characterIds) &&
              candidate.characterIds.every(
                (id) => typeof id === "string" && characters.some((character) => character.id === id),
              ) &&
              new Set(candidate.characterIds).size === candidate.characterIds.length;
            if (!validRoute || !validIds) throw new Error("路线或角色 ID 无效");

            const targetRoute = candidate.route as RouteKey;
            const characterIds = candidate.characterIds as string[];
            const nextPlans = { ...plansRef.current, [targetRoute]: characterIds };
            routeRef.current = targetRoute;
            plansRef.current = nextPlans;
            setRoute(targetRoute);
            setPlans(nextPlans);
            window.localStorage.setItem(storageKey, JSON.stringify(nextPlans));
            window.localStorage.setItem(`${storageKey}-route`, targetRoute);
            await nextPaint();
            return {
              saved: true,
              route: targetRoute,
              routeName: routes.find((item) => item.key === targetRoute)?.name,
              characterCount: characterIds.length,
            };
          },
        },
        { signal: lifecycle.signal },
      );
    };

    void register().catch((error) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.warn("WebMCP registration failed", error);
      }
    });
    return () => lifecycle.abort();
  }, [hydrated]);

  const visibleCharacters = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return characters
      .filter((character) =>
        !needle
          ? true
          : `${character.name}${character.ja}${character.role ?? ""}`
              .toLocaleLowerCase()
              .includes(needle),
      )
      .sort((a, b) => {
        const aCondition = a.routes[route];
        const bCondition = b.routes[route];
        return conditionScore(aCondition) - conditionScore(bCondition) || (a.tier ?? 9) - (b.tier ?? 9);
      });
  }, [query, route]);

  const selectedRoute = routes.find((item) => item.key === route)!;
  const currentPlan = plans[route];
  const plannedCharacters = currentPlan
    .map((id) => characters.find((character) => character.id === id))
    .filter(Boolean) as Character[];

  const togglePlan = (id: string) => {
    setPlans((current) => ({
      ...current,
      [route]: current[route].includes(id)
        ? current[route].filter((characterId) => characterId !== id)
        : [...current[route], id],
    }));
  };

  const recruitableCount = visibleCharacters.filter(
    (character) => character.routes[route].status !== "unavailable",
  ).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">
          <Swords />
        </div>
        <div>
          <p className="eyebrow">Fortune&apos;s Weave Field Ledger</p>
          <h1>万缕千丝 · 招募规划册</h1>
        </div>
        <div className="source-stamp">
          <ShieldCheck aria-hidden="true" />
          <span>中文名优先对照游戏内译名</span>
        </div>
      </header>

      <Tabs defaultValue="planner" className="workspace-tabs">
        <div className="workspace-toolbar">
          <TabsList variant="line" aria-label="主要功能">
            <TabsTrigger value="planner">
              <Route />路线预组队
            </TabsTrigger>
            <TabsTrigger value="characters">
              <BookOpenText />角色图鉴
            </TabsTrigger>
          </TabsList>
          <div className="data-note">已收录 {characters.length} 名角色 · 2026.09</div>
        </div>

        <TabsContent value="planner" className="planner-layout">
          <aside className="route-panel">
            <div className="section-heading">
              <span>01</span>
              <div>
                <p>选择本周目</p>
                <h2>四条路线</h2>
              </div>
            </div>

            <RadioGroup
              value={route}
              onValueChange={(value) => setRoute(value as RouteKey)}
              className="route-list"
              aria-label="选择路线"
            >
              {routes.map((item) => (
                <label
                  key={item.key}
                  className="route-choice"
                  data-active={route === item.key}
                  style={{ "--route-color": routeColor[item.key] } as React.CSSProperties}
                >
                  <RadioGroupItem value={item.key} />
                  <span className="route-sigil" aria-hidden="true" />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{plans[item.key].length} 名计划成员 · {item.note}</small>
                  </span>
                  <ChevronRight aria-hidden="true" />
                </label>
              ))}
            </RadioGroup>

            <div className="route-legend">
              <p>排序方式</p>
              <strong>初始／自动 → 最低名声 → Tier</strong>
              <span>最低名声不代表全部条件；任务、外传、道具、费用和出现日期均会单独列出。</span>
            </div>
          </aside>

          <section className="candidate-panel">
            <div className="candidate-header">
              <div>
                <p className="eyebrow">{selectedRoute.name}</p>
                <h2>挑选本周目想培养的人</h2>
                <p className="candidate-count">当前列表 {visibleCharacters.length} 人，其中 {recruitableCount} 人可在本线使用</p>
              </div>
              <div className="search-box">
                <Search aria-hidden="true" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="角色名 / 日文名 / 定位"
                  aria-label="搜索角色"
                />
              </div>
            </div>

            <div className="character-grid">
              {visibleCharacters.map((character) => {
                const condition = character.routes[route];
                const selected = currentPlan.includes(character.id);
                const fastest = isFastestRoute(character, route);
                const unavailable = condition.status === "unavailable";

                return (
                  <article
                    className="character-card"
                    key={character.id}
                    data-selected={selected}
                    data-unavailable={unavailable}
                  >
                    <button
                      className="character-monogram"
                      aria-label={`查看${character.name}的个人资料`}
                      onClick={() => setSelectedCharacter(character)}
                    >
                      {character.name.slice(0, 1)}
                    </button>
                    <div className="character-copy">
                      <button className="character-name-button" onClick={() => setSelectedCharacter(character)}>
                        <span>
                          <strong>{character.name}</strong>
                          <small>{character.ja}</small>
                        </span>
                        {character.tier && <span className={`tier tier-${character.tier}`}>T{character.tier}</span>}
                      </button>
                      <div className="tags">
                        {character.role && <span>{character.role}</span>}
                        {fastest && <span className="fastest">本路线最快</span>}
                        {condition.status === "later" && <span className="later">后期加入</span>}
                      </div>
                      <div className="condition-line">
                        <strong>{conditionLabel(condition)}</strong>
                        {condition.extra && <small>{condition.extra}</small>}
                        {condition.timing && condition.status === "recruit" && <small>{condition.timing}</small>}
                      </div>
                    </div>
                    <Button
                      variant={selected ? "secondary" : "outline"}
                      size="icon"
                      disabled={unavailable}
                      onClick={() => togglePlan(character.id)}
                      aria-label={selected ? `从计划移除${character.name}` : `把${character.name}加入计划`}
                    >
                      {selected ? <Check /> : <CirclePlus />}
                    </Button>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="plan-panel">
            <div className="plan-topline" style={{ background: routeColor[route] }} />
            <p className="eyebrow">{selectedRoute.name}</p>
            <div className="plan-title-row">
              <h2>本周目名单</h2>
              <span>{plannedCharacters.length}</span>
            </div>
            <p className="plan-intro">每条路线各存一份。先看到门槛，再决定把礼物、金钱和任务时间投给谁。</p>

            <div className="plan-list">
              {plannedCharacters.length ? (
                plannedCharacters.map((character, index) => {
                  const condition = character.routes[route];
                  return (
                    <div className="plan-item" key={character.id}>
                      <span className="plan-index">{String(index + 1).padStart(2, "0")}</span>
                      <button className="plan-character-button" onClick={() => setSelectedCharacter(character)}>
                        <strong>{character.name}</strong>
                        <span>{conditionLabel(condition)}</span>
                        {condition.extra && <small>{condition.extra}</small>}
                      </button>
                      <button className="plan-remove" onClick={() => togglePlan(character.id)} aria-label={`移除${character.name}`}>
                        <X />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="empty-plan">
                  <Sparkles />
                  <p>从角色列表加入目标成员</p>
                  <span>自动加入的角色也可以放进最终培养名单。</span>
                </div>
              )}
            </div>

            <div className="plan-footer">
              <span>{hydrated ? "已保存在此浏览器" : "正在读取本地计划"}</span>
              <strong>{selectedRoute.name}</strong>
            </div>
          </aside>
        </TabsContent>

        <TabsContent value="characters" className="atlas-panel">
          <div className="atlas-header">
            <div>
              <p className="eyebrow">角色图鉴</p>
              <h2>查招募条件、梯度、兵种与已确认喜好</h2>
              <p>礼物资料尚未确认时，个人页会直接隐藏该模块，不显示“调查中”。</p>
            </div>
            <div className="search-box">
              <Search aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索中文名或日文名"
                aria-label="搜索角色图鉴"
              />
            </div>
          </div>

          <div className="atlas-stats" aria-label="资料概览">
            <div><Users /><strong>{characters.length}</strong><span>角色档案</span></div>
            <div><Gift /><strong>{characters.filter((character) => character.gifts?.length).length}</strong><span>已确认礼物</span></div>
            <div><ListChecks /><strong>4</strong><span>路线条件</span></div>
          </div>

          <div className="atlas-grid">
            {visibleCharacters.map((character) => (
              <button key={character.id} onClick={() => setSelectedCharacter(character)}>
                <span className="atlas-monogram">{character.name.slice(0, 1)}</span>
                <span className="atlas-copy">
                  <strong>{character.name}</strong>
                  <small>{character.ja}</small>
                  <em>{character.role ?? "查看四路线条件"}</em>
                </span>
                <span className="atlas-tier">{tierLabel(character.tier)}</span>
                <ChevronRight />
              </button>
            ))}
          </div>

          <div className="source-note">
            <Info />
            <p>角色梯度为 GameWith 攻略评价，并非官方强度结论；中文译名以简体中文版游戏为优先，仍有异译时保留日文原名便于核对。</p>
          </div>
        </TabsContent>
      </Tabs>

      <CharacterSheet
        character={selectedCharacter}
        route={route}
        planned={selectedCharacter ? currentPlan.includes(selectedCharacter.id) : false}
        onOpenChange={(open) => !open && setSelectedCharacter(null)}
        onTogglePlan={() => selectedCharacter && togglePlan(selectedCharacter.id)}
      />
    </main>
  );
}

function CharacterSheet({
  character,
  route,
  planned,
  onOpenChange,
  onTogglePlan,
}: {
  character: Character | null;
  route: RouteKey;
  planned: boolean;
  onOpenChange: (open: boolean) => void;
  onTogglePlan: () => void;
}) {
  const currentCondition = character?.routes[route];
  const unavailable = currentCondition?.status === "unavailable";

  return (
    <Sheet open={Boolean(character)} onOpenChange={onOpenChange}>
      <SheetContent
        className="character-sheet sm:max-w-[560px]"
        aria-describedby="character-sheet-description"
        showCloseButton={false}
      >
        {character && (
          <>
            <Button
              type="button"
              variant="ghost"
              className="sheet-back-button"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft aria-hidden="true" />
              返回角色列表
            </Button>

            <SheetHeader className="sheet-hero">
              <div className="sheet-monogram" aria-hidden="true">{character.name.slice(0, 1)}</div>
              <div>
                <p className="eyebrow">{tierLabel(character.tier)}</p>
                <SheetTitle>{character.name}</SheetTitle>
                <SheetDescription id="character-sheet-description">
                  {character.ja}{character.role ? ` · ${character.role}` : ""}
                </SheetDescription>
              </div>
            </SheetHeader>

            <div className="sheet-scroll">
              <section className="detail-section">
                <div className="detail-heading"><Route /><h3>四路线加入条件</h3></div>
                <div className="route-condition-table">
                  {routes.map((item) => {
                    const condition = character.routes[item.key];
                    return (
                      <div key={item.key} data-current={item.key === route}>
                        <span className="route-dot" style={{ background: routeColor[item.key] }} />
                        <strong>{item.name}</strong>
                        <div>
                          <b>{conditionLabel(condition)}</b>
                          {condition.extra && <small>{condition.extra}</small>}
                          {condition.timing && condition.status === "recruit" && <small>{condition.timing}</small>}
                        </div>
                        {isFastestRoute(character, item.key) && <em>最快</em>}
                      </div>
                    );
                  })}
                </div>
              </section>

              {character.recommendedClass && (
                <section className="detail-section">
                  <div className="detail-heading"><GraduationCap /><h3>推荐兵种</h3></div>
                  <div className="recommendation-card">
                    <strong>{character.recommendedClass}</strong>
                    {character.classPath && <p>{character.classPath}</p>}
                    <span>GameWith 攻略推荐</span>
                  </div>
                </section>
              )}

              {character.gifts?.length ? (
                <section className="detail-section">
                  <div className="detail-heading"><Gift /><h3>最喜欢的具体礼物</h3></div>
                  <p className="gift-note">优先显示简体中文译名，并保留日文原名方便核对；带箭头的礼物可打开物品资料页。</p>
                  <div className="gift-list">
                    {character.gifts.map((gift) => {
                      const details = getGiftDetails(gift);
                      const content = (
                        <>
                          <span>
                            <strong>{details.name}</strong>
                            {details.ja && <small>{details.ja}</small>}
                          </span>
                          {details.url && <ExternalLink aria-hidden="true" />}
                        </>
                      );

                      return details.url ? (
                        <a key={gift} className="gift-card" href={details.url} target="_blank" rel="noreferrer">
                          {content}
                        </a>
                      ) : (
                        <div key={gift} className="gift-card">{content}</div>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {(character.likes?.length || character.dislikes?.length) ? (
                <section className="detail-section">
                  <div className="detail-heading"><Heart /><h3>喜好</h3></div>
                  <div className="preference-grid">
                    {character.likes?.length ? (
                      <div><strong>喜欢</strong><p>{character.likes.join("、")}</p></div>
                    ) : null}
                    {character.dislikes?.length ? (
                      <div className="dislikes"><strong>不喜欢</strong><p>{character.dislikes.join("、")}</p></div>
                    ) : null}
                  </div>
                </section>
              ) : null}

              <section className="detail-section detail-sources">
                <div className="detail-heading"><ExternalLink /><h3>资料来源</h3></div>
                <div>
                  <a href={sources.tiers} target="_blank" rel="noreferrer">角色梯度</a>
                  <a href={sources.gifts} target="_blank" rel="noreferrer">礼物喜好</a>
                  <a href={sources.recruitment} target="_blank" rel="noreferrer">招募条件</a>
                </div>
              </section>
            </div>

            <SheetFooter className="sheet-actions">
              <div>
                <Clock3 />
                <span>{currentCondition ? conditionLabel(currentCondition) : ""}</span>
              </div>
              <Button onClick={onTogglePlan} disabled={unavailable} variant={planned ? "secondary" : "default"}>
                {planned ? <Check /> : <CirclePlus />}
                {planned ? "已加入本路线计划" : "加入本路线计划"}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
