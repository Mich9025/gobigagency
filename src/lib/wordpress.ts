const WP_API_URL = "https://cms.gobigagency.co/wp-json/wp/v2";

export const getPosts = async (perPage = 100, categories?: number) => {
  let url = `${WP_API_URL}/posts?per_page=${perPage}&_embed`;
  if (categories) {
    url += `&categories=${categories}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};

export const getPostBySlug = async (slug: string) => {
  const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
};

export const getPages = async (perPage = 100) => {
  const res = await fetch(`${WP_API_URL}/pages?per_page=${perPage}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }
  return res.json();
};

export const getPageBySlug = async (slug: string) => {
  const res = await fetch(`${WP_API_URL}/pages?slug=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  const pages = await res.json();
  return pages.length > 0 ? pages[0] : null;
};
