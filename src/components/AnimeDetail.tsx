import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import { GET_ANIME_DETAIL } from '@src/config/apolloQuery';
import parse from 'html-react-parser'
import { CollectionContext } from '@src/contexts/CollectionContext';
import { Alert, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Link, Radio, RadioGroup, TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 2,
    overflow: 'scroll'
  };

  const circularStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  interface AnimeDetailProps{
    id: number,
    onCloseModal: () => void
  }

  interface AnimeDetail {
    id: number;
    title: {
        userPreferred: string;
    }
    description: string;
    genres: string[];
    episodes: number;
    bannerImage: string;
    averageScore: number;
    coverImage: {
        extraLarge: string
    }
  }

  interface AnimeDetailResponse {
    Media: AnimeDetail
  }



const AnimeDetail = (props:AnimeDetailProps) => {

    const { data, error, loading } = useQuery<AnimeDetailResponse>(GET_ANIME_DETAIL, {
        variables: { id: props.id }
    });
    const { collections, addToCollection, addCollection } = useContext(CollectionContext);
    const [ showCollection, setShowCollection ] = useState(false);
    const [message, setMessage] = useState("");
    const [newCollectionName, setNewCollectionName] = useState("")
    const [collectionToAdd, setCollectionToAdd] = useState([])

    const onButtonSubmitCollection = (id: number) => {
        let message = ""
        collectionToAdd.forEach((col) => {
            message += addToCollection(id, col)
            message += "\n"
        })
        setMessage(message)
        console.log(collections)
    }

    const onButtonAddCollection = () => {
        setShowCollection(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const collectionName = event.target.name
        let newCollection = [...collectionToAdd]
        if(!collectionToAdd.includes(collectionName)) {
            newCollection.push(collectionName)
        } else {
            newCollection.splice(newCollection.indexOf(collectionName), 1)
        }
        setCollectionToAdd(newCollection)
    };

    if (loading) {
        return (
            <Card sx={{ ...style}}>
                <CircularProgress sx={{...circularStyle}} />
            </Card>
        )
    }

    if (error) {
        return (
          <Card sx={{ ...style}}>
            An error occurred
          </Card>
        )
      }

    if(data) {
        return (
            <Card sx={{ ...style}}>
            <CardMedia
                sx={{ height: '25%', marginLeft: 2 }}
                image={data.Media.bannerImage? data.Media.bannerImage: data.Media.coverImage.extraLarge}
                title={data.Media.title.userPreferred}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {data.Media.title.userPreferred}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {parse(data.Media.description)}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                Rating: {data.Media.averageScore}/100
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Number of episodes: {data.Media.episodes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Genres: {data.Media.genres.join(', ')}
                </Typography>
            </CardContent>

            {!showCollection && (
                <CardActions>
                    <Button size='small' onClick={() => onButtonAddCollection()}>Add to collection</Button>
                    <Button size='small' onClick={props.onCloseModal}>Close</Button>
                </CardActions>
            )}

            {showCollection && (
                <>
                    <TextField sx={{marginLeft: 2, width: "70%"}} id="outlined-basic" label="Add new collection.." variant="outlined" onChange={() => setNewCollectionName((event.target as HTMLInputElement).value)} value={newCollectionName} />
                    <Button size='small' onClick={() => addCollection(newCollectionName)}>Add</Button>
                </>
            )}
            <br />

            {showCollection && collections.length > 0 && (
                <FormControl sx={{marginLeft: 2}}>
                <FormGroup>
                    <FormLabel id="demo-radio-buttons-group-label">Collections</FormLabel>
                    {collections.map(collection => (
                        <>
                            <FormControlLabel 
                            control={<Checkbox />} 
                            onChange={handleChange} 
                            label={(
                                <>
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault();
                                      alert("TODO: navigate to collection detail by collection name "+collection.name);
                                    }}
                                  >
                                    {collection.name}
                                  </Link>
                                <span>{collection.animes.includes(props.id)? " (Already added)": ""}</span>
                                </>
                              )}
                            name={collection.name} 
                            />
                        </>
                    ))}
                </FormGroup>
                {message !== "" && (
                        <Alert severity="info" onClose={() => setMessage("")} sx={{ whiteSpace: 'pre-line' }}>
                            {message}
                        </Alert>
                )}
                <CardActions>
                    <Button size='small' onClick={() => onButtonSubmitCollection(data.Media.id)}>Add to collection</Button>
                    <Button size='small' onClick={props.onCloseModal}>Close</Button>
                </CardActions>
                </FormControl>
            )}
            </Card>
        );
    }
}

export default AnimeDetail;