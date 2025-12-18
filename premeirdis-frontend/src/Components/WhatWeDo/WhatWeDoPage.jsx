import React from 'react';
import './WhatWeDoPage.css';
import versionControlIcon from '../../assets/images/person_icon.png';
import dataSecurityIcon from '../../assets/images/security_icon.png';
import collaborationIcon from '../../assets/images/collaboration_icon.png';

// Service configuration
const servicesData = [
    {
        id: 1,
        icon: versionControlIcon,
        title: 'Version',
        subtitle: 'Control',
        colorClass: 'pink'
    },
    {
        id: 2,
        icon: dataSecurityIcon,
        title: 'Data',
        subtitle: 'Security',
        colorClass: 'orange'
    },
    {
        id: 3,
        icon: collaborationIcon,
        title: 'Collaboration',
        subtitle: 'Made Easy',
        colorClass: 'cyan'
    }
];

const WhatWeDoPage = () => {

    return (
        <div className="what-we-do-page">
            {/* Services Section */}
            <div className="services-container">
                <div className="services-row">
                    {servicesData.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className={`service-icon-wrapper ${service.colorClass}`}>
                                <img
                                    src={service.icon}
                                    alt={`${service.title} ${service.subtitle}`}
                                    className="service-icon"
                                />
                            </div>
                            <div className="service-text">
                                <h3 className="service-title">
                                    {service.title}
                                </h3>
                                <h3 className="service-subtitle">
                                    {service.subtitle}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Section */}
            <div className="main-content-container">
                <div className="main-content">
                    {/* Video Section */}
                    <div className="video-section">
                        <div className="video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/A0hbkovu_F8"
                                title="How we can help your business"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Text Content Section */}
                    <div className="text-content">
                        <p className="text-label">ONE-STOP SOLUTION</p>
                        <h1 className="text-title">What we do</h1>
                        <p className="text-description">
                            Our web-based service allows you to scan your documents and file them with us for safe storage and easy retrieval from any internet enabled device.
                        </p>
                        <h3 className="text-cta">Call us for a guided demonstration</h3>
                        <button className="demo-btn">
                            Check out our live demo site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDoPage;