# 🧠 Mind Palace - Interactive Neural Network Portfolio

A high-end, interactive portfolio website featuring a reactive neural network background, dynamic theme switching, and automatic data synchronization.

## 🚀 Features

- **Reactive Neural Network**: A D3.js powered background that responds to your navigation.
- **Dynamic Themes**: Switch between Neural Blue, Matrix Green, and Cyber Purple.
- **Auto GitHub Sync**: Automatically displays projects tagged with `portfolio-showcase`.
- **LinkedIn Integration**: Parses your LinkedIn data for Experience and Education views.
- **Premium UI**: Smooth animations using Framer Motion and a custom cyber-themed scrollbar.
- **Contact System**: Integrated contact form powered by Resend.

---

## 🛠️ How to Update Your Data

Updating your portfolio is designed to be simple. Most configurations are centralized in `src/config/portfolio.config.ts`.

### 1. Update Your Resume
You have two ways to update your resume link:
- **Option A (Recommended)**: Add `NEXT_PUBLIC_RESUME_LINK=your_link_here` to your `.env.local` file.
- **Option B**: Update the `googleDriveLink` in `src/config/portfolio.config.ts`.

### 2. Update Experience & Education (LinkedIn)
1. Go to your LinkedIn **Settings & Privacy** > **Data Privacy** > **Get a copy of your data**.
2. Download the **CSV** format.
3. Extract and find `Positions.csv` (for Experience) and `Education.csv` (for Education).
4. Place these files in the `public/data/` folder.
5. The website will automatically parse and display the new data.

### 3. Sync New Projects (GitHub)
1. Go to your GitHub repository settings.
2. Add the topic `portfolio-showcase`.
3. The portfolio will automatically fetch it (cached for 1 hour).
4. To force an immediate refresh, visit `/api/github-sync?refresh=true`.

### 4. Personal Details & Skills
All other details (About Me, Skills list, Certifications, Interests) are located in:
`src/config/portfolio.config.ts`

---

## ⚙️ Setup & Deployment

### Prerequisites
- Node.js 18+
- A GitHub account
- A Resend account (for the contact form)

### Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory with the following:
```env
GITHUB_TOKEN=your_github_personal_access_token
RESEND_API_KEY=your_resend_api_key
CONTACT_FORM_TO_EMAIL=your_email@example.com
NEXT_PUBLIC_RESUME_LINK=your_resume_google_drive_link
```

### Local Development
```bash
npm install
npm run dev
```

### Deployment (Vercel)
1. Push your code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add the environment variables listed above in the Vercel dashboard.
4. Deploy!

---

## 📂 Project Structure
- `src/app`: Next.js App Router and API routes.
- `src/components`: Reusable UI components and content views.
- `src/config`: Centralized configuration file.
- `src/context`: Theme management.
- `public/data`: Storage for LinkedIn CSV files.

---

**Developed with 💚 for a professional digital identity.**
