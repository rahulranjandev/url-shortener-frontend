# 🚀 URL Shortener Frontend Service

This component serves as the frontend of a MERN app. It interacts seamlessly with the backend to provide an intuitive interface for managing your URLs. Built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), and JavaScript, it offers a modern, responsive experience to streamline your URL management.

## ✨ Features

- **Shorten URLs**: Easily transform lengthy URLs into concise, shareable links.
- **Retrieve URLs**: Effortlessly view and manage your shortened URLs.
- **View Clicks**: Monitor the click statistics for each short URL.
- **Delete URLs**: Seamlessly remove unnecessary short URLs.
- **Secure**: Protect your data with robust security measures.
- **Analytics**: Track the performance of your short URLs with detailed analytics. (Coming Soon)

## 🛠️ Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/rahulranjan937/url-shortener-frontend.git
    ```

2. **Install Dependencies**:

    ```bash
    cd url-shortener-frontend
    npm install
    ```

3. **Set Up Environment Variables**:

    Copy the `.env.example` file to `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

    Customize the `NEXT_PUBLIC_API_URL` and other environment variables as needed.

4. **Run the Development Server**:

    ```bash
    npm run dev
    ```

5. **Build the Project**:

    For production build:

    ```bash
    npm run build
    ```

6. **Start the Production Server**:

    After building the project, start the production server:

    ```bash
    npm start
    ```

7. **Access the Frontend Application**:

    Navigate to `http://localhost:3000` in your web browser to begin using the Short URL Service!

## 🚀 Usage

### Creating a Short URL

1. Open the frontend application in your web browser.
2. Enter the long URL you want to shorten in the input field.
3. Click on the "Shorten URL" button to generate the short URL.

### Retrieving Short URLs

1. Navigate to the "URLs" section of the application.
2. View all your previously shortened URLs and their click statistics.

### Deleting a Short URL

1. Navigate to the "URLs" section of the application.
2. Click on the delete icon next to the short URL you want to remove.

## 🤝 Contributing

Contributions are warmly welcomed! Whether you have suggestions for improvements, bug fixes, or new features, please don't hesitate to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.

## Author

👤 **Rahul Ranjan**

---

This frontend, in conjunction with the backend, creates a robust URL shortening service. Enjoy a streamlined, efficient experience for all your URL management needs!
