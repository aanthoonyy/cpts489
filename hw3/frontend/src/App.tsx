import "./style.css";
import snowdude from "./s-l400-2.jpg";
import useHomepage from "./useHomepage";

const Petition = () => {
  const { formData, signatures, loading, error, handleChange, handleSubmit } =
    useHomepage();

  return (
    <div>
      <header className="header2">
        <div className="banner">
          <span>Home</span>
          <span>About</span>
          <span>Categories</span>
          <span>Contact</span>
        </div>
      </header>

      <div className="main">
        <h1 className="articleText">Move CPTS 489 to Afternoon in Winter!</h1>

        <div className="container">
          <p>The image you see on the right is a……</p>
          <img className="pictu" src={snowdude} alt="snowdude" />
        </div>

        <h2>Sign the Petition</h2>
        {error && <div className="error">Error: {error}</div>}
        <form id="petitionForm" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="e.g., WA"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Signing…" : "Sign"}
            </button>
          </div>
        </form>

        <h2>Signatures</h2>
        {loading && <div>Loading signatures…</div>}
        <ul id="signaturesList">
          {signatures.map((sig) => (
            <li key={sig.id}>
              {sig.name} ({sig.email})
              {sig.city && ` — ${sig.city}, ${sig.state}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Petition;
