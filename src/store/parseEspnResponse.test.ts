import _response from './espnResponseExample.json';
import { parseEspnResponse } from './parseEspnResponse';
import { EspnScoreboardApiResponse } from './espnApiResponseTypes';
import { vi, describe, it, expect, test } from 'vitest';

const response = _response as EspnScoreboardApiResponse;

vi.mock('../config.json', () => ({
  default: {
    bufferPeriodWeeks: 3,
    displayPreviousWeekScores: false,
  },
}));

describe('Parse ESPN response', () => {
  it('runs without error', () => {
    parseEspnResponse(response);
  });

  it('returns correct week', () => {
    const data = parseEspnResponse(response);
    expect(data.week).toBe(12);
  });

  it('determines if season is active', () => {
    const data = parseEspnResponse(response);
    expect(data.isSeasonActive).toBe(true);
  });

  test.each([
    ['Brady'],
    ['Team Glanzmann'],
    ['Big Win'],
    ['I shouldnt  be alive'],
    ['Dead Leah'],
    ['Old Aaron Rodgers On DMT'],
    ['Team Teams'],
    ['Team Brady Son'],
    ['Bikini Bottom Sponge Crew'],
    ['Drop Your Breeches, Mister!'],
  ])('includes all teams: %s', (teamName) => {
    const data = parseEspnResponse(response);
    const teamNames = data.teams.map((x) => x.name);
    expect(teamNames.includes(teamName));
  });

  test.each([
    ['Brady', false],
    ['Team Glanzmann', false],
    ['Big Win', true],
    ['I shouldnt  be alive', true],
    ['Dead Leah', true],
    ['Old Aaron  Rodgers on DMT', true],
    ['Team Teams', true],
    ['Team Brady Son', true],
    ['Bikini Bottom Sponge Crew', true],
    ['Drop Your Breeches, Mister!', true],
  ])('sets isEliminated correctly: %s, %s', (teamName, isEliminated) => {
    const data = parseEspnResponse(response);
    const team = data.teams.find((x) => x.name.includes(teamName))!;
    expect(team.isEliminated).toBe(isEliminated);
  });

  test.each([
    ['Brady', true],
    ['Team Glanzmann', false],
    ['Big Win', false],
    ['I shouldnt  be alive', false],
    ['Dead Leah', false],
    ['Old Aaron  Rodgers on DMT', false],
    ['Team Teams', false],
    ['Team Brady Son', false],
    ['Bikini Bottom Sponge Crew', false],
    ['Drop Your Breeches, Mister!', false],
  ])('sets isImmune correctly: %s, %s', (teamName, isImmune) => {
    const data = parseEspnResponse(response);
    const team = data.teams.find((x) => x.name.includes(teamName))!;
    expect(team.isImmune).toBe(isImmune);
  });

  it('returns league name', () => {
    const data = parseEspnResponse(response);
    expect(data.leagueName).toBe("TOM BRADY'S BATTLE ROYALE");
  });

  test.each([
    ['Brady', 194.9587002089],
    ['Team Glanzmann', 214.7378509371],
  ])('returns projected points for team %s', (teamName, expectedProjection) => {
    const data = parseEspnResponse(response);
    const teamProjection = data.scoreboardRows.find((x) => x.team.name.includes(teamName))?.projectedPoints;
    expect(teamProjection).toBe(expectedProjection);
  });

  test.each([
    ['Brady', 31.3],
    ['Team Glanzmann', 145.03],
  ])('returns total points for team %s', (teamName, expectedTotal) => {
    const data = parseEspnResponse(response);
    const totalPoints = data.scoreboardRows.find((x) => x.team.name.includes(teamName))?.totalPoints;
    expect(totalPoints).toBe(expectedTotal);
  });

  test.each([
    ['Brady', 544.0699999999999],
    ['Team Glanzmann', 503.40999999999997],
    ['Big Win', 463.54],
    ['I shouldnt  be alive', 466.84000000000003],
    ['Dead Leah', 499.58],
    ['Old Aaron  Rodgers on DMT', 415.95000000000005],
    ['Team Teams', 699.26],
    ['Team Brady Son', 426.54999999999995],
    ['Bikini Bottom Sponge Crew', 425.71],
    ['Drop Your Breeches, Mister!', 482.29],
  ])('returns buffer period totals for %s', (teamName, expectedTotal) => {
    const data = parseEspnResponse(response);
    const totalPoints = data.bufferPeriodScoreboardRows.find((x) => x.team.name.includes(teamName))?.totalPoints;
    expect(totalPoints).toBe(expectedTotal);
  });

  test.each([
    ['Brady', 544.0699999999999],
    ['Team Glanzmann', 503.40999999999997],
    ['Big Win', 463.54],
    ['I shouldnt  be alive', 466.84000000000003],
    ['Dead Leah', 499.58],
    ['Old Aaron  Rodgers on DMT', 415.95000000000005],
    ['Team Teams', 699.26],
    ['Team Brady Son', 426.54999999999995],
    ['Bikini Bottom Sponge Crew', 425.71],
    ['Drop Your Breeches, Mister!', 482.29],
  ])('returns buffer period projections for %s', (teamName, expectedProjection) => {
    const data = parseEspnResponse(response);
    const projectedPoints = data.bufferPeriodScoreboardRows.find((x) => x.team.name.includes(teamName))?.projectedPoints;
    expect(projectedPoints).toBe(expectedProjection);
  });
});
