export function EventFightsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center h-64 bg-accent rounded-md">
        <p className="text-muted-foreground text-xl">
          No fights have been created for this event yet.
        </p>
      </div>
    </div>
  );
}
