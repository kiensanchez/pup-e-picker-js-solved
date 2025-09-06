import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import toast from "react-hot-toast";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  render() {
    const { dogs, fetchData, isLoading, setIsLoading } = this.props;

    const handleDelete = (id) => {
      setIsLoading(true);
      return Requests.deleteDog(id)
        .then(() => fetchData())
        .then(() => toast.success("Dog deleted!"))
        .catch(() => {
          toast.error("Failed to delete dog.");
          throw new Error("Failed to delete dog.");
        })
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
        .catch(() => {
          toast.error("Failed to update favorite status.");
          throw new Error("Failed to update favorite status.");
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
  }
}
