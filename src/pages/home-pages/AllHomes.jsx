import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';

import Spinner from '../../components/Spinner';
import { fetchAllHomes, fetchPaginatedHomes } from '../../api/homeApi';
import HomeCard from '../../components/cards/home-cards/HomeCard';

import './AllHomes.scss';
import './Homes.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const searchValuesInitialState = {
    city: '',
    direction: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: '',
};

export default function AllHomes() {
    const [pageNumber, setPageNumber] = useState(1);
    const queryClient = useQueryClient();
    const homesPerPage = 10;
    const location = useLocation();
    const typeQuery = location.pathname === '/all-rent' ? 'rent' : 'sell'
    const [isLongLoading, setIsLongLoading] = useState(false);
    const [searchValues, setSearchValues] = useState(searchValuesInitialState);
    const [districts, setDistricts] = useState([]);
    const [directions, setDirections] = useState([]);
    const [wards, setWards] = useState(null);

    const { data, isPlaceholderData, isLoading } = useQuery({
        queryKey: ['homes', pageNumber],
        queryFn: () => fetchAllHomes(pageNumber, typeQuery),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });
    const homes = data || [];
    const [searchResult, setSearchResult] = useState([]);
    const homesToDisplay = searchResult.length > 0
        ? searchResult
        : homes
    useEffect(() => {
        if (!isPlaceholderData) {
            queryClient.prefetchQuery({
                queryKey: ['homes', pageNumber + 1],
                queryFn: () => fetchAllHomes(pageNumber + 1),
            });
        }
    }, [data, isPlaceholderData, pageNumber, queryClient]);

    useEffect(() => {
        if (!isLoading) {
            setIsLongLoading(false);
            return;
        }
        const timeOutId = setTimeout(() => {
            console.log('Loading');
            setIsLongLoading(true);
        }, 3000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [isLoading]);

    useEffect(() => {
        const fetchDistrict = async () => {
            try {
                const res = await axios.get("http://localhost:3000/ward?page=1&limit=10000");
                if (res.data?.data.length > 0) {
                    setWards(res.data.data);
                }

                const resDistrict = await axios.get("http://localhost:3000/district?page=1&limit=10000");
                if (resDistrict.data?.data.length > 0) {
                    setDistricts(resDistrict.data.data);
                }
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchDistrict();
    }, [])

    useEffect(() => {
        const fetchDistrict = async () => {
            try {
                const resDistrict = await axios.get("http://localhost:3000/district?page=1&limit=10000");
                if (resDistrict.data?.data.length > 0) {
                    setDistricts(resDistrict.data.data);
                }
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchDistrict();
    }, [])

    useEffect(() => {
        const fetchDirection = async () => {
            try {
                const resDirections = await axios.get("http://localhost:3000/direction?page=1&limit=10000");
                if (resDirections.data?.data.length > 0) {
                    setDirections(resDirections.data.data);
                }
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchDirection();
    }, [])

    useEffect(() => {
        const fetchSearchDistrict = async () => {
            try {
                const resDistrict = await axios.get("http://localhost:3000/district?page=1&limit=10000");
                if(resDistrict.data?.data.length > 0 && searchValues.neighborhood){
                    setDistricts(resDistrict.data?.data.filter(district => district.ward.find(item => item.name === searchValues.neighborhood)));
                } 
                if(resDistrict.data?.data.length > 0 && searchValues.neighborhood === 'Search Ward'){
                    setDistricts(resDistrict.data.data);
                }
            } catch (error) {
                
            }
        }
        fetchSearchDistrict();
    }, [searchValues.neighborhood])

    const handleSearchChange = (e) => {
        console.log(e.target.name, e.target.value)
        setSearchValues({
            ...searchValues,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return (
            <>
                {isLongLoading && (
                    <h2 style={{ textAlign: 'center', marginTop: '36px' }}>
                        The loading time can be long, because the back end is deployed on free
                        service!
                    </h2>
                )}
                <Spinner />
            </>
        );
    }


    function handleSubmitResult(e) {
        e.preventDefault();
        const holeData = [...data];
        console.log("holeData:", holeData, searchValues)
        const filteredByNeighborhood = searchValues.neighborhood.length && searchValues.neighborhood !== 'Search Ward'
            ? holeData.filter((home) => home.region.ward.name.toLowerCase() == searchValues.neighborhood.toLowerCase())
            : holeData;
            console.log("filteredByNeighborhood:", filteredByNeighborhood)
        const filteredByCity = searchValues.city.length && searchValues.city !== 'Search District'
            ? filteredByNeighborhood.filter((home) => home.region.ward.district.name.toLowerCase() == searchValues.city.toLowerCase())
            : (filteredByNeighborhood)
            console.log("filteredByCity:", filteredByCity)
        const filteredByDirection = searchValues.direction.length && searchValues.direction !== 'Search Direction'
        ? filteredByCity.filter((home) => home.direction.name.toLowerCase() == searchValues.direction.toLowerCase())
        : (filteredByCity)
        console.log("filteredByDirection:", filteredByDirection)
        const filteredLowerPrice = searchValues.minPrice.length
            ? filteredByDirection.filter((home) => parseFloat(home.price) >= searchValues.minPrice)
            : filteredByDirection;
        const filteredBymaxPrice =  searchValues.maxPrice.length
            ? filteredLowerPrice.filter((home) => parseFloat(home.price) < Number(searchValues.maxPrice))
            : filteredLowerPrice;

            const filteredBySortBy =  searchValues.sortBy !== 'None'
            ? filteredBymaxPrice.sort((a, b) => {
                if(searchValues.sortBy  === 'Price_Inc'){
                   return a.price - b.price
                } else if(searchValues.sortBy  === 'Price_Dec'){
                    return b.price - a.price
                } else if(searchValues.sortBy  === 'Title'){
                    return a.title - b.title
                }
            })
            : filteredBymaxPrice;

        const finalFiltered = filteredBySortBy;
        console.log(finalFiltered);
      
        setSearchResult(finalFiltered.length ? finalFiltered : []);
    }

    return (
        <section className="main-container">
            <section className="home-search">
                <form onSubmit={handleSubmitResult}>
                    <select name="neighborhood" value={searchValues.neighborhood} onChange={handleSearchChange}>
                    <option >Search Ward</option>
                        {wards && wards.map(ward => {
                            return <option id={ward.name}>{ward.name}</option>
                        })}
                    </select>
                    <select name="city" value={searchValues.city}  onChange={handleSearchChange}>
                    <option >Search District</option>
                        {districts && districts.map(district => {
                            return <option id={district.name}>{district.name}</option>
                        })}
                    </select>

                    <select name="direction" value={searchValues.direction}  onChange={handleSearchChange}>
                    <option >Search Direction</option>
                        {directions && directions.map(direction => {
                            return <option id={direction.name}>{direction.name}</option>
                        })}
                    </select>
                    {/* <input
                        name="city"
                        placeholder="District"
                        value={searchValues.city}
                        type="text"
                        onChange={handleSearchChange}
                    /> */}
                    {/* <input
                        name="neighborhood"
                        placeholder="Ward"
                        value={searchValues.neighborhood}
                        type="text"
                        onChange={handleSearchChange}
                    /> */}
                    <input
                        name="minPrice"
                        placeholder="Min. Price"
                        value={searchValues.minPrice}
                        type="text"
                        onChange={handleSearchChange}
                    />
                    <input
                        name="maxPrice"
                        placeholder="Max. Price"
                        value={searchValues.maxPrice}
                        type="text"
                        onChange={handleSearchChange}
                    />
                    <select name="sortBy"  onChange={handleSearchChange}>
                        <option value="None">Sort by</option>
                        <option value="Price_Inc">Price Inc</option>
                        <option value="Price_Dec">Price Dec</option>
                        <option value="Title">Title</option>
                    </select>
                    <button id='Search_btn'>Search</button>
                </form>
            </section>
            <section className="homes-list-container">
                {homesToDisplay.map((home) => (
                    <HomeCard
                        key={home.id}
                        homeId={home.id}
                        photoUrl={home.image && home.image.length > 0 ? home.image.split(';')[0] : "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"}
                        city={home.city}
                        neighborhood={home.neighborhood}
                        title={home.title}
                        description={home.description}
                        price={home.price}
                    />
                ))}
            </section>

            <div className="pagination-container">
                <button type="button"  onClick={() => {
                        if(pageNumber !== 1){
                            setPageNumber((old) => Math.max((old) - 1, 0));
                            scrollTo(0, 0);

                        }
                    }} disabled={pageNumber === 1}>
                    Previous
                </button>
                <div className="current-page">Current page: {pageNumber}</div>
                <button type="button"  onClick={() => {
                        setPageNumber((old) => old + 1);
                        scrollTo(0, 0);
                    }}>
                    Next
                </button>
            </div>
            <ReactQueryDevtools initialIsOpen />
        </section>
    );
}
