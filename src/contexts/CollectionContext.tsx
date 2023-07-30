import AnimeDetail from "../components/AnimeDetail";
import { createContext } from "react";

export interface Collection {
    name?: string;
    animes?: AnimeDetail[];
}

export interface CollectionContext {
    collections: Collection[];
    addToCollection?: (animeDetail: AnimeDetail, collectionName: string) => string;
    addCollection?: (collectionName: string) => string;
    deleteCollection?: (collectionName: string) => string;
    removeItemFromCollection?: (id: number, collectionName: string) => string;
}

export const CollectionContext = createContext<CollectionContext>({
    collections: [],
    addToCollection: (animeDetail: AnimeDetail, collectionName: string) => ``,
    addCollection: (collectionName: string) => ``,
    deleteCollection: (collectionName: string) => ``,
    removeItemFromCollection: (id: number, collectionName: string) => ``
});