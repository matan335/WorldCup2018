'use strict';


function loadteams() {
    
    document.querySelector('h2 button').innerText = 'Loading please wait';
    
    function handleData(teams) {
        renderGames(teams)
        document.querySelector('h2 button').innerText = 'Reload';
    }
    
    try {
        var prm = axios.get('https://worldcup.sfg.io/teams/')
        prm.then(function (res) { handleData(res.data) })
    }
    catch{
        document.querySelector('.error').innerText = 'We got some tecnical dificulties.. try again!'
        console.error('try again')


    }



}

function renderGames(teams) {
    var strHtmls = '';
    teams.map(function (team, id) {
        strHtmls +=
            `
            <div class="team team-${id}" onclick="displayInfo('${team.country}')">${team.country}</div>
        `
    });
    document.querySelector('.container').innerHTML = strHtmls
}

function loadTeamRes(country) {
    document.querySelector('h2 button').innerText = 'Loading please wait';

    function handleData(games) {
        renderTeam(games, country)
        document.querySelector('h2 button').innerText = 'Reload';
    }

    var prm = axios.get('https://worldcup.sfg.io/matches')
    prm.then(function (res) { handleData(res.data) })

}

function renderTeam(games, country) {
    var teamGames = []
    games.forEach(function (game) {
        if (game.away_team.country === country || game.home_team_country === country) {
            teamGames.push(game)
        }

    })
    renderTeamGames(teamGames, country)
}

function renderTeamGames(teamGames, country) {
    var strHTMLs = '';
    teamGames.forEach(function (game) {
        console.log(game)
        var isWon = 'The team of ' + country + ' lost';
        if (game.winner === country) isWon = 'The team of ' + country + ' won';
        if (!game.winner) isWon = 'The game has not decided yet';
        var weather=game.weather
        if(!weather) weather={description:'The weather has not been occured yet',temp_celsius:'Uknown' }

        strHTMLs +=
            `
        <div class="game">

        <div> 
        <span>
        Game venue: 
        </span>
        ${game.venue}
        </div>

        <div>
        <span>
        Result: 
        </span>
        ${isWon}
        </div>

        <div>
        <span>
        Time of the game: 
        </span>
        ${game.datetime}
        </div>

        <div>
        <span>
        The weather was: 
        </span>
        ${weather.description}
         at ${weather.temp_celsius}°
        </div>

        </div>
        `
    })
    document.querySelector('.games-container').innerHTML = strHTMLs
}

function displayInfo(country) {
    document.querySelector('.container').classList.add('hide')
    document.querySelector('.back-to-temas-btn').classList.remove('hide')
    document.querySelector('.games-container').classList.remove('hide')
    loadTeamRes(country)
}

function backToTeams() {

    document.querySelector('.container').classList.remove('hide')
    document.querySelector('.back-to-temas-btn').classList.add('hide')
    document.querySelector('.games-container').classList.add('hide')
    document.querySelector('.games-container').innerHTML = ''


}