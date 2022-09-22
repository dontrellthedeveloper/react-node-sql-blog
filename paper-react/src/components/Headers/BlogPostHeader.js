import React from "react";

// reactstrap components
import { Button } from "reactstrap";

// core components

function BlogPostHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        className="page-header"
        ref={pageHeader}
        style={{
          backgroundImage:
            "url(" + require("assets/img/farid-askerov.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <div className="motto">
            <h1 className="title">A Place for Storytelling</h1>
            <h3 className="description">
              By Creators for Creators
            </h3>
            <br />
            <Button
                className="btn-round mr-1"
                color="neutral"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ?ref=creativetim"
                target="_blank"
            >
              <i className="fa fa-play" />
              Watch video
            </Button>
            <Button
                className="btn-round"
                color="neutral"
                type="button"
                outline
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPostHeader;
