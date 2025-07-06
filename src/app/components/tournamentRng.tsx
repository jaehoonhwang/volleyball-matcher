"use client";

import React from "react";

// --- MOCK DATA ---
// This data structure drives the entire bracket.
// - Each object in the `rounds` array is a column in the bracket.
// - `seeds` contains the matches for that round.
// - A `teams` array with one team indicates a bye or a team that has advanced.
const bracketData = {
  rounds: [
    {
      title: "Quarter-finals",
      seeds: [
        {
          id: 1,
          teams: [
            { name: "Team Alpha", score: 4 },
            { name: "Team Bravo", score: 2 },
          ],
        },
        {
          id: 2,
          teams: [
            { name: "Team Charlie", score: 1 },
            { name: "Team Delta", score: 5 },
          ],
        },
        {
          id: 3,
          teams: [
            { name: "Team Echo", score: 3 },
            { name: "Team Foxtrot", score: 2 },
          ],
        },
        {
          id: 4,
          teams: [
            { name: "Team Golf", score: 0 },
            { name: "Team Hotel", score: 3 },
          ],
        },
      ],
    },
    {
      title: "Semi-finals",
      seeds: [
        {
          id: 5,
          teams: [
            { name: "Team Alpha", score: 3 },
            { name: "Team Delta", score: 2 },
          ],
        },
        {
          id: 6,
          teams: [
            { name: "Team Echo", score: 1 },
            { name: "Team Hotel", score: 4 },
          ],
        },
      ],
    },
    {
      title: "Finals",
      seeds: [
        {
          id: 7,
          teams: [
            { name: "Team Alpha", score: 2 },
            { name: "Team Hotel", score: 5 },
          ],
        },
      ],
    },
    {
      title: "Winner",
      seeds: [{ id: 8, teams: [{ name: "Team Hotel", score: null }] }],
    },
  ],
};

// --- HELPER COMPONENTS ---

/**
 * Represents a single team within a match.
 * @param {object} props - Component properties.
 * @param {string} props.name - The team's name.
 * @param {number|null} props.score - The team's score.
 * @param {boolean} props.isWinner - Whether this team won the match.
 */
const Team = ({ name, score, isWinner }) => (
  <div
    className={`flex justify-between items-center p-2 rounded-md ${
      isWinner ? "font-bold text-white" : "text-gray-400"
    }`}
  >
    <span>{name}</span>
    {score !== null && (
      <span
        className={`py-1 px-2 text-xs rounded ${
          isWinner ? "bg-green-500 text-white" : "bg-gray-700"
        }`}
      >
        {score}
      </span>
    )}
  </div>
);

/**
 * Represents a single match between two teams.
 * It determines the winner based on the score to pass to the Team component.
 * @param {object} props - Component properties.
 * @param {object} props.seed - The match data.
 */
const Match = ({ seed }) => {
  const { teams } = seed;

  // Handle byes or matches with only one participant
  if (teams.length < 2) {
    return (
      <div className="flex flex-col bg-gray-800 rounded-lg w-64">
        <Team name={teams[0].name} score={teams[0].score} isWinner={true} />
      </div>
    );
  }

  const [team1, team2] = teams;
  const isTeam1Winner = team1.score > team2.score;

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg w-64">
      <Team name={team1.name} score={team1.score} isWinner={isTeam1Winner} />
      <div className="border-b border-gray-600"></div>
      <Team name={team2.name} score={team2.score} isWinner={!isTeam1Winner} />
    </div>
  );
};

/**
 * Renders the connecting lines between matches in different rounds.
 * @param {object} props - Component properties.
 * @param {number} props.roundIndex - The index of the current round.
 * @param {number} props.numMatches - The number of matches in the current round.
 */
const Connector = ({ roundIndex, numMatches }) => {
  // Don't render connectors for the winner's column or if there are no matches
  if (roundIndex % 2 !== 0 || numMatches <= 1) {
    return null;
  }

  // The height of a match card including its margin-bottom
  const matchHeight = 100; // 84px height + 16px mb-4
  const connectorHeight = matchHeight * 2;

  return (
    <div
      className="flex flex-col justify-around w-16"
      style={{ height: `${numMatches * matchHeight}px` }}
    >
      {Array.from({ length: numMatches / 2 }).map((_, i) => (
        <div
          key={i}
          className="relative"
          style={{ height: `${connectorHeight}px` }}
        >
          <div className="absolute top-1/4 left-0 w-1/2 h-0.5 bg-gray-500"></div>
          <div className="absolute top-3/4 left-0 w-1/2 h-0.5 bg-gray-500"></div>
          <div className="absolute top-1/4 left-1/2 w-0.5 h-1/2 bg-gray-500"></div>
          <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gray-500"></div>
        </div>
      ))}
    </div>
  );
};

// --- MAIN BRACKET COMPONENT ---

/**
 * The main component that orchestrates the rendering of the entire tournament bracket.
 * @param {object} props - Component properties.
 * @param {object} props.data - The tournament data object.
 */
const TournamentBracket = ({ data }) => {
  if (!data || !data.rounds) {
    return <div>Loading bracket...</div>;
  }

  return (
    <div className="flex justify-start p-4 md:p-8 bg-gray-900 overflow-x-auto">
      {data.rounds.map((round, roundIndex) => (
        <React.Fragment key={roundIndex}>
          <div className="flex flex-col justify-around">
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              {round.title}
            </h3>
            <div className="space-y-4">
              {round.seeds.map((seed) => (
                <div key={seed.id} className="mb-4">
                  <Match seed={seed} />
                </div>
              ))}
            </div>
          </div>
          {/* Render connectors between rounds */}
          {roundIndex < data.rounds.length - 2 && (
            <Connector
              roundIndex={roundIndex}
              numMatches={round.seeds.length}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
