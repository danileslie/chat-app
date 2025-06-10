import { Skeleton } from "../ui/skeleton";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex w-full ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`flex items-end gap-3 ${
              idx % 2 !== 0 ? "flex-row-reverse" : ""
            }`}
          >
            {/* avatar */}
            <Skeleton className="size-10 rounded-full shrink-0" />

            {/* username & message */}
            <div className="text-left space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-16 w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
