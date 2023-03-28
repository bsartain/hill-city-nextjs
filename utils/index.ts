import { User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
];

export const formatDate = (dateString) => {
  const d = new Date(dateString.replace(/-/g, "/"));
  const ye = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(d);
  return `${mo} ${da}, ${ye}`;
};

export async function crossway(verse: string): Promise<string> {
  const url = `https://api.esv.org/v3/passage/html/?q=${verse}&include-footnotes=false&include-audio-link=false&include-headings=false&include-short-copyright=false`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Token 8ea1a445b74a5d683af4d71f322ae221e2ac682c",
      Accept: "application/json;version=1",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error();
  } else {
    return json;
  }
}

export const nextSundaysDate = () => {
  const targetDate = new Date();
  const whatDay = targetDate.getDay();
  const setDay = whatDay === 0 ? 7 : whatDay;
  targetDate.setDate(targetDate.getDate() + 7 - setDay);

  const dd = targetDate.getDate();
  const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
  const yyyy = targetDate.getFullYear();

  const dateString = mm + "/" + dd + "/" + yyyy;
  return dateString;
};

export const todaysDate = () => {
  let today: any = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  return mm + "/" + dd;
};
