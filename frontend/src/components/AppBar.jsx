
export function AppBar({ name }) {
  return (
    <>
      <div className="flex justify-between pt-20 pb-3 ">
        <div className="pt-5 pl-32 text-lg font-medium">PayTm App</div>
        <div className="flex items-center justify-center pr-40">
          <div className="pt-5 ">Hello, {name}</div>
          <div className="pt-2 pl-3">
            <div className="flex justify-center mt-1 mr-2 rounded-full w-9 h-9 bg-slate-200">
              <div className="flex flex-col justify-center h-full text-xl">
                {name[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-5/6 border pr border-rose-600" />
      </div>
    </>
  );
}
