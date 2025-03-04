import Image from "next/image";
import { JSX } from "react";

interface SponsorProps {
  icon?: JSX.Element;
  name: string;
  img: string;
}

const sponsors: SponsorProps[] = [
  {
    name: "Next gen fight club",
    img: "/nextgen.jpeg",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Investors and founders
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name, img }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <Image src={img} alt="sponsor image" width={100} height={100} />
            <h3 className="text-xl  font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
