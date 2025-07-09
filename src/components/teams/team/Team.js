import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
        const url = `https://warriorsfootballassociation-api.onrender.com/api/v1/teams/singleTeamPlayerDetailsByTeamName?team_name=${encodedTeamName}`;
       // console.log('Fetching data from:', url);
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch team. Status: ${response.status}`);
        }
        const teamData = await response.json();
        console.log("Team data received:", teamData); // Log the entire response
        
        if (teamData && teamData.players && teamData.players.length > 0) {
          setTeam(teamData); // Set the team data
        //  console.log("Team data after setting state:", teamData);
        } else {
          setError('No team data found for this team name or no players in the team.');
        }
      } catch (error) {
        setError(`Error fetching team: ${error.message}`);
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
      console.log("team: " + team.players.player);
    };

    fetchTeam();
  }, [teamName]); // Dependency array, runs when `teamName` changes

  return (
    <div className="container">
      <Loading loading={loading} />
      <div className="row justify-content-center">
        <div className="col-md-8">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : team && team.players && team.players.length > 0 ? (
            <div>
              <h3>{teamName}</h3>
              
             {/*  <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Team Name</th>
                    <th scope="col">Player Name</th>
                    <th scope="col">Player Number</th>
                    <th scope="col">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((players, name) => (
                    <tr key={name}>
                      <td>{team.teamName}</td>
                      <td><Link to={`/players/${players.name}`}>{players.name}</Link></td>
                      <td>{players.squad_number}</td>
                      <td>{players.position}</td>
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
