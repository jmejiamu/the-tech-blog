import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';
import restfulapi from '../URL/url';
import StripeCheckout from 'react-stripe-checkout';

const UserItemsList = (props) => {
    const [userName, setUserName] = useState("");
    const [userPicture, setUserPiture] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [userBooksAdded, setUserBookAdded] = useState([])


    const deleteBookList = async (id) => {
        try {
            const deleteData = await fetch(restfulapi.the_tech_blog + `/deletebook/${id}`, {
                method: 'DELETE'
            })
            setUserBookAdded(userBooksAdded.filter(book => book.id !== id))

            const delDataRespon = await deleteData.json();
            console.log(delDataRespon);
            toast.success(delDataRespon.data);
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
        getUserData();
        userBooks();
    }, [])

    const getPriceBook = () => {

        let sum = 0;
        userBooksAdded.map((b) => {
            if (userEmail === b.user_email) {
                sum += parseInt(b.book_cost)
            }
        })
        return sum;
    }

    const publishableKey = 'pk_test_51I562tEnics9zvhq3Bf4kb6aui3obz4vgetR4e8S02UlDH7qTAP4gaqFicUNioXVH24QKBbWKJ18qNBelNLACtoa00IGsDQZFS'
    const priceForStripe = getPriceBook() * 100;

    const onToken = async (token) => {

        const body = {
            token: token,
            amount: priceForStripe
        }
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/payment', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            })

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />

            <div class="px-4 px-lg-0 mt-5">


                <div class="pb-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">


                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="py-2 text-uppercase">Remove</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userBooksAdded.map((book) => {
                                                if (userEmail === book.user_email) {
                                                    return (
                                                        <tr>
                                                            <th scope="row" class="border-0">
                                                                <div class="p-2">
                                                                    <img src={book.book_url} alt="" width="70" class="img-fluid rounded shadow-sm" />
                                                                    <div class="ml-3 d-inline-block align-middle">
                                                                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{book.book_title}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: Technology</span>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td class="border-0 align-middle"><strong>${book.book_cost}</strong></td>
                                                            <td class="border-0 align-middle"><strong>1</strong></td>
                                                            <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash" onClick={() => deleteBookList(book.id)} ></i></a></td>
                                                        </tr>

                                                    )
                                                }
                                            })

                                            }
                                            <tr>
                                                <td class="border-0 align-middle"><strong>Total: $ {getPriceBook()}</strong></td>
                                                <td class="border-0 align-middle">

                                                    <StripeCheckout
                                                        label='Pay Now'
                                                        name='The Tech Blog '
                                                        billingAddress
                                                        shippingAddress
                                                        image='https://svgshare.com/i/CUz.svg'
                                                        description={`Your total is $${getPriceBook()}`}
                                                        amount={priceForStripe}
                                                        panelLabel='Pay Now'
                                                        token={onToken}
                                                        stripeKey={publishableKey}
                                                    />
                                                </td>
                                                <td>

                                                    <strong>*Test data*</strong>
                                                    <p><strong>Email:</strong>test@gmail.com</p>
                                                    <p>Any name, street, city and zip code.</p>
                                                    <p><strong>Card:</strong> 4242 4242 4242 4242</p>
                                                    <p><strong>Exp. Data:</strong>  12/22</p>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>

    );
};

export default UserItemsList;