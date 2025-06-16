export function ImageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center h-150 bg-accent rounded-md p-4">
        <p className="text-muted-foreground text-xl">No image uploaded</p>
      </div>
    </div>
  );
}
