const API_KEY = 'd71e59939752809aacb08c573188d676';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
}

export interface IGetMovieResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
	).then((response) => response.json());
}
