import React from "react"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './AnimeBanner.scss'
import { IconButton } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

interface AnimeBannerProps {
    title: string;
    bannerImage: string;
    genres: string[];
    handleDelete?: () => void
}

const AnimeBanner = (props:AnimeBannerProps) => {
    return (
        <div>
                <img
                    src={`${props.bannerImage?props.bannerImage:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"}?w=248&fit=crop&auto=format`}
                    srcSet={`${props.bannerImage?props.bannerImage:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={props.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{height: '40%'}}
                    title={props.title? props.title: "No title"}
                    subtitle={<span>Genre: {props.genres.join(", ")}</span>}
                    actionIcon={ props.handleDelete && (
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)'}}
                          onClick={props.handleDelete}
                        >
                          <DeleteOutline />
                        </IconButton>
                    )}
                />
        </div>
    )
}

export default AnimeBanner;