import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_USER_BOOK,
  CREATE_USER_BOOK_FROM_ISBN,
} from "../graphql/mutations";

export const useCreateBookMutation = (handleModalClose: () => void) => {
  const [createUserBookFromIsbn] = useMutation(CREATE_USER_BOOK_FROM_ISBN, {
    refetchQueries: [
      "getCurrentUserBooks",
      "getUpcomingUserBooks",
      "getUnscheduledUserBooks",
    ],
    onCompleted() {
      handleModalClose();
    },

    onError(error) {
      console.log(error);
      handleModalClose();
    },
  });

  return createUserBookFromIsbn;
};

export const useEditBookMutation = (handleModalClose: () => void) => {
  const [updateBook] = useMutation(UPDATE_USER_BOOK, {
    refetchQueries: [
      "getCurrentUserBooks",
      "getUpcomingUserBooks",
      "getUnscheduledUserBooks",
    ],
    onCompleted() {
      handleModalClose();
    },

    onError(error) {
      console.log(error);
      handleModalClose();
    },
  });

  return updateBook;
};
