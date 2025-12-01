const AddButton = ({
  children,
  onClick,
  type = "submit",
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-[#0077ED] hover:bg-[#0066CC] text-white py-3 px-6 rounded-full font-medium text-[17px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0077ED] shadow-sm hover:shadow-md active:scale-[0.98]"
    >
      {children}
    </button>
  );
};

export default AddButton;
