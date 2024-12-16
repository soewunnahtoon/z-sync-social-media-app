"use client";

import useFollowerInfo from "@/hooks/use-follower-info";

import { formatNumber } from "@/lib/utils/format-number";

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
