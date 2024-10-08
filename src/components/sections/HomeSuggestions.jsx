import { useEffect, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import HomeCard from '../cards/home-cards/HomeCard';

const HomeSuggestions = ({ homeId }) => {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestingHome = () => {
        fetch(`http://localhost:3000/listing?page=1&limit=4&type_id=${type}&status=done`)
            .then((res) => res.json())
            .then((data) => {
                if (data === "No results.") return
                setSuggestions(data);
            })
            .catch(() => console.error("Error on suggestions!"))
    };

    useEffect(() => {
        fetchSuggestingHome();
    }, []);

    return (
        suggestions.length > 0 && (
            <section className="suggestions">
                <article className="latest-properties-title">
                    <h2>Closest Properties</h2>
                </article>
                <section className="properties-card-container">
                    {suggestions.slice(0, 3).map((homeSug) => (
                        <HomeCard
                            key={homeSug.id}
                            homeId={homeSug.id}
                            photoUrl={homeSug.photo_url}
                            city={homeSug.city}
                            neighborhood={homeSug.neighborhood}
                            title={homeSug.title}
                            description={homeSug.description}
                            price={homeSug.price}
                        />
                    ))}
                </section>
            </section>
        )
    );
};

export default HomeSuggestions;
