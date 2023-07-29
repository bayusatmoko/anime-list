import { createContext } from "react";

export interface Collection {
    name?: string;
    animes?: number[];
}

export interface CollectionContext {
    collections: Collection[];
    addToCollection?: (id: number, collectionName: string) => string;
    addCollection?: (collectionName: string) => string
}

export const CollectionContext = createContext<CollectionContext>({
    collections: [],
    addToCollection: (id: number, collectionName: string) => ``,
    addCollection: (collectionName: string) => ``
});