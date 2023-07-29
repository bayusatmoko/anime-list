import React, { useEffect, useState } from 'react';
import './Application.scss';
import AnimeList from './AnimeList';
import { CollectionProvider } from '@src/providers/CollectionProvider';
import Navigation from './Navigation';

const Application: React.FC = () => {

  return (
    <CollectionProvider>
      <Navigation />
    </CollectionProvider>
  );
};

export default Application;
