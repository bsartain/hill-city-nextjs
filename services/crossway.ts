export async function crosswayApi(verse: string): Promise<string> {
  const relativeUrl: string = `https://api.esv.org/v3/passage/html/?q=${verse}&include-footnotes=false&include-audio-link=false&include-headings=false&include-short-copyright=false`;
  const searchUrl: any = new URL(relativeUrl, window.location.href);

  const response: any = await fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: "Token 8ea1a445b74a5d683af4d71f322ae221e2ac682c",
      Accept: "application/json;version=1",
    },
  });

  const bible = await response.json();

  if (!response.ok) {
    throw new Error();
  } else {
    return bible.passages[0];
  }
}
