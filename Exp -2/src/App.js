import "./App.css";

import Posts from "./components/Posts";
import Platforms from "./components/Platforms";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">R</div>

          <div>
            <h1>Redux Toolkit Post Manager</h1>

            <p>
              Create, organize and manage your social media
              posts from one place.
            </p>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="dashboard-grid">
          <section className="main-content">
            <Posts />
          </section>

          <aside className="sidebar">
            <Platforms />

            <div className="info-card">
              <span>Redux Toolkit</span>

              <h3>Centralized State</h3>

              <p>
                Posts and platforms are managed globally using
                Redux Toolkit.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;