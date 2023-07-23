const API_KEY = "28ad0b2a";

export const searchMovies = async ({ search }) => {
    if (search === "") return null;

    if (search) {
        try {
            const response = await fetch(
                `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`
            );
            const data = await response.json();
            const movies = data.Search;

            return movies?.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                image: movie.Poster,
            }));
        } catch (error) {
            throw new Error("Error on searching movies");
        }
    }
};
