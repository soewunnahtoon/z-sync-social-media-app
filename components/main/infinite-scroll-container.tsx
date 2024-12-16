import { useInView } from "react-intersection-observer";

const InfiniteScrollContainer = ({
  children,
  onBottomReached,
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className="space-y-2">
      {children}

      <div ref={ref} />
    </div>
  );
};
export default InfiniteScrollContainer;
