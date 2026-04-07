"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      {/* Background */}
      <div className="bg-white text-black min-h-screen">
        
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
              Powerful Features for Your Career Growth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-gray-600">
                Four simple steps to accelerate your career growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-xl">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Section (You left empty before) */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine AI-driven insights with real-world career strategies
              to help you grow faster, smarter, and more confidently.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find answers to common questions about our platform
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-white">
          <div className="mx-auto py-24 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Ready to Accelerate Your Career?
              </h2>

              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Join thousands of professionals advancing their careers with
                AI-powered guidance.
              </p>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-11 mt-5 bg-white text-black hover:bg-gray-200"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}