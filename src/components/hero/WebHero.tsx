"use client";

import Link from "next/link";
import ImageComponent from "../tools/ImageComponent";
import { FaPlay } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import VideoModal from "../tools/VideoModal";
import { Button } from "../ui/button";
import hasWordAnim from "@/lib/animation/hasWordAnim";

interface HeroProps {
  hero: {
    title: {
      prefix: string;
      highlight1: string;
      highlight2: string;
    };
    description: string;
    link: {
      text: string;
      href: string;
    };
    videoLink: string;
    clientCount: string;
    clientText: string;
    images: {
      shape1: { src: string; darkSrc: string };
      shape2: { src: string; darkSrc: string };
      scrollIndicator: { src: string; darkSrc: string };
      arrowIcon: { src: string; darkSrc: string };
      shape3: { src: string; darkSrc: string };
      gallery1: string;
      gallery2: string;
      shape4: { src: string; darkSrc: string };
      customer: { src: string; darkSrc: string };
    };
  };
}

const WebHero = ({ hero }: HeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);

  const closeDialog = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(
    () => {
      hasFadeAnim();
      hasWordAnim();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef}>
      <div className="inner-container large">
        <div className="relative pt-[50px] 2xl:pt-[100px] pb-[55px] lg:pb-[85px] xl:pb-[115px] me-0 2xl:me-[-140px] md:pe-[190px] 2xl:pe-[240px] z-[1]">
          <div className="absolute bottom-0 end-[calc(100%-200px)] w-[330px] 2xl:w-[410px] h-[410px] -z-[1]">
            <ImageComponent
              src={hero.images.shape1.src}
              darkSrc={hero.images.shape1.darkSrc}
              width={410}
              height={410}
              className="w-full h-full rtl-rotate-y-180"
              alt="shape"
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_370px] 2xl:grid-cols-[1fr_520px] gap-y-[50px] gap-x-[60px]">
            <div className="md:mt-[50px]">
              <h1 className="has_fade_anim uppercase text-[80px] xl:text-[110px] 2xl:text-[190px] leading-[0.76]">
                {hero.title.prefix}{" "}
                <span className="text-[24px] 2xl:text-[42px] text-text leading-[0.83] font-semibold inline-block relative pb-2.5 2xl:pb-[27px] -translate-y-[17px] 2xl:-translate-y-[36px] before:absolute before:content-[''] before:w-full before:h-px before:bg-[var(--theme)] before:bottom-0 before:start-0 after:absolute after:content-[''] after:w-full after:h-px after:bg-[var(--theme)] after:bottom-1 after:start-0">
                  {hero.title.highlight1.split(" ")[0]} <br />
                  {hero.title.highlight1.split(" ")[1]}
                </span>{" "}
                y{" "}
                <span className="text-lg 2xl:text-[30px] text-text leading-[0.66] lowercase font-normal w-[70px] 2xl:w-[120px] h-[70px] 2xl:h-[120px] bg-theme inline-flex items-center pt-[9px] 2xl:pt-[19px] rounded-[24px] 2xl:rounded-[47px] rotate-180 [writing-mode:vertical-lr]">
                  {hero.title.highlight2}
                </span>
                <span
                  className="has_fade_anim relative inline-block -ms-5 2xl:-ms-[30px] h-[70px] 2xl:h-[120px]"
                  data-fade-offset="0"
                >
                  <ImageComponent
                    src={hero.images.shape2.src}
                    darkSrc={hero.images.shape2.darkSrc}
                    width={120}
                    height={120}
                    className="w-full h-full"
                    alt="shape"
                  />
                </span>
              </h1>

              <div className="relative ms-[110px] 2xl:ms-[315px] mt-[35px] 2xl:mt-[65px]">
                <div
                  className="has_fade_anim absolute top-0 end-[calc(100%+60px)] w-max"
                  data-fade-offset="0"
                  data-on-scroll="0"
                  data-delay="0.75"
                >
                  <ImageComponent
                    src={hero.images.scrollIndicator.src}
                    darkSrc={hero.images.scrollIndicator.darkSrc}
                    width={50}
                    height={80}
                    alt="scroll indicator"
                  />
                </div>

                <p
                  className="text-lg 2xl:text-[20px] leading-[1.37] max-w-[380px] has_fade_anim"
                  data-on-scroll="0"
                  data-delay="0.30"
                >
                  {hero.description}
                </p>

                <div className="mt-[48px] has_fade_anim">
                  <Link
                    href={hero.link.href}
                    className="btn-text-flip wc-btn-underline text-sm uppercase inline-flex items-center gap-2.5"
                  >
                    <span data-text={hero.link.text}>{hero.link.text}</span>
                    <ImageComponent
                      src={hero.images.arrowIcon.src}
                      darkSrc={hero.images.arrowIcon.darkSrc}
                      width={21}
                      height={7}
                      alt="arrow icon"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="has_fade_anim relative" data-fade-from="right">
                <div className="absolute top-[46px] start-[67px]">
                  <ImageComponent
                    src={hero.images.shape3.src}
                    darkSrc={hero.images.shape3.darkSrc}
                    className="rtl-rotate-y-180"
                    width={100}
                    height={60}
                    alt="shape"
                  />
                </div>
                <div className="absolute end-0 top-[66%] z-[1]">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => setIsOpen(!isOpen)}
                      className="wc-btn-circle !w-[100px] !h-[100px] !border-[5px] !border-background !bg-background-2 !text-text-2 "
                    >
                      <FaPlay />
                    </Button>
                    <span className="text-sm font-medium uppercase leading-[1.14] inline-block text-text">
                      Ver <br />
                      Video
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="mt-[160px] relative [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] rtl-rotate-y-180 after:absolute after:content-[''] after:w-full after:h-full after:bg-[#FF0000] after:top-0 after:start-0 after:mix-blend-multiply w-[210px] h-[440px]"
                    style={{
                      maskImage:
                        "url('/assets/imgs/shape/radius-half-left.png')",
                    }}
                  >
                    <ImageComponent
                      src={hero.images.gallery1}
                      width={210}
                      height={440}
                      className="w-full h-full"
                      style={{ objectFit: "cover" }}
                      alt="gallery image 1"
                    />
                  </div>
                  <div
                    className="[mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] rtl-rotate-y-180 w-[251px] h-[500px]"
                    style={{
                      maskImage:
                        "url('/assets/imgs/shape/radius-half-right.png')",
                    }}
                  >
                    <ImageComponent
                      src={hero.images.gallery2}
                      width={251}
                      height={500}
                      className="w-full h-full"
                      style={{ objectFit: "cover" }}
                      alt="gallery image 2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-[41px] flex justify-end">
                <div className="inline-block ms-auto">
                  <ImageComponent
                    src={hero.images.shape4.src}
                    darkSrc={hero.images.shape4.darkSrc}
                    width={80}
                    height={50}
                    className="rtl-rotate-y-180"
                    alt="shape"
                  />
                  <div className="mt-[30px]">
                    <ImageComponent
                      src={hero.images.customer.src}
                      darkSrc={hero.images.customer.darkSrc}
                      width={160}
                      height={55}
                      alt="customer"
                    />
                  </div>

                  <p className="text-lg mt-[15px] leading-tight">
                    <span className="underline text-text">{hero.clientCount}</span>{" "}
                    {hero.clientText.split("\n")[0]} <br />
                    {hero.clientText.split("\n")[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        link={hero.videoLink}
        isOpen={isOpen}
        close={closeDialog}
      />
    </section>
  );
};

export default WebHero;
