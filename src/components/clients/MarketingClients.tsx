"use client";

import ImageComponent from "@/components/tools/ImageComponent";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MarketingSectionTitle from "../sectionTitle/MarketingSectionTitle";

type Props = {
  title: string;
  clients: {
    image: {
      dark: string;
      light?: string;
    };
  }[];
};

const MarketingClients = ({ title, clients }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );
  return (
    <section ref={containerRef}>
      <div className="inner-container">
        <div className="pt-[60px] xl:pt-[100px] 2xl:pt-[130px]">
          <MarketingSectionTitle
            title={title}
            animation="has_fade_anim"
            className="max-w-[970px]"
          />
          <div
            className="has_fade_anim mt-[56px] xl:mt-[66px] 2xl:mt-[86px]"
            data-fade-from="bottom"
            data-fade-offset="50"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 border-t border-s border-border-2">
              {clients.slice(0, 35).map((item, index) => (
                <div
                  className="h-[100px] md:h-[120px] xl:h-[150px] 2xl:h-[170px] p-5 border-e border-b inline-flex justify-center items-center border-border-2 group"
                  key={index}
                >
                  <ImageComponent
                    src={item.image.light || item.image.dark}
                    darkSrc={item.image.dark}
                    width={102}
                    height={38}
                    alt="client"
                    className={`opacity-70 group-hover:opacity-100 transition-all duration-300 w-auto object-contain ${
                      !item.image.light
                        ? "brightness-0 opacity-50 dark:brightness-100 dark:opacity-100 dark:invert-0"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingClients;
