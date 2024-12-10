"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Users, Target, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Empowering Voices.<br />Amplifying Impact.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Strategic communications and political advocacy solutions for modern changemakers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/generator">
                Try Our Content Generator <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Megaphone className="h-8 w-8" />}
              title="Strategic Communications"
              description="Craft compelling narratives that resonate with your audience and drive meaningful engagement."
            />
            <ServiceCard
              icon={<Users className="h-8 w-8" />}
              title="Advocacy Consulting"
              description="Expert guidance to amplify your message and create lasting impact in your community."
            />
            <ServiceCard
              icon={<Target className="h-8 w-8" />}
              title="Campaign Strategy"
              description="Data-driven campaign strategies that deliver results and achieve your advocacy goals."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Songbird Consulting transformed our advocacy efforts. Their strategic guidance helped us achieve unprecedented engagement."
              author="Sarah Chen"
              role="Executive Director, Climate Action Now"
            />
            <TestimonialCard
              quote="The team's expertise in digital advocacy and content strategy was instrumental in our campaign's success."
              author="Michael Rodriguez"
              role="Policy Director, Education First"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-card p-8 rounded-lg shadow-lg">
      <Award className="h-8 w-8 text-primary mb-4" />
      <blockquote className="text-lg mb-4">{quote}</blockquote>
      <div>
        <cite className="font-semibold block not-italic">{author}</cite>
        <span className="text-muted-foreground">{role}</span>
      </div>
    </div>
  );
}