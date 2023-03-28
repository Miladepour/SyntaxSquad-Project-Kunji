import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <>
    <Container>
    <Row className="d-flex flex-row align-items-center">
    <Col xs={12} md={6} className="order-md-2">
      <h2 className={styles.titleMain}>Behind the Bars: Life in Indian Prisons</h2>
      <p>Welcome to Kunji, a charity organization dedicated to assisting ex-prisoners in finding the help they need to reintegrate into society. Our mission is to connect ex-prisoners with various NGOs, resources, and support systems to empower them in building a better future for themselves and their families.</p>
    </Col>
    <Col xs={12} md={6}className="order-md-1">
      <Image src="https://i.ibb.co/j6f02Js/kunji-1.jpg" alt="Central jail in india" fluid className={styles.heroImages} />
    </Col>
  </Row >
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-1">
      <h2 className={styles.titleMain}>Embracing Freedom: A New Chapter Begins</h2>
      <p>A glimpse into the Indian prison system, where countless individuals seek a chance at a new beginning upon their release.</p>
    </Col>
    <Col  xs={12} md={6} className="order-md-2">
      <Image src="https://i.ibb.co/HgTHb2j/kunji-2.jpg" alt="A man released from jail in india" fluid className={styles.heroImages} />
    </Col>
  </Row>
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-2">
      <h2 className={styles.titleMain}>Navigating Challenges: Seeking Solution</h2>
      <p>A former inmate contemplates the many issues that need assistance, such as legal aid, healthcare, education, and more.</p>
    </Col>
    <Col xs={12} md={6} className="order-md-1">
      <Image src="https://i.ibb.co/KFpXvbb/kunji-3.jpg" alt="A former inmate contemplates the many issues that need assistance" fluid className={styles.heroImages} />
    </Col>
  </Row>
  <Row className="d-flex flex-row align-items-center my-5">
    <Col xs={12} md={6} className="order-md-1">
      <h2 className={styles.titleMain}>Discovering Kunji: Hope on the Horizon</h2>
      <p>The power of information: A passerby discovers Kunji’s life-changing advertisement on a bustling street, opening the door to a world of support and resources for ex-prisoners.</p>
    </Col>
    <Col xs={12} md={6} className="order-md-2">
      <Image src="https://i.ibb.co/C9nJLPc/kunji-4.jpg" alt="life-changing advertisement on a bustling street" fluid className={styles.heroImages} />
    </Col>
  </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-2">
          <h2 className={styles.titleMain}>Reaching Out: A Call for Help and Guidance</h2>
          <p>Taking the first step: A former inmate reaches out to the Kunji helpline, seeking guidance and assistance in their journey towards a brighter future.</p>
        </Col>
        <Col xs={12} md={6} className="order-md-1">
          <Image src="https://i.ibb.co/MGjCtmz/kunji-5.jpg" alt=" A former inmate reaches out to the Kunji helpline" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-1">
          <h2 className={styles.titleMain}>Opening Up: Sharing Struggles with Kunji</h2>
          <p>A heartfelt conversation unfolds as the ex-prisoner explains the challenges they face to Kunji’s empathetic receptionist.</p>
        </Col>
        <Col xs={12} md={6} className="order-md-2">
          <Image src="https://i.ibb.co/qypD9w8/kunji-6.jpg" alt="Kunji’s empathetic receptionist" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-2">
          <h2 className={styles.titleMain}>Compassionate Guidance: Avnish Lends a Hand</h2>
          <p>Avnish, our dedicated receptionist, helps the ex-prisoner navigate their situation, connecting them with the appropriate resources and support.</p>
        </Col>
        <Col xs={12} md={6} className="order-md-1">
          <Image src="https://i.ibb.co/d7MbHHZ/kunji-7.jpg" alt="helps the ex-prisoner navigate their situation" fluid className={styles.heroImages} />
        </Col>
      </Row>
      <Row className="d-flex flex-row align-items-center my-5">
        <Col xs={12} md={6} className="order-md-1">
          <h2 className={styles.titleMain}>A New Lease on Life: Finding the Help They Need</h2>
          <p>With the right assistance, the ex-prisoner embarks on a journey of hope, healing, and happiness, empowered to create a brighter future.</p>
        </Col>
        <Col xs={12} md={6} className="order-md-2">
          <Image src="https://i.ibb.co/hRmtwSv/kunji-8.jpg" alt=" the ex-prisoner found right help" fluid className={styles.heroImages} />
        </Col>
      </Row>
    </Container>
    </>
  );
}
export default Hero;