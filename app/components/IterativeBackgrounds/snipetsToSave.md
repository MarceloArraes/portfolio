# Snippets

```event_listener
   canvas.addEventListener("touchstart", (e) => {
      mouse.current.button = 1; // Changed from e.which to e.button
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.touches[0].clientX - rect.left;
      mouse.current.y = e.touches[0].clientY - rect.top;
      mouse.current.down = true;
    });
```

Interaction: dist=243.20019988364808, mouseInfluence=50, button=2
