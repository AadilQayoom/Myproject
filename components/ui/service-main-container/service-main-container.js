import classNames from "classnames";

const ServiceMainContainer = (props) => {
  return (
    <div className={classNames(['services-main-container', ...(props.classNames || [])])} style={props.style} >
      <div className="filter-container">{props.children[0]}</div>
      <div className="services-list-container">{props.children[1]}</div>
    </div>
  );
};

export default ServiceMainContainer;
