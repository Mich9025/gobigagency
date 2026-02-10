import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import BlogDetailsTop from "@/components/blog/BlogDetailsTop";
import BlogDetailsLeft from "@/components/blog/BlogDetailsLeft";
import BlogTags from "@/components/blog/BlogTags";
import CommentForm from "@/components/blog/CommentForm";
import SeoData from "@/components/tools/SeoData";

type Props = {
  params: {
    title: string;
  };
};

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    title: post.slug,
  }));
};

const blog = async ({ params }: Props) => {
  const post = await getPostBySlug(params.title);

  if (!post) {
    notFound();
  }

  // Map WordPress data to existing component structure
  const formattedData = {
    data: {
      title: post.title.rendered,
      published_date: new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likes: 0, // Placeholder as WP doesn't provide this by default
      comments: 0, // Placeholder
    },
  };

  const tags = post._embedded?.["wp:term"]?.[1]?.map((tag: any) => ({
    name: tag.name,
    link: "#", // Placeholder link
  })) || [];

  return (
    <main>
      <SeoData
        title={post.title.rendered}
        meta_title={post.title.rendered}
        description={post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
      />
      <div className="container2">
        <div className="pt-[127px] xl:pt-[147px] 2xl:pt-[217px]">
          <BlogDetailsTop {...formattedData} />
          <div className="mt-[60px] lg:mt-20 xl:mt-[100px] grid lg:grid-cols-[80px,1fr] xl:grid-cols-[80px,850px] gap-y-[30px] gap-x-[60px] xl:gap-x-[140px]">
            <BlogDetailsLeft
              views={"0"} // Placeholder
              shares={"0"} // Placeholder
              title={post.title.rendered}
              description={post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
            />
            <div>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
              {tags.length > 0 && <BlogTags tags={tags} />}
              <CommentForm />
            </div>
          </div>
          {/* Removed BlogInnerArea as we don't have related posts logic yet */}
        </div>
      </div>
    </main>
  );
};

export default blog;
