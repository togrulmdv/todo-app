import { useQuery } from "react-query";
import { AuthorService } from "./APIs/Services/AuthorService";
import { QueryKeys } from "./QueryKeys";

export const useService = () => {
  const AuthorServices = new AuthorService();

  return { AuthorServices };
};

export const useAuthorData = () => {
  const { AuthorServices } = useService();

  return useQuery([QueryKeys.getAuthorsKey], () =>
    AuthorServices.getAllAuthors()
  );
};
