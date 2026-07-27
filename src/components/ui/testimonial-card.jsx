import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent } from "./card";

// StatCard using shadcn variables
const StatCard = ({ value, label }) => (
  <Card className="bg-muted/50 border-border text-center rounded-xl">
    <CardContent className="p-4">
      <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

// A sticky testimonial card for the stacking effect.
const StickyTestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      className="w-full lg:sticky"
      style={{ top: `calc(40vh - 100px + ${index * 24}px)` }} // Staggered and centered vertically
    >
      <div className={cn(
        "p-6 rounded-2xl shadow-lg flex flex-col h-auto w-full",
        "bg-card border border-border"
      )}>
        {/* Top section: Image and Author */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
            aria-label={`Photo of ${testimonial.name}`}
          />
          <div className="flex-grow">
            <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>

        {/* Middle section: Rating */}
        <div className="flex items-center gap-2 my-4">
          <span className="font-bold text-base text-foreground">{testimonial.rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(testimonial.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom section: Quote */}
        {testimonial.quote && (
          <p className="text-base text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}) => {
  // Calculate a height for the scroll container to ensure all cards can stack
  const scrollContainerHeight = `calc(100vh + ${testimonials.length * 100}px)`;

  return (
    <section className={cn("w-full bg-background text-foreground py-[72px]", className)}>
      <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky" style={{ top: 'max(30vh, 120px)' }}>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{tagLabel}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">{secondaryActionLabel}</Button>
            <Button size="lg" className="rounded-full w-full sm:w-auto">{primaryActionLabel}</Button>
          </div>
        </div>

        {/* Right Column: Container for the sticky card stack */}
        <div 
          className="relative flex flex-col gap-6 lg:h-[var(--scroll-height)]" 
          style={{ '--scroll-height': scrollContainerHeight }}
        >
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={testimonial.name}
              index={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- DEMO COMPONENT ---

// Define the data for the section
const statsData = [
  { value: "100+", label: "Happy clients" },
  { value: "$250M", label: "revenue added" },
  { value: "4.8", label: "Average Rating" },
];

const testimonialsData = [
  {
    name: "Will Smith",
    title: "Harper Education",
    quote: "Collaborating on this project was seamless. The vision was clearly understood, and the designs genuinely reflect my brand identity.",
    avatarSrc: "https://images.unsplash.com/photo-1752496906365-d5c662900cc1?w=1800&auto=format&fit=crop&q=100",
    avatarFallback: "WS",
    rating: 5.0,
  },
  {
    name: "Ikta Sollork",
    title: "PARAL CEO",
    quote: "Working with this process was effortless. The vision was understood perfectly, and the designs truly represent my brand.",
    avatarSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&auto=format&fit=crop&q=60",
    avatarFallback: "IS",
    rating: 4.7,
  },
  {
    name: "Alex Johnson",
    title: "Innovate Tech",
    quote: "A truly transformative partnership. The end result exceeded all of our expectations and has set a new standard in our industry.",
    avatarSrc: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=900&auto=format&fit=crop&q=60",
    avatarFallback: "AJ",
    rating: 4.9,
  },
];

// The demo component that renders the entire section
export default function ClientsSectionDemo() {
  return (
    <ClientsSection
      tagLabel="Happy Clients"
      title="Clients Love Me"
      description="Trusted by 100+ happy clients, adding $250M+ in revenue."
      stats={statsData}
      testimonials={testimonialsData}
      primaryActionLabel="Contact Now"
      secondaryActionLabel="See All Projects"
    />
  );
}
