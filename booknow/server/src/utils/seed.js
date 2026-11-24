const Movie = require('../models/Movie');

const movies = [
  ['Star Voyager', 'Sci-Fi', 'English', 148, 8.6, 'A crew races across galaxies to save a dying sun.'],
  ['Midnight Heist', 'Action', 'English', 122, 7.9, 'One night. One vault. No second chances.'],
  ['Love in Kolkata', 'Romance', 'Bengali', 135, 8.2, 'Two strangers, one monsoon, a city that brings them together.'],
  ['The Haunted Manor', 'Horror', 'Hindi', 110, 7.1, 'Some doors should never be opened.'],
  ['Laugh Riot', 'Comedy', 'Hindi', 128, 7.6, 'A wedding gone hilariously wrong.'],
  ['Dragon Realm', 'Fantasy', 'English', 156, 8.8, 'An epic quest for the last dragon egg.'],
];

const days = [0, 1, 2].map((i) => new Date(Date.now() + i * 864e5).toISOString().slice(0, 10));
const times = ['10:00 AM', '1:30 PM', '6:00 PM', '9:30 PM'];
const shows = days.flatMap((d) => times.map((t) => `PVR Cinemas | ${d} | ${t}`));

module.exports = async () => {
  if (await Movie.countDocuments()) return;
  await Movie.insertMany(movies.map(([title, genre, language, duration, rating, description], i) => ({
    title, genre, language, duration, rating, description, shows,
    price: 150 + (i % 3) * 50,
    poster: `https://picsum.photos/seed/${encodeURIComponent(title)}/400/600`,
  })));
};
