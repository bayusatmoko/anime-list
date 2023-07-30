import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageList, ImageListItem, Modal, Typography } from "@mui/material";
import { Collection, CollectionContext } from "@src/contexts/CollectionContext";
import React, { useContext, useState } from "react";
import AnimeBanner from "./AnimeBanner";
import { useQuery } from "@apollo/client";
import AnimeDetail from "./AnimeDetail";

interface CollectionDetailProps {
    collection: Collection;
    handleCloseCollection: () => void
}


const CollectionDetail = (props: CollectionDetailProps) => {
    const { removeItemFromCollection } = useContext(CollectionContext)
    const [ idDeletion, setIdDeletion ] = useState(0)
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(1)
    const [collectionDetail, setCollectionDetail] = useState<Collection>({})
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleDelete = (id: number) => {
        setOpenDeleteDialog(true);
        setIdDeletion(id)
    }

    const onDeleteConfirm = () => {
        removeItemFromCollection(idDeletion, props.collection.name)
        setOpenDeleteDialog(false);
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBannerClick = (id: number) => {
        setId(id)
        setOpen(true);
    }

    const handleOpenCollection = (collection: Collection) => {
        setCollectionDetail(collection)
    }

    const handleCloseCollection = () => {
        setCollectionDetail({})
    }

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

    if(collectionDetail.name) {
        return <CollectionDetail collection={collectionDetail} handleCloseCollection={handleCloseCollection} />
    }

    return (
        <>
            <Typography variant="h6" component="h2" ml={1} mt={2}>
                {props.collection.name} Collection
                <Button onClick={props.handleCloseCollection}>Edit</Button>
            </Typography>
        <div>
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
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
                    <Button onClick={handleCloseDeleteDialog}>No</Button>
                    <Button onClick={onDeleteConfirm} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <AnimeDetail id={id} onCloseModal={handleClose} handleOpenCollection={handleOpenCollection} />
            </Modal>
            <ImageList sx={{ height: '100%' }}>
                {props.collection.animes.map((anime) => (
                  <ImageListItem key={anime.title.userPreferred}>
                    <AnimeBanner 
                        title={anime.title.userPreferred.slice(0,12)} 
                        bannerImage={anime.bannerImage? anime.bannerImage: anime.coverImage.extraLarge} 
                        genres={anime.genres}
                        handleDelete={() => handleDelete(anime.id)}
                        handleBannerClick={() => handleBannerClick(anime.id)}
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