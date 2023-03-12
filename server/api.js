import { Router } from "express";
import { faker } from '@faker-js/faker';
import logger from "./utils/logger";
import { numeric } from "tar";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.get("/admin/users",(req,res) => {
	const createFakeUsers = (arrayLength) => {
		const arr = []
		for(let i = 0; i<=arrayLength; i++){
			arr.push({
				id:faker.random.numeric(5),
				name:faker.name.fullName(),
				gender:faker.name.sex(),
				dateOfBirth:faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
				currentLocation:faker.address.cityName(),
				pincode:faker.random.numeric(5),
				phoneNumber:faker.phone.number('+44 91 ### ## ##'),
				educationalQualification:faker.name.jobArea(),
				dateOfRelease:faker.date.between('2020-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
				caseStatus:faker.random.numeric(1)
	
			})
		}
		return arr
	}
	
	res.json(createFakeUsers(5))
	
})

export default router;
// 














