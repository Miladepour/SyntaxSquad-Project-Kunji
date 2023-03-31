import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";
import imgOne from "../assets/kunji-1.jpg";
import imgTwo from "../assets/kunji-2.jpg";
import imgThree from "../assets/kunji-3.jpg";
import imgFour from "../assets/kunji-4.jpg";
import imgFive from "../assets/kunji-5.jpg";
import imgSix from "../assets/kunji-6.jpg";
import imgSeven from "../assets/kunji-7.jpg";
import imgEight from "../assets/kunji-8.jpg";

function Hero() {
  const { t } = useTranslation();

  return (
    <>
    <Container>
    <Row className="d-flex flex-row align-items-center">
    <Col xs={12} md={6} className="order-md-2">
            <h2 className={styles.titleMain}>{t("home.hero1.title")}</h2>
            <p>{t("home.hero1.content")}</p>
    </Col>
    <Col xs={12} md={6}className="order-md-1">
      <Image src={imgOne} alt="Central jail in india" fluid className={styles.heroImages} />
    </Col>
  </Row >
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-1">
            <h2 className={styles.titleMain}>{t("home.hero2.title")}</h2>
            <p>{t("home.hero2.content")}</p>
    </Col>
    <Col  xs={12} md={6} className="order-md-2">
      <Image src={imgTwo} alt="A man released from jail in india" fluid className={styles.heroImages} />
    </Col>
  </Row>
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-2">
            <h2 className={styles.titleMain}>{t("home.hero3.title")}</h2>
            <p>{t("home.hero3.content")}</p>
    </Col>
    <Col xs={12} md={6} className="order-md-1">
      <Image src={imgThree} alt="A former inmate contemplates the many issues that need assistance" fluid className={styles.heroImages} />
    </Col>
  </Row>
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-1">
            <h2 className={styles.titleMain}>{t("home.hero4.title")}</h2>
            <p>{t("home.hero4.title")}</p>
    </Col>
    <Col xs={12} md={6} className="order-md-2">
      <Image src={imgFour} alt="life-changing advertisement on a bustling street" fluid className={styles.heroImages} />
    </Col>
  </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-2">
            <h2 className={styles.titleMain}>{t("home.hero5.title")}</h2>
            <p>{t("home.hero5.title")}</p>
        </Col>
        <Col xs={12} md={6} className="order-md-1">
          <Image src={imgFive} alt=" A former inmate reaches out to the Kunji helpline" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-1">
            <h2 className={styles.titleMain}>{t("home.hero6.title")}</h2>
            <p>{t("home.hero6.title")}</p>
        </Col>
        <Col xs={12} md={6} className="order-md-2">
          <Image src={imgSix} alt="Kunji's empathetic receptionist" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-2">
            <h2 className={styles.titleMain}>{t("home.hero7.title")}</h2>
            <p>{t("home.hero7.title")}</p>
        </Col>
        <Col xs={12} md={6} className="order-md-1">
          <Image src={imgSeven} alt="helps the ex-prisoner navigate their situation" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-1">
            <h2 className={styles.titleMain}>{t("home.hero8.title")}</h2>
            <p>{t("home.hero8.title")}</p>
        </Col>
        <Col xs={12} md={6} className="order-md-2">
          <Image src={imgEight} alt=" the ex-prisoner found right help" fluid className={styles.heroImages} />
        </Col>
      </Row>
    </Container>
    </>
  );
}
export default Hero;