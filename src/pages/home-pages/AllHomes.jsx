import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';

import Spinner from '../../components/Spinner';
import { fetchAllHomes, fetchPaginatedHomes } from '../../api/homeApi';
import HomeCard from '../../components/cards/home-cards/HomeCard';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './AllHomes.scss';
import './Homes.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import HotPropertiesList from '../../components/cards/home-cards/HotCard';
import { Box, Typography, Button } from '@mui/material';

const searchValuesInitialState = {
    city: 'Tất cả huyện',
    direction: 'Tất cả hướng',
    neighborhood: 'Tất cả quận',
    minPrice: '',
    maxPrice: '',
    category: ''
};

export default function AllHomes() {
    const [pageNumber, setPageNumber] = useState(1);
    const queryClient = useQueryClient();
    const homesPerPage = 10;
    const location = useLocation();
    const typeQuery = location.pathname === '/all-rent' ? 1 : 2
    const [isLongLoading, setIsLongLoading] = useState(false);
    const [searchValues, setSearchValues] = useState(searchValuesInitialState);
    const [districts, setDistricts] = useState([]);
    const [directions, setDirections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [wards, setWards] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true)

    const { data, isPlaceholderData, isLoading } = useQuery({
        queryKey: ['homes', pageNumber, typeQuery],
        queryFn: () => fetchAllHomes(pageNumber, typeQuery),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });
    const homes = data || [];
    const [searchResult, setSearchResult] = useState([]);
    const homesToDisplay = searchResult.length > 0
        ? searchResult
        : (firstLoading ? homes : [])
       
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
        const fetchCategory = async () => {
            try {
                const resCategory = await axios.get("http://localhost:3000/categoryListing?page=1&limit=10000");
                if (resCategory.data?.data.length > 0) {
                    setCategories(resCategory.data.data);
                }
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchCategory();
    }, [])

    useEffect(() => {
        const fetchSearchDistrict = async () => {
            try {
                const resDistrict = await axios.get("http://localhost:3000/district?page=1&limit=10000");
                if(resDistrict.data?.data.length > 0 && searchValues.neighborhood){
                    setDistricts(resDistrict.data?.data.filter(district => district.ward.find(item => item.name === searchValues.neighborhood)));
                } 
                if(resDistrict.data?.data.length > 0 && searchValues.neighborhood === "Tất cả quận"){
                    setDistricts(resDistrict.data.data);
                }
                setSearchValues({...searchValues, city: 'Tất cả huyện'})
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
        const filteredByNeighborhood = searchValues.neighborhood.length && searchValues.neighborhood !== 'Tất cả quận'
            ? holeData.filter((home) => home.region.ward.name.toLowerCase() == searchValues.neighborhood.toLowerCase())
            : holeData
            console.log("filteredByNeighborhood:",filteredByNeighborhood )
        const filteredByCity = searchValues.city.length && searchValues.city !== 'Tất cả huyện'
            ? filteredByNeighborhood.filter((home) => home.region.ward.district.name.toLowerCase() == searchValues.city.toLowerCase())
            : filteredByNeighborhood
            console.log("filteredByCity:",filteredByCity )
        const filteredByDirection = searchValues.direction.length && searchValues.direction !== 'Tất cả hướng'
        ? filteredByCity.filter((home) => home.direction.name.toLowerCase() == searchValues.direction.toLowerCase())
        : filteredByCity
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
            : [];

        const finalFiltered = filteredBySortBy;
        console.log(finalFiltered);
        setFirstLoading(false);
        setSearchResult(finalFiltered.length ? finalFiltered : []);
    }
    return (
        <>
        <div className="main_card">
        <section className="main-container">
            <section className="home-search">
                <form onSubmit={handleSubmitResult}>
                    <select name="neighborhood" value={searchValues.neighborhood} onChange={handleSearchChange}>
                    <option id="all">Tất cả quận</option>
                        {wards && wards.map(ward => {
                            return <option id={ward.name}>{ward.name}</option>
                        })}
                    </select>
                    <select name="city" value={searchValues.city}  onChange={handleSearchChange}>
                    <option id="Tất cả huyện">Tất cả huyện</option>
                        {districts && districts.map(district => {
                            return <option id={district.name}>{district.name}</option>
                        })}
                    </select>

                    <select name="direction" value={searchValues.direction}  onChange={handleSearchChange}>
                    <option id="all" >Tất cả hướng</option>
                        {directions && directions.map(direction => {
                            return <option id={direction.name}>{direction.name}</option>
                        })}
                    </select>

                    <select name="holeData" value={searchValues.category}  onChange={handleSearchChange}>
                    <option >Tất cả chuyên mục</option>
                        {categories && categories.map(category => {
                            return <option id={category.name}>{category.name}</option>
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
                        placeholder="Giá nhỏ nhất"
                        value={searchValues.minPrice}
                        type="text"
                        onChange={handleSearchChange}
                    />
                    <input
                        name="maxPrice"
                        placeholder="Giá lớn nhất"
                        value={searchValues.maxPrice}
                        type="text"
                        onChange={handleSearchChange}
                    />
                    <select name="sortBy"  onChange={handleSearchChange}>
                        <option value="None">Sắp xếp theo</option>
                        <option value="Price_Inc">Giá tăng dần</option>
                        <option value="Price_Dec">Giá giảm dần</option>
                        <option value="Title">Tiêu đề</option>
                    </select>
                    <button id='Search_btn'>Tìm kiếm</button>
                </form>
            </section>
            <section className="homes-list-container">
                {homesToDisplay.length ? homesToDisplay.map((home) => (
                    <HomeCard
                        type={typeQuery}
                        key={home.id}
                        homeId={home.id}
                        photoUrl={home.image && home.image.length > 0 ? home.image.split(';')[0] : "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"}
                        city={home.city}
                        neighborhood={home.neighborhood}
                        title={home.title}
                        description={home.description}
                        price={home.price}
                        {...home}
                    />
                )) : <div style={{width: '100%', marginTop: '20px'}}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        textAlign="center"
                        p={3}
                    >
                        <SearchOffIcon color="action" style={{ fontSize: 80, marginBottom: 20 }} />
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Không tìm thấy bất kỳ bất động sản nào cả
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Thử thay đổi các tiêu chí tìm kiếm để có thêm kết quả.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleSubmitResult} otyle={{ marginTop: 20 }}>
                            Thử lại
                        </Button>
                      </Box>
                </div>
            }
            </section>

        </section>
        <HotPropertiesList properties={data}  type={typeQuery}/>
        </div>
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
        </>
    );
}
