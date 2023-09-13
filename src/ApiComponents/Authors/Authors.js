import React, { useState } from "react";
import "./_authors.scss";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useAuthorData, useService } from "../../hooks";

const Authors = () => {
  const { authorServices } = useService();
  const getAllQuery = useAuthorData();
  const [newAuthorData, setNewAuthorData] = useState({});
  const [mutationError, setMutationError] = useState(null);

  const { mutate: createNewAuthor } = useMutation(
    () => authorServices.addAuthor(newAuthorData),
    {
      onSuccess: () => {
        getAllQuery.refetch();
        setMutationError(null);
      },
      onError: (error) => {
        setMutationError(error);
      },
    }
  );

  const { mutate: deleteAuthor } = useMutation(
    (id) => authorServices.deleteAuthor(id),
    {
      onSuccess: () => {
        getAllQuery.refetch();
        setMutationError(null);
      },
      onError: (error) => {
        setMutationError(error);
      },
    }
  );

  const handleNewAuthor = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewAuthorData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const { data: authorData } = getAllQuery;

  return (
    <main>
      <div className="header">
        <h1>Authors List</h1>
      </div>
      <div className="input-area">
        <h2>Add Author</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewAuthor();
          }}
        >
          <input
            name="fullname"
            placeholder="Add Author"
            value={newAuthorData.fullname || ''}
            onChange={handleNewAuthor}
          />
          <Button type="submit" variant="contained">
            Add Author
          </Button>
        </form>
        {mutationError && <div className="error">{mutationError.message}</div>}
      </div>
      <div className="author-list">
        <ul>
          {authorData?.map((author) => (
            <li key={author.id}>
              <h1>{author.fullname} </h1>
              <button onClick={() => deleteAuthor(author.id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Authors;