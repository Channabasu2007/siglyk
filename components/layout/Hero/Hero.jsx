import LeftHeroSection from "./LeftHeroSection";
import RightHeroSection from "./RightHeroSection";

const Hero = () => {
  return (
    <section className="w-full px-8 py-6 lg:w-[80vw] mx-auto bg-light-primary">
      <div
        className="
          mx-auto
          max-w-7xl
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4 md:gap-8
          items-center
        "
      >
        {/* Text */}
        <div className="order-2 md:order-1">
          <LeftHeroSection />
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 flex justify-center">
          <RightHeroSection />
        </div>
      </div>
    </section>
  );
};

export default Hero;
