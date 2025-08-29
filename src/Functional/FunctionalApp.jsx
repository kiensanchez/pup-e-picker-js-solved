import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from "react";
import { Requests } from "../api";

export function FunctionalApp() {
  const [isActive, setIsActive] = useState("all");
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dogs = {
    all: allDogs,
    favorites: allDogs.filter((dog) => dog.isFavorite === true),
    unfavorites: allDogs.filter((dog) => dog.isFavorite === false),
  };

  const favoritesCount = dogs.favorites.length;
  const unfavoritesCount = dogs.unfavorites.length;

  const fetchData = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setIsActive={setIsActive}
        favoritesCount={favoritesCount}
        unfavoritesCount={unfavoritesCount}
      >
        {isActive !== "create" && (
          <FunctionalDogs
            dogs={dogs[isActive]}
            setAllDogs={setAllDogs}
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {isActive === "create" && (
          <FunctionalCreateDogForm
            setAllDogs={setAllDogs}
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
