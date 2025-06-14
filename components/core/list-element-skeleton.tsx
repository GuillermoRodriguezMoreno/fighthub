export function ListElementSkeleton({
  entity,
  elements,
}: {
  entity: string;
  elements: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center h-64 bg-accent rounded-md">
        <p className="text-muted-foreground text-xl">
          This {entity} does not have {elements} yet.
        </p>
      </div>
    </div>
  );
}
