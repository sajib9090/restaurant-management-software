/* eslint-disable react/prop-types */
const SideDataBar = ({ collapsed, dark }) => {
  return (
    <div
      className={`h-[200px] ${collapsed ? "w-[40px]" : "w-[200px]"}  ${
        dark ? "bg-[#001529]" : " bg-white"
      }`}
    ></div>
  );
};

export default SideDataBar;
