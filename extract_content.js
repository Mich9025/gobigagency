
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootPath = path.join(__dirname, 'src/content');
const outputDir = path.join(__dirname, 'src/app/data');

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8');
};

const parseFrontmatter = (frontmatter) => {
  return JSON.parse(JSON.stringify(frontmatter));
};

const getMainPage = (filePath) => {
  const pageDataPath = path.join(rootPath, filePath);
  
  if (!fs.existsSync(pageDataPath)) {
    console.warn(`Warning: File not found: ${pageDataPath}`);
    return {};
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    data: parseFrontmatter(frontmatter),
    content,
  };
};

const getAllPages = (folder) => {
  const folderPath = path.join(rootPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
     console.warn(`Warning: Folder not found: ${folderPath}`);
    return [];
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith('.mdx'));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );

  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace('/', '') : slug;

    return {
      data: parseFrontmatter(frontmatter),
      slug: url,
      content,
    };
  });

  const publishedPages = singlePages.filter((page) => !page.data.draft && page);
  const sortById = publishedPages.sort((a, b) => a.data.id - b.data.id);
  return sortById;
};

// --- Web Page Extraction ---
const extractWebPage = () => {
    console.log("Extracting Web Page Content...");
    const data = {
        clients: getMainPage("/brands/brands3.mdx").data,
        about: getMainPage("/about/web/main.mdx").data,
        feature: getMainPage("/features/web-features.mdx").data,
        skill: getMainPage("/skill/web-skill.mdx").data,
        enterprise: getMainPage("/enterprise/web-enterprise.mdx").data,
        works: getAllPages("/works/web"),
        service: getMainPage("/services/web/_main.mdx").data,
        services: getAllPages("/services/web"),
        image: getMainPage("/image/web-image.mdx").data,
        teamMembers: getAllPages("/team/main"),
        team: getMainPage("/team/web/_main.mdx").data,
        faqsData: getMainPage("/faqs/web-faqs.mdx").data,
        contactBanner: getMainPage("/banner/web-contact-banner.mdx").data,
        testimonial: getMainPage("/testimonial/web-testimonial.mdx").data,
        blog: getMainPage("/blogs/web/_main.mdx").data,
        blogs: getAllPages("/blogs/web")
    };

    fs.writeFileSync(path.join(outputDir, 'web.json'), JSON.stringify(data, null, 2));
    console.log("Created src/app/data/web.json");
};

// --- AI Agency Page Extraction ---
const extractAiAgencyPage = () => {
    console.log("Extracting AI Agency Page Content...");
    const data = {
        hero: getMainPage("/heros/ai-hero.mdx").data,
        about: getMainPage("/about/ai-about.mdx").data,
        infoSection: getMainPage("/info/ai-info.mdx").data,
        features: getMainPage("/features/ai-features.mdx").data,
        service: getMainPage("/services/ai/_main.mdx").data,
        services: getAllPages("/services/ai"),
        video: getMainPage("/video/ai-video.mdx").data,
        client: getMainPage("/clients/ai-clients.mdx").data,
        faqData: getMainPage("/faqs/ai-faqs.mdx").data,
        blog: getMainPage("/blogs/ai/_main.mdx").data,
        blogs: getAllPages("/blogs/ai")
    };
    
    fs.writeFileSync(path.join(outputDir, 'ai-agency.json'), JSON.stringify(data, null, 2));
    console.log("Created src/app/data/ai-agency.json");
};

// --- Marketing Page Extraction ---
const extractMarketingPage = () => {
     console.log("Extracting Marketing Page Content...");
    const data = {
        hero: getMainPage("/heros/marketing-hero.mdx").data,
        image: getMainPage("/image/marketing-image.mdx").data,
        feature: getMainPage("/features/marketing-features.mdx").data,
        service: getMainPage("/services/marketing/_main.mdx").data,
        services: getAllPages("/services/marketing"),
        works: getAllPages("/works/marketing"),
        workMain: getMainPage("/works/marketing/_main.mdx").data,
        about: getMainPage("/about/marketing-about.mdx").data,
        testimonial: getMainPage("/testimonial/marketing-testimonial.mdx").data,
        funFact: getMainPage("/funFact/marketing-fun-fact.mdx").data,
        banner: getMainPage("/banner/marketing-banner.mdx").data,
        clients: getMainPage("/brands/brands1.mdx").data,
        report: getMainPage("/report/marketing-report.mdx").data,
        clientTitle: getMainPage("/clients/marketing-clients.mdx").data,
        blog: getMainPage("/blogs/marketing/_main.mdx").data,
        blogs: getAllPages("/blogs/marketing")
    };

    fs.writeFileSync(path.join(outputDir, 'marketing.json'), JSON.stringify(data, null, 2));
    console.log("Created src/app/data/marketing.json");
};


extractWebPage();
extractAiAgencyPage();
extractMarketingPage();
