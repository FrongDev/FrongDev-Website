import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FAIconWrapper({ icon, onClick, className }) {
  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      className={`fa-icon ${className ? className : ""}`}
    />
  );
}

export default FAIconWrapper;
