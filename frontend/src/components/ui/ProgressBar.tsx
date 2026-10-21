import React from "react";

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValueLabel?: boolean;
  color?: "indigo" | "emerald" | "amber" | "violet";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValueLabel = false,
  color = "indigo",
  size = "md",
  className = "",
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colorStyles = {
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    violet: "bg-violet-600",
  };

  const sizeStyles = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValueLabel) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showValueLabel && (
            <span className="font-semibold text-slate-500">{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${sizeStyles[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
