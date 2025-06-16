import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Github, Globe, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "/home/profile-photo.jpeg",
    name: "Guillermo Rodriguez",
    position: "Founder",
    description:
      "Combining my passion for combat sports with technology to build a platform that connects and empowers fighters worldwide.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/guillermo-rodr%C3%ADguez-moreno-b91568272/",
      },
      {
        name: "Github",
        url: "https://github.com/GuillermoRodriguezMoreno",
      },
    ],
  },
  {
    imageUrl: "/home/profile-photo2.webp",
    name: "Wadii Kadiri",
    position: "Pro Fighter",
    description:
      "Dedicated to mastering and teaching the art of combat sports, inspiring the next generation of fighters.",
    socialNetworks: [
      {
        name: "Website",
        url: "https://wktraining.es/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/WadiiKadiri/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/wazaek/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;

      case "Github":
        return <Github size="20" />;

      case "Website":
        return <Globe size="20" />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>
      <h2 className="text-2xl sm:text-3xl font-bold">
        Passionate Fighters, Experienced Coaches, and a Thriving Community.
      </h2>
      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Our team is made up of professional K1, Muay Thai, and MMA fighters,
        along with dedicated trainers and enthusiasts who share a love for
        combat sports. Together, we’re building a space where warriors connect,
        grow, and inspire each other.
      </p>

      <div className="grid md:grid-cols-2 gap-8 gap-y-10">
        {teamList.map(
          ({
            imageUrl,
            name,
            position,
            socialNetworks,
            description,
          }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{description}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  );
};
