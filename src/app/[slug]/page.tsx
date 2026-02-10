import { notFound } from "next/navigation";
import { getPageBySlug, getPages } from "@/lib/wordpress";
import SeoData from "@/components/tools/SeoData";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
};

const DynamicPage = async ({ params }: Props) => {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <SeoData
        title={page.title.rendered}
        meta_title={page.title.rendered}
        description={page.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
      />
      <div className="container2 pt-[127px] xl:pt-[147px] 2xl:pt-[217px] pb-[100px]">
        <h1
          className="text-[36px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[80px] 2xl:text-[100px] mb-[40px]"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
        <div
          className="page-content prose max-w-none text-text"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </div>
    </main>
  );
};

export default DynamicPage;
