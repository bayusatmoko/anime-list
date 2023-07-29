import React, { useState, useEffect } from "react"
import { Collection, CollectionContext } from "../contexts/CollectionContext"

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

    const addToCollection = (id: number, collectionName: string): string => {
        const collectionIndex = collections.findIndex((collection) => collection.name === collectionName)
        if(collectionIndex < 0) {
            // const newCollections = [...collections, {
            //     name: collectionName,
            //     animes: [id]
            // }]
            // setCollections(newCollections)
            // return `Anime successfully added to ${collectionName} collection` 
            return `${collectionName} collection does not exists` 
        }
        const isAlreadyAdded = collections[collectionIndex].animes.find((anime) => anime === id)
        if(isAlreadyAdded) return `Anime already exists in ${collectionName} collection`
        const newCollections = [...collections]
        newCollections[collectionIndex].animes.push(id)
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

    return (
        <CollectionContext.Provider value={{collections, addCollection, addToCollection}}>
            {props.children}
        </CollectionContext.Provider>
    )
}