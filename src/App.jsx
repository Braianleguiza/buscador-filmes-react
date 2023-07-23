/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import debounce from "just-debounce-it";
import { Icons } from "./components/Icons";
import { Movies } from "./components/ListOfMovies";
import { Tooltip } from "react-tooltip";
import { useMovies } from "./hooks/useMovies";
import { useCallback, useEffect, useRef, useState } from "react";

function useSearch() {
    const [search, updateSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);
    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === "";
            return;
        }
        if (search === "") {
            setError("No se puede buscar una pelicula vacia");
            return;
        }

        if (search.match(/^\d+$/)) {
            setError("No se puede buscar una pelicúla con un número");
        }

        if (search.length < 3) {
            setError("La búsqueda debe tener al menos 3 caracteres");
            return;
        }
        setError(null);
    }, [search]);
    return { search, updateSearch, error };
}

function App() {
    const [sort, setSort] = useState(false);
    const { search, updateSearch, error } = useSearch();
    const { movies, getMovies, loading } = useMovies({ search, sort });

    const debouncedGetMovies = useCallback(
        debounce((search) => {
            getMovies(search);
        }, 500),
        [getMovies]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        getMovies(search);
    };
    const handleChange = (event) => {
        const newSearch = event.target.value;
        debouncedGetMovies(newSearch);
        updateSearch(event.target.value);
    };
    const handleSort = () => {
        setSort(!sort);
    };

    return (
        <div className="page">
            <header className="header">
                <h1 style={{ display: "inline-flex" }}>
                    <img
                        style={{ marginRight: "8px" }}
                        height={48}
                        width={48}
                        src="movie-folder.svg"
                        alt="logo"
                    />
                    Buscador de Filmes
                </h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        style={{
                            border: "1px solid transparent",
                            borderColor: error ? "red" : "transparent",
                        }}
                        onChange={handleChange}
                        value={search}
                        type="text"
                        name="query"
                        placeholder="Avengers, Star Wars, The Matrix..."
                    />
                    <button type="submit">Buscar</button>
                    <br />
                    <Tooltip id="my-tooltip" />
                    <input
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Ordenar por ano"
                        type="checkbox"
                        onChange={handleSort}
                        checked={sort}
                    />
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </header>
            <main>
                {loading && <p>Cargando...</p>}
                <Movies movies={movies} />
            </main>
            <Icons />
        </div>
    );
}

export default App;
