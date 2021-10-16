import { renderHook, act } from "@testing-library/react-hooks";

import { useSearchBar } from "./";

describe("Search Bar hooks", () => {
    describe("useSearchBar", () => {
        describe("search the query from the search bar", () => {
            describe("success", () => {
                beforeEach(() => {
                    globalThis.fetch = jest.fn().mockResolvedValue({
                        json: () => Promise.resolve(mockSearchResponse),
                    });
                });
                it("should get the movie data", async () => {
                    const { result, waitForNextUpdate } = renderHook(() =>
                        useSearchBar()
                    );

                    act(() => {
                        result.current.search("bay");
                    });

                    expect(result.current.isLoading).toBe(true);

                    await waitForNextUpdate();

                    expect(result.current.isLoading).toBe(false);
                    expect(result.current.results).toEqual(mockSearchResponse.Search);
                });
            });

            describe("failure", () => {
                it("should show error on non-20x response", async () => {
                    globalThis.fetch = jest
                        .fn()
                        .mockRejectedValue(new Error("no results found"));

                    const { result, waitForNextUpdate } = renderHook(() =>
                        useSearchBar()
                    );

                    act(() => {
                        result.current.search("baby");
                    });

                    expect(result.current.isLoading).toBe(true);
                    expect(result.current.errorMsg).toBe("");

                    await waitForNextUpdate();

                    expect(result.current.isLoading).toBe(false);
                    expect(result.current.errorMsg).toBe("no results found");
                    expect(result.current.results).toEqual([]);
                });

                it("should show error with no results on 20x response", async () => {
                    globalThis.fetch = jest.fn().mockResolvedValue({
                        json: () => Promise.resolve({
                            Response: "False",
                            Error: "Movie not found!"
                        }),
                    });

                    const { result, waitForNextUpdate } = renderHook(() =>
                        useSearchBar()
                    );

                    act(() => {
                        result.current.search("baby");
                    });

                    expect(result.current.isLoading).toBe(true);
                    expect(result.current.errorMsg).toBe("");

                    await waitForNextUpdate();

                    expect(result.current.isLoading).toBe(false);
                    expect(result.current.errorMsg).toBe("Movie not found!");
                    expect(result.current.results).toEqual([]);
                });
            });
        });
    });
});

const mockSearchResponse = {
    Search: [
        {
            Title: "Transformer",
            Year: "2017",
            imdbID: "tt7935784",
            Type: "movie",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BMjA5OTEyNDczMF5BMl5BanBnXkFtZTgwNTg4MzA0NjM@._V1_SX300.jpg",
        },
        {
            Title: "Transformer: Super Link",
            Year: "2004",
            imdbID: "tt0388650",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BMTY3ODM2OTU3Ml5BMl5BanBnXkFtZTcwMDkwMjcyMQ@@._V1_SX300.jpg",
        },
        {
            Title: "Classic Albums: Lou Reed - Transformer",
            Year: "2001",
            imdbID: "tt1388771",
            Type: "movie",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BMjQzNjc1MTA3Ml5BMl5BanBnXkFtZTgwMTM0ODAwNzE@._V1_SX300.jpg",
        },
        {
            Title: "Beast Wars Second: Chô seimeitai Transformer",
            Year: "1998–",
            imdbID: "tt0145639",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BZGI1YWE4ZTUtMjA2Yy00MTZlLThmMTAtMWQ4ZmJmYTNmMTdiXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
        },
        {
            Title: "Chô semeitai Transformer: Beast Wars Neo",
            Year: "1999",
            imdbID: "tt0182562",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BMDE0ZWZkZWQtYWQzZC00N2Q2LTg5YTItODQwNTU1ZjMxNTMwXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
        },
        {
            Title: "Chô robot seimeitai Transformer: Micron densetsu",
            Year: "2003–",
            imdbID: "tt0343250",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BZmZiNTQ2YTQtNTkwOC00YzU5LTk4OTEtYjhkNDZkMGI1ZmI2L2ltYWdlXkEyXkFqcGdeQXVyNjMwODg3NTE@._V1_SX300.jpg",
        },
        {
            Title: "Transformer Beast Wars Metals: Gekitotsu! Gangan Battle",
            Year: "1999",
            imdbID: "tt0276581",
            Type: "game",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BNjdmNGE5OTItMjJhOS00OTg0LTk3ZDctYWI5NjI0ODM2YjNmXkEyXkFqcGdeQXVyODM2MzE3Nzc@._V1_SX300.jpg",
        },
        {
            Title: "Transformer",
            Year: "1985",
            imdbID: "tt2374797",
            Type: "game",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BZDI1YzNmMjItYzNhNi00ZjJmLWIxNDUtZTUwZTE2NDMzNzAwXkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg",
        },
        {
            Title: "Super Truck - Carl the Transformer",
            Year: "2018–",
            imdbID: "tt10112178",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BZDU0MzRhZWUtMWU3Ni00ZDZhLWE4M2YtZjIzZWZmZTY2ZTI0XkEyXkFqcGdeQXVyNjk3NzM2MDA@._V1_SX300.jpg",
        },
        {
            Title: "Transformer: Nezha",
            Year: "2021–",
            imdbID: "tt10498680",
            Type: "series",
            Poster: "N/A",
        },
    ],
    totalResults: "16",
    Response: "True",
};
