import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FAIconWrapper({ icon, onClick, className, inline }) {
  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      className={`fa-icon ${className}`}
      style={inline ? { display: "inline" } : {}}
    />
  );
}

export default FAIconWrapper;
