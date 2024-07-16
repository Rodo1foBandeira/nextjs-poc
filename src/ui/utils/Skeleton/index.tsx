import { Skeleton as MuiSkeleton, SkeletonOwnProps } from "@mui/material";

interface ISkeletonProps extends SkeletonOwnProps {
  repeat?: number;
}

export default function Skeleton({ repeat = 1, ...props }: ISkeletonProps) {
  return (
    <>
      {Array.from({ length: repeat }).map((_, i) => (
        <MuiSkeleton key={i} {...props} />
      ))}
    </>
  );
}
