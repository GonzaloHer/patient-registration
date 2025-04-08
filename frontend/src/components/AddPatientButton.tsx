type Props = {
  onClick: () => void;
};

function AddPatientButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-4xl rounded-full bg-blue-700 text-white fixed bottom-7 right-7 h-16 w-16 hover:bg-blue-800 transition-colors"
    >
      +
    </button>
  );
}

export default AddPatientButton;
