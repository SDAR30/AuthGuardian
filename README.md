# AuthGuardian

![AuthGuardian Banner](https://img.freepik.com/free-vector/security-shield-vector-cyber-security-technology_53876-112196.jpg?w=400)

A robust and secure login authentication template built with Next.js, MongoDB, and TypeScript. Integrated with password reset, email verification, and notification capabilities via a cloud-based email service, ensuring a seamless and secure authentication experience.

## Features

- **Secure Authentication**: User passwords are securely hashed using `bcryptjs`.
- **Password Reset**: Users can reset their passwords in case they forget them.
- **Email Verification**: Ensure genuine users with email verification through Mailtrap.
- **Modern UI**: Styled using Tailwind, providing a sleek and modern look.
- **Feedback System**: Using `toast` to provide feedback to users.
- **Type Safety**: Written in TypeScript, ensuring type safety and reducing runtime errors.

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Type Checking**: TypeScript
- **Password Hashing**: bcryptjs
- **Feedback**: Toast
- **Email Service**: Mailtrap

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sdar30/authguardian.git
cd authguardian
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your environment variables. Create a `.env` file in the root directory and fill in your values:

```
MONGO_URL=YOUR_MONGODB_CONNECTION_STRING
TOKEN_SECRET=YOUR_JWT_SECRET
DOMAIN=YOUR_DOMAIN
EMAIL_USER=YOUR_SMTP_USER
EMAIL_PASS=YOUR_SMTP_PASSWORD
EMAIL_HOST=YOUR_SMTP_SERVER
EMAIL_SERVER=YOUR_SERVER
```

4. Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see the app running.

## Deployment

The project is currently deployed on Vercel. You can deploy it to your own Vercel instance or any other platform that supports Node.js. 

[Live Construction Demo](https://authguardian.vercel.app/)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
