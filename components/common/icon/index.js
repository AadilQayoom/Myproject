import Image from "next/image";

const Icon = ({ icon, onClick, width, height }) => {
  return (
    <Image
      onClick={onClick}
      src={icon}
      width={width ? width : 60}
      height={height ? height : 60}
      alt=""
    />
  );
};

export default Icon;
