import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import toast from "react-hot-toast";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  fetchData,
  isLoading,
  setIsLoading,
}) => {
  const handleDelete = (id) => {
    setIsLoading(true);
    Requests.deleteDog(id)
      .then(() => fetchData())
      .then(() => toast.success("Dog deleted!"))
      .finally(() => setIsLoading(false));
  };

  const handleFavorite = (dog, id) => {
    setIsLoading(true);
    Requests.updateDog(dog, id)
      .then(() => fetchData())
      .then(() => {
        if (dog.isFavorite) {
          toast.success("Dog unfavorited!");
        } else {
          toast.success("Dog favorited!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {dogs.map((item, index) => (
        <DogCard
          key={index}
          id={item.id}
          dog={item}
          isLoading={isLoading}
          onTrashIconClick={() => handleDelete(item.id)}
          onEmptyHeartClick={() => handleFavorite(item, item.id)}
          onHeartClick={() => handleFavorite(item, item.id)}
        />
      ))}
    </>
  );
};
