from flask import Flask, render_template

app = Flask(__name__)

GIFTS = [
    {"id": "flowers", "name": "Sunday Bouquet", "category": "Flowers", "price": 38, "image": "flowers.svg", "description": "A cheerful bunch of seasonal blooms, gathered to brighten the day."},
    {"id": "chocolate", "name": "Chocolate Daydreams", "category": "Sweets", "price": 24, "image": "chocolate.svg", "description": "A box of rich little chocolates made for a birthday treat."},
    {"id": "teddy", "name": "The Cuddle Club", "category": "Cozy", "price": 32, "image": "teddy.svg", "description": "A soft, pocket-sized friend ready for the very best hugs."},
    {"id": "perfume", "name": "Golden Hour", "category": "Fragrance", "price": 56, "image": "perfume.svg", "description": "A warm, sunny fragrance with soft vanilla notes."},
    {"id": "jewelry", "name": "Little Star Necklace", "category": "Jewelry", "price": 48, "image": "jewelry.svg", "description": "A delicate golden star to keep a little birthday sparkle close."},
]


@app.route("/")
def index():
    return render_template("index.html", gifts=GIFTS)


if __name__ == "__main__":
    app.run(debug=True)
