/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if(!Array.isArray(matches) || matches.length === 0) return [];
  // object accumulator
  let teamObject = {};

  for (let item = 0; item < matches.length; item++) {
  let currentMatch = matches[item];
  
  if (!teamObject[currentMatch.team1]) {
    teamObject[currentMatch.team1] = { team: currentMatch.team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
  }
  if (!teamObject[currentMatch.team2]) {
    teamObject[currentMatch.team2] = { team: currentMatch.team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
  }
  
  teamObject[currentMatch.team1].played++;
  teamObject[currentMatch.team2].played++;

  if (currentMatch.result === 'win') {

    teamObject[currentMatch.winner].won++;
    teamObject[currentMatch.winner].points = teamObject[currentMatch.winner].points + 2;
  
    let loser = currentMatch.team1 === currentMatch.winner ? currentMatch.team2 : currentMatch.team1;
    teamObject[loser].lost++;

  } 
  else if (currentMatch.result === 'tie') {
    teamObject[currentMatch.team1].tied++;
    teamObject[currentMatch.team2].tied++;
    teamObject[currentMatch.team1].points++
    teamObject[currentMatch.team2].points++;
  } 
  else if (currentMatch.result === 'no_result') {
    teamObject[currentMatch.team1].noResult++;
    teamObject[currentMatch.team2].noResult++;
    teamObject[currentMatch.team1].points++;
    teamObject[currentMatch.team2].points++;
  }
}

let sortedTeams = Object.values(teamObject).sort((a, b) => {
  if (a.points !== b.points) {
    return b.points - a.points; 
  }
  return a.team.localeCompare(b.team);
})

return sortedTeams;
}
