import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import AddReview from "../components/AddReview"
import HeartCounter from "../components/HeartsCounter"
import { FaFan, FaShower, FaBed, FaAccessibleIcon, FaUtensils, FaParking, FaPaw, FaTree, FaSmoking, FaTv, FaWifi } from 'react-icons/fa';
import FormEmail from "../components/EmailForm";

export default function DetailApartmentPage() {
    const { slug } = useParams()
    const [apartment, setApartment] = useState()
    const [triggerFetch, setTriggerFetch] = useState(false);

    const emailFormRef = useRef(null)


    const handleScrollToForm = () => {
        console.log(emailFormRef.current)
        if (emailFormRef.current) {
            emailFormRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };


    useEffect(() => {
        fetch(`http://localhost:3002/apartments/${slug}`)
            .then((res) => res.json())
            .then((data) => setApartment(data))
            .catch((error) => console.error("Error retrieving posts:", error));
    }, [triggerFetch])

    const services = apartment?.services?.map(service => service.id_service) || []

    const servicesList = [
        { id: 3, name: 'Air-Conditioner', icon: <FaFan /> },
        { id: 5, name: 'Bathroom Essentials', icon: <FaShower /> },
        { id: 6, name: 'Bed linen', icon: <FaBed /> },
        { id: 11, name: 'Disabled Access', icon: <FaAccessibleIcon /> },
        { id: 4, name: 'Eat-in Kitchen', icon: <FaUtensils /> },
        { id: 1, name: 'Free Parking', icon: <FaParking /> },
        { id: 9, name: 'Pet allowed', icon: <FaPaw /> },
        { id: 2, name: 'Private Garden', icon: <FaTree /> },
        { id: 10, name: 'Smoker', icon: <FaSmoking /> },
        { id: 7, name: 'Television', icon: <FaTv /> },
        { id: 8, name: 'Wi-Fi', icon: <FaWifi /> },
    ];

    const filteredServices = servicesList.filter(service => services.includes(service.id));

    return (
        <>
            {apartment ? (

                <div className="container my-5">
                    {/* Main picture */}
                    <div className="row">
                        <div className="col-12">
                            <img
                                src={apartment.picture_url.startsWith('http') ? apartment.picture_url : `http://localhost:3002${apartment.picture_url}`}
                                alt={apartment.title}
                                className="img-fluid rounded shadow-lg"
                                style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    {/* Title and short description */}
                    <div className="row mt-4">
                        <div className="col-12 col-lg-8">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="fw-bold">{apartment.title}</h1>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <HeartCounter cardId={apartment.id} initialVotes={apartment.vote} />
                                </div>
                            </div>
                            <p className="text-muted py-2">{apartment.address} , <span>{apartment.city}</span></p>

                            <p className="pt-2 mb-5">{apartment.description}</p>
                            <h5 className="fw-semibold mb-3">Services</h5>
                            <ul className="list-unstyled d-flex flex-wrap">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map(service => (
                                        <li key={service.id} className="pb-2 col-6 col-sm-4">
                                            <span>{service.icon} {service.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-muted">No services available for this apartment.</p>
                                )}


                            </ul>

                        </div>

                        {/* Main details */}
                        <div className="col-12 col-lg-4">
                            <div className="bg-light p-4 rounded shadow-sm">
                                <h5 className="fw-semibold mb-4">Details</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <i className="bi bi-house-door me-2"></i>
                                        {apartment.rooms_number} Rooms
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-person-fill me-2"></i>
                                        {apartment.beds} Beds
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-droplet me-2"></i>
                                        {apartment.bathrooms} Bathrooms
                                    </li>
                                    <li className="mb-2">
                                        <i className="bi bi-arrows-fullscreen me-2"></i>
                                        {apartment.square_meters} m²
                                    </li>
                                </ul>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScrollToForm();
                                    }}
                                    className="btn btn-primary w-100"
                                >
                                    <i className="bi bi-envelope me-2"></i> Talk with owner
                                </button>

                            </div>
                        </div>
                    </div>
                    <FormEmail ref={emailFormRef} id="emailForm" apartmentId={apartment.id} />
                    {/* Review Section */}
                    <div className="my-5">
                        <AddReview apartmentId={apartment.id} onReviewSubmit={() => setTriggerFetch(!triggerFetch)} />
                    </div>
                    <div className="row mt-5">
                        <h3 className="fw-bold mb-4">{apartment.reviews.length} Reviews</h3>


                        {/* Scroll container */}
                        <div className="reviews-scrollable">
                            {apartment.reviews && apartment.reviews.length > 0 ? (
                                apartment.reviews.map((review) => (
                                    <div key={review.id} className="col-12 mb-4">
                                        <div className="p-3 border rounded shadow-sm">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="fw-semibold mb-1">{review.author_name}</h5>
                                                <small className="text-muted">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <p className="mb-2 text-muted py-2">
                                                Stayed for {review.days_of_stay} days
                                            </p>
                                            <p className="mb-0 pt-2">{review.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No reviews available for this apartment.</p>
                            )}
                        </div>
                    </div>





                </div>

            ) : (
                <>
                    <span>Error 404: apartment not found</span>
                </>
            )}

        </>
    )
}

