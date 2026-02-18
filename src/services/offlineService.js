import RNFS from 'react-native-fs';

const offlineService = {
    downloadSong: async (song) => {
        // Güvenli veri kontrolü
        if (!song?.id || !song?.preview) return null;

        const fileName = `${song.id}.mp3`;
        const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
            const exists = await RNFS.exists(localPath);
            if (exists) return `file://${localPath}`;

            const download = RNFS.downloadFile({
                fromUrl: song.preview,
                toFile: localPath,
            });

            await download.promise;
            return `file://${localPath}`;
        } catch (error) {
            console.error("İndirme hatası:", error);
            return null;
        }
    }
};

export default offlineService;