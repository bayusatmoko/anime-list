import React, { useState, useContext } from "react";
import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST } from "@src/config/apolloQuery";
import AnimeBanner from "./AnimeBanner";
import { CircularProgress, Modal, Pagination } from "@mui/material";
import ImageListItem from '@mui/material/ImageListItem';
import './AnimeList.scss'

import ImageList from '@mui/material/ImageList';
import AnimeDetail from "./AnimeDetail";
import { Collection } from "@src/contexts/CollectionContext";
import CollectionDetail from "./CollectionDetail";

interface Anime {
    id: number;
    title: {
        userPreferred: string
    };
    bannerImage: string;
    genres: string[];
    coverImage: {
        extraLarge: string
    }
}

interface AnimeListResponse {
    Page: {
        media: Anime[];
        pageInfo: {
            lastPage: number;
        }
    };
}

const circularStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

const AnimeList: React.FC = (props: AnimeListResponse) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(1)
    const [collectionDetail, setCollectionDetail] = useState<Collection>({})
    const { data, error, loading } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
        variables: { page: currentPage, perPage: 10 }
    });

    const handleOpenCollection = (collection: Collection) => {
        setCollectionDetail(collection)
    }

    const handleCloseCollection = () => {
        setCollectionDetail({})
    }

    const handleChange = (
        event: React.ChangeEvent<unknown>,
        pageCurrent: number
    ) => {
        setCurrentPage(pageCurrent)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleBannerClick = (id: number) => {
        setId(id)
        setOpen(true);
    }

    if (loading) {
        return (
            <CircularProgress sx={{...circularStyle}} />
        )
    }

    if (error) {
        return (
          <div>
            An error occurred
          </div>
        )
      }

      if(collectionDetail.name) {
        return <CollectionDetail collection={collectionDetail} handleCloseCollection={handleCloseCollection} />
      }

    if(data) {
        return (
            <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <AnimeDetail id={id} onCloseModal={handleClose} handleOpenCollection={handleOpenCollection} />
            </Modal>
            <ImageList>
                {data.Page.media.map((item) => (
                    <ImageListItem key={item.id} onClick={() => handleBannerClick(item.id)} >
                        <AnimeBanner title={item.title.userPreferred} bannerImage={item.bannerImage? item.bannerImage: item.coverImage.extraLarge} genres={item.genres} />
                    </ImageListItem>
                ))}
            </ImageList>
            <Pagination count={data.Page.pageInfo.lastPage/10} page={currentPage} size="medium" onChange={handleChange} />
            </>
        )
    }
}

export default AnimeList;