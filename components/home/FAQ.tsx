import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
    {
      question: "What is FightHub and how does it work?",
      answer: "FightHub is a platform designed to connect K1, Muay Thai, and MMA fighters with fight opportunities, coaches, and promoters. Create your profile, explore events, and expand your network within the combat sports community.",
      value: "item-1"
    },
    {
      question: "Who can join the platform?",
      answer: "FightHub is open to professional and amateur fighters, coaches, promoters, event organizers, and combat sports enthusiasts.",
      value: "item-2"
    },
    {
      question: "How can I register for an event?",
      answer: "You can find events in our event listings section and register directly through the platform. You’ll also receive notifications about upcoming competitions near you.",
      value: "item-3"
    },
    {
      question: "Does FightHub help fighters get sponsorships?",
      answer: "Yes, our platform provides visibility for fighters and allows them to connect with brands and sponsors interested in supporting combat sports talent.",
      value: "item-4"
    },
    {
      question: "Is it free to register on FightHub?",
      answer: "Basic registration is free and allows you to create a profile. We also offer premium features for enhanced exposure and access to exclusive events.",
      value: "item-5"
    },
    {
      question: "How can I connect with a coach or promoter?",
      answer: "Our platform allows you to directly connect with verified coaches and promoters through private messaging and networking features.",
      value: "item-6"
    },
    {
      question: "Can I share my fight stats and achievements on the platform?",
      answer: "Yes, you can personalize your profile with your fight record, achievements, and training progress to showcase your growth as a fighter.",
      value: "item-7"
    }
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
