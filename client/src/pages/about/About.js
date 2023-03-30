import React from "react";
import logo from "../../assets/kunji-w-logo.svg";
import logoPSC from "../../assets/second-project-chance.png";
import { Image } from "react-bootstrap";

const About = () => (
  <div className="container my-5">
    <div className="row">
      <div className="col-md-6">
			<Image src={logo} alt="Logo Kunji" height={70} />
			<h2 className="mt-4">About Kunji</h2>
        <p>
          Kunji is a need-based helpline to support ex-inmates with immediate challenges they face post their release with regard to shelter, employment, legal assistance, etc. Released prisoners can call on the toll free number (1800-313-4963) to receive post release support.
        </p>
      </div>
      <div className="col-md-6">
			<Image src={logoPSC} alt="Logo project second chance" height={80} />
        <h2 className="mt-3">About Second Chance</h2>
        <p>
          Project Second Chance, India is a civil society initiative working on reimagining prisons in India. We work with young and passionate individuals and marginalised current/ex incarcerated populations on guiding them to be change agents within the prison system.
        </p>
        <p>
          They are shaped to become social entrepreneurs with the objective of bringing systematic and structured impact to the prison landscape. At Project Second Chance, ex prisoners are offered a full time fellowship engagement under a program called Second Chance Fellowship, these fellows are paired with a set of young criminal justice practitioners who have background of working in the space, collectively these two groups identify systemic problems within the system in first 3 months and envision a scalable on-the-ground solution, and implement a pilot project to test their solution in last 9 months. On completion of the pilot, the selected pairs and the interventions are incubated and mentored by the team to further become full-fledged new programmes. In the past 5 years, 25+ fellows have graduated who have established 7 initiatives which have supported 10000+ prisoners on systemic issues like Mental health of prisoners and prison staff, Reducing recidivism in violence and crime against women cases, Data and Evidence based Programming in Prison Welfare, Post Release Support through Helpline etc.
        </p>
      </div>
    </div>
  </div>
);

export default About;
