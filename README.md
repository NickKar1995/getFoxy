# GetFoxy 
<p align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=gitlab" /></a></p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

# Got a problem with your monthly/daily expenses? Not anymore, getFoxy has you covered

A user-friendly, high-performance Angular application designed to help you track and manage your expenses with ease.

## 🚀 Live Demo
Don't want to spin up the app locally? Check out the deployed version:
[https://getfoxyexpensegreece.netlify.app/dashboard](https://getfoxyexpensegreece.netlify.app/dashboard)

## 🐳 Fun of Docker  
The app already has an image ready for a spin up!  

### 🧪 Run with Docker
1. **Pull the image**
   ```bash
   docker pull testdocker95/getfoxy
2. **Run the container**
   ```bash
   cd getFoxy
   docker compose up
## 📋 Key Features

1. **RxJS Reactive Patterns**
   - Leveraging powerful Observables and operators to manage state and handle asynchronous streams in a clean, declarative way.
2. **Solid Project Architecture**
   - Organized into **Core**, **Shared**, and **Features** modules for maximum scalability and maintainability.
3. **Angular Animations**
   - Smooth entry and exit transitions to delight users when adding or removing expenses.
4. **Responsive Design**
   - Fully adaptable layout that looks great on desktop, tablet, and mobile screens.
5. **Toastr Notifications**
   - Instant feedback with elegant toast messages for success and error events.
6. **Lazy loading**
   - Performance issues? Not anymore, lazy loading lowers load time significantly.
7. **Loading spinner**
   - Loading spinner to improve user experience


## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/getfoxy-expenses.git
   cd getfoxy-expenses
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   ng serve 
   ```
4. **Build for production**
   ```bash
   ng build --configuration production
   ```

## 🏗️ Project Structure

```
/src
├── app
│   ├── core/           # Singletons, services, interceptors
│   ├── shared/         # Reusable components, pipes, directives
│   └── features/       # Feature modules (dashboard, expenses, auth)
└── assets/
```

## 🤝 Contributing

Feel free to open issues or submit pull requests. Contributions are always welcome!

## 📝 License

This project is licensed under the MIT License.

