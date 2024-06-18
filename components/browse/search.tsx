'use client';
import React, {useEffect} from "react";

import {X} from 'lucide-react';

import { CiSearch } from "react-icons/ci";
import {Input} from '@/components/ui/input';
import {Author} from "@/types";
import {cn} from "@/lib/utils";

interface SearchProps {
    value: string;
    setValue: (value: string) => void;
    filterFunction: (value: string) => any;
    className?: string;
}
export const Search = ({value, setValue, filterFunction, className} : SearchProps) => {
    const onClear = () => {
        setValue('');
    };

    useEffect(() => {
        filterFunction(value);
    }, [value, filterFunction])

    return (
        <div className={cn("relative",className)}>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                className={cn(
                    "rounded focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 pr-10"
                )}
            />
            {!value && (
                <CiSearch
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                />
            )}
            {value && (
                <X
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                    onClick={onClear}
                />
            )}
        </div>
    );
};