# 🚀 Space Missions Data Analytics

## 🌍 About the Project

This project combines **Data Analytics** and **Next.js Web Development** to visualize insights from a dataset of space missions (1957-2022). The analysis includes **missions over time, launch locations, mission success rates, and total expenditure**.

The project is hosted live on **Vercel**, and you can explore the interactive plots and code!

---

## 📊 Data Analytics on Space Missions

### 🔬 Dataset & Analysis
The dataset was sourced from **Kaggle**, containing historical data on space missions. The analysis was performed using **Python in Jupyter Notebook** with visualizations saved as `.html` files.

### 📈 Key Insights:
1️⃣ **Missions Over Years** *(Line Chart)* - Shows the trend of space launches over time.
2️⃣ **Launch Locations Map** *(Geospatial Visualization)* - Displays where space missions were launched.
3️⃣ **Mission Success Ratios** *(Bar Chart)* - Compares success vs. failure rates.
4️⃣ **Total Expenditure (1957-2022)** - Analyzes the costs of space missions.

### 🛠️ Tech Stack for Analysis
- **Python 🐍**
- **Pandas 📊** for data manipulation
- **Matplotlib & Seaborn 📉** for visualizations
- **Folium 🗺️** for interactive maps
- **Jupyter Notebook 📒** for coding & analysis

### 📌 Sample Python Code:
```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("space_missions.csv")
```

---

## 🌐 Next.js Website Development

A **dark-themed Next.js website** was built to showcase the project with interactive elements.

### 🏗️ Features:
✅ **Home Page** - Overview of the project
✅ **Dataset Display** - Showcasing `.xlsx` files
✅ **Code & Plot Analysis** - Python code with a "Copy" button & linked `.html` plots
✅ **Styled Buttons & Animations** - Interactive UI using CSS
✅ **Deployed on Vercel** - Easily accessible online

### ⚙️ Tech Stack:
- **Next.js ⚛️** for the web framework
- **React Syntax Highlighter** for code display
- **Tailwind CSS 🎨** for styling
- **Vercel 🚀** for deployment

### 📌 Sample Next.js Code:
```jsx
import Image from 'next/image';
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">🚀 Space Missions Analysis</h1>
      <p className="mt-4">Explore the history of space exploration with interactive graphs!</p>
    </div>
  );
}
```

---

## 🚀 Deployment Steps (Vercel)

You can deploy this project using **Vercel** with the following steps:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2️⃣ Install dependencies
yarn install  # or npm install

# 3️⃣ Run locally
yarn dev  # or npm run dev

# 4️⃣ Deploy on Vercel
vercel
```

---

### Tools & Technologies Used:
- **Python** (for data analysis)
- **Pandas** (for data processing)
- **Matplotlib & Plotly** (for visualizations)
- **Jupyter Notebook** (for writing and running code)
- **Next.js & React** (for website development)
- **Vercel** (for deployment)

## How to Access the Website
The project has been successfully deployed using **Vercel**. You can visit the live website at:

🔗 **https://da-project-1.vercel.app** 

## Future Enhancements
- More in-depth analysis (e.g., mission success rates by country).
- Improved UI/UX for better visualization interaction.
- Adding a machine learning model to predict mission outcomes.

---

## 🎯 Conclusion
This project blends **Data Science** with **Web Development**, making space mission data accessible in a **beautifully designed interactive website**. 🚀

Feel free to **fork, contribute, or share** the project!

📩 **Connect with me:** If you have any questions, reach out!

---

📢 **Star ⭐ the repo if you found this useful!**

**Author:** Jaishnav Kalmangi
🚀 Happy Coding & Space Exploration! 🌌
