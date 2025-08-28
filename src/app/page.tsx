"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
// If you already have JSON, import it. Otherwise this is a stub:
import comicsData from "@/data/comics.json"; // [{ id, title, genre, cover }...]

export default function Home() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [comics, setComics] = useState(comicsData);

  const filtered = comics.filter((c: any) =>
    (c.title + " " + (c.genre ?? ""))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // simple add form state
  const [newComic, setNewComic] = useState({ title: "", genre: "", cover: "" });

  const addComic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComic.title || !newComic.cover) return;
    setComics((prev) => [...prev, { id: crypto.randomUUID(), ...newComic }]);
    setNewComic({ title: "", genre: "", cover: "" });
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />

      <main className="page container">
        {/* Header row */}
        <div className="row-wrap" style={{ justifyContent: "space-between" }}>
          <h1 className="text-2xl font-bold">My Comic Library</h1>
          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            + Add Comic
          </button>
        </div>

        {/* Search */}
        <div
          className="stack"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <input
            className="input"
            placeholder="Search by title or genre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid-cards">
          {filtered.map((comic: any) => (
            <Link key={comic.id} href={`/comics/${comic.id}`} className="card">
              <div className="card-media">
                <img src={comic.cover} alt={comic.title} />
              </div>
              <div className="card-overlay">
                <div className="card-title">{comic.title}</div>
                {comic.genre ? (
                  <div className="card-meta">{comic.genre}</div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <h2
              className="text-xl font-bold"
              style={{ marginBottom: ".75rem" }}
            >
              Add New Comic
            </h2>
            <form onSubmit={addComic} className="stack">
              <input
                className="input"
                placeholder="Title"
                value={newComic.title}
                onChange={(e) =>
                  setNewComic((v) => ({ ...v, title: e.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Genre (optional)"
                value={newComic.genre}
                onChange={(e) =>
                  setNewComic((v) => ({ ...v, genre: e.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Cover URL"
                value={newComic.cover}
                onChange={(e) =>
                  setNewComic((v) => ({ ...v, cover: e.target.value }))
                }
              />
              <button type="submit" className="btn btn-primary">
                Save Comic
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
