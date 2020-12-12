import { toast } from 'react-toastify';

const logout = (e, p) => {

    e.preventDefault();
    localStorage.removeItem('jwt');
    p.setAuth(false);
    toast.success("👋 Logged out Successfully!")

}

export default logout;