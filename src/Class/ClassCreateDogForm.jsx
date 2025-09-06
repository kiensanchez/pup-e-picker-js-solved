import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";
import { Requests } from "../api";

export class ClassCreateDogForm extends Component {
  state = {
    imageInput: dogPictures.BlueHeeler,
    nameInput: "",
    descriptionInput: "",
  };

  render() {
    const { fetchData, isLoading, setIsLoading } = this.props;

    const createNewDog = (dog) => {
      setIsLoading(true);
      return Requests.postDog(dog).then(() => {
        return fetchData()
          .then(() => toast.success(`Created ${this.state.nameInput}`))
          .catch(() => {
            toast.error("Error creating dog");
            throw new Error("Error creating dog");
          })
          .finally(() => setIsLoading(false));
      });
    };

    const resetValues = () => {
      this.setState({
        nameInput: "",
        descriptionInput: "",
        imageInput: dogPictures.BlueHeeler,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        this.state.nameInput.length === 0 ||
        this.state.descriptionInput.length === 0
      ) {
        alert("Please fill in all fields.");
        return;
      }

      const newDog = {
        name: this.state.nameInput,
        image: this.state.imageInput,
        description: this.state.descriptionInput,
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
          value={this.state.nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={this.state.descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={this.state.imageInput}
          onChange={(e) => {
            this.setState({ imageInput: e.target.value });
          }}
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
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
