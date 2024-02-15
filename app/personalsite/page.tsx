"use client";
// pages/index.js

import Head from "next/head";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Synthwave Love Quest</title>
        <meta
          name="description"
          content="A quest for love in the synthwave era."
        />
      </Head>

      <div className="container">
        <header>
          <h1>Seeking Companion Through Time</h1>
          <p>
            Welcome to my digital love quest. Let&apos;s explore the future
            together.
          </p>
        </header>

        <section className="about-me">
          <h2>About Me</h2>
          <p>
            I&apos;m a web developer and enthusiast of all things retro and
            digital. I love diving into codes, exploring virtual worlds, and
            discussing the mysteries of history and the universe. Currently on a
            quest to find a player two for this game called life.
          </p>
        </section>

        <section className="interests">
          <h2>Interests</h2>
          <ul>
            <li>Sports & Fitness</li>
            <li>Chess & Strategy Games</li>
            <li>Video Gaming & Retro Culture</li>
            <li>History & The Roman Empire</li>
          </ul>
        </section>

        <section className="contact">
          <h2>Contact Me</h2>
          <p>
            If you&apos;re interested in joining me on this quest, reach out and
            let the adventure begin.
          </p>
          {/* Here you could include a contact form or your email/linkedin */}
        </section>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
          color: #fff;
          background-color: #000;
          padding: 20px;
          font-family: "Arial", sans-serif;
        }
        header,
        section {
          margin-bottom: 40px;
        }
        h1,
        h2 {
          color: #ff00ff;
        }
        p {
          color: #00ffff;
        }
        ul {
          list-style-type: none;
        }
        ul li {
          margin: 10px 0;
        }
        .about-me,
        .interests,
        .contact {
          border-top: 2px solid #ff00ff;
          padding-top: 20px;
        }
      `}</style>
    </>
  );
};

export default HomePage;
