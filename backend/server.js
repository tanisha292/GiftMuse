const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/gifts', (req, res) => {

    const sql = `
      SELECT
        gifts.id,
            gifts.name,
            gifts.image,
            gifts.category,
            gifts.occasion,
            gifts.recipient,
            gifts.price,
            gifts.description,
            gifts.rating,
            gifts.review_count,
            gifts.stock,

            gift_images.image AS extra_image

        FROM gifts
        LEFT JOIN gift_images
        ON gifts.id = gift_images.gift_id
        ORDER BY gifts.id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        const gifts = {};

        results.forEach(row => {

            if (!gifts[row.id]) {

                gifts[row.id] = {
                    id: row.id,
                    name: row.name,
                    category: row.category,
                    occasion: row.occasion,
                    recipient: row.recipient,
                    price: row.price,
                    description: row.description,
                    rating: row.rating,
                    review_count: row.review_count,
                    stock: row.stock,
                    images: []
                };

            }

            if (row.image) {
                gifts[row.id].images.push(row.extra_image);
            }

        });
        if(row.extra_image){
            gifts[row.id].images.push(row.extra_image);
            
        }

        res.json(Object.values(gifts));

    });

});
app.listen(3000, () => {
    console.log("Server running on port 3000");

});