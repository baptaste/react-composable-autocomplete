import type { ReactNode } from "react";

import { cn } from "@/packages/core/utils/cn";

const InstallationBlock = ({ children }: { children?: ReactNode }) => {
  return <div className="mb-8 flex flex-col overflow-hidden">{children}</div>;
};

const InstallationBlockTitle = ({ children }: { children?: ReactNode }) => {
  return <h4 className="mb-6 border-b pb-2 text-xl">{children}</h4>;
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
  return <span className="text-pretty text-muted-foreground">{children}</span>;
};

export {
  InstallationBlock,
  InstallationBlockTitle,
  InstallationBlockContent,
  InstallationBlockDescription,
};
