# 💻 Green PC – E-Commerce Marketplace

Green PC holo ekti full-stack e-commerce web application, jekhane Buyer, Seller ebong Admin-der jonno dedicated functional dashboard royeche। Ekhane computer hardware ebong tech components buy/sell kora jay।

## 🔗 Important Links

* **🌍 Live Website:** [https://ecom-bd-shop-44.web.app/](https://ecom-bd-shop-44.web.app/)
* **🖥️ Client Side Repo:** [GitHub Front-End](https://github.com/coder-subrota/green-pc-front-end)
* **⚙️ Server Side Repo:** [GitHub Back-End](https://github.com/coder-subrota/green-pc-server)

---

## 🔑 Demo Access Credentials

System check korar jonno niche tinti role-er demo account dewa holo:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `subrota@gmail.com` | `subrota1234@` |
| **Seller** | `subrota.operator333@gmail.com` | `subrota.operator333@` |
| **Buyer** | `subrota.operator222@gmail.com` | `subrota.operator222@` |

---

## 🛠️ Tech Stack & Packages Used

### Client Side (Front-End)
* **Core:** React.js (Bootstrapped via Create React App)
* **Routing:** `react-router-dom`
* **State & Data Fetching:** `react-query` (TanStack Query), `axios`
* **Authentication:** Firebase Authentication
* **Forms & Uploads:** `react-hook-form`, `react-dropzone`
* **UI Elements:** Tailwind CSS, DaisyUI, `react-icons`, `react-spinners`
* **Notifications:** `react-toastify`

### Server Side (Back-End)
* **Core:** Node.js, Express.js
* **Database:** MongoDB
* **Security:** JSON Web Token (JWT), `cors`, `dotenv`
* **Development:** `nodemon`

---

## 📦 Seller Product Edit System (Features)

Website-ti te **Seller Dashboard**-er under-e ekti dynamic **Product Update/Edit** features add kora hoyeche:

1.  **Dynamic Route Handling:** Frontend URL theke `:id` dhorar jonno React Router-er `useParams` use kora hoyeche।
2.  **Auto Form Populate:** Component load hobar sathe sathe conditional API matching-er maddhome React Hook Form-er bhetor purono product details automatic load/reset hoy।
3.  **Smart Image Upload:** ImgBB API dynamic workflow runtime-e run hoy। Seller jodi ager chobi rakhte chay tobe database image text optimized thake, ar jodi notun image dropzone-e drop kore tobe automatic Firebase/ImgBB storage synchronize hoy।
4.  **Secure Database Operation:** Backend-e MongoDB-r `updateOne` operator ebong secure `verifyJWT` ও `verifySeller` middleware use kora hoyeche, jate kono unauthorized user ba onno seller karo product edit korte na pare।

---

## 🚀 Working Process (Development Journey)

1.  **Project Initialization:** `npx create-react-app client-side` command-er maddhome front-end scaffolding ebong backend-er jonno `mkdir server-side` create kora hoy।
2.  **Environment Setup:** Node backend-e `express`, `cors` and Mongoose setup kora hoy ebong credentials safe rakhar jonno `.env` include kora hoy।
3.  **Authentication Integration:** User validation structures manage korar jonno Firebase Auth configure kora hoy jekhane **Email/Password**, **Google**, and **GitHub** login standard ensure kora hoy।
4.  **CRUD Implementation:** Dynamic dashboard workflow control korar jonno Axios ebong React Query diye dynamic fetch, post, put operations handled kora hoy।

---

## 🧑‍💻 Available Scripts (Front-End)

Project directory-te nicher commands gulo run korte parben:

### `npm start`
App-ti development mode-e run korbe।
[http://localhost:3000](http://localhost:3000) e code changes live reload dekhajabe।

### `npm run build`
Production build-er jonno ready korbe standard optimization optimized built-in files direct assets mapping configuration create korbe।

> ⚠️ **Note:** Sometime standard free tier hosting platforms dynamic logic calculation requests er backend query load handling pressure processing limitations er jonno backend server sleep ba temporary crashed behavior show korte pare।