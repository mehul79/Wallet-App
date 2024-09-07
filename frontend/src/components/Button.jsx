


export function Button({ label, onClick }) {
  return (
    <>

      <div className="flex justify-center pt-10">
        <button
          onClick={onClick}
          type="button"
          className=" w-1/2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5  me-2 "
        >
          {label}
        </button>
      </div>
    </>
  );
}
