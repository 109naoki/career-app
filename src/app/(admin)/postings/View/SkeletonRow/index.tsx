import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export const SkeletonRow = () => (
  <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] border-t p-3">
    <div>
      <Skeleton width="75%" height={24} />
    </div>
    <div>
      <Skeleton width="80%" height={24} />
    </div>
    <div>
      <Skeleton width={64} height={24} />
    </div>
    <div>
      <Skeleton width={96} height={24} />
    </div>
    <div>
      <Skeleton width={96} height={24} />
    </div>
  </div>
);
