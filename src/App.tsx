import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  ReferenceLine,
} from "recharts";

const COLORS = {
  bg: "#0f0f13",
  card: "#1a1a22",
  cardHover: "#22222e",
  border: "#2a2a38",
  text: "#e8e6f0",
  muted: "#8b8999",
  accent1: "#6366f1",
  accent2: "#22d3ee",
  accent3: "#f59e0b",
  accent4: "#ef4444",
  accent5: "#10b981",
  green: "#10b981",
  greenBg: "rgba(16,185,129,0.12)",
  red: "#ef4444",
  redBg: "rgba(239,68,68,0.12)",
  amber: "#f59e0b",
  amberBg: "rgba(245,158,11,0.12)",
  blue: "#6366f1",
  blueBg: "rgba(99,102,241,0.12)",
  cyan: "#22d3ee",
  cyanBg: "rgba(34,211,238,0.12)",
};

const yearlyData = [
  {
    rok: 2006,
    realUrok: 4641,
    zakladna: 119692,
    ytoyRate: 3.88,
    v2Rate: 2.48,
    clenu: 124,
  },
  {
    rok: 2007,
    realUrok: 3493,
    zakladna: 104551,
    ytoyRate: 3.34,
    v2Rate: 2.48,
    clenu: 123,
  },
  {
    rok: 2008,
    realUrok: 4382,
    zakladna: 84809,
    ytoyRate: 5.17,
    v2Rate: 2.48,
    clenu: 123,
  },
  {
    rok: 2009,
    realUrok: 3820,
    zakladna: 79641,
    ytoyRate: 4.8,
    v2Rate: 2.48,
    clenu: 117,
  },
  {
    rok: 2010,
    realUrok: 2213,
    zakladna: 76647,
    ytoyRate: 2.89,
    v2Rate: 2.48,
    clenu: 113,
  },
  {
    rok: 2011,
    realUrok: 1800,
    zakladna: 71052,
    ytoyRate: 2.53,
    v2Rate: 2.48,
    clenu: 110,
  },
  {
    rok: 2012,
    realUrok: 1599,
    zakladna: 66506,
    ytoyRate: 2.4,
    v2Rate: 2.48,
    clenu: 108,
  },
  {
    rok: 2013,
    realUrok: 946,
    zakladna: 60076,
    ytoyRate: 1.57,
    v2Rate: 2.48,
    clenu: 104,
  },
  {
    rok: 2014,
    realUrok: 686,
    zakladna: 51955,
    ytoyRate: 1.32,
    v2Rate: 2.48,
    clenu: 97,
  },
  {
    rok: 2015,
    realUrok: 539,
    zakladna: 42356,
    ytoyRate: 1.27,
    v2Rate: 2.48,
    clenu: 88,
  },
  {
    rok: 2016,
    realUrok: 443,
    zakladna: 36917,
    ytoyRate: 1.2,
    v2Rate: 2.48,
    clenu: 86,
  },
  {
    rok: 2017,
    realUrok: 356,
    zakladna: 28898,
    ytoyRate: 1.23,
    v2Rate: 2.48,
    clenu: 80,
  },
  {
    rok: 2018,
    realUrok: 425,
    zakladna: 23556,
    ytoyRate: 1.8,
    v2Rate: 2.48,
    clenu: 74,
  },
  {
    rok: 2019,
    realUrok: 610,
    zakladna: 19263,
    ytoyRate: 3.17,
    v2Rate: 2.48,
    clenu: 71,
  },
  {
    rok: 2020,
    realUrok: 477,
    zakladna: 13869,
    ytoyRate: 3.44,
    v2Rate: 2.48,
    clenu: 66,
  },
  {
    rok: 2021,
    realUrok: 142,
    zakladna: 10020,
    ytoyRate: 1.42,
    v2Rate: 2.48,
    clenu: 61,
  },
  {
    rok: 2022,
    realUrok: 356,
    zakladna: 6533,
    ytoyRate: 5.45,
    v2Rate: 2.48,
    clenu: 57,
  },
  {
    rok: 2023,
    realUrok: 304,
    zakladna: 3149,
    ytoyRate: 9.65,
    v2Rate: 2.48,
    clenu: 53,
  },
];

const radarData = [
  { dim: "Právní\nobhajitelnost", V2: 65, YtoY: 95, CUMIPMT: 25 },
  { dim: "Finanční\npřesnost", V2: 70, YtoY: 100, CUMIPMT: 35 },
  { dim: "Respekt\nk platbám", V2: 90, YtoY: 90, CUMIPMT: 20 },
  { dim: "Spravedlnost\n(mimořádné)", V2: 90, YtoY: 90, CUMIPMT: 15 },
  { dim: "Stabilita\nsazby", V2: 95, YtoY: 25, CUMIPMT: 95 },
  { dim: "Srozumitelnost", V2: 45, YtoY: 60, CUMIPMT: 95 },
  { dim: "Ochrana po\nukončení", V2: 95, YtoY: 65, CUMIPMT: 50 },
];

const auditData = [
  { name: "Čistá data (OK)", value: 95, color: COLORS.green },
  { name: "Technické '1' (INFO)", value: 24, color: COLORS.cyan },
  { name: "Anomálie (VAROVÁNÍ)", value: 5, color: COLORS.amber },
  { name: "Nulová jistina (KRITICKÉ)", value: 4, color: COLORS.red },
];

const compDimensions = [
  {
    dim: "Právní obhajitelnost",
    v2: "mid",
    ytoy: "win",
    cum: "lose",
    winner: "YtoY",
    v2t: "Amortizační standard, ale umělá celková částka",
    ytoyt: "Reálné úroky z výsledovky — doložitelné účetnictvím",
    cumt: "Fiktivní model ignorující reálné platby",
  },
  {
    dim: "Finanční přesnost",
    v2: "mid",
    ytoy: "win",
    cum: "lose",
    winner: "YtoY",
    v2t: "Konstantní sazba vyhlazuje realitu",
    ytoyt: "Přesně kopíruje reálné náklady (odchylka 0 Kč/rok)",
    cumt: "Předpokládá anuitu, odchylka plateb Ø 35 %",
  },
  {
    dim: "Respekt ke skutečným platbám",
    v2: "win",
    ytoy: "win",
    cum: "lose",
    winner: "V2+YtoY",
    v2t: "Úrok ze skutečného zůstatku",
    ytoyt: "Úrok ze skutečného zůstatku",
    cumt: "Modeluje fiktivní anuitu",
  },
  {
    dim: "Spravedlnost k mimořádným splátkám",
    v2: "win",
    ytoy: "win",
    cum: "lose",
    winner: "V2+YtoY",
    v2t: "Kdo splatil dříve → méně úroků",
    ytoyt: "Kdo splatil dříve → méně úroků",
    cumt: "Trestá zodpovědné plátce (+88 %)",
  },
  {
    dim: "Spravedlnost k neplatičům",
    v2: "win",
    ytoy: "win",
    cum: "lose",
    winner: "V2+YtoY",
    v2t: "Úrok naběhne z vysokého zůstatku",
    ytoyt: "Úrok naběhne z vysokého zůstatku",
    cumt: "Zvýhodňuje — počítá anuitu (−54 %)",
  },
  {
    dim: "Stabilita sazby",
    v2: "win",
    ytoy: "lose",
    cum: "win",
    winner: "V2/CUM",
    v2t: "Konstantní 2,48 %",
    ytoyt: "Kolísá 1,2–9,7 % (8× rozptyl)",
    cumt: "Konstantní 2,32 %",
  },
  {
    dim: "Srozumitelnost",
    v2: "mid",
    ytoy: "mid",
    cum: "win",
    winner: "CUMIPMT",
    v2t: "Numerická metoda — 'černá skříňka'",
    ytoyt: "18 sazeb, ale přímý výpočet",
    cumt: "Excelový vzorec — ověří kdokoli za 5 s",
  },
  {
    dim: "Ochrana po ukončení předpisu",
    v2: "win",
    ytoy: "mid",
    cum: "mid",
    winner: "V2",
    v2t: "Trvalá deaktivace — chrání 34 členů",
    ytoyt: "Roční deaktivace — 3 reaktivace",
    cumt: "Neřeší — parametr nper",
  },
];

const swotV2 = {
  strengths: [
    "Kopíruje standardní bankovní matematiku (amortizace)",
    "Respektuje reálná rozhodnutí družstva o předpisu plateb",
    "Plně deterministická — bez subjektivních parametrů",
    "Trvalá deaktivace chrání 34 členů se zmrazeným zůstatkem",
    "Korelace 0,990 s YtoY potvrzuje robustnost distribuce",
  ],
  weaknesses: [
    "Celková částka 20,5M je umělá — nemá oporu v účetnictví",
    "Nalezená sazba 2,48 % neodpovídá reálné bankovní sazbě",
    "Závislost na správnosti rozlišení NaN / 0 / 1 v datech",
    "Numerická metoda (Brentq) = 'černá skříňka' pro laiky",
  ],
  opportunities: [
    "Prezentovat jako podpůrný důkaz vedle YtoY (shoda 0,990)",
    "Srovnat sazbu 2,48 % se skutečnou sazbou z úvěrové smlouvy",
    "Nezávislý znalecký posudek potvrdí amortizační standard",
    "Nižší částka 20,5M = politicky snáze průchodná",
  ],
  threats: [
    "Soud se zeptá 'odkud se vzalo 20,5 milionu?'",
    "Protistrana může namítnout zpětné 'vymýšlení' sazby po 18 letech",
    "Promlčení starších nároků (roky 2006–2019)",
    "Chyba v jedné buňce dat může ovlivnit konkrétního člena",
  ],
};

const swotYtoY = {
  strengths: [
    "Každý rok doložitelný účetním dokladem z výsledovky",
    "Sazba není hledaná — přímý podíl reálného úroku / základna",
    "Dokonalá roční přesnost: odchylka 0 Kč od skutečných úroků",
    "Respektuje skutečné platby — kdo splatil dříve, platí méně",
    "Námitka volatility sazeb vyvrácena právem na mimořádnou splátku",
  ],
  weaknesses: [
    "Extrémní volatilita sazeb: 1,20 % (2016) → 9,65 % (2023)",
    "Vyšší celková částka 27,2M (+33 % oproti 20,5M)",
    "Emocionálně obtížná komunikace sazby 9,65 % v roce 2023",
    "Tvrdě penalizuje pozdní plátce (i když oprávněně)",
  ],
  opportunities: [
    "Kombinace s V2 eliminuje námitku 'jen jedna metoda'",
    "Fakt mimořádných splátek vyvrací námitku nerovnosti sazeb",
    "27,2M = skutečné náklady → nelze napadnout jako fiktivní",
    "Shoda distribuce s V2 (0,990) dokazuje robustnost",
  ],
  threats: [
    "Člen platící do 2023 může emotivně argumentovat nerovností",
    "Promlčení starších nároků (roky 2006–2019)",
    "Politický odpor členů platících do pozdních let",
    "Složitější výpočet — 18 různých sazeb",
  ],
};

const swotCUMIPMT = {
  strengths: [
    "Standardní finanční funkce Excelu — uznávaná v bankovnictví",
    "Extrémní jednoduchost: jeden vzorec CUMIPMT(sazba, nper, jistina)",
    "Plná transparentnost — každý člen ověří v Excelu za 5 sekund",
    "Deterministická sazba 2,32 % → celkem 20,5M bez subjektivních parametrů",
    "Závisí jen na 2 parametrech (jistina + počet let) = méně prostoru pro chyby",
  ],
  weaknesses: [
    "⛔ Ignoruje skutečné platby — předpokládá fiktivní anuitu (odchylka Ø 35 %)",
    "⛔ Zvýhodňuje neplatiče (tech. '1') — až o 54 % méně úroků oproti Brentq",
    "⛔ Trestá mimořádné splátky — zodpovědný plátce platí až o 88 % více",
    "Nízká korelace s Brentq (0,883) — rozptyl až ±207 tis. Kč na člena",
    "Neodráží reálné úroky — umělá částka 20,5M místo skutečných 27,2M",
    "Parametr 'Počet let' nezohledňuje KDY přesně člen platil",
  ],
  opportunities: [
    "Snadná komunikace: 'standardní bankovní vzorec, vaše jistina a počet let'",
    "Verifikovatelnost v Excelu — žádná 'černá skříňka'",
    "Lze prezentovat vedle Brentq/YtoY jako orientační 'sanity check'",
  ],
  threats: [
    "Námitka 'fiktivní model': 'Počítáte, jako bych platil pravidelně — ale tak jsem neplatil'",
    "⚠️ Napadení zodpovědnými plátci — prokáží: 'Zaplatil jsem půlku hned, CUMIPMT to ignoruje'",
    "Odkud 20,5M? Soud: 'Reálné úroky jsou 27,2M — proč rozpočítáváte méně?'",
    "I zvýhodněný neplatič může napadnout nesoulad s realitou",
    "Srovnání s Brentq/YtoY u soudu odhalí rozdíl ±207 tis. Kč na člena",
  ],
};

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ").format(n);
const fmtM = (n: number) => `${(n / 1000).toFixed(0)} tis.`;

const tabs = [
  { id: "prehled", label: "Přehled", icon: "◉" },
  { id: "sazby", label: "Sazby & Trendy", icon: "◆" },
  { id: "komparace", label: "Komparace", icon: "◈" },
  { id: "swot", label: "SWOT", icon: "◇" },
  { id: "audit", label: "Audit dat", icon: "◎" },
  { id: "navrhy", label: "Návrhy", icon: "▸" },
];

type AnimatedNumberProps = {
value: number;
suffix?: string;
prefix?: string;
duration?: number;
};

function AnimatedNumber({ value, suffix = "", prefix = "", duration = 1200 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <span>
      {prefix}
      {typeof value === "number" && value >= 1000
        ? fmt(Math.floor(display))
        : display.toFixed
        ? display.toFixed(value < 10 ? 2 : 0)
        : display}
      {suffix}
    </span>
  );
}

type StatCardProps = {
label: string;
value: number | string;
suffix?: string;
prefix?: string;
color?: string;
sub?: string | null;
};
function StatCard({ label, value, suffix = "", prefix = "", color = COLORS.accent1, sub = null }: StatCardProps) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "20px 18px",
        flex: "1 1 200px",
        minWidth: 160,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: -1,
        }}
      >
        <AnimatedNumber value={Number(value) || 0} suffix={suffix} prefix={prefix} />
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

type BadgeProps = {
children: React.ReactNode;
color?: string;
};

function Badge({ children, color = COLORS.green }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        background: color + "22",
        color,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}

type WinCellProps = {
status: string;
};

function WinCell({ status }: WinCellProps) {
  const bg =
    status === "win"
      ? COLORS.greenBg
      : status === "lose"
      ? COLORS.redBg
      : COLORS.amberBg;
  const c =
    status === "win"
      ? COLORS.green
      : status === "lose"
      ? COLORS.red
      : COLORS.amber;
  const icon = status === "win" ? "✓" : status === "lose" ? "✗" : "~";
  return (
    <span
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        borderRadius: 6,
        background: bg,
        color: c,
        textAlign: "center",
        lineHeight: "24px",
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      {icon}
    </span>
  );
}

ype SWOTGridProps = {
data: any;
title?: string;
color?: string;
};

function SWOTGrid({ data, title, color }: SWOTGridProps) {
  const quadrants = [
    { key: "strengths", label: "SILNÉ STRÁNKY", icon: "▲", c: COLORS.green },
    { key: "weaknesses", label: "SLABÉ STRÁNKY", icon: "▼", c: COLORS.red },
    { key: "opportunities", label: "PŘÍLEŽITOSTI", icon: "►", c: COLORS.cyan },
    { key: "threats", label: "HROZBY", icon: "◆", c: COLORS.amber },
  ];
  return (
    <div style={{ marginBottom: 32 }}>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 8,
            height: 28,
            borderRadius: 4,
            background: color,
            display: "inline-block",
          }}
        />
        {title}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {quadrants.map((q) => (
          <div
            key={q.key}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: 18,
              borderTop: `3px solid ${q.c}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.2,
                color: q.c,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{q.icon}</span> {q.label}
            </div>
            {data[q.key].map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 13,
                  color: COLORS.text,
                  marginBottom: 8,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${q.c}33`,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProposalCard({
  num,
  title,
  badge,
  badgeColor,
  amount,
  forWhom,
  why,
  criticism,
  color,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 14,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div
          style={{
            width: 56,
            minHeight: 70,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {num}
        </div>
        <div style={{ padding: "16px 20px", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>
              {title}
            </span>
            {badge && <Badge color={badgeColor}>{badge}</Badge>}
          </div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
            Celková částka:{" "}
            <span
              style={{
                fontWeight: 700,
                color: COLORS.text,
                fontFamily: "monospace",
              }}
            >
              {amount}
            </span>
            <span style={{ marginLeft: 16, fontSize: 11, color: COLORS.muted }}>
              {open ? "▲ Skrýt" : "▼ Detail"}
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div
          style={{ padding: "0 20px 20px 76px", animation: "fadeIn 0.3s ease" }}
        >
          <div style={{ fontSize: 13, color: COLORS.text, marginBottom: 10 }}>
            <strong style={{ color: COLORS.cyan }}>Pro koho:</strong> {forWhom}
          </div>
          <div
            style={{
              fontSize: 13,
              color: COLORS.text,
              marginBottom: 10,
              paddingLeft: 12,
              borderLeft: `3px solid ${COLORS.green}`,
            }}
          >
            <strong style={{ color: COLORS.green }}>Proč:</strong> {why}
          </div>
          <div
            style={{
              fontSize: 13,
              color: COLORS.text,
              paddingLeft: 12,
              borderLeft: `3px solid ${COLORS.red}`,
            }}
          >
            <strong style={{ color: COLORS.red }}>Kritika:</strong> {criticism}
          </div>
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1a1a22ee",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: "12px 16px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            fontSize: 12,
            color: p.color,
            display: "flex",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <span style={{ opacity: 0.7 }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>
            {/* Původní ČÁST: zobrazení xx tisís kč. */}
            {/* {typeof p.value === "number"
              ? p.value < 20
                ? p.value.toFixed(2) + " %"
                : fmt(p.value) + " tis. Kč"
              : p.value}*/}
            {/* OPRAVENÁ ČÁST: Podmínka pro zobrazení členů */}
            {typeof p.value === "number"
              ? p.name && p.name.includes("člen")
                ? p.value + " členů"
                : p.value < 20
                ? p.value.toFixed(2) + " %"
                : fmt(p.value) + " tis. Kč"
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("prehled");
  const [swotView, setSwotView] = useState("ytoy");

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        color: COLORS.text,
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .recharts-default-tooltip { background: ${COLORS.card} !important; border: 1px solid ${COLORS.border} !important; border-radius: 8px !important; }
        * { scrollbar-width: thin; scrollbar-color: ${COLORS.border} transparent; }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1530 50%, ${COLORS.bg} 100%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "32px 24px 0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              BD
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.muted,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Analytický dashboard
              </div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  background: `linear-gradient(90deg, ${COLORS.text}, ${COLORS.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rozpočítání úroků bytového družstva
              </h1>
            </div>
          </div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>
            128 členů · Úvěr z roku 2005 · Období 2006–2023 · Reálné úroky 27,2
            mil. Kč
          </div>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              gap: 4,
              overflowX: "auto",
              paddingBottom: 0,
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  background: activeTab === t.id ? COLORS.card : "transparent",
                  border: `1px solid ${
                    activeTab === t.id ? COLORS.border : "transparent"
                  }`,
                  borderBottom:
                    activeTab === t.id
                      ? `1px solid ${COLORS.card}`
                      : `1px solid ${COLORS.border}`,
                  borderRadius: "10px 10px 0 0",
                  padding: "10px 18px",
                  color: activeTab === t.id ? COLORS.accent2 : COLORS.muted,
                  fontSize: 13,
                  fontWeight: activeTab === t.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  position: "relative",
                  bottom: -1,
                }}
              >
                <span style={{ fontSize: 10 }}>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 24px",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* ==================== PŘEHLED ==================== */}
        {activeTab === "prehled" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 28,
              }}
            >
              <StatCard
                label="Reálné úroky"
                value={27232}
                suffix=" tis. Kč"
                color={COLORS.accent1}
                sub="Z výsledovky družstva"
              />
              <StatCard
                label="Umělá částka"
                value={20500}
                suffix=" tis. Kč"
                color={COLORS.amber}
                sub="Stanovená družstvem"
              />
              <StatCard
                label="Rozdíl"
                value={6732}
                suffix=" tis. Kč"
                color={COLORS.red}
                sub="+33 % navíc"
              />
              <StatCard
                label="Členů"
                value={128}
                color={COLORS.cyan}
                sub="124 aktivních"
              />
              <StatCard
                label="Období"
                value={18}
                suffix=" let"
                color={COLORS.green}
                sub="2006–2023"
              />
            </div>

            {/* Key insight */}
            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent1}15, ${COLORS.accent2}10)`,
                border: `1px solid ${COLORS.accent1}40`,
                borderRadius: 14,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.accent2,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Klíčový poznatek
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                Fakt, že člen si{" "}
                <strong style={{ color: COLORS.accent2 }}>
                  mohl sám zvolit mimořádnou splátku
                </strong>
                , je rozhodující pro posouzení spravedlnosti. Ten, kdo platil až
                do roku 2023, se tak rozhodl sám. To eliminuje hlavní námitku
                proti YtoY a posiluje princip:{" "}
                <strong style={{ color: COLORS.green }}>
                  kdo dlužil více a déle vlastní volbou, ten nese odpovídající
                  podíl skutečných nákladů.
                </strong>
              </div>
            </div>

            {/* Timeline overview */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                Vývoj úvěru 2006–2023
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="rok"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                    label={{
                      value: "tis. Kč",
                      angle: -90,
                      position: "insideLeft",
                      fill: COLORS.muted,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                    label={{
                      value: "členů",
                      angle: 90,
                      position: "insideRight",
                      fill: COLORS.muted,
                      fontSize: 11,
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, color: COLORS.muted }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="realUrok"
                    name="Reálný úrok"
                    fill={COLORS.accent1}
                    fillOpacity={0.15}
                    stroke={COLORS.accent1}
                    strokeWidth={2}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="zakladna"
                    name="Aktivní základna"
                    fill={COLORS.accent2}
                    fillOpacity={0.2}
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="clenu"
                    name="Aktivních členů"
                    stroke={COLORS.amber}
                    strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.amber }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Three methods overview */}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
              Tři analyzované metody
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 14,
              }}
            >
              {[
                {
                  name: "V2 (Brentq)",
                  amount: "20 500 000 Kč",
                  rate: "2,48 % konstantní",
                  color: COLORS.accent1,
                  desc: "Amortizační model s jednou nalezenou sazbou. Trvalá deaktivace po ukončení předpisu.",
                  tag: "Alternativa",
                },
                {
                  name: "YtoY",
                  amount: "27 232 000 Kč",
                  rate: "1,20–9,65 % roční",
                  color: COLORS.green,
                  desc: "Rok po roku z reálných úroků z výsledovky. Sazba = skutečný úrok / aktivní základna.",
                  tag: "Doporučeno",
                },
                {
                  name: "CUMIPMT",
                  amount: "20 500 000 Kč",
                  rate: "2,32 % konstantní",
                  color: COLORS.red,
                  desc: "Excelový vzorec — předpokládá fiktivní anuitu. Ignoruje skutečné platby.",
                  tag: "Nedoporučeno",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 14,
                    padding: 20,
                    borderTop: `3px solid ${m.color}`,
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", top: 12, right: 14 }}>
                    <Badge color={m.color}>{m.tag}</Badge>
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: m.color,
                      marginBottom: 6,
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {m.amount}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.amber,
                      marginBottom: 10,
                    }}
                  >
                    Sazba: {m.rate}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: COLORS.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SAZBY & TRENDY ==================== */}
        {activeTab === "sazby" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Srovnání ročních sazeb YtoY vs. V2
            </h2>

            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.muted,
                  marginBottom: 16,
                }}
              >
                Úroková sazba v čase
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="rok"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <YAxis
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                    domain={[0, 10]}
                    label={{
                      value: "%",
                      angle: -90,
                      position: "insideLeft",
                      fill: COLORS.muted,
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine
                    y={2.48}
                    stroke={COLORS.accent1}
                    strokeDasharray="6 3"
                    label={{
                      value: "V2: 2,48 %",
                      fill: COLORS.accent1,
                      fontSize: 11,
                      position: "right",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ytoyRate"
                    name="YtoY sazba"
                    fill={COLORS.green}
                    fillOpacity={0.12}
                    stroke={COLORS.green}
                    strokeWidth={2.5}
                    dot={{
                      r: 4,
                      fill: COLORS.green,
                      stroke: COLORS.bg,
                      strokeWidth: 2,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="v2Rate"
                    name="V2 sazba"
                    stroke={COLORS.accent1}
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.muted,
                    marginBottom: 16,
                  }}
                >
                  Reálný úrok družstva (tis. Kč / rok)
                </h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={yearlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={COLORS.border}
                    />
                    <XAxis
                      dataKey="rok"
                      tick={{ fill: COLORS.muted, fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="realUrok" name="Úrok" radius={[4, 4, 0, 0]}>
                      {yearlyData.map((d, i) => (
                        <Cell
                          key={i}
                          fill={
                            d.realUrok > 2000
                              ? COLORS.accent1
                              : d.realUrok > 500
                              ? COLORS.cyan
                              : COLORS.muted
                          }
                          fillOpacity={0.8}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.muted,
                    marginBottom: 16,
                  }}
                >
                  Úbytek aktivních členů
                </h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={yearlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={COLORS.border}
                    />
                    <XAxis
                      dataKey="rok"
                      tick={{ fill: COLORS.muted, fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      tick={{ fill: COLORS.muted, fontSize: 11 }}
                      domain={[40, 130]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="clenu"
                      name="Aktivních členů"
                      fill={COLORS.amber}
                      fillOpacity={0.15}
                      stroke={COLORS.amber}
                      strokeWidth={2}
                      dot={{ r: 3, fill: COLORS.amber }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Rate phases explanation */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
                Tři fáze vývoje sazeb YtoY
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                {[
                  {
                    years: "2006–2009",
                    rate: "3,3–5,2 %",
                    desc: "Vysoké sazby — družstvo platilo 3,5–4,6 mil. úroků ročně, většina členů aktivní",
                    color: COLORS.red,
                  },
                  {
                    years: "2012–2017",
                    rate: "1,2–2,4 %",
                    desc: "Nízké sazby — úroky klesly pod milion, velká základna splácejících",
                    color: COLORS.green,
                  },
                  {
                    years: "2022–2023",
                    rate: "5,4–9,7 %",
                    desc: "Extrémní sazby — málo zbývajících dlužníků, ale stovky tisíc na úrocích",
                    color: COLORS.amber,
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      borderRadius: 10,
                      background: p.color + "10",
                      border: `1px solid ${p.color}30`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: p.color,
                        marginBottom: 4,
                      }}
                    >
                      {p.years}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: COLORS.text,
                        marginBottom: 6,
                      }}
                    >
                      {p.rate}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== KOMPARACE ==================== */}
        {activeTab === "komparace" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Komparativní analýza v 8 dimenzích
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <StatCard
                label="Korelace V2 ↔ YtoY"
                value={0.99}
                color={COLORS.green}
                sub="Téměř totožné"
              />
              <StatCard
                label="Korelace V2 ↔ CUMIPMT"
                value={0.873}
                color={COLORS.amber}
                sub="Strukturálně odlišné"
              />
              <StatCard
                label="Max rozdíl V2 vs CUMIPMT"
                value={207481}
                suffix=" Kč"
                color={COLORS.red}
                sub="Člen A09.02.4"
              />
              <StatCard
                label="Prům. |rozdíl| YtoY norm."
                value={9431}
                suffix=" Kč"
                color={COLORS.cyan}
                sub="Na člena"
              />
            </div>

            {/* Radar chart */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                Radarový profil metod
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={COLORS.border} />
                  <PolarAngleAxis
                    dataKey="dim"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    tick={{ fill: COLORS.muted, fontSize: 10 }}
                    domain={[0, 100]}
                  />
                  <Radar
                    name="V2 (Brentq)"
                    dataKey="V2"
                    stroke={COLORS.accent1}
                    fill={COLORS.accent1}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="YtoY"
                    dataKey="YtoY"
                    stroke={COLORS.green}
                    fill={COLORS.green}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="CUMIPMT"
                    dataKey="CUMIPMT"
                    stroke={COLORS.red}
                    fill={COLORS.red}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Dimension table */}
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
                overflowX: "auto",
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                Detailní srovnání
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}
                    >
                      Dimenze
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        color: COLORS.accent1,
                        fontWeight: 600,
                        width: 30,
                      }}
                    >
                      V2
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}
                    >
                      V2 (Brentq)
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        color: COLORS.green,
                        fontWeight: 600,
                        width: 30,
                      }}
                    >
                      YtoY
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}
                    >
                      YtoY
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        color: COLORS.red,
                        fontWeight: 600,
                        width: 30,
                      }}
                    >
                      CUM
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}
                    >
                      CUMIPMT
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}
                    >
                      Vítěz
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compDimensions.map((d, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: `1px solid ${COLORS.border}20` }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          fontWeight: 600,
                          color: COLORS.text,
                        }}
                      >
                        {d.dim}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px 8px" }}>
                        <WinCell status={d.v2} />
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: COLORS.muted,
                          fontSize: 12,
                        }}
                      >
                        {d.v2t}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px 8px" }}>
                        <WinCell status={d.ytoy} />
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: COLORS.muted,
                          fontSize: 12,
                        }}
                      >
                        {d.ytoyt}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px 8px" }}>
                        <WinCell status={d.cum} />
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: COLORS.muted,
                          fontSize: 12,
                        }}
                      >
                        {d.cumt}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px 8px" }}>
                        <Badge
                          color={
                            d.winner.includes("YtoY")
                              ? COLORS.green
                              : d.winner === "V2"
                              ? COLORS.accent1
                              : d.winner === "CUMIPMT"
                              ? COLORS.red
                              : COLORS.amber
                          }
                        >
                          {d.winner}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key conclusion */}
            <div
              style={{
                marginTop: 20,
                background: `linear-gradient(135deg, ${COLORS.red}15, ${COLORS.red}05)`,
                border: `1px solid ${COLORS.red}30`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.red,
                  marginBottom: 10,
                }}
              >
                Klíčový závěr komparace
              </h3>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}>
                <strong style={{ color: COLORS.green }}>
                  V2 a YtoY jsou si velmi blízké
                </strong>{" "}
                (korelace 0,990) — obě pracují se skutečnými platbami.{" "}
                <strong style={{ color: COLORS.red }}>
                  CUMIPMT je strukturální outlier
                </strong>{" "}
                (korelace 0,873) — ignoruje skutečné platby, systematicky
                zvýhodňuje neplatiče a trestá zodpovědné plátce.
              </div>
            </div>
          </div>
        )}

        {/* ==================== SWOT ==================== */}
        {activeTab === "swot" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[
                { id: "ytoy", label: "SWOT — YtoY", color: COLORS.green },
                {
                  id: "v2",
                  label: "SWOT — V2 (Brentq)",
                  color: COLORS.accent1,
                },
                { id: "cumipmt", label: "SWOT — CUMIPMT", color: COLORS.red },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSwotView(b.id)}
                  style={{
                    background:
                      swotView === b.id ? b.color + "22" : "transparent",
                    border: `1px solid ${
                      swotView === b.id ? b.color : COLORS.border
                    }`,
                    borderRadius: 10,
                    padding: "10px 20px",
                    color: swotView === b.id ? b.color : COLORS.muted,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {swotView === "ytoy" && (
              <SWOTGrid
                data={swotYtoY}
                title="SWOT analýza — YtoY (Doporučená metoda)"
                color={COLORS.green}
              />
            )}
            {swotView === "v2" && (
              <SWOTGrid
                data={swotV2}
                title="SWOT analýza — V2 (Brentq)"
                color={COLORS.accent1}
              />
            )}
            {swotView === "cumipmt" && (
              <SWOTGrid
                data={swotCUMIPMT}
                title="SWOT analýza — CUMIPMT (Nedoporučeno)"
                color={COLORS.red}
              />
            )}

            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: 24,
                marginTop: 20,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
                Srovnání rizikového profilu
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={COLORS.border} />
                  <PolarAngleAxis
                    dataKey="dim"
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    tick={{ fill: COLORS.muted, fontSize: 10 }}
                    domain={[0, 100]}
                  />
                  {swotView === "v2" ? (
                    <Radar
                      name="V2 (Brentq)"
                      dataKey="V2"
                      stroke={COLORS.accent1}
                      fill={COLORS.accent1}
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                  ) : swotView === "cumipmt" ? (
                    <Radar
                      name="CUMIPMT"
                      dataKey="CUMIPMT"
                      stroke={COLORS.red}
                      fill={COLORS.red}
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Radar
                      name="YtoY"
                      dataKey="YtoY"
                      stroke={COLORS.green}
                      fill={COLORS.green}
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                  )}
                  {swotView !== "cumipmt" && (
                    <Radar
                      name="CUMIPMT (ref.)"
                      dataKey="CUMIPMT"
                      stroke={COLORS.red}
                      fill={COLORS.red}
                      fillOpacity={0.05}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  )}
                  {swotView === "cumipmt" && (
                    <Radar
                      name="YtoY (ref.)"
                      dataKey="YtoY"
                      stroke={COLORS.green}
                      fill={COLORS.green}
                      fillOpacity={0.05}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  )}
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ==================== AUDIT DAT ==================== */}
        {activeTab === "audit" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Audit konzistence dat — 128 členů
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <StatCard
                label="Čistá data (OK)"
                value={95}
                suffix=" členů"
                color={COLORS.green}
                sub="74 % — bez jakýchkoli problémů"
              />
              <StatCard
                label="Technické '1'"
                value={24}
                suffix=" členů"
                color={COLORS.cyan}
                sub="48 hodnot — záměrný systém"
              />
              <StatCard
                label="Anomálie"
                value={5}
                suffix=" členů"
                color={COLORS.amber}
                sub="Dopad marginální"
              />
              <StatCard
                label="Kritické"
                value={4}
                suffix=" členů"
                color={COLORS.red}
                sub="Nulová jistina — vyřadit"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                  Rozložení kvality dat
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={auditData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, value }) => `${value}`}
                    >
                      {auditData.map((d, i) => (
                        <Cell
                          key={i}
                          fill={d.color}
                          stroke={COLORS.bg}
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, name) => [`${v} členů`, name]}
                      contentStyle={{
                        background: COLORS.card,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(v) => (
                        <span style={{ color: COLORS.text }}>{v}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                  Klíčová zjištění auditu
                </h3>
                {[
                  {
                    icon: "✓",
                    text: "V surových datech neexistuje ani jedna skutečná nula (hodnota 0)",
                    color: COLORS.green,
                  },
                  {
                    icon: "✓",
                    text: "Žádné NaN mezery uprostřed aktivního období",
                    color: COLORS.green,
                  },
                  {
                    icon: "✓",
                    text: "Žádné reaktivace po deaktivaci — pravidlo active_mask je konzistentní",
                    color: COLORS.green,
                  },
                  {
                    icon: "i",
                    text: "48 technických '1' u 24 členů — záměrný marker pro udržení v úročení",
                    color: COLORS.cyan,
                  },
                  {
                    icon: "!",
                    text: "3 záporné platby (celkem −18 732 Kč) — marginální dopad, nutno zdokumentovat",
                    color: COLORS.amber,
                  },
                  {
                    icon: "✗",
                    text: "4 členové s jistinou ≤ 0 — splatili v roce 2005, vyřadit z výpočtu",
                    color: COLORS.red,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: item.color + "22",
                        color: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: COLORS.text,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frozen balances */}
            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}10, transparent)`,
                border: `1px solid ${COLORS.cyan}30`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.cyan,
                  marginBottom: 10,
                }}
              >
                Zmrazené zůstatky — 34 členů
              </h3>
              <div
                style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text }}
              >
                34 členů má po ukončení předpisu plateb nenulový zůstatek
                jistiny — celkem{" "}
                <strong style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  1 459 758 Kč
                </strong>
                . Kdyby se jim úrok počítal dál (V1), zaplatili by navíc odhadem{" "}
                <strong>264 000 Kč</strong>. Metoda V2 je chrání trvalou
                deaktivací — družstvo tím, že přestalo předepisovat platby,
                fakticky vyjádřilo, že z jeho strany je věc uzavřena.
              </div>
            </div>
          </div>
        )}

        {/* ==================== NÁVRHY ==================== */}
        {activeTab === "navrhy" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Návrhy postupu — 4 varianty
            </h2>

            <ProposalCard
              num="1"
              color={COLORS.green}
              title="YtoY jako primární, V2 jako podpůrný důkaz"
              badge="DOPORUČENO"
              badgeColor={COLORS.green}
              amount="27 232 000 Kč"
              forWhom="Družstvo, které chce maximální právní odolnost a je připraveno od členů požadovat plnou výši skutečných nákladů."
              why="Každý rok doložitelný účetním dokladem. Sazba není hledaná ani umělá. Námitka volatility sazeb vyvrácena právem na mimořádnou splátku. Korelace 0,990 s V2 dokazuje robustnost."
              criticism="Celková částka 27,2M je o 33 % vyšší → vyšší zátěž pro členy. Sazba 9,65 % v roce 2023 je emocionálně obtížně komunikovatelná."
            />
            <ProposalCard
              num="2"
              color={COLORS.accent1}
              title="V2 (Brentq) jako primární, YtoY jako kontrola"
              amount="20 500 000 Kč"
              forWhom="Družstvo, které chce nižší celkovou zátěž a stabilní sazbu, ale respektovat skutečné platby."
              why="Konstantní sazba spravedlivější k pozdním plátcům. Nižší částka je politicky průchodná. Trvalá deaktivace chrání členy po ukončení předpisu."
              criticism="Částka 20,5M nemá oporu v účetnictví. Družstvo absorbuje 6,7M ztráty. Konstantní sazba vyhlazuje realitu."
            />
            <ProposalCard
              num="3"
              color={COLORS.amber}
              title="Hybrid — distribuce YtoY, částka omezena na 20,5M"
              amount="20 500 000 Kč (distribuce YtoY)"
              forWhom="Družstvo hledající kompromis — reálná distribuce, ale nižší celková zátěž."
              why="Kombinuje nejsilnější stránku YtoY (distribuce dle reálných dat) s politickou průchodností nižší částky. Normalizační faktor 0,753."
              criticism="Soud se může ptát, proč jen 20,5M z 27,2M. Matematicky méně elegantní. Rozdíl 6,7M zůstává nerozpočítaný."
            />
            <ProposalCard
              num="4"
              color={COLORS.red}
              title="CUMIPMT"
              badge="NEDOPORUČUJI"
              badgeColor={COLORS.red}
              amount="20 500 000 Kč"
              forWhom="Pouze pokud je jednoduchost jediným kritériem a právní odolnost není prioritou."
              why="Extrémní jednoduchost — každý člen si ověří v Excelu jedním vzorcem."
              criticism="Ignoruje skutečné platby (anuita ≠ realita). Systematicky zvýhodňuje neplatiče (−54 %) a trestá zodpovědné plátce (+88 %). V kontextu mimořádných splátek právně napadnutelné."
            />

            {/* Process recommendations */}
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              Procesní doporučení (platí pro všechny varianty)
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  letter: "A",
                  title: "Vyřadit 4 členy s nulovou jistinou",
                  desc: "A01.04.4, A01.05.2, A02.05.1, A06.05.4 — splatili v 2005, úrok = 0.",
                  color: COLORS.cyan,
                },
                {
                  letter: "B",
                  title: "Zdokumentovat anomálie",
                  desc: "3 záporné platby a 2 členové s NaN mezerou. Dopad marginální, ale u soudu je dokumentace klíčová.",
                  color: COLORS.cyan,
                },
                {
                  letter: "C",
                  title: "Individuální výpisy — 128 členů",
                  desc: "Detail rok po roku: zůstatek → úrok → splátka. Formát: 1 strana A4 na člena.",
                  color: COLORS.amber,
                },
                {
                  letter: "D",
                  title: "Porovnat sazbu s bankovním úvěrem",
                  desc: "Shoda V2 (2,48 %) nebo YtoY průměru (3,14 %) se skutečnou sazbou = důkaz věrohodnosti.",
                  color: COLORS.amber,
                },
                {
                  letter: "E",
                  title: "Nezávislý finanční znalec",
                  desc: "Znalecký posudek přesouvá důkazní břemeno na protistranu.",
                  color: COLORS.green,
                },
                {
                  letter: "F",
                  title: "Schválení členskou schůzí",
                  desc: "Usnesení kvalifikované většiny. Bez něj je jakýkoli výpočet napadnutelný jako jednostranný akt.",
                  color: COLORS.green,
                },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      background: r.color + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      color: r.color,
                      flexShrink: 0,
                    }}
                  >
                    {r.letter}
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}
                    >
                      {r.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {r.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final verdict */}
            <div
              style={{
                marginTop: 28,
                background: `linear-gradient(135deg, #1a1530, ${COLORS.card})`,
                border: `1px solid ${COLORS.accent1}40`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 14,
                  background: `linear-gradient(90deg, ${COLORS.accent2}, ${COLORS.accent1})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Závěrečný verdikt
              </h3>
              <div
                style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.text }}
              >
                Ze tří analyzovaných metod je{" "}
                <strong style={{ color: COLORS.red }}>CUMIPMT nejslabší</strong>{" "}
                — ignoruje skutečné platby a trestá zodpovědné plátce.{" "}
                <strong style={{ color: COLORS.green }}>
                  V2 a YtoY jsou obě kvalitní a obhajitelné
                </strong>{" "}
                s téměř totožnou distribucí (korelace 0,990). Volba mezi nimi je
                primárně politická a strategická, nikoli technická.
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                <div
                  style={{
                    background: COLORS.green + "15",
                    border: `1px solid ${COLORS.green}30`,
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.green,
                      marginBottom: 6,
                    }}
                  >
                    → Chcete maximální právní odolnost?
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.text }}>
                    Zvolte <strong>YtoY</strong> (Návrh 1). Každá koruna je
                    doložitelná účetnictvím.
                  </div>
                </div>
                <div
                  style={{
                    background: COLORS.accent1 + "15",
                    border: `1px solid ${COLORS.accent1}30`,
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.accent1,
                      marginBottom: 6,
                    }}
                  >
                    → Chcete nižší zátěž a průchodnost?
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.text }}>
                    Zvolte <strong>V2</strong> (Návrh 2) nebo hybridní variantu
                    (Návrh 3).
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  background: COLORS.bg + "80",
                  borderRadius: 10,
                  fontSize: 13,
                  color: COLORS.cyan,
                  lineHeight: 1.6,
                }}
              >
                <strong>
                  V obou případech doporučuji prezentovat obě metody vedle sebe
                </strong>{" "}
                — shoda distribucí 0,990 je nejsilnější argument, že výsledek je
                robustní bez ohledu na zvolenou cestu.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: "16px 24px",
          textAlign: "center",
          fontSize: 11,
          color: COLORS.muted,
        }}
      >
        Analytický dashboard · Bytové družstvo · Rozpočítání úroků 2006–2023 ·
        Data: {new Date().toLocaleDateString("cs-CZ")}
      </div>
    </div>
  );
}
