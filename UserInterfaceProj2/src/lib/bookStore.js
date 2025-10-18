import { writable } from 'svelte/store';

export const books_on_shelf = writable([
  {
    Title: "Harry Potter",
    Genre: "Fantasy",
    Color: "Brown",
    Pages: 320,
    DateAdded: "2020-01-01",
    LastRead: "2021-05-01",
    TimesPulledOffShelf: 5
  },
  {
    Title: "Gathering Blue",
    Genre: "Dystopian",
    Color: "Brown",
    Pages: 240,
    DateAdded: "2021-03-01",
    LastRead: "2022-08-01",
    TimesPulledOffShelf: 3
  },
  {
    Title: "Les Miserables",
    Genre: "Classic",
    Color: "Brown",
    Pages: 900,
    DateAdded: "2019-10-01",
    LastRead: "2020-12-25",
    TimesPulledOffShelf: 2
  },
  {
    Title: "100 Years of Solitude",
    Genre: "Magical Realism",
    Color: "Brown",
    Pages: 417,
    DateAdded: "2022-02-14",
    LastRead: "2022-05-22",
    TimesPulledOffShelf: 4
  },
  {
    Title: "Red Rising",
    Genre: "Sci-Fi",
    Color: "Brown",
    Pages: 382,
    DateAdded: "2023-01-01",
    LastRead: "2023-04-01",
    TimesPulledOffShelf: 1
  },
  {
    Title: "Null Book",
    Genre: "Unknown",
    Color: "Gray",
    Pages: 0,
    DateAdded: "2025-10-18",
    LastRead: "",
    TimesPulledOffShelf: 0
  }
]);

export const books_off_shelf = writable([]);