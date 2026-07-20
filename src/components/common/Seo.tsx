import { Helmet } from "react-helmet-async";
import { seo, siteInfo } from "../../data/site";
import { socialLinks } from "../../data/contact";
import { faqItems } from "../../data/faq";

export function Seo() {
  const ngoStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteInfo.title,
    description: seo.description,
    organizer: siteInfo.organization,
    url: siteInfo.baseUrl,
    logo: `${siteInfo.baseUrl}/logos/bloom/horizontal/yellow.png`,
    sameAs: socialLinks.map((link) => link.href),
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <title>{seo.pageTitle}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(", ")} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical Link */}
      <link rel="canonical" href={siteInfo.baseUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.openGraphTitle} />
      <meta property="og:description" content={seo.openGraphDescription} />
      <meta property="og:url" content={siteInfo.baseUrl} />
      <meta property="og:image" content={`${siteInfo.baseUrl}/logos/bloom/vertical/yellow.png`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.openGraphTitle} />
      <meta name="twitter:description" content={seo.openGraphDescription} />
      <meta name="twitter:image" content={`${siteInfo.baseUrl}/logos/bloom/vertical/yellow.png`} />

      {/* JSON-LD Schema Structured Data */}
      <script type="application/ld+json">{JSON.stringify(ngoStructuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
    </Helmet>
  );
}
