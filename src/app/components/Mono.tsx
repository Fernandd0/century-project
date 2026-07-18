import React from "react";

export const Mono = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={`font-mono ${className}`} {...props}>
    {children}
  </span>
);
