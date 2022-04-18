import "../styles/buttons.css";

const Buttons = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Buttons;