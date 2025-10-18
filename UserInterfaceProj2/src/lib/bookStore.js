// src/lib/bookStore.js
import { writable, derived } from 'svelte/store';

export const books_on_shelf = writable([
  {
    Title: "Harry Potter",
    Genre: "Fantasy",
    Color: "#dc8920",
    Pages: 320,
    DateAdded: "2020-01-01",
    LastRead: "2021-05-01",
    shelf: 1,
    spot: 1,
    TimesPulledOffShelf: 5
  },
  {
    Title: "The Great Gatsby",
    Genre: "Classic",
    Color: "#1e90ff",
    Pages: 180,
    DateAdded: "2019-03-15",
    LastRead: "2020-11-20",
    shelf: 1,
    spot: 2,
    TimesPulledOffShelf: 3
  },
  {
    Title: "1984",
    Genre: "Dystopian",
    Color: "#ff6347",
    Pages: 328,
    DateAdded: "2020-06-12",
    LastRead: "2021-02-18",
    shelf: 1,
    spot: 3,
    TimesPulledOffShelf: 4
  },
  {
    Title: "To Kill a Mockingbird",
    Genre: "Classic",
    Color: "#8b4513",
    Pages: 281,
    DateAdded: "2019-08-20",
    LastRead: "2020-09-10",
    shelf: 1,
    spot: 4,
    TimesPulledOffShelf: 2
  },
  {
    Title: "The Hobbit",
    Genre: "Fantasy",
    Color: "#228b22",
    Pages: 310,
    DateAdded: "2021-01-05",
    LastRead: "2021-12-01",
    shelf: 2,
    spot: 1,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Pride and Prejudice",
    Genre: "Classic",
    Color: "#ff69b4",
    Pages: 279,
    DateAdded: "2018-05-10",
    LastRead: "2019-11-22",
    shelf: 2,
    spot: 2,
    TimesPulledOffShelf: 5
  },
  {
    Title: "The Catcher in the Rye",
    Genre: "Classic",
    Color: "#f4a460",
    Pages: 214,
    DateAdded: "2019-02-01",
    LastRead: "2020-01-15",
    shelf: 2,
    spot: 3,
    TimesPulledOffShelf: 2
  },
  {
    Title: "Brave New World",
    Genre: "Dystopian",
    Color: "#7b68ee",
    Pages: 268,
    DateAdded: "2020-03-22",
    LastRead: "2020-12-05",
    shelf: 2,
    spot: 4,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Fahrenheit 451",
    Genre: "Dystopian",
    Color: "#ff4500",
    Pages: 194,
    DateAdded: "2019-07-30",
    LastRead: "2020-06-20",
    shelf: 3,
    spot: 1,
    TimesPulledOffShelf: 4
  },
  {
    Title: "Moby Dick",
    Genre: "Classic",
    Color: "#4682b4",
    Pages: 635,
    DateAdded: "2018-11-11",
    LastRead: "2019-08-14",
    shelf: 3,
    spot: 2,
    TimesPulledOffShelf: 1
  },
  {
    Title: "The Lord of the Rings",
    Genre: "Fantasy",
    Color: "#6b8e23",
    Pages: 1178,
    DateAdded: "2020-10-05",
    LastRead: "2021-03-20",
    shelf: 3,
    spot: 3,
    TimesPulledOffShelf: 6
  },
  {
    Title: "Animal Farm",
    Genre: "Dystopian",
    Color: "#daa520",
    Pages: 112,
    DateAdded: "2019-01-10",
    LastRead: "2020-02-14",
    shelf: 3,
    spot: 4,
    TimesPulledOffShelf: 2
  },
  {
    Title: "The Chronicles of Narnia",
    Genre: "Fantasy",
    Color: "#20b2aa",
    Pages: 767,
    DateAdded: "2021-05-15",
    LastRead: "2021-12-01",
    shelf: 4,
    spot: 1,
    TimesPulledOffShelf: 4
  },
  {
    Title: "Little Women",
    Genre: "Classic",
    Color: "#ff7f50",
    Pages: 449,
    DateAdded: "2018-12-20",
    LastRead: "2019-07-01",
    shelf: 4,
    spot: 2,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Red Rising",
    Genre: "Sci-Fi",
    Color: "#b22222",
    Pages: 382,
    DateAdded: "2023-01-01",
    LastRead: "2023-04-01",
    shelf: 4,
    spot: 3,
    TimesPulledOffShelf: 1
  }
]);

export const books_off_shelf = writable([]);

// Auto-derive the bookshelf layout grid (4 shelves × 10 spots)
const shelves = 4;
const spots_per_shelf = 10;

export const books_per_shelf = derived(books_on_shelf, ($books_on_shelf) => {
  const grid = Array.from({ length: shelves }, () =>
    Array.from({ length: spots_per_shelf }, () => null)
  );

  for (const book of $books_on_shelf) {
    if (book.shelf && book.spot) {
      const shelfIndex = book.shelf - 1;
      const spotIndex = book.spot - 1;
      if (grid[shelfIndex] && spotIndex < spots_per_shelf) {
        grid[shelfIndex][spotIndex] = {
          title: book.Title,
          color: book.Color,
        };
      }
    }
  }

  return grid;
});
