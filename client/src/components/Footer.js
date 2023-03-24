import React from "react";
import styles from "./Footer.module.css";
function Footer() {
	return (
		<footer id={styles["site-footer"]}>
			<div className="text-center p-3">Copyright reserved for Kunji </div>
		</footer>
	);
}
export default Footer;
