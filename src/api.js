export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    return fetch(`${baseUrl}/dogs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log("error", error);
        throw new Error("Failed to fetch dogs");
      });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: ({ name, image, description, isFavorite }) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        description,
        isFavorite,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log("error", error);
        throw new Error("Failed to create dog");
      });
  },

  // should delete a dog from the database
  deleteDog: (id) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log("error", error);
        throw new Error("Failed to delete dog");
      });
  },

  updateDog: ({ name, image, description, isFavorite }, id) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        description,
        isFavorite: isFavorite === true ? false : true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log("error", error);
        throw new Error("Failed to update dog");
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    Requests.getAllDogs().then(console.log);
  },
};
