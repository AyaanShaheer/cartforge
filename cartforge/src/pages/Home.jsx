
import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { NavIcon } from "../components/Icons.jsx";

export default function Home() {
  const { products, addToCart } = useCart();

  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // Load Tenor's embed script for the animated deployment meme.
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://tenor.com/embed.js";
    script.async = true;
    script.dataset.tenorEmbed = "true";

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "All Categories") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    list.sort((a, b) =>
      sortDesc ? b.price - a.price : a.price - b.price
    );

    return list;
  }, [products, category, search, maxPrice, sortDesc]);

  return (
    <div className="container">
      {/* Main hero banner */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">
            <NavIcon.flame /> Forged Deals, Daily
          </div>

          <h1>Discover Products</h1>
          <p>Find the best deals, tailored for you.</p>
        </div>

        <div className="hero-count">
          {filtered.length} products found
        </div>
      </div>

      {/* Animated DevSecOps meme */}
      <section
        aria-label="Developer deployment meme"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          marginBottom: "24px",
          padding: "24px",
          color: "#ffffff",
          background:
            "radial-gradient(circle at 10% 15%, rgba(255,122,41,.3), transparent 45%), #14161f",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(20,22,31,.1)",
        }}
      >
        <div style={{ flex: "1 1 250px", minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "#ffb37a",
              fontFamily: "monospace",
              fontSize: ".72rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              marginBottom: "12px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "#43d17b",
                boxShadow: "0 0 0 4px rgba(67,209,123,.15)",
              }}
            />
            DEVSECOPS REALITY
          </div>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
              lineHeight: 1.3,
              marginBottom: "10px",
            }}
          >
            It passed in Jenkins. Don't touch it.
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,.72)",
              fontSize: ".9rem",
              lineHeight: 1.6,
              margin: "0 0 12px",
            }}
          >
            One green pipeline away from becoming the release manager.
          </p>

          <a
            href="https://tenor.com/view/development-meme-programming-feature-deployment-gif-304666661970654925"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#ffb37a",
              fontSize: ".8rem",
              fontWeight: 600,
            }}
          >
            View original meme on Tenor ↗
          </a>
        </div>

        {/* Tenor provides the animated GIF embed */}
        <div
          style={{
            flex: "0 1 260px",
            width: "100%",
            maxWidth: "260px",
            minWidth: 0,
            marginLeft: "auto",
            overflow: "hidden",
            borderRadius: "14px",
            background: "#ffffff",
          }}
        >
          <div
            className="tenor-gif-embed"
            data-postid="304666661970654925"
            data-share-method="host"
            data-aspect-ratio="0.987"
            data-width="100%"
          >
            <a href="https://tenor.com/view/development-meme-programming-feature-deployment-gif-304666661970654925">
              Development Meme GIF
            </a>
            {" "}from{" "}
            <a href="https://tenor.com/search/development-gifs">
              Development GIFs
            </a>
          </div>
        </div>
      </section>

      {/* Product filters */}
      <div className="filter-bar">
        <div className="field">
          <NavIcon.tag />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <NavIcon.search />

          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <NavIcon.rupee />

          <input
            type="number"
            min="0"
            placeholder="Max price..."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setSortDesc((s) => !s)}
        >
          <NavIcon.sort />
          {sortDesc ? "High to Low" : "Low to High"}
        </button>

        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => {
            setCategory("All Categories");
            setSearch("");
            setMaxPrice("");
          }}
        >
          Reset
        </button>
      </div>

      {/* Product results */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon-wrap">
            <NavIcon.box
              style={{
                margin: "0 auto",
                color: "var(--slate-soft)",
              }}
            />
          </div>

          <h3>No products match your filters</h3>
          <p>
            Try adjusting the category, search term, or price limit.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
