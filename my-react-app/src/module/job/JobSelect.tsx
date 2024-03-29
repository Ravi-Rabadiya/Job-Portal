/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";

const JobSelect = () => {
  const customStyles = {
    indicatorContainer: (base: any) => ({
      ...base,
      color: "red",
      marginRight: 19,
    }),
    control: (base: any) => ({
      ...base,
      height: 70,
      minHeight: 70,
      border: 0,
      borderRadius: 0,
      minWidth: 200,
      "&:hover": {
        boxShadow: "none",
        borderColor: "#fff",
      },
    }),
  };
  const options = [
    { value: "all", label: "Any - All Locations" },
    { value: "mumbai", label: "Mumbai - HO" },
    { value: "akkalkot-road", label: "Akkalkot Road-Solapur" },
    { value: "solapur", label: "Chincholi - Solapur" },
    { value: "ankhleshwar", label: "Ankhleshwar" },
    { value: "panoli", label: "Panoli" },
    { value: "indore", label: "Indore" },
    { value: "dahej", label: "Dahej" },
  ];
  return (
    <ReactSelect
      placeholder="Select Job Location"
      styles={customStyles}
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default JobSelect;
