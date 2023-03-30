import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Footer.module.css";

function Footer() {
	const { t } = useTranslation();

	return (
		<footer id={styles["site-footer"]}>
			<div className="text-center p-3">{t("userFooter.text")}</div>
		</footer>
	);
}
export default Footer;
