import "./App.css";
import Fixture from "./components/Fixture";
import Loader from "./components/Loader";
import useBetsQuery from "./hooks/queries/useBetsQuery";
import useFixturesQuery from "./hooks/queries/useFixturesQuery";

function App() {
  const { data, isLoading, isError } = useFixturesQuery();
  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsErrored,
  } = useBetsQuery();

  if (isLoading || betsLoading) return <Loader />;
  if (isError || betsErrored)
    return <p>We encountered an error fetching data</p>;

  const sortFixtures = (fixtureA, fixtureB) => {
    return (
      bets.hasOwnProperty(fixtureB.fixture.id) -
        bets.hasOwnProperty(fixtureA.fixture.id) ||
      fixtureB.fixture.status.elapsed - fixtureA.fixture.status.elapsed
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header__title">Upcoming fixtures</h1>
      </header>
      <section className="Fixtures">
        {data.results.response.length ? (
          <>
            {data.results.response
              .sort(sortFixtures)
              .map(({ fixture, teams: { away, home } }) => (
                <Fixture
                  key={fixture.id}
                  fixture={fixture}
                  away={away}
                  home={home}
                  isBetPlaced={bets.hasOwnProperty(fixture.id)}
                  defaultSelectedTeam={bets[fixture.id]?.choice}
                  defaultAmount={bets[fixture.id]?.amount}
                />
              ))}
          </>
        ) : (
          <div>No fixtures at the moment</div>
        )}
      </section>
    </div>
  );
}

export default App;
