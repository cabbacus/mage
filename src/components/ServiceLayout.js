import Header from '../components/Header';
import FooterForm from '../components/FooterForm';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ServiceLayout({ pageData }) {
  const acf = pageData.acf || {};

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 dangerouslySetInnerHTML={{ __html: pageData.title.rendered }} />

        {/* Top Image */}
        {acf.top_image && (
          <Image
            src={`./images/${acf.top_image}`}
            alt="Top"
            width={100}
            height={100}
            className="w-full h-auto my-6"
          />
        )}

        {/* Small Title */}
        {acf.small_title && (
          <p
            className="text-lg my-4"
            dangerouslySetInnerHTML={{ __html: acf.small_title }}
          />
        )}

        {/* Heading Title */}
        {acf.heading_title && (
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {acf.heading_title}
          </h2>
        )}

        {/* White Label Services List */}
        {acf.white_label_services?.length > 0 && (
          <ul className="list-disc pl-5 mb-8">
            {acf.white_label_services.map((item, i) => (
              <li key={i}>{item.title}</li>
            ))}
          </ul>
        )}

        {/* White Label Partner Title */}
        {acf.white_label_partner_title && (
          <h2
            className="text-xl font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: acf.white_label_partner_title }}
          />
        )}

        {/* Partner Repeater */}
        {acf.partner_repeater?.length > 0 && (
          <ul className="list-disc pl-5 mb-10">
            {acf.partner_repeater.map((item, i) => (
              <li key={i}>{item.title}</li>
            ))}
          </ul>
        )}

        {/* Services Grid */}
        {acf.services?.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            {acf.services.map((service, i) => (
              <div key={i} className="border p-4 rounded shadow-sm">
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: service.description }} />
              </div>
            ))}
          </section>
        )}

        {/* Testimonials */}
        {acf.testimonials?.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-semibold mb-4">{acf.happy_clients_title}</h2>
            {acf.testimonials.map((testimonial, i) => (
              <blockquote key={i} className="border-l-4 pl-4 mb-4 italic">
                <p>{testimonial.client_experience_description}</p>
                <footer className="text-right mt-2">— {testimonial.client_name}</footer>
              </blockquote>
            ))}
          </section>
        )}

        {/* FAQ Section */}
        {acf.faqs?.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-semibold mb-4">{acf.faq_title}</h2>
            {acf.faqs.map((faq, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold">{faq.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: faq.description }} />
              </div>
            ))}
          </section>
        )}
      </main>
      <FooterForm />
      <Footer />
    </>
  );
}
