export const getPictureOfTheDay = async () => {
	const response = await fetch(
		`https://api.nasa.gov/planetary/apod?api_key=k9vWMyAZOO0wRAjOI77IVKQWfmcGF90lCRlXVXE1`
	);
	const data = await response.json();
	return data;
};
