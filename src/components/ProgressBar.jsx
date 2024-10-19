import React from "react";
import PropTypes from "prop-types";

const CustomProgressBar = ({now, max}) => {
  const progressPercentage = Math.min((now / max) * 100, 100); // Ensure percentage doesn't exceed 100
  const isFilled = progressPercentage === 100;

  return (
    <>
      <span>{`${now} / ${max}`}</span>
      <div style={styles.container}>
        <div style={{...styles.progress, width: `${progressPercentage}%`}}></div>
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "30px",
    backgroundColor: "#e0e0df", // Background color of the progress bar
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden",
    transition: "background-color 0.5s ease"
  },
  progress: {
    height: "100%",
    backgroundColor: "#4caf50", // Color when progress is present
    borderRadius: "5px",
    transition: "width 0.5s ease",
    position: "relative"
  },
  label: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold"
  }
};

CustomProgressBar.propTypes = {
  now: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default CustomProgressBar;
