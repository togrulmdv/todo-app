import React, { useState } from "react";
import "./_authors.scss";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useAuthorData, useService } from "../../hooks";

const Authors = () => {
  const { authorServices } = useService();
  const getAllQuery = useAuthorData();
  const [newAuthorData, setNewAuthorData] = useState({});

  const { mutate: createNewAuthor } = useMutation(
    () => authorServices.addAuthor(newAuthorData),
    {
      onSuccess: () => getAllQuery.refetch(),
    }
  );

  const { mutate: deleteAuthor } = useMutation(
    (id) => authorServices.deleteAuthor(id),
    {
      onSuccess: () => getAllQuery.refetch(),
    }
  );

  const handleNewAuthor = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewAuthorData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  return (
    <main>
      <div className="header">
        <h1>Authors List</h1>
      </div>
      <div className="input-area">
        <h2>Add Author</h2>
        <form onSubmit={createNewAuthor}>
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
      </div>
      <div className="author-list">
        <ul>
          {getAllQuery.data?.data.map((author) => (
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