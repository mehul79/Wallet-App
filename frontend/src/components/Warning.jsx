import { Link } from "react-router-dom"


export function Warning({lable, to}){
  return(
    <>
      <div className="flex items-center justify-center pt-3 underline">
        <Link to={to}>{lable}</Link>
      </div>
    </>
  )
}