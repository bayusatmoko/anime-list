import { gql, useQuery } from '@apollo/client';

export const GET_ANIME_LIST = gql`
query ($ids: [Int], $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media (id_in: $ids, type: ANIME) {
            id
            title {
                userPreferred
            },
            bannerImage
            genres,
            coverImage {
                extraLarge
            }
        }
    }
  }
`;

export const GET_ANIME_DETAIL = gql`
query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        userPreferred
      }
      description
      genres
      episodes
      bannerImage
      coverImage {
        extraLarge
      }
      averageScore
    }
  }
  `