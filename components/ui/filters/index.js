import AllFilters from "./all-filters";
import Material from "./material";
import PriceFilter from "./price-filter";
import Size from "./size";
import Sorter from "./sorter";
import classes from "./index.module.less";

const Filters = ({ t, setFilter }) => {
  return (
    <div className={classes.filters_parent}>
      <Sorter t={t} changeFilter={setFilter} />
      <PriceFilter t={t} changeFilter={setFilter} />
      <Size t={t} changeFilter={setFilter} />
      <Material t={t} changeFilter={setFilter} />
      <AllFilters t={t} changeFilter={setFilter} />
    </div>
  );
};

export default Filters;
