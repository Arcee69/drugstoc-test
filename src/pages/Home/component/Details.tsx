import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"

const Details = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

  return (
    <div className="w-full">
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[150px] rounded-lg cursor-pointer mx-10 bg-white p-3 flex items-center justify-center"
        >
            <p className="text-black text-base font-poppins">Back</p>
        </button>

        <div className="mx-5 md:mx-10 w-full flex flex-col lg:flex-row my-5 md:my-10 gap-5 lg:gap-0 items-start">
            <div className="w-11/12 md:w-full lg:w-4/12">
                <img 
                    src={state?.volumeInfo?.imageLinks?.thumbnail} 
                    alt="Book Thumbnail" 
                    className="object-contain md:mx-auto lg:mx-0 rounded-lg h-[500px]" 
                />
            </div>
            <div className="flex flex-col gap-5 w-11/12 lg:w-7/12">
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Book Title:</p>
                    <p className="text-white font-poppins text-base  md:text-xl">{state.volumeInfo.title || "Not Available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Book ID:</p>
                    <p className="text-white font-poppins text-base  md:text-xl">{state.id || "Not Available"}</p>
                </div>
                <div className="flex flex-col items-start lg:flex-row lg:items-center gap-2 lg:gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Book Authors:</p>
                    <div className="flex flex-row items-center gap-2">
                        {state?.volumeInfo?.authors?.map((author: string, index: number) => (
                            <p key={index} className="text-white font-poppins text-base  md:text-xl">{author},</p>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Book Category:</p>
                    <div className="flex items-center gap-2">
                        {state?.volumeInfo?.categories?.map((cat: string, index: number) => (
                            <p key={index} className="text-white font-poppins text-base  md:text-xl">{cat},</p>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Language:</p>
                    <p className="text-white font-poppins uppercase text-base  md:text-xl">{state?.volumeInfo?.language || "Not Available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Publisher:</p>
                    <p className="text-white font-poppins capitalize text-base  md:text-xl">{state?.volumeInfo?.publisher || "Not Available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">ISBN:</p>
                    <p className="text-white font-poppins capitalizetext-base  md:text-xl">{state?.volumeInfo?.industryIdentifiers?.[0]?.identifier || "Not Available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Published Date:</p>
                    <p className="text-white font-poppins capitalize text-base  md:text-xl">{state?.volumeInfo?.publishedDate || "Not Available"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Ratings:</p>
                    <div className="flex items-center gap-1">
                        {/* Display stars based on averageRating */}
                        {[...Array(5)].map((_, index) => {
                        const rating = state?.volumeInfo?.averageRating || 0;
                            return (
                                <span key={index} className="text-xl md:text-2xl text-yellow-400">
                                {index + 0.5 < rating ? (
                                    <FaStar /> // Filled star
                                ) : index + 0.5 === Math.ceil(rating) && rating % 1 !== 0 ? (
                                    <FaStarHalfAlt /> // Half star for decimal ratings
                                ) : (
                                    <FaRegStar /> // Empty star
                                )}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-4">
                    <p className="text-white font-medium font-poppins text-xl  md:text-2xl">Info Link:</p>
                    <p className="text-white font-poppins hover:underline cursor-pointer text-base  md:text-xl" onClick={() => window.open(state?.volumeInfo?.infoLink)}>{state?.volumeInfo?.infoLink || "Not Available"}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-4">
                    <p className="text-white font-medium font-poppins text-xl md:text-2xl">Description:</p>
                    <p className="text-white font-poppins cursor-pointer text-base  md:text-xl">{state?.volumeInfo?.description || "Not Available"}</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Details