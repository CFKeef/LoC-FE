import { ReactNode } from "react";

export interface HigherOrderFC {
    children: ReactNode;
}

export type Pagination = {
    current: number;
    from: number;
    last: string;
    next?: string;
    previous?: string;
    PageList: string[];
    total: number;
};

export type Item = {
    id: string;
    image_url: string[];
    date: string;
    title: string;
    item: {
        call_number?: string;
        contributors?: string[];
    };
};

export interface Response {
    pagination: Pagination;
    results: Item[];
    error?: Error;
}

export type Error = {
    code: string;
    message: string;
};
