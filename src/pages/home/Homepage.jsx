import React from "react";
import HeroSection from "../../Components/heroSection/HeroSection"
import Layout from "../../Components/layout/Layout";
import Category from "../../Components/category/Category";
import HomePageProductCard from "../../Components/homePageProductCard/HomePageProductCard";
import Track from "../../Components/track/Track";

const Homepage = () => {

  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      
     
    </Layout>
  );
};

export default Homepage;
