import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
export default loading;