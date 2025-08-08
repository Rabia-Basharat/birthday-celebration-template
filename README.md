# Birthday Celebration Website Template

A beautiful, responsive birthday celebration website built with React, TypeScript, and Tailwind CSS. This template features animated elements, interactive components, and a modern design perfect for celebrating special occasions.

## 🌐 Live Demo

**View the live website:** [https://birthday-celebration-template.surge.sh]

🎉 **Experience the magic:** Beautiful animations, confetti explosions, and interactive elements that make every birthday special!

## Features

- 🎉 **Interactive Birthday Celebration**: Animated timeline, floating elements, and surprise modal
- 💝 **Personalized Messages**: Customizable birthday messages and wishes
- 🎨 **Beautiful Design**: Gradient backgrounds, floating animations, and modern UI
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Modern**: Built with React 18, TypeScript, and Vite
- 🎵 **Music Integration**: Optional music/song links for special moments
- ✨ **Beautiful Visual Effects**: 
  - Smooth floating animations
  - Confetti explosions on interactions
  - Advanced Framer Motion animations
  - Clean, elegant design

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Custom components with shadcn/ui styling
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React icons
- **Animations**: Framer Motion for smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd AI-Merging
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Quick Preview

Want to see it in action immediately? Visit the **[live demo](https://birthday-celebration-template.surge.sh)** to experience all the features!

## Customization

### Personalizing the Content

1. **Update the Hero Section**: Modify the main title and description in `client/src/pages/home.tsx`
2. **Customize Timeline**: Edit the `timelineItems` array to reflect your own journey
3. **Add Personal Photos**: Replace the placeholder sections with actual images
4. **Update Messages**: Modify the birthday message in the modal
5. **Change Music Link**: Update the YouTube link in the `toggleMusic` function

### Adding Your Own Photos

1. Place your images in `client/public/assets/images/`
2. Update the image paths in the photo gallery section
3. Replace the placeholder divs with actual `<img>` tags

### Styling Customization

- Colors are defined in `tailwind.config.ts`
- Animations are in `client/src/index.css`
- Component styles are in the respective component files

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # UI components (ConfettiExplosion)
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── public/
│       └── assets/        # Static assets
├── server/                # Backend server
├── shared/               # Shared types and schemas
└── README.md
```

## Deployment

This project can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `client` folder
- **Railway**: Deploy the entire project
- **Heroku**: Deploy with the included `vercel.json`
- **Surge**: Quick deployment with `surge dist/`

### Current Deployment

This project is currently deployed on **Surge**:
- **Live URL**: [https://birthday-celebration-template.surge.sh](https://birthday-celebration-template.surge.sh)
- **Status**: ✅ Active and running

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with love using React and TypeScript
- Inspired by beautiful birthday celebrations
- Icons from Lucide React
- Styling with Tailwind CSS

---

**Note**: This is a template project. Please customize it with your own content, photos, and personal messages before using it for actual celebrations. 