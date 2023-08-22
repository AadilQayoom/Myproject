import Image from "next/image";
import { brandsState } from "../../../recoil/atoms/home";
import classes from "./index.module.less";
import { useRecoilValue } from "recoil";
const Brands = () => {
  const brands = useRecoilValue(brandsState);

  return (
    <div className={classes.brands_container_main}>
      <div className={classes.section_title + " font16"}>Top Brands</div>
      <div className={classes.brands_parent}>
        {brands.map((val, index) => {
          return (
            <div className={classes.brand_inner} key={index}>
              <Image
                src={`/images/home/brands/${val.image}`}
                alt="brand-image"
                width={200}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Brands;
