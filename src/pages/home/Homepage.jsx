import React from "react";
import HeroSection from "../../Components/heroSection/HeroSection"
import Layout from "../../Components/layout/Layout";
import Category from "../../Components/category/Category";
import HomePageProductCard from "../../Components/homePageProductCard/HomePageProductCard";
import Track from "../../Components/track/Track";
import Testimonial from "../../Components/testimonial/Testimonial";

const Homepage = () => {

  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
      
     
    </Layout>
  );
};

export default Homepage;
