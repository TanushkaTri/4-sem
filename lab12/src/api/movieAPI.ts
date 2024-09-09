const url = "http://omdbapi.com/?i=tt3896198&apikey=6de21d08";

type DataType = {
  Search: MovieType[];
};

export const moviesAPI = {
  getMovies(title: string, type: string) {
    return fetch(`${url}&s=${title}${type !== "all" ? "&type=" + type : ""}`)
      .then((resp) => resp.json())
      .then((data: any) => data.Search);
  },
};

export type MovieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
