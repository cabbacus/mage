export async function fetchMediaUrl(id) {
  try {
    const res = await fetch(`http://api.magemonkeys.loc/wp-json/wp/v2/media/${id}`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data.source_url;
  } catch (error) {
    console.error(`Failed to load media for ID ${id}`, error);
    return '';
  }
}
