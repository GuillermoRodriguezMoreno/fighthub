export const Statistics = () => {
  interface statsProps {
    title: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      title: "Our Mission",
      description: "To empower fighters by providing a platform where they can connect, grow, and showcase their talent on a global stage.",
    },
    {
      title: "Our Vision",
      description: "To become the leading digital hub for combat sports, bridging the gap between fighters, gyms, and event organizers worldwide.",
    },
  ];

  return (
    <section id="statistics">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {stats.map(({ title, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
