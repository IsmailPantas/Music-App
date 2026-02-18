import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 85,
        width: width - 20,
        alignSelf: 'center',
        backgroundColor: '#0E1527',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth:1,
        borderColor: "#262C3C",
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cover: {
        width: 45,
        height: 45,
        borderRadius: 4,
    },
    info: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    artist: {
        color: '#94A3B8',
        fontSize: 12,
    },
    playButton: {
        paddingHorizontal: 10,
    }
});