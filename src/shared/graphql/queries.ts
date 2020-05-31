import gql from "graphql-tag";

export const GET_CURRENT_BOOKS = gql`
  query getCurrentUserBooks {
    getCurrentUserBooks {
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

export const GET_UPCOMING_BOOKS = gql`
  query getUpcomingUserBooks {
    getUpcomingUserBooks {
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

export const TOKEN_VALID = gql`
  query whoAmI {
    whoAmI {
      id
    }
  }
`;

export const GET_UNSCHEDULED_BOOKS = gql`
  query getUnscheduledUserBooks {
    getUnscheduledUserBooks {
      id
      book {
        id
        title
        author
        pages
      }
    }
  }
`;
