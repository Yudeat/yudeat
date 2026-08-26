import { WRITER_STATS } from "@/constants/writer";

export function WriterStatsSection() {
  return (
    <section className="writer-stats-grid" aria-label="Writing statistics">
      {WRITER_STATS.map((stat) => (
        <div key={stat.label} className="writer-stat-cell" data-writer-stat>
          <p className="writer-eyebrow">{stat.label}</p>
          {stat.prefix && (
            <p className="writer-display writer-stat-suffix mt-1">{stat.prefix}</p>
          )}
          <p
            className="writer-display writer-stat-value mt-2"
            data-writer-stat-value={stat.value}
          >
            {stat.value}
          </p>
          {stat.suffix && (
            <p className="writer-display writer-stat-suffix mt-1">{stat.suffix}</p>
          )}
        </div>
      ))}
    </section>
  );
}
