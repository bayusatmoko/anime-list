import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/Application';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
  });

// Say something
console.log('[ERWT] : Renderer execution started');

// Render application in DOM
createRoot(document.getElementById('app')).render(
    <ApolloProvider client={client}>
        <Application />
    </ApolloProvider>,
);
