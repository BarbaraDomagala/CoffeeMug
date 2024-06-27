Setup:
- run: npm init playwright@latest

- create ignored by git login.config.ts file:
	export  default {
    newEmail: "NEW_NON_EXISTING_EMAIL",
    // The password must have one uppercase letter, one lowercase letter, one number, a special character, and a minimum of 8 characters
    pass: "PASSWORD",
	}

Open Playwright tests
- npx playwright test or npx playwright test --ui