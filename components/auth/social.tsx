"use client"

import { FaGoogle } from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button";

export const Social = () => {
    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size='lg'
                className='w-full bg-muted-foreground/70 border-muted-foreground/70'
                variant='outline'
                onClick={() => {
                }}>
                <FaGoogle className='text-white w-5 h-5'/>
            </Button>
            <Button
                size='lg'
                className='w-full bg-muted-foreground/70 border-muted-foreground/70'
                variant='outline'
                onClick={() => {
                }}>
                <FaGithub className='text-white w-5 h-5'/>
            </Button>
        </div>
    )
}