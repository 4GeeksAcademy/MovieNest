import React from "react";

function MovieCard({ name, overview, poster }) {
    return (
        <div>
            <h3>{name}</h3>
            <p>{overview}</p>
            <img src={poster} alt={`${name} poster`} />
        </div>
    );
}

export default MovieCard;