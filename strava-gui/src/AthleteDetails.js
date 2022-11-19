

const AthleteDetails = (detailsData) => {
    return (
        <div className="athlete_details">
            <span>{detailsData.total_ride_count}</span>
            <span>{detailsData.total_distance}</span>
        </div>
    )
}

export default AthleteDetails