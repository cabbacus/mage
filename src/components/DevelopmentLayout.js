// pages/development.js

import Header from '../components/Header';
import FooterForm from '../components/FooterForm';
import Footer from '../components/Footer';
import Image from 'next/image';
export default function DevelopmentPage({ pageData }) {
  const acf = pageData.acf || {};
  const services = acf.service_repeater || [];
  const caseStudies = acf.case_studies || [];
    
  return (
    <>
      <Header />

      <main className="bg-blue-50 px-4 py-12">
        {/* Top Image */}
        {acf.top_image_url && (
          <Image
            src={acf.top_image_url}
            alt="Top Visual"
            width={100}
            height={100}
            className="w-full max-h-[400px] object-cover mb-10 rounded-xl shadow"
          />
        )}

        {/* Page Title */}
        <h1
          className="text-4xl font-bold text-blue-800 mb-6"
          dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}
        />

        {/* Content */}
        <div
          className="prose prose-blue mb-10"
          dangerouslySetInnerHTML={{ __html: acf.content || pageData.content.rendered }}
        />

        {/* Services */}
        {services.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Our Services</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item, index) => (
                <li key={index} className="bg-white rounded-xl shadow p-4">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">{acf.case_studies_title || 'Case Studies'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
                  {study.image_url && (
                    <Image
                      src={study.image_url}
                      alt={study.title}
                      width={100}
                      height={100}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{study.title}</h3>
                    <p className="text-sm text-gray-700">{study.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <FooterForm />
      <Footer />
    </>
  );
}

// Fetch ACF and image URLs
export async function getStaticProps() {
  const pageSlug = 'development'; // Adjust based on your WP slug
  const baseURL = 'https://your-wordpress-site.com/wp-json/wp/v2';

  const pageRes = await fetch(`${baseURL}/pages?slug=${pageSlug}`);
  const [pageData] = await pageRes.json();
  const acf = pageData.acf || {};

  // Helper: Fetch image URL from media ID
  async function fetchImageUrl(id) {
    if (!id) return null;
    try {
      const res = await fetch(`${baseURL}/media/${id}`);
      const json = await res.json();
      return json?.source_url || null;
    } catch {
      return null;
    }
  }

  // Resolve top image
  const top_image_url = await fetchImageUrl(acf.top_image);

  // Resolve case study images
  const caseStudies = await Promise.all(
    (acf.case_studies || []).map(async (item) => {
      const image_url = await fetchImageUrl(item.image);
      return { ...item, image_url };
    })
  );

  // Inject resolved URLs into ACF
  pageData.acf.top_image_url = top_image_url;
  pageData.acf.case_studies = caseStudies;

  return {
    props: {
      pageData
    },
    revalidate: 60 // ISR: optional
  };
}
