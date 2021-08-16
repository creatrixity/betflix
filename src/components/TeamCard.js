import LazyLoadedImage from "./LazyLoadedImage";
import { ReactComponent as Tick } from "../assets/svg/tick.svg";

function TeamCard({ id, type, name, logo, selected, onTeamChange }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        checked={selected}
        onChange={() => onTeamChange(type)}
        className="Team__radio"
      />
      <label
        className={`Team Team--${type} Team--${selected ? "selected" : ""}`}
        htmlFor={id}
      >
        {selected ? <Tick className="Team__tick" /> : null}

        <LazyLoadedImage src={logo} className="Team__logo" alt={name} />
        <h2 className="Team__name">{name}</h2>
      </label>
    </div>
  );
}

TeamCard.defaultProps = {
  type: "home",
  selected: false,
};

export default TeamCard;
