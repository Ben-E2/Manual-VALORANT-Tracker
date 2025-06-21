document.querySelector('.SubmitButton').addEventListener('click', (event) => {
    event.preventDefault();

    const kills = parseInt(document.getElementById("KillInput")?.value) || 0;
    const deaths = parseInt(document.getElementById("DeathInput")?.value) || 0;
    const assists = parseInt(document.getElementById("AssistInput")?.value) || 0;
    const roundsWon = parseInt(document.getElementById("RoundsWonInput")?.value) || 0;
    const roundsLost = parseInt(document.getElementById("RoundsLostInput")?.value) || 0;

    const totalRounds = roundsWon + roundsLost;

    const kd = deaths === 0 ? kills : (kills / deaths).toFixed(2);
    const kda = deaths === 0 ? (kills + assists) : ((kills + assists) / deaths).toFixed(2);
    const roundDifferential = roundsWon - roundsLost;
    const killsPerRound = totalRounds === 0 ? 0 : (kills / totalRounds).toFixed(2);
    const deathsPerRound = totalRounds === 0 ? 0 : (deaths / totalRounds).toFixed(2);

    const data = {
        gamemode: document.getElementById("GamemodeInput")?.value,
        map: document.getElementById("MapInput")?.value,
        agent: document.getElementById("AgentInput")?.value,
        kills: kills,
        deaths: deaths,
        assists: assists,
        plants: parseInt(document.getElementById("PlantsInput")?.value) || 0,
        defuses: parseInt(document.getElementById("DefusesInput")?.value) || 0,
        firstBloods: parseInt(document.getElementById("FirstBloodsInput")?.value) || 0,
        roundsWon: roundsWon,
        roundsLost: roundsLost,
        datePlayed: document.getElementById("DatePlayedInput")?.value,
        mvpStatus: document.getElementById("MVPStatusInput")?.value,
        rrResult: parseInt(document.getElementById("RRResultInput")?.value) || 0,
        avgCombatScore: parseInt(document.getElementById("AVGCSInput")?.value) || 0,
        econRating: parseInt(document.getElementById("EconRatingInput")?.value) || 0,
        rank: document.getElementById("RankInput")?.value,
        kd: kd,
        kda: kda,
        roundDifferential: roundDifferential,
        killsPerRound: killsPerRound,
        deathsPerRound: deathsPerRound
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const uid = `${kills}${deaths}${assists}-${Date.now()}`;
	a.download = `${data.gamemode}-${data.datePlayed || 'unspecified'}-${uid}.json`;
    a.click();

    URL.revokeObjectURL(url);
  });
