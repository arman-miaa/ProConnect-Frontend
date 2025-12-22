import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get started as a seller on ProConnect?",
    answer:
      "Simply create an account, complete your profile with your skills and portfolio, and start listing your services. Once verified, your services will be visible to potential clients worldwide.",
  },
  {
    question: "What fees does ProConnect charge?",
    answer:
      "We operate on a simple commission model. Sellers pay a small percentage (5-15% depending on plan) on completed orders. Clients pay no platform fees - only the listed service price.",
  },
  {
    question: "How does the payment protection work?",
    answer:
      "All payments are held in escrow until the project is completed. Clients release payment once satisfied, and sellers are guaranteed to receive their earnings within 14 days of completion.",
  },
  {
    question: "Can I communicate with sellers before placing an order?",
    answer:
      "Our built-in messaging system allows you to discuss project requirements, ask questions, and negotiate terms before committing to an order.",
  },
  {
    question: "What happens if I'm not satisfied with the delivered work?",
    answer:
      "We offer revision requests based on the seller's policy. If issues persist, our support team mediates disputes to ensure fair resolution for both parties.",
  },
  {
    question: "How long does seller verification take?",
    answer:
      "Standard verification typically takes 24-48 hours. We verify identity, portfolio authenticity, and professional credentials to ensure quality standards.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? Weve got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
