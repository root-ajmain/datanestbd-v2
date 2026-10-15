import Link from 'next/link';
import {
  ArrowUpRight,
  Bot,
  Code2,
  MessageCircle,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { services, serviceGroups } from '@/content/services';

const groupIcons: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  development: Code2,
  ai: Bot,
  marketing: TrendingUp,
};

export function ServiceSignalMap() {
  return (
    <section className="service-signal-map" aria-labelledby="service-signal-title">
      <div className="service-map-intro">
        <div>
          <span className="eyebrow">One system. Four operating layers.</span>
          <h2 id="service-signal-title">Start where the friction lives.</h2>
        </div>
        <p>
          Every engagement starts with a business signal, then connects the right mix of
          conversation infrastructure, software, intelligence, and measurable growth.
        </p>
      </div>

      <div className="service-map-grid">
        {serviceGroups.map((group, index) => {
          const Icon = groupIcons[group.id] ?? Code2;
          const groupServices = services.filter((service) => group.serviceIds.includes(service.id));

          return (
            <article key={group.id} className={`service-map-card service-map-card-${index + 1}`}>
              <div className="service-map-card-top">
                <span className="service-map-index">0{index + 1} / {group.shortTitle}</span>
                <span className="service-map-status">
                  <span className="status-dot" aria-hidden="true" /> Active layer
                </span>
              </div>

              <div className="service-map-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.7} />
              </div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>

              <div className="service-map-links">
                {groupServices.map((service) => (
                  <Link key={service.id} href={`/services/${service.slug}`}>
                    <span>{service.title}</span>
                    <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                ))}
              </div>

              <div className="service-map-card-foot">
                <span>Layer</span>
                <span>{group.id.toUpperCase()}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="service-map-footer">
        <span>One connected build path</span>
        <Link href="/contact">
          Bring us the signal
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
