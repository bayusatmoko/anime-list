import React from "react"
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './AnimeBanner.scss'

interface AnimeBannerProps {
    title: string;
    bannerImage: string;
    genres: string[];
}

const AnimeBanner = (props:AnimeBannerProps) => {
    return (
        <div>
                <img
                    src={props.bannerImage}
                    srcSet={props.bannerImage}
                    alt={props.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={props.title? props.title: "No title"}
                    subtitle={<span>Genre: {props.genres.join(", ")}</span>}
                />
        </div>
    )
}

export default AnimeBanner;