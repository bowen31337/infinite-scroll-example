export interface SearchItem {
    Title: string;
    Year: string;
    imdbID:string;
    Type:string;
    Poster:string;
}

export interface SearchResponse {
    Response:string;
    Search: SearchItem[];
    totalResults:string;
    Error?:string;
}