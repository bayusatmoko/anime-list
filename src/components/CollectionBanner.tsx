import React, { useContext, useState } from "react"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './CollectionBanner.scss'
import { Collection, CollectionContext } from "@src/contexts/CollectionContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

interface CollectionBannerProps {
    collection: Collection;
    handleCollectionDetail: (collection: Collection) => void
}

const CollectionBanner = (props:CollectionBannerProps) => {
    const { deleteCollection } = useContext(CollectionContext)
    const { collection, handleCollectionDetail } = props
    const [open, setOpen] = useState(false);
    const [collectionName, setCollectionName] = useState("")

    const handleClickOpen = (collectionName: string) => {
        setOpen(true);
        setCollectionName(collectionName)
    };

    const onDeleteConfirm = () => {
        deleteCollection(collectionName)
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
                {/* // TODO Refactor all dialog to be reusable */}
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
                        You are going to delete {collectionName} collection, are you sure?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={onDeleteConfirm} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
                <img
                    src={`${collection.animes[0]?collection.animes[0].coverImage.extraLarge:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"}?w=248&fit=crop&auto=format`}
                    srcSet={`${collection.animes[0]?collection.animes[0].coverImage.extraLarge:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={collection.name}
                    loading="lazy"
                    onClick={() => handleCollectionDetail(collection)}
                    className="collection-image"
                />
                <ImageListItemBar
                    title={collection.name}
                    sx={{height: '10vw'}}
                    actionIcon={
                            <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)'}}
                            aria-label={`info about ${collection.name}`}
                            onClick={() => handleClickOpen(collection.name)}
                            >
                            <DeleteOutline />
                            </IconButton>
                      }
                />
        </div>
    )
}

export default CollectionBanner;