import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading';

const Player = () => {
  const { playerName } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const encodedPlayerName = encodeURIComponent(playerName);
        const url = `https://warriorsfootballassociation-api.onrender.com/api/v1/players/playerByPlayerName?playerName=${encodedPlayerName}`;
        console.log('Fetching data from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch player. Status: ${response.status}`);
        }

        const playerData = await response.json();
        console.log("Player data received:", playerData);
        console.log(playerData);
        setPlayer(playerData);
      } catch (error) {
        setError(`Error fetching player: ${error.message}`);
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerName]);

  return (
    <div className="container">
      <Loading loading={loading} />
      <h2 className="text-center">{playerName}</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : player ? (
            <div className="table-responsive">
              <table className="table table-dark table-bordered">
                <thead className="thead-dark">
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Squad Number</th>
                    <td>{player.squad_number}</td>
                  </tr>
                  <tr>
                    <th scope="row">Position</th>
                    <td>{player.position}</td>
                  </tr>
                  <tr>
                    <th scope="row">Appearances</th>
                    <td>{player.playerStats?.appearances || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th scope="row">Goals</th>
                    <td>{player.playerStats?.goals || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th scope="row">Assists</th>
                    <td>{player.playerStats?.assists || 'N/A'}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          ) : (
            <p>No player data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
