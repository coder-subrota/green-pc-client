import React from 'react';
import { Helmet } from 'react-helmet';
import Advertise from '../Advertise/Advertise';
import Categories from '../Categories/Categories';
import ResellProcess from '../ResellProcess/ResellProcess';
import Slider from '../Slider/Slider';
import AboutUs from '../AboutUs/AboutUs';
import ContactUs from '../ContactUs/ContactUs';
import FrequentlyAskQuestions from '../FrequentlyAskQuestions/FrequentlyAskQuestions';

// Fixed typos in import paths and component names
import Newsletter from './NewLatter/NewLatter'; // Check if your folder is named NewLatter or Newsletter
import OurTeam from './OurTeam/OurTeam';
import Testimonials from './TestiMonal/TestiMonal'; // Check if your folder is named TestiMonal or Testimonial

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Your Site Name</title>
            </Helmet>
        
            <Slider />
            <Categories />
            <Advertise />
            <ResellProcess />
            <AboutUs />
            <ContactUs />
            <FrequentlyAskQuestions />
            <OurTeam />
            <Testimonials />
            <Newsletter />
        </>
    );
};

export default Home;