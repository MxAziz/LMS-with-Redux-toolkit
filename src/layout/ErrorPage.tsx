import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#226957] to-[#678fc3] text-white px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Oops! Page not found</h1>
        <p className="text-gray-300 text-base">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-4 px-6 py-2 text-base bg-white text-black hover:scale-[1.02] hover:bg-[#226957] hover:text-white transition-transform">
          <Link to="/">🔙 Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
