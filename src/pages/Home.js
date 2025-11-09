import Hero from '../components/Hero';
import About from '../components/About';
import WhyChoose from '../components/WhyChoose';
import HowItWorks from '../components/HowItWorks';
import Categories from '../components/Categories';

export default function Home(){
  return (
    <div>
      <Hero />
      <About />
      <WhyChoose />
      <HowItWorks />
      <Categories />
    </div>
  );
}
