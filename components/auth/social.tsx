"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
    const callbackUrl = searchParams ? searchParams.get("callbackUrl") || "/" : "/";

  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full bg-muted-foreground/70 border-muted-foreground/70 hover:bg-primary/50"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle className="text-white w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full bg-muted-foreground/70 border-muted-foreground/70 hover:bg-primary/50"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="text-white w-5 h-5" />
      </Button>
    </div>
  );
};
