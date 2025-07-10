import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://warriorsfootballassociation-api.onrender.com/api/v1/teams/allTeams');
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const teamsData = await response.json();
        
        console.log(teamsData.players);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);  // Hide spinner once data is fetched
      }

    };

    fetchTeams();
  }, []);

  return (
    <div className="container">
      <Loading loading={loading} />  {/* Show spinner while loading */}
      <h2 className="text-center">Football Teams</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {loading ? (
            <p>Loading...</p>  // Optional: You can remove this if using spinner only
          ) : (
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Team Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.teamName}>
                    <td>
                      <Link to={`/teams/${team.teamName}`}>{team.teamName}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
