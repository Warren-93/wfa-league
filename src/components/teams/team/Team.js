import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../loading/Loading';

const Team = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchTeam = async () => {
    try {
      const encodedTeamName = encodeURIComponent(teamName);
      const url = `https://warriorsfootballassociation-api.onrender.com/api/v1/teams/singleTeamPlayerDetailsByTeamName?team_name=${teamName}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch team. Status: ${response.status}`);
      }

      //const teamData = await response.json();
      const teamData = await response.json();
      console.log('RAW response from API:', teamData);

    if (Array.isArray(teamData) && teamData.length > 0) {
      setTeam(teamData[0]);
    } else {
      setError('No team data found for this team name or no players in the team.');
    }
    } catch (error) {
      setError(`Error fetching team: ${error.message}`);
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchTeam();
}, [teamName]);


return (
  <div className="container">
    <Loading loading={loading} />
    <div className="row justify-content-center">
      <div className="col-md-8">
        <p>{teamName}</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : team.players.length > 0 ? (
          <div>
            <h3>{teamName}</h3>




{/*             <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Team Name</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Player Number</th>
                  <th scope="col">Position</th>
                </tr>
              </thead>
              <tbody>
                {team.players.map((player, index) => (
                  <tr key={index}>
                    <td>{team.teamName}</td>
                    <td>
                      <Link to={`/player/${player.name}`}>{player.name}</Link>
                    </td>
                    <td>{player.squad_number}</td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
          
        ) : (
          <p>No players found for this team</p>
        )}
      </div>
    </div>
  </div>
);

};

export default Team;
// This code defines a React component that fetches and displays team details including players.
// It uses the `useParams` hook to get the team name from the URL, fetches team data from an API, and displays it in a table format.
// If the data is still loading, it shows a loading spinner, and if there's an error, it displays an error message.
// The component also includes links to individual player pages using the `Link` component from `react-router-dom`.
// The table includes columns for team name, player name, player number, and position.
// The component is designed to handle cases where no team data or players are found, providing appropriate feedback to the user.
// The `Loading` component is used to show a loading spinner while the data is being fetched.
// The component is styled using Bootstrap classes for a responsive layout.      