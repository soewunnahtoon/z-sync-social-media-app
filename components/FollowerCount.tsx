"use client";

import { formatNumber } from "@/lib/utils/format-number";
import { useFollowerInfo } from "@/hooks/use-follower-info";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
};
export default FollowerCount;
