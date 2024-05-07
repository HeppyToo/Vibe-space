import Link from "next/link";
import Image from "next/image";

import {cn} from "@/lib/utils";
import {Poppins} from 'next/font/google';

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
    return (
        <Link href="/public" className="text-white flex justify-start items-center w-full">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition align-center">
                <div className="bg-white rounded-full p-1 mr-12 lg:mr-0 shrink-0 lg:shrink">
                    <Image src="/spooky.svg" alt="logo" width="32" height="32"/>
                </div>
                <div className={cn('hidden lg:block', font.className)}>
                    <p className="text-lg font-semibold">Vibe-Space</p>
                    <p className="text-xs text-muted-foreground">
                        A place to vibe
                    </p>
                </div>
            </div>
        </Link>
    )
}