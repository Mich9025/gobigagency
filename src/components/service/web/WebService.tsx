"use client";
import ImageComponent from "@/components/tools/ImageComponent";
import WebSectionTItle from "@/components/sectionTitle/WebSectionTItle";
import { TServiceType } from "@/types";
import WebServiceCard from "@/components/service/web/WebServiceCard";
import { useRef } from "react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import hasTextMovAnim from "@/lib/animation/hasTextMovAnim";
import { useGSAP } from "@gsap/react";

type Props = {
  title: string;
  description: string;
  img_icon: string;
  services: TServiceType[];
};

const WebService = ({ title, description, img_icon, services }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
      hasTextMovAnim();
    },
    { scope: containerRef }
  );
  return (
    <section ref={containerRef}>
      <div className="inner-container">
        <div className="py-[60px] xl:py-[140px]">
          <div>
            <div className="relative">
              <div
                className="has_fade_anim absolute w-[93px] top-[-60px] start-[43%] z-[99] hidden xl:block"
                data-fade-offset="0"
                data-delay="0.8"
              >
                {/* <ImageComponent src={img_icon} width={93} height={98} /> */}
              </div>
              <WebSectionTItle
                title={title}
                className="has_text_move_anim text-center max-w-100 lg:max-w-100 xl:max-w-100 lg:mx-auto text-text-fixed"
              />
            </div>
            <div className="mt-[12px] xl:mt-[22px]">
              <p className="text has_fade_anim text-center max-w-100 lg:max-w-100 xl:max-w-100 lg:mx-auto text-text-fixed">
                {description}
              </p>
            </div>
          </div>
          <div className="mt-[33px] xl:mt-[53px] 2xl:mt-[73px]">
            <div>
              {services.map((service, i) => (
                <WebServiceCard key={service.data.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebService;
