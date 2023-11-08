interface CustomPlayer {
    espnPlayerId: number;
}
// kyler pic: 
//https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3917315.png&w=426&h=320&cb=1

const customPlayers: CustomPlayer[] = [
    // Jermar Jefferson
    {
        espnPlayerId: 4374033
    },
    // Derek Carrier
    {
        espnPlayerId: 15403
    },
    // Kyler Murray
    {
        espnPlayerId: 3917315
    }
]

const referencePlayerIds = {
    justinJefferson: 4262921,
    derekCarr: 16757
};

export { customPlayers, referencePlayerIds }