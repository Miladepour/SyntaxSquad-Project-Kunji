import React from "react";
import logo from "../../assets/kunji-b-logo.svg";
import logoPSC from "../../assets/second-project-chance.png";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return(
    <div className="container my-5" style={{ minHeight:"100vh" }}>
      <div className="row">
        <div className="col-md-6">
        <Image src={logo} alt="Logo Kunji" height={70} />
          <h2 className="mt-4">{t("about.kunji.heading")}</h2>
          <p>
            {t("about.kunji.content")}
          </p>
        </div>
        <div className="col-md-6">
        <Image src={logoPSC} alt="Logo project second chance" height={80} />
          <h2 className="mt-3">{t("about.secondChance.heading")}</h2>
          <p>
            {t("about.secondChance.content1")}
          </p>
          <p>
            {t("about.secondChance.content2")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
