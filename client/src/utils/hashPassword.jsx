import sha256 from "crypto-js/sha256";

// chiffrement des mot de passe
const hashPassword = (pwd) => {
	const hash = sha256(pwd).words;
	let result = "";
	for (let index = 0; index < hash.length; index++) {
		result += hash[hash.length - 1 - index];
	}
	return result;
};

export default hashPassword;
