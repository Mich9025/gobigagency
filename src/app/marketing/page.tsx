import marketingData from "@/app/data/marketing.json";
import MarketingAbout from "@/components/about/MarketingAbout";
import MarketingBanner from "@/components/banner/MarketingBanner";
import MarketingBlog from "@/components/blog/marketing/MarketingBlog";
import MarketingClients from "@/components/clients/MarketingClients";
import MarketingFeature from "@/components/features/marketing/MarketingFeature";
import MarketingFunFact from "@/components/funFact/marketing/MarketingFunFact";
import MarketingHero from "@/components/hero/MarketingHero";
import MarketingImage from "@/components/image/MarketingImage";
import MarketingReport from "@/components/report/MarketingReport";
import MarketingService from "@/components/service/marketing/MarketingService";
import MarketingTestimonial from "@/components/testimonial/marketing/MarketingTestimonial";
import SeoData from "@/components/tools/SeoData";
import MarketingWork from "@/components/work/marketing/MarketingWork";
import { getPosts } from "@/lib/wordpress";
import { TBlogType } from "@/types";

const Marketing = async () => {
  const {
    hero,
    image,
    feature,
    service,
    services,
    works,
    workMain,
    about,
    testimonial,
    funFact,
    banner,
    clients,
    report,
    clientTitle,
    blog,
    blogs, 
  } = marketingData;

  let wordpressBlogs: TBlogType[] = [];

  try {
    const posts = await getPosts(100, 3); 
    wordpressBlogs = posts.map((post: any) => ({
      data: {
        id: post.id,
        title: post.title.rendered,
        short_description: post.excerpt.rendered,
        published_date: new Date(post.date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/assets/imgs/blog/img-s-20.jpg", 
        thumb_img:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/assets/imgs/blog/img-s-20.jpg",
        author_name: post._embedded?.author?.[0]?.name || "GoBig Team",
        author_image:
           post._embedded?.author?.[0]?.avatar_urls?.["96"] || "/assets/imgs/client/img-s-1.jpg",
        tags: [],
        likes: 0,
        comments: 0,
        views: 0,
      },
      slug: post.slug,
      content: post.content.rendered,
    }));
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    // Fallback to static data if fetch fails
    wordpressBlogs = blogs as unknown as TBlogType[];
  }

  return (
    <main>
      <SeoData
        title="GoBig Agency - Marketing Digital"
        description="GoBig Agency - Somos expertos en Marketing Digital"
      />
      <MarketingHero {...hero} />
      <MarketingImage {...image} />
      <MarketingFeature {...feature} />
      <MarketingService {...service} services={services} />
      <MarketingWork {...workMain} projects={works} />
      <MarketingAbout {...about} />
      <MarketingTestimonial {...testimonial} />
      <MarketingFunFact {...funFact} />
      <MarketingBanner {...banner} />
      <MarketingReport {...report} />
      {/* 
        MarketingClients expects clients.brands structure. 
        Previously passed: clients={clients.brands}
      */}
      <MarketingClients {...clientTitle} clients={clients.brands} />
      <MarketingBlog blogs={wordpressBlogs.length > 0 ? wordpressBlogs : (blogs as unknown as TBlogType[])} {...blog} />
    </main>
  );
};

export default Marketing;
