/**
 * 
 * @returns {Promise<{
 *  data: {
 * mal_id: number;
 * url: string;
 * images: {
 * jpg: { image_url: string;
 * };
 * };
 * title: string;
 * title_english: string;
 * title_japanese: string;
 * year: number;
 * genres: {
 * mal_id: number;
 * type: string;
 * name: string;
 * url: string;}[]}[];
 *  pagination: {
 *  current_page: number;
 * has_next_page: boolean;
 * items: {
 * count: number;
 * per_page: number;
 * total: number;}
 * last_visible_page: number;
 * }
 * 
 * }>}
 */

export const getAnime = async () => {
  try {
    const apiPath = "https://api.jikan.moe/v4/anime";

    const response = await fetch(apiPath, {
      method: "GET",
    });

    // console.log(response);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }

}