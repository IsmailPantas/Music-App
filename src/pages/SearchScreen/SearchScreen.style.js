import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0F1A', // Koyu tema
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
    },
    historyHeaderContainer: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    historyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    historyCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5,
    },
    musicCardWrapper: {
        flex: 1,
    },
    deleteButton: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#282828',
    },
    historyTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    historyText: {
        color: '#b3b3b3',
        fontSize: 16,
        marginLeft: 10,
    },
    emptyText: {
        color: '#b3b3b3',
        textAlign: 'center',
        marginTop: 50,
    },
});