import { useEffect } from "react"


const VisualizeData = props => {

    // var username = props.data["user"]["username"]
    useEffect(() => {
        if(props.data !== undefined ) {
            console.log("Data is passed to the page that can show it.")
        }
    }, [props.data])

    return (
        <div className="page-wrap">
            <span>Lorem</span>
            {/* <b>{username}</b> */}
            <div className="header-items">
                <div>Grootste afstand</div>
                <div>Hoogste stijging</div>
                <div>Meeste wattage</div>
            </div>
        </div>
    )
}

export default VisualizeData