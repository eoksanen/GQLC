import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
  	born
    bookCount
  }
}
`
  
export const ALL_BOOKS = gql`
query {
  allBooks {
      title
      author {
        name
        born
      }
      published
      genres
    }
}
`

export const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreToSearch: String, $authorToSearch: String, $byBackUser: Boolean ) {
  allBooks(author: $authorToSearch, genre: $genreToSearch, byUserFavoriteGenre: $byBackUser ) {
      title
      author {
        name
        born
      }
      published
    }
}
`

export const ALL_BOOKS_AND_AUTHORS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
    }
}
`
export const ME = gql`
  query {
        me {
            favoriteGenre
          }
 }

`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author {
        name
        born
      }
      published
      genres
  }
}
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`