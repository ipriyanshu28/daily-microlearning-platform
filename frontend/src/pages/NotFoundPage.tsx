import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-xs">
        <Compass size={32} />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">404 Error</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed">
        The lesson, path, or page you were looking for doesn't exist or may have been relocated.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft size={16} />}>
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/discover">
          <Button variant="outline" size="md">
            Explore Lesson Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};
