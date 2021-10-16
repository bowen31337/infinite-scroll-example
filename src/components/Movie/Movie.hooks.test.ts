import { renderHook } from "@testing-library/react-hooks";

import { useMovie } from "./";

describe("Use Movie Hook", () => {
  describe("fetch movie", () => {
    describe("success", () => {
      beforeEach(() => {
        global.fetch = jest
          .fn()
          .mockResolvedValue({ json: () => Promise.resolve(movieData) });
      });
      it("should get movie data", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
          useMovie("tt0388650")
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.errorMsg).toBe("");

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);

        delete movieData.Response;
        expect(result.current.movie).toEqual(movieData);
      });
    });

    describe("failure", () => {
      it("should show error msg with no results on 20x response", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: () =>
            Promise.resolve({
              Response: "False",
              Error: "Incorrect IMDb ID.",
            }),
        });
        const { result, waitForNextUpdate } = renderHook(() =>
          useMovie("tt0388650")
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.errorMsg).toBe("");

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorMsg).toBe("Incorrect IMDb ID.");
      });

      it("should get the error msg on non-20x response", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("no movie found"));

        const { result, waitForNextUpdate } = renderHook(() =>
          useMovie("tt0388650")
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.errorMsg).toBe("");

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorMsg).toBe("no movie found");
      });
    });
  });
});

const movieData = {
  Title: "Transformer: Super Link",
  Year: "2004",
  Rated: "TV-Y7",
  Released: "31 Jan 2004",
  Runtime: "30 min",
  Genre: "Animation, Action, Adventure",
  Director: "N/A",
  Writer: "N/A",
  Actors: "Garry Chalk, David Kaye, Matt Hill",
  Plot: 'Years after "Transformers: Armada", the Autobots continue to battle the Decepticons, but this time they must also prevent the resurrection of Unicron.',
  Language: "Japanese, English",
  Country: "Japan, United States",
  Awards: "N/A",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTY3ODM2OTU3Ml5BMl5BanBnXkFtZTcwMDkwMjcyMQ@@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "6.0/10",
    },
  ],
  Metascore: "N/A",
  imdbRating: "6.0",
  imdbVotes: "768",
  imdbID: "tt0388650",
  Type: "series",
  totalSeasons: "1",
  Response: "True",
};
