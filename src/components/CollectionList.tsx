import { Collection, CollectionContext } from "@src/contexts/CollectionContext";
import React, { useContext, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CollectionBanner from "./CollectionBanner";
import { Alert, Button } from "@mui/material";
import PlusOne from '@mui/icons-material/PlusOne'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CollectionDetail from "./CollectionDetail";


const CollectionList = () => {
    const { collections, addCollection } = useContext(CollectionContext);
    const [open, setOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("")
    const [message, setMessage] = useState("")
    const [collectionDetail, setCollectionDetail] = useState<Collection>({})

    const handleCollectionDetail = (collection: Collection) => {
      setCollectionDetail(collection)
    }

    const handleCloseCollection = () => {
      setCollectionDetail({})
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const onConfirmAdd = () => {
      setMessage(addCollection(newCollectionName))
      setOpen(false);
    }

      if(collectionDetail.name) {
        return <CollectionDetail collection={collectionDetail} handleCloseCollection={handleCloseCollection} />
      }
        return (
          <div>
               <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new collection</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Collection name must be unique
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    fullWidth
                    variant="standard"
                    placeholder="Collection name.."
                    onChange={() => setNewCollectionName((event.target as HTMLInputElement).value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={onConfirmAdd}>Add</Button>
                </DialogActions>
              </Dialog>
              <Button variant="outlined" onClick={handleClickOpen} endIcon={<PlusOne />}>
                Add new collection
              </Button>
              {message !== "" && (
                        <Alert severity="info" onClose={() => setMessage("")} sx={{ whiteSpace: 'pre-line' }}>
                            {message}
                        </Alert>
                )}
              <ImageList sx={{ height: '100%' }}>
                {collections.map((item) => (
                  <ImageListItem key={item.name}>
                    <CollectionBanner collection={item} handleCollectionDetail={handleCollectionDetail} />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          );
}

export default CollectionList;