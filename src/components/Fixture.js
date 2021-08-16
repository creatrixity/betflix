import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { ReactComponent as ArrowLeft } from "../assets/svg/arrowLeft.svg";
import { ReactComponent as ChevronRight } from "../assets/svg/chevronRight.svg";
import TeamCard from "./TeamCard";
import FormInput from "./FormInput";
import useMutationNotification from "../hooks/useMutationNotification";
import usePlaceBetMutation from "../hooks/queries/usePlaceBetMutation";
import Loader from "./Loader";

function Fixture({
  fixture,
  away,
  home,
  isBetPlaced,
  defaultAmount,
  defaultSelectedTeam,
}) {
  const [amount, setAmount] = useState(defaultAmount || 0);
  const [selectedTeam, setSelectedTeam] = useState(defaultSelectedTeam);
  const [betPlaced, setBetPlaced] = useState(isBetPlaced);
  const { addToast } = useToasts();

  const [doPlaceBetRequest, placeBetState] = usePlaceBetMutation();
  useMutationNotification({
    ...placeBetState,
    useServerMessage: false,
    entity: "bet",
    actionType: "place",
  });

  useEffect(() => {
    if (placeBetState.isSuccess) setBetPlaced(true);
  }, [placeBetState.isSuccess]);

  const teams = {
    away,
    home,
  };

  const doAmountUpdate = (e) => setAmount(e.target.value);
  const doTeamUpdate = (team) => {
    if (betPlaced) return;
    setSelectedTeam(team);
  };
  const status = !fixture.status.elapsed ? "Up next" : "In progress";
  const doPlaceBet = () => {
    if (!selectedTeam || amount <= 0) {
      addToast("Please select a team and add an amount", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }
    doPlaceBetRequest({
      amount,
      choice: selectedTeam,
      fixture_id: fixture.id,
    });
  };

  return (
    <div className="Fixture">
      <section className="Fixture__teams">
        <TeamCard
          name={home.name}
          logo={home.logo}
          id={home.id}
          type={"home"}
          selected={selectedTeam === "home"}
          onTeamChange={doTeamUpdate}
        />
        <div className="Fixture__separator">vs</div>
        <TeamCard
          name={away.name}
          logo={away.logo}
          id={away.id}
          type={"away"}
          selected={selectedTeam === "away"}
          onTeamChange={doTeamUpdate}
        />
      </section>
      {!betPlaced ? (
        <>
          <section className="Fixture__controls">
            <div className="Fixture__control">
              <FormInput
                label={"Amount"}
                name={`amount-${fixture.id}`}
                type="number"
                value={amount}
                onChange={doAmountUpdate}
              />
            </div>
            <div className="Fixture__controls__separator">
              <ArrowLeft />
            </div>
            <div className="Fixture__control">
              <FormInput
                label={"Potential Winnings"}
                name={`potential-winnings-${fixture.id}`}
                value={amount * 2 || 0}
                disabled
              />
            </div>
          </section>
          <section className="Fixture__footer">
            <div className="Fixture__status">
              <span className="Fixture__status__dot"></span>
              {status}
            </div>
            {!placeBetState.isLoading ? (
              <button className="Button" onClick={doPlaceBet}>
                Place bet <ChevronRight />
              </button>
            ) : (
              <Loader />
            )}
          </section>
        </>
      ) : (
        <section className="Fixture__controls">
          <p>
            You placed a <b>${amount}</b> bet on{" "}
            <b className="u-text-primary">{teams[selectedTeam]?.name}</b> to
            potentially win <b className="u-text-primary">${amount * 2}</b>
          </p>
        </section>
      )}
    </div>
  );
}

Fixture.defaultProps = {
  isBetPlaced: false,
};

export default Fixture;
