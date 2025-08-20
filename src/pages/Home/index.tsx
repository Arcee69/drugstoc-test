import { useEffect, useState } from "react"
import { CgSpinner } from "react-icons/cg"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Pagination from "../../components/Pagination"


const Home = () => {
    const [search, setSearch] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [bookData, setBookData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate()

    const booksPerPage = 10

    let URL = import.meta.env.VITE_APP_API_URL;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const storedSearch = localStorage.getItem("search")
        const storedBooks = localStorage.getItem("bookData")
        const storedPage = localStorage.getItem("currentPage")

        if (storedSearch) setSearch(storedSearch)
        if (storedBooks) setBookData(JSON.parse(storedBooks))
        if (storedPage) setCurrentPage(Number(storedPage))
    }, [])

    const submitSearch  = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${URL}/volumes?q=${search}&startIndex=0&maxResults=40`)
            console.log("Response Data", res)
            setBookData(res?.data?.items)
            localStorage.setItem("search", search)
            localStorage.setItem("bookData", JSON.stringify(res?.data?.items))
            localStorage.setItem("currentPage", "1") // reset to page 1
            setCurrentPage(1)
        } catch (err) {
            console.log(err, "Error Fetching Books")
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        localStorage.setItem("currentPage", page.toString())
    }
    
    useEffect(() => {
        // Update total pages whenever  changes
        setTotalPages(Math.ceil(bookData?.length / booksPerPage));
    }, [bookData?.length, booksPerPage]);

     // Calculate indices for paginated bookData
     const indexOfLastTransaction = currentPage * booksPerPage;
     const indexOfFirstTransaction = indexOfLastTransaction - booksPerPage;
     const currentBooks = bookData?.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="flex flex-col gap-10 w-full">
        <div className="w-11/12 md:w-8/12 lg:w-6/12 flex mx-auto items-center gap-4">
            <input 
                type="text"
                name="search"
                onChange={handleSearch}
                placeholder="Search Books..."
                className="w-8/12 p-4 rounded-lg outline-none text-white font-poppins placeholder-white border border-gray-400"
            />
            <button
                type="button"
                onClick={submitSearch}
                disabled={loading}
                className="w-3/12 rounded-lg cursor-pointer bg-white p-4 flex items-center justify-center"
            >
                <p className='text-black text-base font-poppins'>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Search'}</p>
            </button>
        </div>

        <div className="flex flex-col gap-5 mx-5 md:mx-10">
            {
                currentBooks?.length > 0 ?
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                        {currentBooks?.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col md:flex-row items-start gap-5 md:gap-2 cursor-pointer group" 
                                onClick={() => {navigate("/details", {state: item}), window.scrollTo(0, 0)}}
                            >
                                <img src={item?.volumeInfo?.imageLinks?.thumbnail} alt="book" className="rounded-lg  object-contain h-[400px]" />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2">
                                        <p className="text-white font-medium font-poppins text-xl">Title:</p>
                                        <p className="text-white font-poppins mt-[1.5px] group-hover:underline">{item.volumeInfo.title}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <p className="text-white font-medium font-poppins text-xl">Authors:</p>
                                        {item?.volumeInfo?.authors?.map((author: string, index: number) => (
                                            <p key={index} className="text-white mt-1 group-hover:underline font-poppins">{author},</p>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-medium font-poppins text-xl">Published Date:</p>
                                        <p className="text-white font-poppins mt-[1.5px] group-hover:underline">{item.volumeInfo.publishedDate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        setCurrentPage={handlePageChange}
                    />
                </div>
                :
                <div className="flex items-center mt-10 justify-center">
                    <p className="font-poppins font-medium text-white text-lg">No Book Available</p>
                </div>
            }
           
        </div>


    </div>
  )
}

export default Home