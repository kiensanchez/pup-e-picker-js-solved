import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { Requests } from "../api";
import toast from "react-hot-toast";

export const FunctionalCreateDogForm = ({
  fetchData,
  isLoading,
  setIsLoading,
}) => {
  const [imageInput, setImageInput] = useState(dogPictures.BlueHeeler);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const createNewDog = (dog) => {
    setIsLoading(true);
    return Requests.postDog(dog).then(() => {
      return fetchData()
        .then(() => toast.success(`Created ${nameInput} 🐶`))
        .catch(() => {
          toast.error("Error creating dog");
          throw new Error("Error creating dog");
        })
        .finally(() => setIsLoading(false));
    });
  };

  const resetValues = () => {
    setNameInput("");
    setDescriptionInput("");
    setImageInput(dogPictures.BlueHeeler);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.length === 0 || descriptionInput.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const newDog = {
      name: nameInput,
      image: imageInput,
      description: descriptionInput,
      isFavorite: false,
    };

    createNewDog(newDog).then(() => resetValues());
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
