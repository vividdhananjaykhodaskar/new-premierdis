import './Hero.css'; 
import heroImage from '../../assets/images/hero_image.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-premier">Premier</span><br />
            Document<br />
            Imaging<br />
            Solutions
          </h1>
          <p className="hero-subtitle">
            <span className="hero-subtitle-text">THE BEST WAY TO STORE AND RETRIEVE YOUR DOCUMENTS</span>
          </p>
          <button className="btn-demo">Check out our live demo site</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Secure Document Storage" className="folder-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
