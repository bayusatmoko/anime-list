import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageList, ImageListItem, Typography } from "@mui/material";
import { Collection, CollectionContext } from "@src/contexts/CollectionContext";
import React, { useContext, useState } from "react";
import AnimeBanner from "./AnimeBanner";
import { useQuery } from "@apollo/client";

interface CollectionDetailProps {
    collection: Collection;
    handleCloseCollection: () => void
}


const CollectionDetail = (props: CollectionDetailProps) => {
    const { removeItemFromCollection } = useContext(CollectionContext)
    const [ idDeletion, setIdDeletion ] = useState(0)
    const [open, setOpen] = useState(false);

    const handleDelete = (id: number) => {
        setOpen(true);
        setIdDeletion(id)
    }

    const onDeleteConfirm = () => {
        removeItemFromCollection(idDeletion, props.collection.name)
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    if(props.collection.animes.length == 0) {
        return (
            <div>
                <Typography variant="body2" component="h2" ml={1} mt={20}>
                No anime in {props.collection.name} collection.
                </Typography>
                <Button onClick={props.handleCloseCollection}>Back to collection list</Button>
            </div>
        )
    }
    return (
        <>
            <h2>{props.collection.name} Collection</h2>
        <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Delete confirmation"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are going to delete this anime from {props.collection.name} collection, are you sure?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={onDeleteConfirm} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            <ImageList sx={{ height: '100%' }}>
                {props.collection.animes.map((anime) => (
                  <ImageListItem key={anime.title.userPreferred}>
                    <AnimeBanner 
                    title={anime.title.userPreferred} 
                    bannerImage={anime.bannerImage? anime.bannerImage: anime.coverImage.extraLarge} 
                    genres={anime.genres} 
                    handleDelete={() => handleDelete(anime.id)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            <Button onClick={props.handleCloseCollection}>Back</Button>
        </div>
        </>
    )
}

export default CollectionDetail;