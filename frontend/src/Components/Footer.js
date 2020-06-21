import React from 'react';

const Footer = () => {

  const backToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <>
      <footer className="footer">
        <div onClick={() => backToTop()} className="footer-back-to-top">BACK TO TOP</div>
        <div className="footer-about">
          ABOUT LINKS
        </div>
        <div className="footer-more">
          MORE LINKS
        </div>
      </footer>
    </>
  )
}

export default Footer
