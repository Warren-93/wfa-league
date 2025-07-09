import React from 'react';

const HomeFixture = () => {
  const fixtures = [
    { id: 1, teamA: 'Team A', teamB: 'Team B', date: 'Sept 20', score: '0-0' },
    { id: 2, teamA: 'Team C', teamB: 'Team D', date: 'Sept 21', score: '0-0' }
  ];

  return (
    <div className="fixtures-section mt-3">
      <h2>Upcoming Fixtures</h2>
      <div className="row">
        {fixtures.map(fixture => (
          <div key={fixture.id} className="col-md-6">
            <div className="fixture mb-5">
              <div className="d-flex justify-content-between align-items-center p-3">
                <span>{fixture.teamA} vs {fixture.teamB}</span>
                <span>{fixture.date}</span>
                <span>{fixture.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFixture;
