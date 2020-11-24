/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";

import logo from '../components/logo.svg'

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container ${showMenu ? "is-open" : ""}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className="container__sidebar">
            <div className="sidebar">
              <img src={logo} alt="Arteck Aménaement"  />
              <h2>Arteck aménagement</h2>
              <p>Arteck vous accompagne dans vos réalisations de mobilier urbain, signalisation standard et spécifique, accessoires sécurité et hygiène.<br/>
              Une large gamme de produits sélectionnés pour leur qualité de fabrication, de durabilité et de juste rapport qualité-prix.<br/>
              Avec nos conseils, des produits performants et appropriés. Avec notre équipe de pose, la réussite de vos réalisations.</p>
              <br/><br/>
              <h6 className="sidebar__title">
                <Link to="/">Arteck aménagement</Link>
              </h6>
              <div
                className="sidebar__intro"
                dangerouslySetInnerHTML={{
                  __html:
                    data.datoCmsHome.introTextNode.childMarkdownRemark.html
                }}
              />
              <ul className="sidebar__menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
              
              <div className="sidebar__copyright">
                {data.datoCmsHome.copyright}
              </div>
            </div>
          </div>
          <div className="container__body">
            <div>
              <h1>
                Voici nos catalogues
              </h1>
            </div>
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
