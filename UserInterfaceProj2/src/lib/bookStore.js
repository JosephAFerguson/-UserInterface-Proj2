// src/lib/bookStore.js
import { writable, derived } from 'svelte/store';
export const user_profile = writable(1);

export const books_on_shelf_profiles = {
  1: [
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
  ],
  2: [
  {
    Title: "Spider-Man: Homecoming",
    Genre: "Comic",
    Color: "#ff0000",
    Pages: 120,
    DateAdded: "2022-01-01",
    LastRead: "2023-05-15",
    shelf: 1,
    spot: 1,
    TimesPulledOffShelf: 12
  },
  {
    Title: "Batman: Year One",
    Genre: "Comic",
    Color: "#000000",
    Pages: 100,
    DateAdded: "2021-08-12",
    LastRead: "2023-03-20",
    shelf: 1,
    spot: 2,
    TimesPulledOffShelf: 15
  },
  {
    Title: "Superman: Red Son",
    Genre: "Comic",
    Color: "#1e90ff",
    Pages: 150,
    DateAdded: "2022-03-10",
    LastRead: "2023-02-10",
    shelf: 1,
    spot: 3,
    TimesPulledOffShelf: 10
  },
  {
    Title: "X-Men: Days of Future Past",
    Genre: "Comic",
    Color: "#800080",
    Pages: 140,
    DateAdded: "2021-11-05",
    LastRead: "2023-04-01",
    shelf: 1,
    spot: 4,
    TimesPulledOffShelf: 14
  },
  {
    Title: "Avengers: Infinity War",
    Genre: "Comic",
    Color: "#ffa500",
    Pages: 200,
    DateAdded: "2022-06-20",
    LastRead: "2023-01-15",
    shelf: 2,
    spot: 1,
    TimesPulledOffShelf: 18
  },
  {
    Title: "Wonder Woman: Bloodlines",
    Genre: "Comic",
    Color: "#ff69b4",
    Pages: 130,
    DateAdded: "2022-02-14",
    LastRead: "2023-03-10",
    shelf: 2,
    spot: 2,
    TimesPulledOffShelf: 13
  },
  {
    Title: "The Flash: Rebirth",
    Genre: "Comic",
    Color: "#ffff00",
    Pages: 110,
    DateAdded: "2022-05-01",
    LastRead: "2023-04-05",
    shelf: 2,
    spot: 3,
    TimesPulledOffShelf: 16
  },
  {
    Title: "Green Lantern: Secret Origin",
    Genre: "Comic",
    Color: "#00ff00",
    Pages: 125,
    DateAdded: "2021-09-10",
    LastRead: "2023-02-28",
    shelf: 2,
    spot: 4,
    TimesPulledOffShelf: 11
  },
  {
    Title: "Deadpool: Merc with a Mouth",
    Genre: "Comic",
    Color: "#ff4500",
    Pages: 105,
    DateAdded: "2022-07-22",
    LastRead: "2023-03-25",
    shelf: 3,
    spot: 1,
    TimesPulledOffShelf: 20
  },
  {
    Title: "Iron Man: Extremis",
    Genre: "Comic",
    Color: "#dc143c",
    Pages: 120,
    DateAdded: "2022-09-05",
    LastRead: "2023-04-10",
    shelf: 3,
    spot: 2,
    TimesPulledOffShelf: 17
  },
  {
    Title: "Thor: God of Thunder",
    Genre: "Comic",
    Color: "#1e90ff",
    Pages: 135,
    DateAdded: "2021-12-15",
    LastRead: "2023-03-15",
    shelf: 3,
    spot: 3,
    TimesPulledOffShelf: 15
  },
  {
    Title: "Black Panther: A Nation Under Our Feet",
    Genre: "Comic",
    Color: "#000000",
    Pages: 140,
    DateAdded: "2022-04-10",
    LastRead: "2023-04-01",
    shelf: 3,
    spot: 4,
    TimesPulledOffShelf: 12
  },
  {
    Title: "Justice League: Origin",
    Genre: "Comic",
    Color: "#ff6347",
    Pages: 150,
    DateAdded: "2021-10-20",
    LastRead: "2023-02-10",
    shelf: 4,
    spot: 1,
    TimesPulledOffShelf: 14
  },
  {
    Title: "Teen Titans: The Judas Contract",
    Genre: "Comic",
    Color: "#8a2be2",
    Pages: 130,
    DateAdded: "2022-01-30",
    LastRead: "2023-03-05",
    shelf: 4,
    spot: 2,
    TimesPulledOffShelf: 13
  },
  {
    Title: "Daredevil: Born Again",
    Genre: "Comic",
    Color: "#ff0000",
    Pages: 145,
    DateAdded: "2022-03-15",
    LastRead: "2023-04-05",
    shelf: 4,
    spot: 3,
    TimesPulledOffShelf: 16
  }
  ],
  3: [
  {
    Title: "The Hunger Games",
    Genre: "Dystopian",
    Color: "#d62828",
    Pages: 374,
    DateAdded: "2021-05-12",
    LastRead: "2022-02-03",
    shelf: 1,
    spot: 1,
    TimesPulledOffShelf: 6
  },
  {
    Title: "The Night Circus",
    Genre: "Fantasy",
    Color: "#3d47b4ff",
    Pages: 387,
    DateAdded: "2020-09-10",
    LastRead: "2021-06-20",
    shelf: 1,
    spot: 2,
    TimesPulledOffShelf: 4
  },
  {
    Title: "Project Hail Mary",
    Genre: "Sci-Fi",
    Color: "#ffb703",
    Pages: 476,
    DateAdded: "2023-03-15",
    LastRead: "2023-09-10",
    shelf: 1,
    spot: 3,
    TimesPulledOffShelf: 3
  },
  {
    Title: "The Silent Patient",
    Genre: "Thriller",
    Color: "#1b85b9ff",
    Pages: 336,
    DateAdded: "2022-01-25",
    LastRead: "2022-03-15",
    shelf: 1,
    spot: 4,
    TimesPulledOffShelf: 5
  },
  {
    Title: "A Court of Thorns and Roses",
    Genre: "Fantasy",
    Color: "#9d4edd",
    Pages: 419,
    DateAdded: "2020-07-22",
    LastRead: "2021-01-05",
    shelf: 2,
    spot: 1,
    TimesPulledOffShelf: 7
  },
  {
    Title: "The Martian",
    Genre: "Sci-Fi",
    Color: "#e85d04",
    Pages: 369,
    DateAdded: "2019-08-11",
    LastRead: "2020-04-02",
    shelf: 2,
    spot: 2,
    TimesPulledOffShelf: 8
  },
  {
    Title: "The Seven Husbands of Evelyn Hugo",
    Genre: "Drama",
    Color: "#007f5f",
    Pages: 389,
    DateAdded: "2021-02-17",
    LastRead: "2021-09-10",
    shelf: 2,
    spot: 3,
    TimesPulledOffShelf: 5
  },
  {
    Title: "Circe",
    Genre: "Mythology",
    Color: "#cc7722",
    Pages: 393,
    DateAdded: "2019-10-12",
    LastRead: "2020-03-05",
    shelf: 2,
    spot: 4,
    TimesPulledOffShelf: 4
  },
  {
    Title: "The Midnight Library",
    Genre: "Philosophical Fiction",
    Color: "#14213d",
    Pages: 304,
    DateAdded: "2022-07-09",
    LastRead: "2022-11-25",
    shelf: 3,
    spot: 1,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Fourth Wing",
    Genre: "Fantasy",
    Color: "#c9ada7",
    Pages: 528,
    DateAdded: "2024-02-18",
    LastRead: "2024-05-10",
    shelf: 3,
    spot: 2,
    TimesPulledOffShelf: 2
  },
  {
    Title: "Tomorrow, and Tomorrow, and Tomorrow",
    Genre: "Contemporary Fiction",
    Color: "#3a86ff",
    Pages: 416,
    DateAdded: "2023-08-25",
    LastRead: "2023-12-30",
    shelf: 3,
    spot: 3,
    TimesPulledOffShelf: 3
  },
  {
    Title: "The House in the Cerulean Sea",
    Genre: "Fantasy",
    Color: "#48cae4",
    Pages: 394,
    DateAdded: "2021-04-09",
    LastRead: "2021-09-01",
    shelf: 3,
    spot: 4,
    TimesPulledOffShelf: 6
  }
  ],
  4: [
  {
    Title: "Dune",
    Genre: "Sci-Fi",
    Color: "#f77f00",
    Pages: 688,
    DateAdded: "2022-03-10",
    LastRead: "2022-08-05",
    shelf: 1,
    spot: 1,
    TimesPulledOffShelf: 7
  },
  {
    Title: "Klara and the Sun",
    Genre: "Literary Fiction",
    Color: "#6a0572",
    Pages: 320,
    DateAdded: "2021-12-01",
    LastRead: "2022-04-12",
    shelf: 1,
    spot: 2,
    TimesPulledOffShelf: 4
  },
  {
    Title: "It Ends With Us",
    Genre: "Romance",
    Color: "#ff6b6b",
    Pages: 384,
    DateAdded: "2022-05-15",
    LastRead: "2022-10-10",
    shelf: 1,
    spot: 3,
    TimesPulledOffShelf: 6
  },
  {
    Title: "Ready Player One",
    Genre: "Sci-Fi",
    Color: "#00b4d8",
    Pages: 374,
    DateAdded: "2020-07-07",
    LastRead: "2021-01-20",
    shelf: 1,
    spot: 4,
    TimesPulledOffShelf: 5
  },
  {
    Title: "Where the Crawdads Sing",
    Genre: "Mystery",
    Color: "#007f5f",
    Pages: 368,
    DateAdded: "2021-06-20",
    LastRead: "2021-12-01",
    shelf: 2,
    spot: 1,
    TimesPulledOffShelf: 8
  },
  {
    Title: "The Invisible Life of Addie LaRue",
    Genre: "Fantasy",
    Color: "#ffb703",
    Pages: 448,
    DateAdded: "2021-09-12",
    LastRead: "2022-02-28",
    shelf: 2,
    spot: 2,
    TimesPulledOffShelf: 7
  },
  {
    Title: "Project Hail Mary",
    Genre: "Sci-Fi",
    Color: "#498bacff",
    Pages: 476,
    DateAdded: "2023-01-05",
    LastRead: "2023-04-20",
    shelf: 2,
    spot: 3,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Malibu Rising",
    Genre: "Contemporary",
    Color: "#ff6700",
    Pages: 384,
    DateAdded: "2022-08-14",
    LastRead: "2022-12-01",
    shelf: 2,
    spot: 4,
    TimesPulledOffShelf: 2
  },
  {
    Title: "The Atlas Six",
    Genre: "Fantasy",
    Color: "#8338ec",
    Pages: 432,
    DateAdded: "2021-11-20",
    LastRead: "2022-05-10",
    shelf: 3,
    spot: 1,
    TimesPulledOffShelf: 5
  },
  {
    Title: "Atomic Habits",
    Genre: "Self-Help",
    Color: "#06d6a0",
    Pages: 320,
    DateAdded: "2020-02-12",
    LastRead: "2021-03-22",
    shelf: 3,
    spot: 2,
    TimesPulledOffShelf: 9
  },
  {
    Title: "The Lincoln Highway",
    Genre: "Literary Fiction",
    Color: "#ef476f",
    Pages: 528,
    DateAdded: "2022-10-01",
    LastRead: "2023-03-15",
    shelf: 3,
    spot: 3,
    TimesPulledOffShelf: 4
  },
  {
    Title: "Sea of Tranquility",
    Genre: "Sci-Fi",
    Color: "#118ab2",
    Pages: 352,
    DateAdded: "2023-05-08",
    LastRead: "2023-09-01",
    shelf: 3,
    spot: 4,
    TimesPulledOffShelf: 3
  },
  {
    Title: "Lessons in Chemistry",
    Genre: "Contemporary",
    Color: "#ffd166",
    Pages: 400,
    DateAdded: "2022-12-20",
    LastRead: "2023-03-05",
    shelf: 4,
    spot: 1,
    TimesPulledOffShelf: 6
  },
  {
    Title: "Tomorrow, and Tomorrow, and Tomorrow",
    Genre: "Contemporary",
    Color: "#0e6b8aff",
    Pages: 416,
    DateAdded: "2023-01-18",
    LastRead: "2023-07-01",
    shelf: 4,
    spot: 2,
    TimesPulledOffShelf: 4
  }
  ]
};

const books_off_shelf_profiles = {
  1: [],
  2: [],
  3: [],
  4: []
};

// Writable store for the current profile's on-shelf books
export const books_on_shelf = writable(books_on_shelf_profiles[1]);
// Writable store for off-shelf books
export const books_off_shelf = writable(books_off_shelf_profiles[1]);

export function setProfile(n) {
  if (n >= 1 && n <= 4) {
    user_profile.set(n);
    books_on_shelf.set(books_on_shelf_profiles[n]);
    books_off_shelf.set(books_off_shelf_profiles[n]);
  }
}

// Grid layout derived store
const shelves = 4;
const spots_per_shelf = 10;

export const books_per_shelf = derived(books_on_shelf, ($books_on_shelf) => {
  const grid = Array.from({ length: shelves }, () =>
    Array.from({ length: spots_per_shelf }, () => null)
  );

  for (const book of $books_on_shelf) {
    if (book.shelf && book.spot) {
      const s = book.shelf - 1;
      const p = book.spot - 1;
      grid[s][p] = { title: book.Title, color: book.Color };
    }
  }

  return grid;
});
