import './Features.css';
import image1 from '../../assets/images/extraordinary_image.png';
import image2 from '../../assets/images/secured_image.png';
import image3 from '../../assets/images/Fully_private_storage.png';
import image4 from '../../assets/images/approved_image.png';

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-main-title">Everything in One Place</h2>
          <p className="features-main-subtitle">We go further than all of our competitors.</p>
        </div>

        <div className="feature-row feature-1 feature-row-left">
          <div className="feature-content feature-1-content">
            <h3 className="feature-title feature-1-title">Envision The <br></br>Extraordinary</h3>
            <p className="feature-description feature-1-description">
              Premier employs the latest SSL encryption using the SHA256 hash. The entire website is SSL encrypted at the highest extended validation that banks use. Even the PDF files themselves are stored encrypted with their own unique key for each file.
            </p>
          </div>
          <div className="feature-image feature-1-image">
            <img src={image1} alt="Envision The Extraordinary" />
          </div>
        </div>

        <div className="feature-row feature-2 feature-row-right">
          <div className="feature-content feature-2-content">
            <h3 className="feature-title feature-2-title">Your Data, Secured <br></br>Within U.S. Borders</h3>
            <p className="feature-description feature-2-description">
              We block ALL internet traffic outside the United States. This means no one in other countries can even see what we exist! They can&apos;t access our systems at all.
            </p>
          </div>
          <div className="feature-image feature-2-image">
            <img src={image2} alt="Your Data, Secured Within U.S. Borders" />
          </div>
        </div>

        <div className="feature-row feature-3 feature-row-left">
          <div className="feature-content feature-3-content">
            <h3 className="feature-title feature-3-title">Fully Private Storage</h3>
            <p className="feature-description feature-3-description">
              Also, we don&apos;t use any public cloud storage service like Amazon, Google Cloud, IBM Cloud, or Rackspace. These services are fine services but they are targets for hackers. We own all of the storage in our private cloud. You enter into an agreement with us and only us we another party (so you don&apos;t have others).
            </p>
          </div>
          <div className="feature-image feature-3-image">
            <img src={image3} alt="Fully Private Storage" />
          </div>
        </div>

        <div className="feature-row feature-4 feature-row-right">
          <div className="feature-content feature-4-content">
            <h3 className="feature-title feature-4-title">Officially <br></br><span>Government-Approved</span></h3>
            <p className="feature-description feature-4-description">
              We&apos;ve even obtained government-level security verification. This certifies us to do business with government agencies anywhere in the nation.
            </p>
          </div>
          <div className="feature-image feature-4-image">
            <img src={image4} alt="Officially Government-Approved" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;