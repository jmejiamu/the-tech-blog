import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import restfulapi from '../URL/url';

const Store = () => {

    const [book, setBooks] = useState([]);
    const [countN, setCount] = useState(0);

    const getBooks = async () => {
        try {
            const data = await fetch(restfulapi.the_tech_blog + '/books');
            const response = await data.json();
            setBooks(response);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getBooks();

        // sessionStorage.setItem(save.id, JSON.stringify(save))

    }, []);



    let item = []
    let itemObj = {}
    // console.log(item);

    const saveItemsAdded = (id, title, description, cost) => {
        itemObj.id = id;
        itemObj.title = title;
        itemObj.description = description;
        itemObj.cost = cost;
        item.push({ itemObj })
        // setSave(itemObj)
        // setCount(countN)
        sessionStorage.setItem(countN, JSON.stringify(item))
        console.log(item);
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <button type="button" className="button-style btn btn-link">Cart </button>
                <div className="grid-container">
                    {
                        book.map((bookItems) => {
                            return (
                                <div key={bookItems.id} className="card card-style mt-5 grid-item mb-5" >
                                    <img className="card-img-top" src={bookItems.book_url} alt="book-pic" />
                                    <div className="card-body">
                                        <h5 className="card-title">{bookItems.book_title}</h5>
                                        <p className="card-text">{bookItems.book_description}</p>
                                        <button type="button" onClick={() => saveItemsAdded(bookItems.id, bookItems.book_title, bookItems.book_description, bookItems.book_cost)} className="button-style btn btn-link">Add Item</button>
                                        <p>$ {bookItems.book_cost}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    );
};

export default Store;