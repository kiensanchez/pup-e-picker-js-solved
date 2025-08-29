import { Component, createRef } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  render() {
    const { children, setIsActive, favoritesCount, unfavoritesCount } =
      this.props;

    const refs = [createRef(null), createRef(null), createRef(null)];

    const currentActive = ["favorites", "unfavorites", "create"];

    const handleSelectorClick = (index) => () => {
      if (index.current.classList.contains("active")) {
        setIsActive("all");
        index.current.classList.remove("active");
        return;
      }

      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.remove("active");
        }
      });

      index.current?.classList.add("active");
      setIsActive(currentActive[refs.indexOf(index)]);
    };

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              ref={refs[0]}
              className={`selector`}
              onClick={handleSelectorClick(refs[0])}
            >
              favorited ( {favoritesCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              ref={refs[1]}
              className={`selector`}
              onClick={handleSelectorClick(refs[1])}
            >
              unfavorited ( {unfavoritesCount} )
            </div>
            <div
              ref={refs[2]}
              className={`selector`}
              onClick={handleSelectorClick(refs[2])}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
