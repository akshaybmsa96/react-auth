import loader from "../../asset/loader.gif";
import "./style.css";

const Loader = () => {
  return (
    <div className="loaderDiv">
      <img alt="loader" src={loader} />
    </div>
  );
};

export default Loader;
