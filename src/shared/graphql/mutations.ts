import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      accessToken
    }
  }
`;

export const CREATE_USER_BOOK_FROM_ISBN = gql`
  mutation createBookFromIsbn($input: CreateUserBookFromIsbnInput!) {
    createUserBookFromIsbn(input: $input) {
      id
      book {
        id
        title
        author
        pages
      }
      startDate
      endDate
    }
  }
`;

export const CREATE_USER_BOOK = gql`
  mutation createUserBookFromBook($input: CreateUserBookFromBookInput!) {
    createUserBookFromBook(input: $input) {
      id
      book {
        id
        title
        author
        pages
      }
      startDate
      endDate
    }
  }
`;

export const UPDATE_USER_BOOK = gql`
  mutation updateUserBook($input: UpdateUserBookInput!) {
    updateUserBook(input: $input) {
      id
      book {
        id
        title
        author
        pages
      }
      startDate
      endDate
    }
  }
`;
