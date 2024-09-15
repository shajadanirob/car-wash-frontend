
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router-dom';
import FooterSection from '../shared/FooterSection';

const MainLayout = () => {
    return (
        <div className='barlow-condensed-regular'>
            <Navbar/>
            <Outlet/>
            <FooterSection/>
        </div>
    );
};

export default MainLayout;