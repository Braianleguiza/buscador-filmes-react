/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [problem, setError] = useState(null);
    const previousSearch = useRef(search);

    const getMovies = useCallback(async (search) => {
        if (previousSearch.current === search) return;

        try {
            setLoading(true);
            setError(null);

            previousSearch.current = search;
            const newMovies = await searchMovies({ search });
            setMovies(newMovies);
        } catch (error) {
            setError(error.message);
            console.log(problem);
        } finally {
            setLoading(false);
        }
    }, []);

    // Definindo um valor padrão (array vazio) para movies
    const validMovies = movies || [];

    const sortedMovies = useMemo(() => {
        return sort
            ? [...validMovies].sort((a, b) => a.year - b.year)
            : validMovies;
    }, [validMovies, sort]);

    return { movies: sortedMovies, getMovies, loading };
}
