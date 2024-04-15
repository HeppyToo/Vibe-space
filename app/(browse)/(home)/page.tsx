import { Poppins } from "next/font/google";

import {Button} from "@/components/ui/button";
import {LoginButton} from "@/components/auth/login-button";
import {cn} from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})
export default function Page() {
    return (
        <main
            className="flex h-full flex-col items-center justify-center">
            <div className="space-y-6 text-center">
                <h1 className={cn(
                    "text-6xl font-semibold text-white drop-shadow-md",
                    font.className,
                )}>
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">
                    A simple authentication service
                </p>
                <div>
                    <LoginButton asChild>
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}