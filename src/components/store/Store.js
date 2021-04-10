import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';
import restfulapi from '../URL/url';

const Store = (props) => {

    const [book, setBooks] = useState([]);
    const [userName, setUserName] = useState("");
    const [userPicture, setUserPiture] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [userBooksAdded, setUserBookAdded] = useState([]);

    const getBooks = async () => {
        try {
            const data = await fetch(restfulapi.the_tech_blog + '/books');
            const response = await data.json();
            setBooks(response);

        } catch (error) {
            console.error(error.message);
        }
    }
    const getUserData = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json();
            setUserEmail(data.email);
            setUserId(data.id)
            setUserName(data.name)
            setUserPiture(data.picture)
        } catch (error) {
            console.error(error);
        }
    }

    const userBooks = async () => {
        try {
            const data = await fetch(restfulapi.the_tech_blog + '/userbook');
            const response = await data.json();

            setUserBookAdded(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getBooks();
        getUserData();
        userBooks();

    }, []);


    const saveItemsAdded = async (id, title, description, cost, url) => {
        const body = {

            book_title: title,
            book_description: description,
            book_cost: cost,
            book_url: url,
            user_email: userEmail,
            book_id: id
        }


        try {
            const response = await fetch(restfulapi.the_tech_blog + "/useraddbooks", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const datares = await response.json()
            toast.success(datares.post)
        } catch (error) {
            console.error(error.message);
        }

        userBooks();

    }

    const countUseritems = () => {
        let count = 0;
        userBooksAdded.map(b => {
            if (b.user_email === userEmail) {
                return (
                    count++
                )
            }
        })

        return count;
    }

    const goToItems = () => {
        props.history.push('/items')
    }

    return (
        <>
            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />
            <div className="container">
                <button type="button" onClick={() => goToItems()} className="button-style btn btn-link">Cart</button><span>{countUseritems()}</span>
                <div className="grid-container">
                    {
                        book.map((bookItems) => {
                            return (
                                <div key={bookItems.id} className="card card-style mt-5 grid-item mb-5" >
                                    <img className="card-img-top" src={bookItems.book_url} alt="book-pic" />
                                    <div className="card-body">
                                        <h5 className="card-title">{bookItems.book_title}</h5>
                                        <p className="card-text">{bookItems.book_description}</p>
                                        <button type="button" onClick={() => saveItemsAdded(bookItems.id, bookItems.book_title, bookItems.book_description, bookItems.book_cost, bookItems.book_url)} className="button-style btn btn-link">Add Item</button>
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