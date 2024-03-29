import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/kunji-w-logo.svg";
import logoSPC from "../assets/second-peroject-chance white.png";
import styles from "./Footer.module.css";
import { Image } from "react-bootstrap";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer id={styles["site-footer"]} className="d-flex justify-content-center align-items-center flex-column p-2">
			<div>
      <Image src={logo} alt="Kunji Logo" height={50} />
      <Image src={logoSPC} alt="Project Second Chance" height={70} />
			</div>
      <div className="text-center">{t("userFooter.text")}</div>
    </footer>
  );
}

export default Footer;