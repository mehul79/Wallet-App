export function InputBox({label, placeholder, onChange}){
    return(

        <>
        <div className="pl-10 ">
            <div className="pt-6 text-base font-medium">
                {label}
            </div>
            <div className="pt-1">
<input onChange={onChange} className="w-11/12 h-10 border-2 rounded-md placeholder:pl enabled:pl-2 " placeholder={placeholder} ></input>
            </div>
        </div>
        </>

    )
}

