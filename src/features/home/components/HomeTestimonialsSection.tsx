"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import user1 from "@src/assets/dashboard/user1.svg";
import user2 from "@src/assets/dashboard/user2.svg";

const testimonials = [
  {
    quote: "The AI’s ability to extract requirements from a 200-page RFP and generate a compliant methodology in minutes is mind-blowing.",
    name: "Eng. Abdullah Mansour",
    role: "Senior Proposal Specialist",
    avatar: user2,
  },
  {
    quote: "Rayyan has completely redefined how we approach complex government tenders. It's our gain and speed in the delivery.",
    name: "Maya Detris",
    role: "Bid Lead, Public Sector",
    avatar: user1,
  },
  {
    quote: "Our technical scores have never been higher. The methodology generated is compliant and professional.",
    name: "Eng. Adelah Noor",
    role: "CEO, Building Matrix",
    avatar: user2,
  },
  {
    quote: "Extracting requirements used to take days; now it takes minutes. Highly recommended for bidding teams.",
    name: "Marcus Chen",
    role: "Operations Director",
    avatar: user1,
  },
] as const;

export default function HomeTestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      containScroll: "trimSnaps" 
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="layout-shell-x overflow-hidden py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h3 className="mx-auto max-w-2xl text-center text-2xl font-semibold leading-snug text-[#1A1615] md:text-3xl">
          See how RAYYAN AI is transforming the way bidding teams win tenders
        </h3>

        {/* --- Carousel Wrapper with Gradients --- */}
        <div className="relative mt-14">
          
          {/* Left Gradient Overlay */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[#F9F9F9] to-transparent md:w-64"></div>
          
          {/* Right Gradient Overlay */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[#F9F9F9] to-transparent md:w-64"></div>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, index) => {
                const isActive = selectedIndex === index;

                return (
                    <div
                      key={`${item.name}-${index}`}
                      className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_33.33%]"
                    >
                      <div className="flex flex-col items-center">
                        
                        {/* ACTIVE: profile OUTSIDE */}
                        {isActive && (
                          <div className="mb-4 flex flex-col items-center gap-2">
                            <Image
                              src={item.avatar}
                              alt={item.name}
                              className="h-16 w-16 rounded-full border-2 border-white"
                            />
                            <div className="text-center">
                              <p className="text-xs font-semibold text-[#1A1615]">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-[#757170]">
                                {item.role}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* CARD */}
                        <article
                          className={`
                            relative flex flex-col items-center rounded-3xl p-6 text-center
                            transition-all duration-700 ease-in-out
                            ${isActive
                              ? "bg-[#58A19A]/15 scale-100 pt-6"
                              : "bg-white scale-90 mt-4"
                            }
                          `}
                        >
                          <p className="text-sm leading-6 text-[#1A1615]">
                            "{item.quote}"
                          </p>

                          {/* INACTIVE: profile INSIDE */}
                          {!isActive && (
                            <div className="mt-4 flex flex-col items-center gap-2">
                              <Image
                                src={item.avatar}
                                alt={item.name}
                                className="h-12 w-12 rounded-full border-2 border-white"
                              />
                              <div className="text-center">
                                <p className="text-xs font-semibold text-[#1A1615]">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-[#757170]">
                                  {item.role}
                                </p>
                              </div>
                            </div>
                          )}
                        </article>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}