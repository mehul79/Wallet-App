export const Balance = ({ value }) => {

    
    return <div className="flex mt-3 ml-32">
        <div className="text-lg font-bold">
            Your balance
        </div>
        <div className="ml-4 text-lg font-semibold">
            Rs {value}
        </div>
    </div>
}