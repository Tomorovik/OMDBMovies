import { MovieDetails } from "./movie.model";

export interface MovieResponse {
    Response: string;
    Search: MovieDetails[];
    Error: string;
    totalResults: string;
};
