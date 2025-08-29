import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";

export class ClassApp extends Component {
  state = {
    isActive: "all",
    allDogs: [],
    isLoading: false,
  };

  setAllDogs = (dogs) => {
    this.setState({ allDogs: dogs });
  };

  setIsLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  };

  setIsActive = (newState) => {
    this.setState({ isActive: newState });
  };

  fetchData = () => {
    return Requests.getAllDogs().then((dogs) =>
      this.setState({ allDogs: dogs })
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { isActive, allDogs, isLoading } = this.state;

    const dogs = {
      all: allDogs,
      favorites: allDogs.filter((dog) => dog.isFavorite === true),
      unfavorites: allDogs.filter((dog) => dog.isFavorite === false),
    };

    const favoritesCount = dogs.favorites.length;
    const unfavoritesCount = dogs.unfavorites.length;

    console.log(this.state);

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          setIsActive={this.setIsActive}
          favoritesCount={favoritesCount}
          unfavoritesCount={unfavoritesCount}
        >
          {isActive !== "create" && (
            <ClassDogs
              setAllDogs={this.setAllDogs}
              setIsLoading={this.setIsLoading}
              dogs={dogs[isActive]}
              fetchData={this.fetchData}
              isLoading={isLoading}
            />
          )}
          {isActive === "create" && (
            <ClassCreateDogForm
              setAllDogs={this.setAllDogs}
              setIsLoading={this.setIsLoading}
              fetchData={this.fetchData}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
