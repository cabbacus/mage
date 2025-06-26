export function getSeoMetadata(data) {
  const seo = data?.aioseo_head_json || {};
  return {
    title: seo.title || 'Mage Monkeys',
    description: seo.description || '',
    alternates: {
      canonical: seo.canonical_url || '',
    },
    openGraph: {
      title: seo['og:title'],
      description: seo['og:description'],
      url: seo['og:url'],
      siteName: seo['og:site_name'],
      locale: seo['og:locale'],
      type: seo['og:type'],
    },
    twitter: {
      card: seo['twitter:card'],
      title: seo['twitter:title'],
      description: seo['twitter:description'],
    },
  };
}
