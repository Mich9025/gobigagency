import WebAbout from "@/components/about/WebAbout";
import WebBlog from "@/components/blog/web/WebBlog";
import ClientSlider from "@/components/clients/ClientSlider";
import WebContact from "@/components/contact/WebContact";
import WebEnterPrise from "@/components/enterprise/web/WebEnterPrise";
import WebFaq from "@/components/faq/web/WebFaq";
import WebFeature from "@/components/features/web/WebFeature";
import WebHero from "@/components/hero/WebHero";
import WebImage from "@/components/image/WebImage";
import WebService from "@/components/service/web/WebService";
import WebSkill from "@/components/skill/web/WebSkill";
import WebTeam from "@/components/team/web/WebTeam";
import WebTestimonial from "@/components/testimonial/web/WebTestimonial";
import WebWork from "@/components/work/web/WebWork";
import webData from "@/app/data/web.json";
import homeData from "@/app/data/home.json";
import BindBtnMoveEffect from "@/components/tools/BindBtnMoveEffect";
import SeoData from "@/components/tools/SeoData";
import { getPosts } from "@/lib/wordpress";

const page = async () => {
  const {
    hero,
    clients,
    about,
    feature,
    skill,
    enterprise,
    works,
    service,
    services,
    image,
    teamMembers,
    team,
    faqsData,
    contactBanner,
    testimonial,
    blog,
  } = homeData;

  const posts = await getPosts(3); // Fetch latest 3 posts

  const blogs = posts.map((post: any) => ({
    data: {
      id: post.id,
      title: post.title.rendered,
      short_description: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, ""),
      author_name: post._embedded?.author?.[0]?.name || "Admin",
      thumb_img:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/assets/imgs/blog/img-s-1.jpg",
      tags:
        post._embedded?.["wp:term"]?.[1]?.map((tag: any) => ({
          name: tag.name,
          link: "#",
        })) || [],
      published_date: new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      likes: 0,
      comments: 0,
    },
    slug: post.slug,
  }));

  return (
    <div>
      <BindBtnMoveEffect />
      <SeoData
        title="GoBig Agency - Agencia de Marketing Digital y Desarrollo Web"
        meta_title="GoBig Agency - Agencia de Marketing Digital y Desarrollo Web"
        description="Agencia líder en marketing digital, desarrollo web, diseño, fotografía y video. Transformamos ideas en experiencias digitales exitosas."
        image="/assets/imgs/logo/logoBlanco.svg"
        canonical="https://www.gobigagency.co/web"
        noindex={false}
      />
      <WebHero hero={hero} />
      <ClientSlider
        clients={clients.brands}
        shapeImage="/assets/imgs/shape/img-s-65.png"
      />
      <WebAbout data={{ ...about }} />
      <WebFeature {...feature} />
      <WebSkill {...skill} />
      {/* <WebEnterPrise {...enterprise} /> */}
      <WebWork works={works} />
      <WebService {...service} services={services} />
      <WebImage {...image} />
      <WebTestimonial {...testimonial} />
      {/* <WebTeam teamMembers={teamMembers} {...team} /> */}
      <div className="dark bg-background text-text">
        <WebFaq {...faqsData} />
      </div>
      {/* <WebContact contactBanner={contactBanner} /> */}
      <WebBlog blogs={blogs} {...blog} />
    </div>
  );
};

export default page;
