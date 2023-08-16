// import Nav from "../../nav.js";
import BookList from "../BookList/BookList.js";
import SearchForm from "../SearchForm/SearchForm.jsx";

function Home() {
    const handleSearch = (event) => {
        console.log("Search Query:", event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    };

    return (
        <div>
            {/* <Nav /> */}
            <div>
                <BookList/>
            </div>
        </div>
    );
}

export default Home;
