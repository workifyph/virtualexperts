import type { Stat } from "@/config/types";

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="vex-section vex-section--light" aria-label="Key stats">
      <div className="vex-container">
        <div className="vex-grid vex-grid--4">
          {stats.map((stat) => (
            <div key={stat.label} className="proof-stat">
              <span className="proof-stat__value">{stat.value}</span>
              <span className="proof-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
