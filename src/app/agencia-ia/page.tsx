import AiAbout from "@/components/about/AiAbout";
import AiBlog from "@/components/blog/ai/AiBlog";
import AiClient from "@/components/clients/AiClient";
import AiFaq from "@/components/faq/ai/AiFaq";
import AiFeature from "@/components/features/ai/AiFeature";
import AiHero from "@/components/hero/Ai/AiHero";
import AiInfo from "@/components/info/AiInfo";
import AiService from "@/components/service/ai/AiService";
import SeoData from "@/components/tools/SeoData";
import AiVideo from "@/components/video/ai/AiVideo";
import aiAgencyData from "@/app/data/ai-agency.json";

const AiAgency = () => {
  const {
    hero,
    about,
    infoSection,
    features,
    service,
    services,
    video,
    client,
    faqData,
    blog,
    blogs,
  } = aiAgencyData;

  return (
    <main>
      <SeoData
        title="Arolax Ai Agency"
        description="Arolax Ai Agency Description"
      />
      <AiHero {...hero} />
      <AiAbout {...about} />
      <AiInfo {...infoSection} />
      <AiFeature {...features} />
      {/* <AiService {...service} services={services} /> */}
      <AiVideo {...video} />
      <AiClient {...client} />
      <AiFaq {...faqData} />
      <AiBlog blogs={blogs} {...blog} />
    </main>
  );
};

export default AiAgency;
