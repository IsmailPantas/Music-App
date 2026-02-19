import axios from 'axios';

export const searchMusic = async (query) => { 
  try {

    // Girdiye göre gelen sorgu
    const response = await axios.get(`https://api.deezer.com/search?q=${query}`);

    // alacağımız verileri bir formata sokuyoruz
    const formattedData = response.data.data.map((song) => ({
      id: song.id.toString(),
      title: song.title,
      artist: song.artist.name,
      cover: song.album.cover_xl, 
      preview: song.preview,
      album: song.album.title,
      duration: song.duration

    }));

    return formattedData;

  } catch (error) {
    console.error("Müzik çekilirken hata oluştu:", error);
    return []; 
  }
};