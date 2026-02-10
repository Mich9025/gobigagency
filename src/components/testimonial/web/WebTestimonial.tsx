"use client";

import { useState, useEffect, useCallback } from "react";
import WebSectionTItle from "@/components/sectionTitle/WebSectionTItle";
import CircleFillButton from "@/components/elements/button/CircleFillButton";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import hasTextMovAnim from "@/lib/animation/hasTextMovAnim";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import WebTestimonialCard from "@/components/testimonial/web/WebTestimonialCard";

type TestimonialData = {
  title: string;
  description: string;
  action_btn: {
    label: string;
    link: string;
  };
  testimonial_list: {
    icon: string;
    rating: string;
    star_icon: string;
    text: string;
    author: {
      name: string;
      designation: string;
      avatar: string;
    };
  }[];
};

const WebTestimonial = ({
  title,
  description,
  action_btn,
  testimonial_list,
}: TestimonialData) => {
  const [api, setApi] = useState<CarouselApi>();
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
      hasTextMovAnim();
    },
    { scope: containerRef }
  );
  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);
  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);
  return (
    <section ref={containerRef}>
      <div className="inner-container">
        <div className="py-[60px] xl:py-[140px] grid gap-y-10 gap-x-[60px] grid-cols-1 lg:grid-cols-[1fr,600px] xl:grid-cols-[1fr,700px] justify-between">
          <div>
            <WebSectionTItle title={title} className="max-w-[630px]" />
            <div className="mt-[19px]">
              <p className="has_fade_anim max-w-[330px]">{description}</p>
            </div>
            <div
              className="has_fade_anim mt-[53px]"
              data-fade-from="top"
              data-ease="bounce"
              data-fade-offset="50"
            >
              <div className="btn-move">
                <CircleFillButton
                  href={action_btn.link}
                  text={action_btn.label}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Carousel
              className="w-full"
              dir="ltr"
              opts={{
                align: "start",
                loop: false,
              }}
              setApi={setApi}
            >
              <CarouselContent className="-ml-4">
                {testimonial_list.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2">
                    <WebTestimonialCard {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex gap-[10px] justify-start md:justify-end mt-[15px] rtl:flex-row-reverse ">
              <div
                onClick={handlePrevious}
                className="cursor-pointer w-[35px] h-[35px] border border-border rounded-[50%] flex justify-center items-center transition-all duration-500 text-[12px] hover:bg-background-2 hover:text-white hover:dark:text-black"
              >
                <FaArrowLeft />
              </div>
              <div
                onClick={handleNext}
                className="cursor-pointer w-[35px] h-[35px] border border-border rounded-[50%] flex justify-center items-center transition-all duration-500 text-[12px] hover:bg-background-2 hover:text-white hover:dark:text-black"
              >
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebTestimonial;
