import React, { useState, useEffect } from "react"
import { Collection, CollectionContext } from "../contexts/CollectionContext"
import AnimeDetail from "@src/components/AnimeDetail"

const getInitialState = ():Collection[] => {
    const collections = localStorage.getItem('collections')
    return collections ? JSON.parse(collections) : []
}

interface CollectionProviderProps {
    children: React.ReactNode
}
  
export const CollectionProvider = (props: CollectionProviderProps) => {
    const [collections, setCollections] = useState<Collection[]>(getInitialState)
  
    useEffect(() => {
      localStorage.setItem('collections', JSON.stringify(collections))
    }, [collections])

    // const addToCollection = (id: number, collectionName: string): string => {
    const addToCollection = (animeDetail: AnimeDetail, collectionName: string): string => {
        const collectionIndex = collections.findIndex((collection) => collection.name === collectionName)
        if(collectionIndex < 0) {
            return `${collectionName} collection does not exists` 
        }
        const isAlreadyAdded = collections[collectionIndex].animes.find((anime) => anime.id === animeDetail.id)
        if(isAlreadyAdded) return `Anime already exists in ${collectionName} collection`
        const newCollections = [...collections]
        newCollections[collectionIndex].animes.push(animeDetail)
        setCollections(newCollections)
        return `Anime successfully added to ${collectionName} collection`
    }

    const addCollection = (collectionName: string): string => {
        const collectionIndex = collections.findIndex((collection) => collection.name === collectionName)
        if(collectionIndex >= 0) {
            return `${collectionName} collection already exists` 
        }
        setCollections([...collections, {
            name: collectionName,
            animes: []
        }])
        return `${collectionName} collection succesfully added` 
    }

    const deleteCollection = (collectionName: string) => {
        const collectionIndex = collections.findIndex((collection) => collection.name === collectionName)
        if(collectionIndex < 0) {
            return `${collectionName} collection does not exists` 
        }
        const newCollections = [...collections]
        newCollections.splice(newCollections.findIndex((col) => col.name === collectionName), 1)
        setCollections(newCollections)
        return `${collectionName} collection succesfully removed`
    }

    const removeItemFromCollection = (id: number, collectionName: string) => {
        const newCollection = [...collections]
        const animeIndex = newCollection.find((col) => col.name === collectionName).animes.findIndex((anime) => anime.id === id)
        newCollection.find((col) => col.name === collectionName).animes.splice(animeIndex,1)
        setCollections(newCollection)
        return `anime successfully removed from ${collectionName} collection`
    }

    return (
        <CollectionContext.Provider value={{collections, addCollection, addToCollection, deleteCollection, removeItemFromCollection}}>
            {props.children}
        </CollectionContext.Provider>
    )
}