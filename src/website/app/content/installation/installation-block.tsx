import type { ReactNode } from "react";

import { cn } from "@/packages/core/utils/cn";

const InstallationBlock = ({ children }: { children?: ReactNode }) => {
  return <div className="mb-8 flex flex-col overflow-hidden">{children}</div>;
};

const InstallationBlockTitle = ({ children }: { children?: ReactNode }) => {
  return (
    <h2 className="mb-6 border-b pb-2 text-2xl font-semibold">{children}</h2>
  );
};

const InstallationBlockContent = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

const InstallationBlockDescription = ({
  children,
}: {
  children?: ReactNode;
}) => {
  return (
    <span className="text-pretty text-secondary-foreground/40">{children}</span>
  );
};

export {
  InstallationBlock,
  InstallationBlockTitle,
  InstallationBlockContent,
  InstallationBlockDescription,
};
