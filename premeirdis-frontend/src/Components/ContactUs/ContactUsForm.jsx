import React, { useState } from 'react';
import './ContactUsForm.css';
import locationImg from '../../assets/images/location_logo.png';
import messageImg from '../../assets/images/message_logo.png';
import phoneImg from '../../assets/images/phone_logo.png';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // placeholder behaviour — integrate with backend as needed
    alert('Message sent — demo only.');
  }

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <header className="contact-header">
          <h1>Let's have a conversation</h1>
          <p>We're open to talking to good people. Just say hello, and we'll start productive cooperation. Start your own success story.</p>
        </header>

        <div className="contact-container">
          <aside className="contact-left">
            <div className="contact-card">
              <div className="card-item location">
                <div className="icon">
                  <img src={locationImg} alt="location" className="icon-img icon-location" />
                </div>
                <div className="item-body">
                  <h4>Drop us a line</h4>
                  <p className="muted address">Premier Document Imaging Solutions<br/>P.O. Box 10300<br/>Kansas City, MO 64190</p>
                  <a className="muted link see-map">See Map</a>
                </div>
              </div>

              <div className="divider" />

              <div className="card-item email">
                <div className="icon">
                  <img src={messageImg} alt="message" className="icon-img" />
                </div>
                <div className="item-body">
                  <h4>Email</h4>
                  <p className="muted email-address">contact@premierdis.com</p>
                  <a className="muted link say-hello">Say Hello</a>
                </div>
              </div>

              <div className="divider" />

              <div className="card-item phone">
                <div className="icon">
                  <img src={phoneImg} alt="phone" className="icon-img" />
                </div>
                <div className="item-body">
                  <h4>Call</h4>
                  <p className="muted phone-numbers">(816) 399-5434 (Local)<br/>(888) 799-7473 (Toll Free)</p>
                  <a className="muted link call-now">Call now</a>
                </div>
              </div>
            </div>
          </aside>

          <main className="contact-right">
            <div className="form-card">
              <h3>We'd love to hear from you</h3>
              <form onSubmit={handleSubmit}>
                <div className="row two-cols">
                  <label>
                    <span className="label-text">Name</span>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
                  </label>

                  <label>
                    <span className="label-text">Email</span>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
                  </label>
                </div>

                <label className="label-block">
                  <span className="label-text">Message</span>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Enter your message" rows={5} />
                </label>

                <div className="form-footer">
                  <div className="small-note">
                   
                    <div className="note-text">All the fields are required. By sending the form you agree to the <a href="#" className="small-link">Terms & Conditions</a> and <a href="#" className="small-link">Privacy Policy</a>.</div>
                  </div>

                  <button type="submit" className="send-btn">Send Message</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
